using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.Models;

namespace api.Controllers // Adjust namespace as necessary
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categories>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categories>> GetCategories(int id)
        {
            var categories = await _context.Categories.FindAsync(id);

            if (categories == null)
            {
                return NotFound();
            }

            return categories;
        }

        private bool CategoriesExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}