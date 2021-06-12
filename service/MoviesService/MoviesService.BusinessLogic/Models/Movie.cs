using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesService.BusinessLogic.Models
{
    public class Movie
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Poster { get; set; }
        public decimal Rating { get; set; }
        public string Language { get; set; }
        public string Location { get; set; }
    }
}
