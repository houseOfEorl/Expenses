using System.Linq;
using Xunit;


namespace Expenses.DAL.Tests
{
    public class ExpensesTypeTests
    {
        [Fact]
        public void Get_ExpensesType_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var et = context.ExpensesType.ToList();

            Assert.NotEqual(0, et.Count());
        }
    }
}
