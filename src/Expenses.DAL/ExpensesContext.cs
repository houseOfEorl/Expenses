using Expenses.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL
{
    public class ExpensesContext : DbContext
    {

        public ExpensesContext(DbContextOptions<ExpensesContext> options) 
            : base(options)
        { }
        public virtual DbSet<ExpensesType> ExpensesType { get; set; }

        public virtual DbSet<ExpensesEntity> ExpensesEntity { get; set; }

        public virtual DbSet<ExpensesMonthly> ExpensesMonthly { get; set; }

        public virtual DbSet<Country> Country { get; set; }

        public virtual DbSet<EmailConfigEntity> EmailConfig { get; set; }

    }
}


