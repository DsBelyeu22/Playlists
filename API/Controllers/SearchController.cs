using Application.Tracks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using SpotifyAPI.Web;

namespace API.Controllers

{
    [ApiController]

    public class SearchController : BaseApiController
    {
        //private readonly IMediator _mediator;
        public SearchController()
        {
            //_mediator = mediator;

        }

        [HttpGet("/search")]
        //public async Task<ActionResult<List<Song>>> SearchTracks(string q)
        //{
        //    var searchResponse = new SearchResponse();
        //    var trackService = new TrackService();
        //    var tracks = await trackService.SearchSpotifyTracks(q);
        //    Console.WriteLine(tracks);
        //    //return await _mediator.Send(new List.Query(tracks));




        //    return Ok(tracks);
        //}

        public async Task<ActionResult<List>> SearchTracks(string q )
        {
            //var searchResponse = new SearchResponse();
            var trackService = new TrackService();
            Console.WriteLine("Made it Here??");
            var tracks = await trackService.SearchSpotifyTracks(q);
            Console.WriteLine(tracks);
            //var result =  await _mediator.Send(new List.Query());
            return Ok(tracks);
        }


    }


}

// All controllers are going to send http requests to Mediator Handlers in the application layer
// Mediator handler will process the logic and will return an object to the API controller
// API controller will return that object along with a http response
// CQRS Command Query Responsibility Segregation  ( separating command based on what they do. Either to query or read data or to modify data)
