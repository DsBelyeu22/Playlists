using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PlaylistsController : BaseApiController
    {
        private readonly DataContext _context;
        public PlaylistsController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Playlist>>> GetPlaylists()
        {
            return await _context.Playlists.ToListAsync();
        }


    }
}