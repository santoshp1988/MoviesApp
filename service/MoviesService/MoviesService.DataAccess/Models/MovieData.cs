using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesService.DataAccess.Models
{
    public class MovieData
    {
        public string Language { get; set; }
        public string Location { get; set; }
        public string Plot { get; set; }
        public string Poster { get; set; }
        public string[] SoundEffects { get; set; }
        public string[] Stills { get; set; }
        public string Title { get; set; }
        public string ImdbId { get; set; }
        public string ListingType { get; set; }
        public string ImdbRating { get; set; }
    }

    public class MovieDataWrapper
    {
        public List<MovieData> movies;
    }
}
