using Microsoft.AspNetCore.Mvc;
using Server.BLL;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{

    [ApiController]
    [Route("api/Category")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _service;
        public CategoriesController(CategoryService service)
        {
            _service = service;
        }

        [HttpGet("GetCategory")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _service.GetCategoryNamesAsync();
            return Ok(categories);
        }
    }
}

