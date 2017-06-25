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
        "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        var movies = response;
        // console.log("SUCCESS");
        // console.log(movies);
        var objects = movies.results.length;
        var pages = movies.total_pages;
        if(movies.total_results<1){
            alert("No matches")
            return;
        }


        for (var i = 0; i < objects; i++) {
            var $container = $('<tr />');
            $('#tableBody').append($container);
            // $("#tableBody tr:first-chield").addClass('someClass');
            $container.append($('<td />').attr("id", movies.results[i].id).append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('secondPage.html','popup','width=600,height=600');").attr('target', 'popup')));
            $container.append($('<td />').text(movies.results[i].original_title));
            $container.append($('<td />').text(movies.results[i].release_date));
        };

        for (var i = 1; i < pages; i++) {

            var $page = $('<a \>').text(i).addClass('pageNumb');
            $("#pagesContainer").append($page);

            if (i > 4) {
                $page.addClass('hide')
            };
        };

    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });


    //PAGE SWAPING 
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
                $('#tableBody').append($secondContainer);
                $secondContainer.append($('<td />').append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('secondPage.html','popup','width=600,height=600');").attr('target', 'popup')));
                $secondContainer.append($('<td />').text(movies.results[i].original_title));
                $secondContainer.append($('<td />').text(movies.results[i].release_date));
            };

        }).fail(function (jqxhr, textStatus, error) {
            var err = jqxhr.responseText + ", " + error;
            alert("Request Failed: " + err);
        });
    });
});

$(document).on('click', "td", function external() {
    var movieid = $(this).attr("id");
    var key = $("#key").val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.themoviedb.org/3/movie/"+movieid+"?api_key="+key,
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
    $.ajax(settings).done(function (response) {
        var movie = response;
        $("#second").text(movie.original_title);


    })
});

