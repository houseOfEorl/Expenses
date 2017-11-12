using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.WebAPI.Logger
{
    public static class FileLoggerExtensions
    {
        public static ILoggerFactory AddLogFile(this ILoggerFactory factory,
                                                //IMailService mailService,
                                                Func<string, LogLevel, bool> filter = null)
        {
            factory.AddProvider(new FileLoggerProvider(filter/*, mailService*/));
            return factory;
        }

        public static ILoggerFactory AddLogFile(this ILoggerFactory factory, /*IMailService mailService,*/ LogLevel minLevel)
        {
            return AddLogFile(
                factory,
                //mailService,
                (_, logLevel) => logLevel >= minLevel);
        }
    }
}
