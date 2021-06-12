using MoviesService.DataAccess.Models;
using System.Collections.Generic;

namespace MoviesService.DataAccess.Managers
{
    public interface IMovieDataManager
    {
        IEnumerable<MovieData> GetAllMovies();
    }
}