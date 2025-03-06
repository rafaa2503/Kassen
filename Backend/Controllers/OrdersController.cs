using Backend.Models; // ✅ Correct import
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(AppDbContext context, ILogger<OrdersController> logger) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly ILogger<OrdersController> _logger = logger;

        // ✅ GET: Retrieve all orders
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var orders = await _context.Orders.OrderBy(o => o.Id).ToListAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving orders.");
                return StatusCode(500, "Internal server error.");
            }
        }

        // ✅ POST: Create a new order (1-100 rotation)
        [HttpPost]
        public async Task<IActionResult> CreateOrder()
        {
            try
            {
                int nextOrderNumber = await GetNextOrderNumber();

                var newOrder = new Order
                {
                    Id = nextOrderNumber,
                    Status = "New",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                _logger.LogInformation("New order created with ID {OrderId}.", newOrder.Id);

                return CreatedAtAction(nameof(GetOrders), new { id = newOrder.Id }, newOrder);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order.");
                return StatusCode(500, "Internal server error.");
            }
        }

        // ✅ Private method to get the next order number (1-100 rotation)
        private async Task<int> GetNextOrderNumber()
        {
            var maxOrder = await _context.Orders.OrderByDescending(o => o.Id).FirstOrDefaultAsync();
            return maxOrder == null || maxOrder.Id >= 100 ? 1 : maxOrder.Id + 1;
        }
    }
}
