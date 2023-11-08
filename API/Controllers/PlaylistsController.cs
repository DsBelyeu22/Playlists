using Application.Playlists;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PlaylistsController : BaseApiController
    {
       

        [HttpGet]
        public async Task<ActionResult<List<Playlist>>> GetPlaylists( CancellationToken ct)
        {
            var playlists = await Mediator.Send(new List.Query(), ct);
            Console.WriteLine(playlists);
            return playlists;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Playlist>> GetPlaylist(Guid id)
        {
            var playlist = await Mediator.Send(new Details.Query { Id = id});
            Console.WriteLine(playlist);
            return playlist;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlaylist(Playlist playlist)
        {
            
            await Mediator.Send(new Create.Command { Playlist = playlist });
            
            return Ok();
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPlaylist(Guid id, Playlist playlist)
        {

            playlist.Id = id;
            Console.WriteLine(id);
            await Mediator.Send(new Edit.Command { Playlist = playlist });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylist(Guid id)
        {

            //IActionResult does not require a type
            Console.WriteLine(id);
            await Mediator.Send(new Delete.Command { Id = id });

            return Ok();
            
        }

    }
}