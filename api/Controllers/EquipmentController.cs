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
    public class EquipmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EquipmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Equipment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetEquipments()
        {
            return await _context.Equipments.ToListAsync();
        }

        // GET: api/Equipment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> GetEquipment(int id)
        {
            var equipment = await _context.Equipments.FindAsync(id);

            if (equipment == null)
            {
                return NotFound();
            }

            return equipment;
        }

        // POST: api/Equipment
        [HttpPost]
        public async Task<ActionResult<Equipment>> PostEquipment(Equipment equipment)
        {
            // Validate model
            if (equipment == null)
            {
                return BadRequest("Equipment is null.");
            }

            // Additional validation if needed
            if (string.IsNullOrEmpty(equipment.Name) || equipment.Quantity <= 0)
            {
                return BadRequest("Invalid equipment data.");
            }

            _context.Equipments.Add(equipment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipment), new { id = equipment.Id }, equipment);
        }

        // PUT: api/Equipment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipment(int id, Equipment equipment)
        {
            if (id != equipment.Id)
            {
                return BadRequest();
            }

            _context.Entry(equipment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Equipment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var equipment = await _context.Equipments.FindAsync(id);
            if (equipment == null)
            {
                return NotFound();
            }

            _context.Equipments.Remove(equipment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EquipmentExists(int id)
        {
            return _context.Equipments.Any(e => e.Id == id);
        }
    }
}