using System.ComponentModel.DataAnnotations;
namespace ChatApp.ViewModels
{
    public class Rcc
    {
        [Key]
        public int RccId { get; set; }
        public int RccDetailId { get; set; }

        [Display(Name ="Fecha")]
        [DataType(DataType.Date)]
        public string? RCCDate { get; set; }
        
        [Display(Name = "Cuenta")]
        public int account { get; set; }


        [Display(Name ="Total Equipo")]
        public decimal EquipmentTotal { get; set; }

        [Display(Name ="Total Servicio")]
        public decimal ServiceTotal { get; set; }

        [Display(Name = "Total empresa")]
        public decimal CompanyTotal { get; set; }

        public ICollection<RccDetail> RccDetails { get; set; }

    }
}
