using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL.Tests
{
    public class GetDbContextDAL
    {
        public static IConfigurationRoot Configuration { get; set; }

        public ExpensesContext ReturnDbContext()
        {
            DbContextOptions<ExpensesContext> options;
            var builder = new DbContextOptionsBuilder<ExpensesContext>();
            builder.UseSqlServer(GetConnectionString());
            options = builder.Options;

            var context = new ExpensesContext(options);

            return context;
        }

        public static string GetConnectionString()
        {
            string _connectionString;

            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();

            //_connectionString = Configuration.Get<string>("Data:MyDb:ConnectionString");
            _connectionString = Configuration.GetSection("ConnectionStrings:ExpensesDB").Value;

            return _connectionString;
        }


    }
}
