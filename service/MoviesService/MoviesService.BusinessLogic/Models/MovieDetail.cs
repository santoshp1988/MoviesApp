using System;
using System.Collections.Generic;
using System.Text;

namespace MoviesService.BusinessLogic.Models
{
    public class MovieDetail : Movie
    {
        public string Plot { get; set; }
        public string[] SoundEffects { get; set; }
        public string[] Stills { get; set; }
        public string ListingType { get; set; }
    }
}
