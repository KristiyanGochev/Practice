$('#buton').click(function () {

    var $href = $("#href").val();

 $.ajax({
        async: true,
        crossDomain: true,
        headers: {},
        url: $href,
        method: 'GET',
        start_time: new Date().getTime(),
        complete: function(data) {
           $("#container").text('This request took '+(new Date().getTime() - this.start_time)+' ms');
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
       console.log("Request Failed: " + err);
    });
});