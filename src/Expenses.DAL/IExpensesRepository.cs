using Expenses.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL
{
    public interface IExpensesRepository
    {
        IEnumerable<ExpensesEntity> GetAllExpenses();
        IEnumerable<ExpensesEntity> GetExpensesByPeriod(DateTime dtPeriod);
        IEnumerable<ExpensesEntity> GetAvarageAmountPerMonthByCountry(int idPais);
        Decimal GetAvarageAmountByCountry(int idPais);
        void AddExpense(ExpensesEntity expense);
        Task<bool> SaveChangesAsync();
    }
}
