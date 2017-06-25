$('#btn').click(function () {
  $("#tableBody").html('');
  var word = $("#input").val();
  movieName = encodeURI(word);
  var key = $("#key").val();

  $.ajax("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&page=1&query=" + movieName + "&page=1&include_adult=false")
    .done(function (response) {
      movie = response;
      // var imgUrl = 'http://image.tmdb.org/t/p/w500/';
      var objects = movie.total_results;

      for (var i = 0; i < objects; i++) {
        var $container = $('<tr />');
        $('#tableBody').append($container)
        $container.append($('<td/>').text(i + 1));
        $container.append($('<td />').append($("<a />").text(movie.results[i].title).attr("onclick","window.open('page2.html','popup','width=600,height=600');").attr('target','popup')));
        $container.append($('<td />').text(movie.results[i].original_title));
        $container.append($('<td />').text(movie.results[i].release_date));

      };
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = jqxhr.responseText + ", " + error;
      alert("Request Failed: " + err);
    });
});