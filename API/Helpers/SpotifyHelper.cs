using SpotifyAPI.Web;

namespace API.Helpers
{
    public class SpotifyHelper
    {
        private readonly SpotifyClientConfig spotifyConfig = SpotifyClientConfig.CreateDefault().WithAuthenticator(new ClientCredentialsAuthenticator("3b3a21e8444e46808f7bbacb9f648fcb", "7c7907d6673f4b778657040a5fe9a2a3"));


        private SpotifyClient spotifyClient;


        public SpotifyHelper()
        {
        }

        public async  Task<SearchResponse> Search(string query)
        {

            Console.WriteLine("Yo");
            spotifyClient = new SpotifyClient(spotifyConfig);
            Console.WriteLine("Yo");
            var searchRequest = new SearchRequest(SearchRequest.Types.Track, query);
            Console.WriteLine("Yo");
            var tracks =  await spotifyClient.Search.Item(searchRequest); // This is where my API request is stalling. need to check if there are issues with Spotify NuGet Package. Maybe Spotfiy dev account has config issues. M
            Console.WriteLine("Yo");
            return  tracks;

        }

        public Task<FullTrack> GetTrack(string trackId)
        {
            spotifyClient = new SpotifyClient(this.spotifyConfig);
            var track = spotifyClient.Tracks.Get(trackId);
            return track;
        }


    }
}