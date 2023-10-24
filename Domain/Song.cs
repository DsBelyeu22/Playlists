

namespace Domain
{
    public class Song
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int ArtistId { get; set; }
        public int SpotifyId { get; set; }
        public string SpotifyUrl { get; set; }
        public string SpotifyEmbedUrl { get; set; }
        public int SongLength { get; set; }
        public string Genre { get; set; }
        public string CoverArt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}