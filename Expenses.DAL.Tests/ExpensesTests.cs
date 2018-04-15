using Expenses.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Xunit;


namespace Expenses.DAL.Tests
{
    public class ExpensesTests
    {
        [Fact]
        public void Get_Expenses_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var rep = new ExpensesRepository(context, null);

            var exp = rep.GetAllExpenses();

            Assert.NotEqual(0, exp.Count());
        }

        [Fact]
        public void Get_ExpensesWithType_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var et = context.ExpensesEntity.Include(x => x.Type).ToList();

            ExpensesType newType = new ExpensesType();

            Assert.Equal(newType.GetType(), et.Select(x => x.Type).FirstOrDefault().GetType());
        }

        [Fact]
        public void Get_ExpensesByPeriod_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var rep = new ExpensesRepository(context, null);

            var period = Convert.ToDateTime("2016-11-01");

            //var exp = rep.GetExpensesByPeriod(period).Where(x => x.ExpenseDate.Value.Month != period.Month && x.ExpenseDate.Value.Year != period.Year);

            //Assert.Equal(0, exp.Count());
        }

        [Fact]
        public void Test_Get_Avarage_Amount_Per_Country_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var rep = new ExpensesRepository(context, null);

            var idPais = 1;

            var exp = rep.GetAvarageAmountPerMonthByCountry(idPais);

            Assert.Equal(0, exp.Count());
        }

        [Fact]
        public void Test_Get_Avarage_Amount_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var rep = new ExpensesRepository(context, null);

            var idPais = 1;

            var exp = rep.GetAvarageAmountByCountry(idPais);

            Assert.NotEqual(0, exp);
        }

        [Fact]
        public void TestGetTotaAmountsPerPeriod_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var rep = new ExpensesRepository(context, null);

            var exp = rep.GetTotaAmountsPerPeriod(DateTime.Now);

            Assert.Equal(0, exp);
        }
    }
}

