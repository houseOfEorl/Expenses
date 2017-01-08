using Expenses.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;


namespace Expenses.DAL.Tests
{
    public class ExpensesMonthlyTests
    {
        [Fact]
        public void Get_ExpensesMonthly_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var et = context.ExpensesMonthly.ToList();

            Assert.NotEqual(0, et.Count());
        }

        [Fact]
        public void Get_ExpensesMonthlyWithType_Just_Good()
        {
            //Facts
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();
            var et = context.ExpensesMonthly.Include(x => x.Type).ToList();

            //Arrangement
            ExpensesType newType = new ExpensesType();

            Assert.Equal(newType.GetType(), et.Select(x => x.Type).FirstOrDefault().GetType());
        }
    }
}
