using Microsoft.AspNetCore.Mvc;
using MoviesService.BusinessLogic.Managers;
using MoviesService.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MoviesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private IMovieManager _movieManager;
        public MoviesController(IMovieManager movieManager)
        {
            _movieManager = movieManager;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var movies = _movieManager.GetMovies();

            if(movies == null)
            {
                return NotFound("No data found");
            }

            return Ok(movies);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid movie id");
            }

            var movie = _movieManager.GetMovie(id);

            if (movie == null)
            {
                return NotFound("No movie found");
            }

            return Ok(movie);
        }
    }
}
