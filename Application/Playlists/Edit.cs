using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Playlists
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Playlist Playlist { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }



            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var playlist = await _context.Playlists.FindAsync(request.Playlist.Id);
                //playlist.UpdatedAt = DateTime.Now;
                //playlist.Name = request.Playlist.Name ?? playlist.Name;
                // Going to add AutoMapper so I can remove this code pattern. It's tidious if my objects have several properties

                if (playlist != null)
                {
                    _mapper.Map(request.Playlist, playlist);
                    playlist.UpdatedAt = DateTime.Now;
                    await _context.SaveChangesAsync();

                }

                // autoMapper is taking all props from request.Playlist to update the props in playlist which comes from the database






            }
        }
    }
}
