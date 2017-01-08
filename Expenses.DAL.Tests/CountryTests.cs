using System.Linq;
using Xunit;


namespace Expenses.DAL.Tests
{
    public class CountryTests
    {
        [Fact]
        public void Get_Country_Just_Good()
        {
            var getDbContext = new GetDbContextDAL();
            var context = getDbContext.ReturnDbContext();

            var et = context.Country.ToList();

            Assert.NotEqual(0, et.Count());
        }
    }
}
