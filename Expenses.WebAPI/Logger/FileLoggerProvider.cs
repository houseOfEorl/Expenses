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

        public FileLoggerProvider(Func<string, LogLevel, bool> filter/*, IMailService mailService*/)
        {
            //_mailService = mailService;
            _filter = filter;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new FileLogger(categoryName, _filter/*, _mailService*/);
        }

        public void Dispose()
        {
        }
    }
}
