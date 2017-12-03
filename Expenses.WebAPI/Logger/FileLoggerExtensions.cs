using Expenses.Entities;
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
                                                LogSettings logSettings,
                                                Func<string, LogLevel, bool> filter = null)
        {
            factory.AddProvider(new FileLoggerProvider(filter, logSettings/*, mailService*/));
            return factory;
        }

        public static ILoggerFactory AddLogFile(this ILoggerFactory factory, /*IMailService mailService,*/ LogLevel minLevel, LogSettings logSettings)
        {
            return AddLogFile(
                factory,
                //mailService,
                logSettings,
                (_, logLevel) => logLevel >= minLevel);
        }
    }
}
