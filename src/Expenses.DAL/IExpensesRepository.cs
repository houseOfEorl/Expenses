using Expenses.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL
{
    public interface IExpensesRepository
    {
        ExpensesEntity GetExpenseById(int id);
        IEnumerable<ExpensesEntity> GetAllExpenses();
        IEnumerable<ExpensesEntity> GetExpensesByPeriod(DateTime dtPeriod);
        IEnumerable<ExpensesEntity> GetAvarageAmountPerMonthByCountry(int idPais);
        Decimal GetAvarageAmountByCountry(int idPais);
        int AddExpense(ExpensesEntity expense);
        void RemoveExpense(ExpensesEntity expense);
        Task<bool> SaveChangesAsync();
    }
}
