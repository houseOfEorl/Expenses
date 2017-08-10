using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Expenses.DAL.Entities
{
    public class EmailConfigEntity
    {
        [Key]
        public int EmailConfigID { get; set; }

        public DateTime LastLoadDate { get; set; }
    }
}
