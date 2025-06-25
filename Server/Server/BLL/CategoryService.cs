using Server.Models;
using Server.DAL;

namespace Server.BLL
{
    public class CategoryService
    {
        private readonly CategoryRepository _repo;
        public CategoryService(CategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CategoryDto>> GetCategoryNamesAsync()
        {
            var categories = await _repo.GetAllAsync();
            return categories
                .Select(c => new CategoryDto { Id = c.Id, Name = c.Name })
                .ToList();
        }
    }
}