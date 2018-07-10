$('#btn').click(function () {
    $("#tableBody").empty();
    var word = $("#input").val();
    var key = $("#key").val();
    var $pageContainer = $("#pagesContainer");
    $pageContainer.html("");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + word + "&page=1&include_adult=false",
        "method": "GET",
        "headers": {},
    }

    $.ajax(settings).done(function (response) {
        var movies = response;
        // console.log("SUCCESS");
        // console.log(movies);
        var objects = movies.results.length;
        var pages = movies.total_pages;
        if (movies.total_results < 1) {
            alert("No matches")
            return;
        }


        for (var i = 0; i < objects; i++) {
            var $container = $('<tr />');
            $('#tableBody')
                .append($container);
            $container
                .append($('<td />')
                    .attr("id", movies.results[i].id)
                    .append($("<a />")
                        .text(movies.results[i].title)));
            $container
                .append($('<td />')
                    .text(movies.results[i].original_title));
            $container
                .append($('<td />')
                    .text(movies.results[i].release_date));
        };

        for (var i = 1; i < pages; i++) {

            var $page = $('<a \>').text(i).addClass('pageNumb');
            $("#pagesContainer").append($page);

            //     if (i > 4) {
            //         $page.addClass('hide')
            //     };
        };

    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });


    //Swaping pages
    $(document).on('click', "a.pageNumb", function () {
        $("#tableBody").empty();
        var word = $("#input").val();
        var key = $("#key").val();
        var pageNumb = $(this).text();
        var page = parseInt(pageNumb);
        var settings = {
            "url": "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + word + "&page=" + page + "&include_adult=false",
        }
        $.ajax(settings).done(function (response) {
            var movies = response;
            // console.log("SUCCESS");
            // console.log(movies);
            var objects = movies.results.length;

            for (var i = 0; i < objects; i++) {
                var $secondContainer = $('<tr />');
                $('#tableBody')
                    .append($secondContainer);
                $secondContainer
                    .append($('<td />')
                        .attr("id", movies.results[i].id)
                        .append($("<a />")
                            .text(movies.results[i].title)));
                $secondContainer
                    .append($('<td />')
                        .text(movies.results[i].original_title));
                $secondContainer
                    .append($('<td />')
                        .text(movies.results[i].release_date));
            };

        }).fail(function (jqxhr, textStatus, error) {
            var err = jqxhr.responseText + ", " + error;
            alert("Request Failed: " + err);
        });
    });
});

//POPUP WINDOW
$(document).on('click', "td", function () {
    var movieid = $(this).attr("id");
    var key = $("#key").val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.themoviedb.org/3/movie/" + movieid + "?api_key=" + key,
        "method": "GET",
        "headers": {},
    }
    $.ajax(settings).done(function (response) {
        $("#detailsContainer").empty();
        var movie = response;
        var imgUrl = 'http://image.tmdb.org/t/p/w185/';
        var $modal = $('#myModal');
        var $span = $(".close")[0];
        //TO DO // [0].name
        var details = [movie.title, movie.original_title, movie.release_date, "" || movie.spoken_languages, movie.production_countries, movie.overview];
        var currentImage = movie.poster_path;
        console.log(movie);
        $("#image").attr("src", imgUrl + currentImage);

        appendLiElements();

        $('li').each(function (i) {
            $(this).append(details[i]);

        });
        $modal.css("display", "block");
        $span.onclick = function () {
            $modal.css("display", "none");
        };

        window.onclick = function (event) {
            if (event.target == $modal) {
                modal.css("display", "none");
            };
        };
    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });


    function appendLiElements() {
        var $listcontainer = $("<ul />")
        $("#detailsContainer")
            .append($listcontainer);
        $listcontainer
            .append($("<li />")
                .text("Title:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight":"bold"}));
        $listcontainer
            .append($("<li />")
                .text("Original Title:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight":"bold"}));
        $listcontainer
            .append($("<li />")
                .text("Release Date:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight":"bold"}));
        $listcontainer
            .append($("<li />")
                .text("Spoken Languages:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight": "bold"}));
        $listcontainer
            .append($("<li />")
                .text("Production Countries:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight":"bold"}));
        $listcontainer
            .append($("<li />")
                .text("Overview:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0").css({"font-weight":"bold"}));
    };
});

