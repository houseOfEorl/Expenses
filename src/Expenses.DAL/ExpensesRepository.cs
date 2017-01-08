using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Expenses.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Expenses.DAL.Helpers;
//using Expenses.DAL.Helpers;

namespace Expenses.DAL
{
    public class ExpensesRepository : IExpensesRepository
    {
        private ExpensesContext _context;
        private ILogger<ExpensesRepository> _logger;

        public ExpensesRepository(ExpensesContext context, ILogger<ExpensesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        public void AddExpense(ExpensesEntity expense)
        {
            _context.Add(expense);
        }

        public IEnumerable<ExpensesEntity> GetAllExpenses()
        {
            return _context.ExpensesEntity.ToList();
        }

        public IEnumerable<ExpensesEntity> GetExpensesByPeriod(DateTime dtPeriod)
        {
            try
            {
                var month = dtPeriod.Month;
                var year = dtPeriod.Year;

                return _context.ExpensesEntity
                    .Where(x => x.ExpenseDate.Value.Month == month && x.ExpenseDate.Value.Year == year)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        /// <summary>
        /// Get the sum of all expenses grouping by month and year
        /// </summary>
        /// <param name="idPais"></param>
        /// <returns></returns>
        public IEnumerable<ExpensesEntity> GetAvarageAmountPerMonthByCountry(int idPais)
        {
            try
            {

                var result = _context.ExpensesEntity
                    .Where(x => x.CountryID == idPais)
                    .GroupBy(x => Convert.ToString(x.ExpenseDate.Value.Month) + Convert.ToString(x.ExpenseDate.Value.Year))
                    .Select(cl => new {
                        Period = Convert.ToString(cl.First().ExpenseDate.Value.Month) + Convert.ToString(cl.First().ExpenseDate.Value.Year),
                        AvgAmount = cl.Sum(c => c.Amount).ToString(),
                        Times = cl.Count()
                    })
                    .ToList();

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        /// <summary>
        /// Get the sum of all expenses and divide it by the number of months 
        /// TODO: Not counting expenses with college, create a new method for it
        /// </summary>
        /// <param name="idPais">ID Pais</param>
        /// <returns></returns>
        public Decimal GetAvarageAmountByCountry(int idPais)
        {
            try
            {
                Decimal avgAmount = 0;
                var parameterValues = new Dictionary<int, object>();
                parameterValues.Add(0, idPais);
                parameterValues.Add(1, "D"); //CreditOrDebit

                var dr = _context.Database.ExecuteSqlQuery(@"SELECT 
	                                                            ABS(SUM(g.Amount) 
                                                                    / COUNT(DISTINCT CONVERT(VARCHAR, YEAR(g.ExpenseDate)) + '/' 
                                                                    + CONVERT(VARCHAR,MONTH(g.ExpenseDate)))) as AvgAmount
                                                            FROM Expenses g
                                                            where CountryID = 1
                                                             and g.CreditOrDebit = 'D'
                                                             and g.name not like '%college%'
                                                             and g.name not like '%Quest%'
                                                             and g.name not like '%Savings%'
                                                             and g.name not like '%Seneca%'");

                while (dr.DbDataReader.Read())
                {
                    avgAmount = Math.Round(Convert.ToDecimal(dr.DbDataReader[0]),2);
                }

                dr.Dispose();

                return avgAmount;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return 0;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }

    public class ReturnDecimal
    {
        public Decimal MyProperty { get; set; }
    }
}
