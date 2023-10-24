namespace Domain
{


    public class PlaylistSong
    {
        public Guid Id { get; set; }
        public int SongId { get; set; }
        public int PlaylistId { get; set; }
    }
}