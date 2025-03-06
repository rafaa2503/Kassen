using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;

namespace Backend.Services // ✅ Ensure namespace is set correctly
{
    [Route("ws/kitchen")]
    [ApiController]
    public class KitchenService : ControllerBase
    {
        private static readonly List<WebSocket> Clients = [];

        [HttpGet]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                Clients.Add(socket);

                while (socket.State == WebSocketState.Open)
                {
                    await Task.Delay(1000);
                }

                Clients.Remove(socket);
            }
        }

        public static async Task SendOrderUpdate(string message)
        {
            var buffer = Encoding.UTF8.GetBytes(message);
            foreach (var client in Clients)
            {
                await client.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
