using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using System.Threading;
using Google.Apis.Util.Store;
using Google.Apis.Services;
using Google.Apis.Gmail.v1.Data;
using System.Text.RegularExpressions;
using Expenses.EmailService;
using Expenses.DAL;
using Expenses.DAL.Entities;
using Microsoft.Extensions.Configuration;

namespace EmailService
{
    public class Bank
    {


        private UserCredential getCredential()
        {
            UserCredential credential;
            using (var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read))
            {

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { GmailService.Scope.GmailReadonly, GmailService.Scope.MailGoogleCom, GmailService.Scope.GmailModify },
                    "betoOtherUI",
                    CancellationToken.None,
                    new FileDataStore(this.GetType().ToString())).Result;
                Console.WriteLine("Credential file saved to: " + this.GetType().ToString());


                //credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                //    GoogleClientSecrets.Load(stream).Secrets,
                //    // This OAuth 2.0 access scope allows for read-only access to the authenticated 
                //    // user's account, but not other types of account access.
                //    new[] { GmailService.Scope.GmailReadonly, GmailService.Scope.MailGoogleCom, GmailService.Scope.GmailModify },
                //    "betoOtherUI",
                //    CancellationToken.None,
                //    new FileDataStore(this.GetType().ToString())
                //);
            }

            return credential;

        }

        public void getEmails()
        {
            try
            {

                UserCredential credential = getCredential();

                var gmailService = new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = this.GetType().ToString()
                });

                var emailListRequest = gmailService.Users.Messages.List(GetEmail());
                emailListRequest.LabelIds = "INBOX";
                emailListRequest.IncludeSpamTrash = false;


                var getDbContext = new GetDbContext();
                var context = getDbContext.ReturnDbContext();

                var rep = new EmailConfigRepository(context, null);
                var lastLoad = rep.getLastLoadDate().ToString("yyyy-MM-dd");

                //emailListRequest.Q = "is:unread"; //this was added because I only wanted undread email's...

                //get last load date
                emailListRequest.Q = "after:" + lastLoad;

                //get our emails
                var emailListResponse = emailListRequest.Execute();

                if (emailListResponse != null && emailListResponse.Messages != null)
                {
                    //loop through each email and get what fields you want...
                    foreach (var email in emailListResponse.Messages)
                    {

                        var emailInfoRequest = gmailService.Users.Messages.Get(GetEmail(), email.Id);
                        //make another request for that email id...
                        var emailInfoResponse = emailInfoRequest.Execute();

                        if (emailInfoResponse != null)
                        {
                            String from = "";
                            String date = "";
                            String subject = "";
                            String body = "";
                            //loop through the headers and get the fields we need...
                            foreach (var mParts in emailInfoResponse.Payload.Headers)
                            {
                                if (mParts.Name == "Date")
                                {
                                    date = mParts.Value;
                                }
                                else if (mParts.Name == "From")
                                {
                                    from = mParts.Value;
                                }
                                else if (mParts.Name == "Subject")
                                {
                                    subject = mParts.Value;
                                }

                                if (date != "" && from != "" && subject.Contains("Your Credit Card was used"))
                                {

                                    Console.WriteLine(date);

                                    if (emailInfoResponse.Payload.Parts == null && emailInfoResponse.Payload.Body != null)
                                    {
                                        body = emailInfoResponse.Payload.Body.Data;
                                    }
                                    else
                                    {
                                        body = getNestedParts(emailInfoResponse.Payload.Parts, "");
                                    }
                                    //need to replace some characters as the data for the email's body is base64
                                    String codedBody = body.Replace("-", "+");
                                    codedBody = codedBody.Replace("_", "/");
                                    codedBody = Regex.Replace(codedBody, "[^a-zA-Z0-9]", "/", RegexOptions.Compiled); ;
                                    byte[] data = Convert.FromBase64String(codedBody);
                                    body = Encoding.UTF8.GetString(data);

                                    //now you have the whole data
                                    //Console.WriteLine(body.Replace("\n", " "));

                                    //Get the value
                                    var amount = getValue(body, "There was an authorization for $", "on account");
                                    Console.WriteLine(amount);

                                    //Get the place
                                    var place = getValue(body, "* at ", ".");
                                    //var place = getValue(body, "* at ", ".");
                                    //place = place.Replace("\n", "");
                                    //int index = place.IndexOf(" ");
                                    //place = index > 0 ? place.Substring(0, index) : place;
                                    Console.WriteLine(place.Replace(System.Environment.NewLine, " "));


                                    var expense = ParseExpense(amount, place, date);
                                    InsertExpense(expense);

                                    break;

                                }

                            }
                        }

                    }
                }

                rep.setLastLoadDate(DateTime.Now);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get messages!" + ex.Message);
            }
        }

        private ExpensesEntity ParseExpense(string amount, string place, string dt)
        {
            ExpensesEntity expense = new ExpensesEntity();
            expense.Name = place;
            expense.CreditOrDebit = "D";
            expense.isPaid = false;
            expense.ExpensesTypeID = 3;
            expense.ExpenseDate = Convert.ToDateTime(dt);
            expense.Amount = Convert.ToDecimal(amount) * -1;
            expense.CountryID = 1; //Canada
            expense.isCreditCard = true;
            expense.CreatedDate = DateTime.Now;

            return expense;
        }

        private void InsertExpense(ExpensesEntity expense)
        {
            var getDbContext = new GetDbContext();
            var _context = getDbContext.ReturnDbContext();

            ExpensesRepository foo = new ExpensesRepository(_context, null);
            foo.AddExpense(expense);
            _context.SaveChanges();
            _context.Dispose();
        }


        private static String getNestedParts(IList<MessagePart> part, string curr)
        {
            string str = curr;
            if (part == null)
            {
                return str;
            }
            else
            {
                foreach (var parts in part)
                {
                    if (parts.Parts == null)
                    {
                        if (parts.Body != null && parts.Body.Data != null)
                        {
                            str += parts.Body.Data;
                        }
                    }
                    else
                    {
                        return getNestedParts(parts.Parts, str);
                    }
                }

                return str;
            }

        }

        /// <summary>
        /// Get a value in the message between two strings
        /// </summary>
        /// <param name="body">whole message</param>
        /// <param name="startName">pass a value before the value</param>
        /// <param name="endName">pass a value after the value</param>
        /// <returns></returns>
        private static String getValue(string body, string startName, string endName)
        {
            var startPosition = body.IndexOf(startName) + startName.Length;
            var endPosition = body.IndexOf(endName, startPosition);

            var value = body.Substring(startPosition, endPosition - startPosition);

            return value;
        }

        public static IConfigurationRoot Configuration { get; set; }

        /// <summary>
        /// get email dsa
        /// </summary>
        /// <returns></returns>
        public static string GetEmail()
        {
            string _email;

            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();

            //_connectionString = Configuration.Get<string>("Data:MyDb:ConnectionString");
            _email = Configuration.GetSection("Email").Value;

            return _email;
        }

    }
}
