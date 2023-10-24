using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TracksController : BaseApiController
    {
        private readonly DataContext _context;

        public TracksController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Song>>> GetSongs()
        {
            return await _context.Songs.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(Guid id)
        {
            return await _context.Songs.FindAsync(id);
        }
    }


}