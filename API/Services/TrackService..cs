using API.Helpers;
using SpotifyAPI.Web;

namespace API.Services
{
    public class TrackService
    {

        private SpotifyHelper spotify = new SpotifyHelper();



        public async Task<SearchResponse> SearchSpotifyTracks(string q)
        {
            Console.WriteLine("Make it Here????");
            var  tracks = await spotify.Search(q);
            Console.WriteLine( "Make it Here????");

            return tracks;
        }
    }
}