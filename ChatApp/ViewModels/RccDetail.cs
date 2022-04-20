using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace ChatApp.ViewModels
{
    public class RccDetail
    {
        [Key]
        public int RccDetailId { get; set; }       

        public Guid CollaboratorId { get; set; }

        [Required]
        [Display(Name ="Linea")]
        [StringLength(10, ErrorMessage ="Debe contener 10 nùmeros")]
        [DataType(DataType.PhoneNumber)]
        public string? Phoneline { get; set; }

          [Display(Name ="Valor Servicio")]
        public int ValueServices { get; set; }

        [Display(Name = "Valor Equipo")]
        [Required]
        public int ValueDevices { get; set; }

        public int Fee { get; set; }


        public int TotalFee { get; set; }

        [Display(Name = "Descipcion")]
        public string? Description { get; set; }

        [Display(Name = "Pagado Por: ")]
        [Required]
        public bool PaidBy { get; set; }

        public decimal Subsidy { get; set; }

        public short Group { get; set; }

        public short CICollaborator { get; set; }

        
    }
}
