using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL.Entities
{
    public class ExpensesMonthly
    {

        [Key]
        public int ExpensesMonthlyID { get; set; }

        public string Name { get; set; }

        public string CreditOrDebit { get; set; }

        public Decimal Amount { get; set; }

        public int ExpensesTypeID { get; set; }

        public ExpensesType Type { get; set; }

        public int CountryID { get; set; }
    }
}
