using Microsoft.AspNetCore.Mvc;
using Moq;
using MoviesService.BusinessLogic.Managers;
using MoviesService.BusinessLogic.Models;
using MoviesService.Controllers;
using MoviesService.DataAccess.Managers;
using MoviesService.DataAccess.Models;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace MoviesService.Tests
{
    public class MovieTests
    {
        private IMovieDataManager _mockMovieDataManager;
        private MoviesController _moviesController;
        public MovieTests()
        {
            var mockMovieDataManager = new Mock<IMovieDataManager>();
            mockMovieDataManager.Setup(x => x.GetAllMovies()).Returns(() => new List<MovieData> {
            new MovieData { ImdbId = "1234", Title="Some Title"},
            new MovieData { ImdbId = "4567", Title="Some other Title"},
            });

            _mockMovieDataManager = mockMovieDataManager.Object;
            var movieManager = new MovieManager(_mockMovieDataManager);
            _moviesController = new MoviesController(movieManager);
        }

        [Fact]
        public void Get_is_successful()
        {
            var okResult = _moviesController.Get();
            Assert.IsType<OkObjectResult>(okResult);
        }
        [Fact]
        public void Get_ReturnsAllItems()
        {
            var okResult = _moviesController.Get() as OkObjectResult;
            var items = Assert.IsAssignableFrom<IEnumerable<Movie>>(okResult.Value);
            Assert.Equal(2, items.Count());
        }

        [Fact]
        public void Get_by_id_is_successful()
        {
            var okResult = _moviesController.Get("4567");
            Assert.IsType<OkObjectResult>(okResult);
        }

        [Fact]
        public void Get_by_id_gives_correct_result()
        {
            var okResult = _moviesController.Get("4567") as OkObjectResult;
            var movie = Assert.IsType<MovieDetail>(okResult.Value);
            Assert.Equal("4567", movie.Id);
        }

        [Fact]
        public void Get_by_id_gives_notfound()
        {
            var okResult = _moviesController.Get("9685");
            Assert.IsType<NotFoundObjectResult>(okResult);
        }
    }
}
