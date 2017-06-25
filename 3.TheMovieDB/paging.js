(function paging() {
var word = $("#input").val();
movieName = encodeURI(word);
var key = $("#key").val();
$.ajax("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&page=1&query=" + movieName + "&page=1&include_adult=false")
.done(function (response){
  var movie = response;
  var objJson = movie.total_results;

var current_page = 1;
var records_per_page = 3;

  var objJson= [response];
            function prevPage() {
                if (current_page > 1) {
                    current_page--;
                    changePage(current_page);
                }
            }
            function nextPage() {
                if (current_page < numPages()) {
                    current_page++;
                    changePage(current_page);
                }
            }

            function changePage(page) {
                var btn_next = document.getElementById("btn_next");
                var btn_prev = document.getElementById("btn_prev");
                var listing_table = document.getElementById("listingTable");
                var page_span = document.getElementById("page");

                // Validate page
                if (page < 1) page = 1;
                if (page > numPages()) page = numPages();

                listing_table.innerHTML = "";

                for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
                    listing_table.innerHTML += objJson[i].adName + "<br>";
                }
                page_span.innerHTML = page + "/" + numPages();

                if (page == 1) {
                    btn_prev.style.visibility = "hidden";
                } else {
                    btn_prev.style.visibility = "visible";
                }

                if (page == numPages()) {
                    btn_next.style.visibility = "hidden";
                } else {
                    btn_next.style.visibility = "visible";
                }
            }

            function numPages() {
                return Math.ceil(objJson.results / records_per_page);
            }

            window.onload = function () {
                changePage(1);
            };
});
});


