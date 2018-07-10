using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DXApplication1.Models
{
    public class MovieData {

        public int Vote_count { get; set; }

        public int Id { get; set; }

        public string OriginalTitle { get; set; }

        public bool Video { get; set; }      

        public string Title { get; set; }

        public long Popularity { get; set; }

        public string Poster_path { get; set; }

        public string Original_language { get; set; }

        public string Original_title { get; set; }       

        public string Overview { get; set; }

    }
}
