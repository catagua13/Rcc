using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ChatApp.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace ChatApp.Pages
{
    public class LoginModel : PageModel
    {
        private readonly SignInManager<IdentityUser> _signInManager;

        [BindProperty]
        public Login Model { get; set; }



        public LoginModel(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        //por convencion viene aqui cuando se esta llamando con el metodo get
        public void OnGet()
        {
        }

        //por convencion viene aqui cuando se esta llamando con el metodo post
        public async Task<IActionResult> OnPostAsync(string ?returnUrl1 = null)
        {
            if (ModelState.IsValid)
            {
                var IdentityResult = await NewMethod();
                if (IdentityResult.Succeeded)
                {
                    if (returnUrl1 == null || returnUrl1 == "/")
                    {
                        return RedirectToPage("Index");
                    }
                    else
                    {
                        return RedirectToPage(returnUrl1);

                    }
                }
                ModelState.AddModelError("", "Incorrect username or password");
            }
            return Page();
        }

        private Task<Microsoft.AspNetCore.Identity.SignInResult> NewMethod()
        {
            return _signInManager.PasswordSignInAsync(Model.UserName, Model.Password, Model.RememberMe, false);
        }
    }


}
