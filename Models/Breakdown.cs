using System;
using System.ComponentModel.DataAnnotations;

namespace RNR.Models
{
    public class Breakdown
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string BreakdownReference { get; set; }

        [Required]
        [StringLength(100)]
        public string CompanyName { get; set; }

        [Required]
        [StringLength(100)]
        public string DriverName { get; set; }

        [Required]
        [StringLength(50)]
        public string RegistrationNumber { get; set; }

        [Required]
        public DateTime BreakdownDate { get; set; }
    }
}
