using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Expenses.DAL.Entities
{
    [Table("BankType")]
    public class BankTypeEntity
    {
        [Key]
        public int BankTypeID { get; set; }
        public string Description { get; set; }
    }
}
