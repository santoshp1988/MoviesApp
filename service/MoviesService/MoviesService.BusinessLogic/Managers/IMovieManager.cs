using MoviesService.BusinessLogic.Models;
using System.Collections.Generic;

namespace MoviesService.BusinessLogic.Managers
{
    public interface IMovieManager
    {
        MovieDetail GetMovie(string id);
        IEnumerable<Movie> GetMovies();
    }
}