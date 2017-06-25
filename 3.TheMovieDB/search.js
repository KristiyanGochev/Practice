$('#btn').click(function () {
    $("#tableBody").html('');
    var word = $("#input").val();
    var key = $("#key").val();

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
        var objects = movies.results.length;
        var pages = movies.total_pages;


        for (var i = 0; i < objects; i++) {
            var $container = $('<tr />').addClass("first");
            $('#tableBody').append($container)
            $container.append($('<td/>').text(i + 1));
            $container.append($('<td />').append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('page2.html','popup','width=600,height=600');").attr('target', 'popup')));
            $container.append($('<td />').text(movies.results[i].original_title));
            $container.append($('<td />').text(movies.results[i].release_date));
        };

        for (var i = 1; i < pages; i++) {
            var $page = $('<a \>').text(i);
            $("#pagesContainer").append($page);
            if (i > 4) {
                page.addClass('hide')

            };
        };
        
    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });


    var page = 2;
    var page2 = {
        "url": "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + word + "&page=2&include_adult=false",
    }
    $.ajax(page2).done(function (response) {
        var movies = response;
        var objects = movies.results.length;

        for (var i = 0; i < objects; i++) {
            var $secondContainer = $('<tr />').addClass('second')
            $('#tableBody').append($secondContainer)
            $secondContainer.append($('<td/>').text(i + 1));
            $secondContainer.append($('<td />').append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('page2.html','popup','width=600,height=600');").attr('target', 'popup')));
            $secondContainer.append($('<td />').text(movies.results[i].original_title));
            $secondContainer.append($('<td />').text(movies.results[i].release_date));


        };
    })
    $('#next').click(function () {
        $(".first").addClass("hide")
        $('.hide').addClass('show');
    });

});
