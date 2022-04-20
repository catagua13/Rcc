#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ChatApp.Data;
using ChatApp.ViewModels;

namespace ChatApp.Pages
{
    public class RccDetailListModel : PageModel
    {
        private readonly ChatApp.Data.DataContext _context;

        public RccDetailListModel(ChatApp.Data.DataContext context)
        {
            _context = context;
        }

        public IList<RccDetail> RccDetail { get;set; }

        public async Task OnGetAsync()
        {
            RccDetail = await _context.RccDetails.ToListAsync();
        }
    }
}
