using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.BIZ
{
    public class ExpensesServices
    {
        private ExpensesContext _context;
        private ILogger<ExpensesServices> _logger;
        public ExpensesServices()
        {
        }
    }
}
