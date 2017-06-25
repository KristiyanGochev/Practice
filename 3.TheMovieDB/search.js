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
        console.log(movies);
        var objects = movies.results.length;
        var pages = movies.total_pages;


        for (var i = 0; i < objects; i++) {
            var $container = $('<tr />').addClass("first");
            $('#tableBody').append($container)
            $container.append($('<td />').append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('page2.html','popup','width=600,height=600');").attr('target', 'popup')));
            $container.append($('<td />').text(movies.results[i].original_title));
            $container.append($('<td />').text(movies.results[i].release_date));
        };

        for (var i = 1; i < pages; i++) {
            var $page = $('<a \>').text(i).addClass('pageNumb').attr("value",i);
            $("#pagesContainer").append($page);

            if (i > 4) {
                $page.addClass('hide')
            };
        };

    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });





    $(document).on('click', "a.pageNumb", function() {
    $("#tableBody").html('');
    var word = $("#input").val();
    var key = $("#key").val();
    var pageNumb = $(this).text();
    var page = parseInt(pageNumb);
    var settings = {
        "url": "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + word + "&page="+ page +"&include_adult=false",
    }
    $.ajax(settings).done(function (response) {
        var movies = response;
        console.log(movies);
        var objects = movies.results.length;

        for (var i = 0; i < objects; i++) {
            var $secondContainer = $('<tr />').addClass('second')
            $('#tableBody').append($secondContainer)
            $secondContainer.append($('<td />').append($("<a />").text(movies.results[i].title).attr("onclick", "window.open('page2.html','popup','width=600,height=600');").attr('target', 'popup')));
            $secondContainer.append($('<td />').text(movies.results[i].original_title));
            $secondContainer.append($('<td />').text(movies.results[i].release_date));


        };
       
    })
});
});


