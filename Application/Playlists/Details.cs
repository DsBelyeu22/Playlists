using Domain;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class Details
    {

        public class Query : IRequest<Playlist>
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Playlist>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Playlist> Handle (Query request, CancellationToken cancellation)
            {
                return await _context.Playlists.FindAsync(request.Id);
            }

        }

       
    }
}
