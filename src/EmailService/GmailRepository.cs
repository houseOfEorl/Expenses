using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace EmailService
{
    public class GmailRepository
    {
        private readonly string _emailAddres;


        public GmailRepository(string emailAdress)
        {
            _emailAddres = emailAdress;
        }


        /// <summary>
        /// Get Gmail Credential
        /// </summary>
        /// <returns></returns>
        public UserCredential GetCredential()
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
            }

            return credential;

        }
        
        public GmailService GetGmailService(UserCredential credential)
        {
            GmailService gmailService = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = this.GetType().ToString()
            });

            return gmailService;
        }

        /// <summary>
        /// Load all the emails after a period
        /// </summary>
        /// <param name="lastLoad"></param>
        /// <returns></returns>
        public ListMessagesResponse LoadEmails(string lastLoad, GmailService gmailService)
        {
            var emailListRequest = gmailService.Users.Messages.List(_emailAddres);

            emailListRequest.LabelIds = "INBOX";
            emailListRequest.IncludeSpamTrash = false;
            emailListRequest.Q = "after:" + lastLoad;

            //get our emails
            ListMessagesResponse emailListResponse;
            emailListResponse = emailListRequest.Execute();

            return emailListResponse;
        }
    }
}
