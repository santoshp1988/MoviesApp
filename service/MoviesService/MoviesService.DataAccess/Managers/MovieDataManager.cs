using MoviesService.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MoviesService.DataAccess.Managers
{
    public class MovieDataManager : IMovieDataManager
    {
        public IEnumerable<MovieData> GetAllMovies()
        {
            try
            {
                var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "movies.json");
                using (var reader = new StreamReader(filePath))
                {
                    var fileData = reader.ReadToEnd();
                    var movieData = JsonConvert.DeserializeObject<MovieDataWrapper>(fileData);
                    return movieData.movies;

                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching movies data");
            }

        }
    }
}
