using Domain;


namespace Persistence
{
    public class Seed
    {

        public static async Task SeedData(DataContext context)
        {
            if (context.Playlists.Any()) return;
            var playlists = new List<Playlist>

            {
               new Playlist
               {
                  Name = "Driving",
                  UserId = 1,
                  CreatedAt = DateTime.Now,
                  UpdatedAt = DateTime.Now,
               },
               new Playlist
               {
               Name = "Workout",
               UserId = 2,
               CreatedAt = DateTime.Now,
               UpdatedAt = DateTime.Now,


               },
               new Playlist
               {   Name = "Study Music",
                   UserId = 3,
                   CreatedAt = DateTime.Now,
                   UpdatedAt = DateTime.Now
               }
            };
            await context.Playlists.AddRangeAsync(playlists);  // -->> saves the range of Playlist objects into memory, doesn't do anything against the database
            await context.SaveChangesAsync(); // -->> This line saves the changes to the database

        }
    }
}
