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

        public Decimal Amount { get; set; }

        public int CountryID { get; set; }

        public bool? isCreditCard { get; set; }

        private DateTime _createdDate;

        public ExpensesType Type { get; set; }

        public int ExpensesTypeID { get; set; }

        private DateTime _expenseDate;

        public DateTime CreatedDate
        {
            get
            {
                if (_createdDate == DateTime.MinValue)
                {
                    return DateTime.Now;
                }
                return _createdDate;
            }
            set { _createdDate = value; }
        }


        public DateTime ExpenseDate
        {
            get
            {
                var dt = _expenseDate;
                return dt;
            }
            set { _expenseDate = value; }
        }

    }
}
