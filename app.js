
var topics = ["movies", "sports", "weather", "animals", "plants", "books", "music", "planets", "holidays", "food", "presidents", "clothing"];

function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10"; //<--- limits gifs to 10

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        $("#gifs-area").empty();

        for (var i = 0; i < results.length; i++) {

            var singleGif = $("<div class='col-3 mb-5'><img src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still' class='gif'><h6>Rating: " + results[i].rating.toUpperCase() + "</h6></div>");

            $("#gifs-area").prepend(singleGif); //<--- prints gifs

            $('html, body').animate({
                scrollTop: $("#gifs-area").offset().top
              }, 1000);

        }

        //on click, toggles data-state from still to animate and vice versa
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
        
            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        }) 
    });
}


function createButtons() {
    $(".created-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("topic btn btn-secondary col-2");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $(".created-buttons").append(button);
    }
}

$("#add-button").on("click", function(event) {
    event.preventDefault();
    if ($("#user-input").val() === '') {
        $("#add-button").preventDefault();
    }
    var newTopic = $("#user-input").val().trim();
    topics.push(newTopic);
    createButtons();
    $("#user-input").val('');
});

$(document).on("click", ".topic", displayGifs);

createButtons();

