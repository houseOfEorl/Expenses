using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Expenses.DAL;
using Expenses.DAL.Entities;

namespace Expenses.BIZ
{
    public class ExpensesService
    {

        private ExpensesContext _context;
        private ILogger<ExpensesService> _logger;
        private IExpensesRepository _repository;

        public ExpensesService(ExpensesContext context, ILogger<ExpensesService> logger, IExpensesRepository repository)
        {
            _context = context;
            _logger = logger;
            _repository = repository;
        }

        public IEnumerable<ExpensesEntity> GetSumExpensesByCountry(int countryId)
        {
            var repo = _repository.GetAllExpenses().Where(x => x.CountryID == countryId).ToList();

            return repo;
        }
    }
}
