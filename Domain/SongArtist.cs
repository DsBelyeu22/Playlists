namespace Domain
{
    public class SongArtist
    {
        public Guid Id { get; set; }
        public int SongId { get; set; }
        public int ArtistId { get; set; }
    }
}