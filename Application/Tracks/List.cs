using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Tracks
{
    public class List
    {

        public class Query : IRequest<List<Song>>
        {
         


        }

        //public class Handler : IRequestHandler<Query, List<FullTrack>>
        //{
        //    private readonly ILogger<List> _logger;
        //    private readonly SearchResponse searchResponse;
        //    private readonly DataContext dataContext;  

        //    public Handler(SearchResponse searchResponse, DataContext context, ILogger<List> logger)
        //    {
        //        _logger = logger;
        //        this.searchResponse = searchResponse;
        //    }

        //    public  Task<List<FullTrack>> Handle(Query request, CancellationToken cancellationToken)
        //    {
        //        var tracks = searchResponse.Tracks;
        //        return tracks;

        //    }
        //}



        public class Handler : IRequestHandler<Query, List<Song>>
        {
            // need to inject DB Context contructor so we can return a list of Songs from a database
            private readonly DataContext _context;
            private readonly ILogger _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
                _logger = logger;   

            }



            public async Task<List<Song>> Handle(Query request, CancellationToken cancellationToken)
            {
                // needs to be async because it is returning a Task
                // need to return a list of type FullTrack from the searchResponse object
                return await _context.Songs.ToListAsync();
            }





        }
    }
}