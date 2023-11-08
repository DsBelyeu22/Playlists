using Domain;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class Create
    {

        public class Command : IRequest
        {
            public Playlist Playlist { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {





                request.Playlist.CreatedAt = DateTime.Now;
                request.Playlist.UpdatedAt = DateTime.Now;

                





                var newPlaylist =  _context.Playlists.Add(request.Playlist);
                Console.WriteLine(newPlaylist);
                await _context.SaveChangesAsync();
                
                
            }
        }

    }
}
