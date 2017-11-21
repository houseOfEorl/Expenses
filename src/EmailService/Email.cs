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
    public class Email
    {
        public static IConfigurationRoot Configuration { get; set; }

        public void GetEmails()
        {
            try
            {
                string emailAdress = GetEmailAddress();
                GmailRepository gmailRepository = new GmailRepository(emailAdress);


                string lastLoad = GetLastTimeEmailWasChecked();
                
                List<ExpensesEntity> expensesReturn = new List<ExpensesEntity>();

                UserCredential credential = gmailRepository.GetCredential();
                GmailService gmailService = gmailRepository.GetGmailService(credential);

                ListMessagesResponse emailListResponse  = gmailRepository.LoadEmails(lastLoad, gmailService);

                if (emailListResponse != null && emailListResponse.Messages != null)
                {
                    //loop through each email and get what fields you want...
                    foreach (var email in emailListResponse.Messages)
                    {

                        var emailInfoRequest = gmailService.Users.Messages.Get(emailAdress, email.Id);
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
                                        body = GetNestedParts(emailInfoResponse.Payload.Parts, "");
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
                                    var amount = GetValue(body, "There was an authorization for $", "on account");
                                    Console.WriteLine(amount);

                                    //Get the place
                                    var place = GetValue(body, "* at ", ".");
                                    //var place = getValue(body, "* at ", ".");
                                    //place = place.Replace("\n", "");
                                    //int index = place.IndexOf(" ");
                                    //place = index > 0 ? place.Substring(0, index) : place;
                                    Console.WriteLine(place.Replace(System.Environment.NewLine, " "));


                                    var expense = ParseExpense(amount, place, date);
                                    //InsertExpense(expense);
                                    expensesReturn.Add(expense);

                                    break;

                                }

                            }
                        }

                    }
                }

                SetLastTimeEmailWasChecked();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get messages!" + ex.Message);
            }
        }

        private static string GetLastTimeEmailWasChecked()
        {
            try
            { 
                var getDbContext = new GetDbContext();
                var context = getDbContext.ReturnDbContext();
                var emailConfigRepo = new EmailConfigRepository(context, null);

                string lastLoad = emailConfigRepo.GetLastLoadDate().ToString("yyyy-MM-dd");

                return lastLoad;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get GetLastTimeEmailWasChecked!" + ex.Message);
                return null;
            }
        }

        private static void SetLastTimeEmailWasChecked()
        {
            try
            {
                var getDbContext = new GetDbContext();
                var context = getDbContext.ReturnDbContext();
                var emailConfigRepo = new EmailConfigRepository(context, null);

                emailConfigRepo.SetLastLoadDate(DateTime.Now);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get GetLastTimeEmailWasChecked!" + ex.Message);
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

        //private void InsertExpense(ExpensesEntity expense)
        //{
        //    var getDbContext = new GetDbContext();
        //    var _context = getDbContext.ReturnDbContext();

        //    ExpensesRepository foo = new ExpensesRepository(_context, null);
        //    foo.AddExpense(expense);
        //    _context.SaveChanges();
        //    _context.Dispose();
        //}


        private static String GetNestedParts(IList<MessagePart> part, string curr)
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
                        return GetNestedParts(parts.Parts, str);
                    }
                }

                return str;
            }

        }


    #region Utils
            /// <summary>
            /// Get a value in the message between two strings
            /// </summary>
            /// <param name="body">whole message</param>
            /// <param name="startName">pass a value before the value</param>
            /// <param name="endName">pass a value after the value</param>
            /// <returns></returns>
            private static String GetValue(string body, string startName, string endName)
            {
                var startPosition = body.IndexOf(startName) + startName.Length;
                var endPosition = body.IndexOf(endName, startPosition);

                var value = body.Substring(startPosition, endPosition - startPosition);

                return value;
            }


            public static string GetEmailAddress()
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
    #endregion



    }
}
