using Expenses.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.WebAPI.Logger
{
    public class FileLoggerProvider : ILoggerProvider
    {
        private readonly Func<string, LogLevel, bool> _filter;
        //private readonly IMailService _mailService;
        private readonly LogSettings _logSettings;

        public FileLoggerProvider(Func<string, LogLevel, bool> filter, LogSettings logSettings/*, IMailService mailService*/)
        {
            //_mailService = mailService;
            _logSettings = logSettings;
            _filter = filter;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new FileLogger(categoryName, _filter, _logSettings/*, _mailService*/);
        }

        public void Dispose()
        {
        }
    }
}
