using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Playlists

{
    public class List
    {

        public class Query : IRequest<List<Playlist>>
        {
         


        }


        public class Handler : IRequestHandler<Query, List<Playlist>>
        {
            // need to inject DB Context contructor so we can return a list of Songs from a database
            private readonly DataContext _context;
            private readonly ILogger _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
                _logger = logger;   

            }



            public async Task<List<Playlist>> Handle(Query request, CancellationToken cancellationToken)
            {

                //try
                //{

                //    for (var i = 0; i < 10; i++)
                //    {
                //        cancellationToken.ThrowIfCancellationRequested();
                //        _logger.LogInformation($"Task {i} has completed");
                //    }
                //}
                //catch (Exception) 
                //{
                //    _logger.LogInformation("Task was cancelled");
                //}
                
                // needs to be async because it is returning a Task
                // need to return a list of type FullTrack from the searchResponse object
                return await _context.Playlists.ToListAsync();
            }





        }
    }
}