using Expenses.DAL.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Expenses.DAL
{
    public class EmailConfigRepository
    {
        private ExpensesContext _context;
        private ILogger<EmailConfigRepository> _logger;

        public EmailConfigRepository(ExpensesContext context, ILogger<EmailConfigRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public DateTime getLastLoadDate()
        {
            return _context.EmailConfig.Select(x => x.LastLoadDate).FirstOrDefault();
        }

        public void setLastLoadDate(DateTime loadDate)
        {
            var record = _context.EmailConfig.FirstOrDefault();
            record.LastLoadDate = loadDate;

            _context.SaveChanges();
            _context.Dispose();
        }
    }
}
