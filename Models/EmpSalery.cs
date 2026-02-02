using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    public class EmpSalery
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SalId { get; init; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public int Salery { get; set; }

        [ForeignKey("Students.EmpId")]
        public int EmpId { get; init; }

        override public string ToString()
        {
            return $"[DB] SalId = {SalId}; EmpId = {EmpId}; Salery = {Salery}";
        }
    }
}
