using System.ComponentModel.DataAnnotations;

namespace ChatApp.ViewModels
{
    public class Register
    {
        [Required]
        [DataType(DataType.Text)]
        public string UserName { get; set; }


        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage ="Password and confirmation did not match")]
        public string ConfirmPassword { get; set; }
    }
}
