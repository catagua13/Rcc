using System.ComponentModel.DataAnnotations;

namespace ChatApp.ViewModels
{
    public class Login

    {

        [Key]
        [Required]
        [DataType(DataType.Text)]
        public string UserName { get; set; }

        

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
