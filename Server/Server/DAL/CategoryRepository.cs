using Server.Models;
using Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Server.DAL
{
    public class CategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}