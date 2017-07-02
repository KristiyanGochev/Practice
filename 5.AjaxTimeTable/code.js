$('#buton').click(function () {

    var $href = $("#href").val();

    if (!$href) {
        $href = "No data was entered"
    };

    $.ajax({
        async: true,
        crossDomain: true,
        headers: {},
        url: $href,
        method: 'GET',
        start_time: new Date().getTime(),
        complete: function (data) {
            var $container = $("<tr />")
            var $url = $("<th />").text($href);
            var $response = $("<th />").text((new Date().getTime() - this.start_time) + ' ms');
            $container.append($url).append($response);
            $("#tbody").append($container);

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        console.log("Request Failed: " + err);
    });
});


$('#reset').click(function () {
    $("#tbody").empty();
});

