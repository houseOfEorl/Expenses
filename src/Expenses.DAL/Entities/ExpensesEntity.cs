using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Expenses.DAL.Entities
{
    [Table("Expenses")]
    public class ExpensesEntity
    {
        [Key]
        public int ExpensesID { get; set; }

        public string Name { get; set; }

        public string CreditOrDebit { get; set; }

        public bool? isPaid { get; set; }


        public DateTime? ExpenseDate { get; set; }

        public Decimal Amount { get; set; }

        public int CountryID { get; set; }

        public bool? isCreditCard { get; set; }

        public DateTime? CreatedDate { get; set; }

        public ExpensesType Type { get; set; }
        public int ExpensesTypeID { get; set; }
    }
}
