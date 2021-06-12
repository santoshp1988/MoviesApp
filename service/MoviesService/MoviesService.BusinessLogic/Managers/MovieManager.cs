using MoviesService.BusinessLogic.Models;
using MoviesService.DataAccess.Managers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MoviesService.BusinessLogic.Managers
{
    public class MovieManager : IMovieManager
    {
        private IMovieDataManager _movieDataManager;
        public MovieManager(IMovieDataManager movieDataManager)
        {
            _movieDataManager = movieDataManager;
        }
        public IEnumerable<Movie> GetMovies()
        {
            return _movieDataManager.GetAllMovies()?.Select(movie => new Movie
            {
                Id = movie.ImdbId,
                Title = movie.Title,
                Poster = movie.Poster,
                Rating = Convert.ToDecimal(movie.ImdbRating),
                Language = movie.Language,
                Location = movie.Location
            });
        }

        public MovieDetail GetMovie(string id)
        {
            var movie = _movieDataManager.GetAllMovies()?.FirstOrDefault(movie => movie.ImdbId == id);

            if (movie == null) return null;

            return new MovieDetail
            {
                Id = movie.ImdbId,
                Title = movie.Title,
                Poster = movie.Poster,
                Rating = Convert.ToDecimal(movie.ImdbRating),
                Language = movie.Language,
                Location = movie.Location,
                ListingType = movie.ListingType,
                Plot = movie.Plot,
                SoundEffects = movie.SoundEffects,
                Stills = movie.Stills
            };
        }
    }
}
