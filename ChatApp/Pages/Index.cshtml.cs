using ChatApp.ViewModels;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace ChatApp.Pages
{

    public class IndexModel : PageModel
    {

        private readonly ChatApp.Data.DataContext _context;
        
        public IndexModel(ChatApp.Data.DataContext context)
        {
            _context = context;
        }

        public IList<Rcc> Rcc { get; set; }    

        public async Task OnGetAsync()
        {
            Rcc = await _context.Rccs.ToListAsync();
        }

        
        
    }
}