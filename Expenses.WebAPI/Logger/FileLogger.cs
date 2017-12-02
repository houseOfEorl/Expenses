using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;

namespace Expenses.WebAPI.Logger
{
    public class FileLogger : ILogger
    {
        private string _categoryName;
        private Func<string, LogLevel, bool> _filter;
        //private IMailService _mailService;

        //public FileLogger(string categoryName, Func<string, LogLevel, bool> filter, IMailService mailService)
        public FileLogger(string categoryName, Func<string, LogLevel, bool> filter)
        {
            _categoryName = categoryName;
            _filter = filter;
            //_mailService = mailService;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            // Not necessary
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return (_filter == null || _filter(_categoryName, logLevel));
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }

            if (formatter == null)
            {
                throw new ArgumentNullException(nameof(formatter));
            }

            var message = formatter(state, exception);

            if (string.IsNullOrEmpty(message))
            {
                return;
            }

            message = $@"Level: {logLevel} {message}";

            if (exception != null)
            {
                message += Environment.NewLine + Environment.NewLine + exception.ToString();
            }

            using(StreamWriter writer = File.AppendText(@".\logs\" + DateTime.Now.ToString("yyyyMMdd") + ".txt") )
            {
                writer.WriteLine(DateTime.Now.ToString() + " - " + message + Environment.NewLine);
            }
            //_mailService.SendMail("logmessage.txt", "Shawn Wildermuth", "shawn@wildermuth.com", "[WilderBlog Log Message]", message);

        }
    }
}