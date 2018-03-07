
var topics = ["movies", "sports", "weather", "animals", "plants", "books", "music", "presidents", "holidays", "food"];

function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10"; //limits gifs to 10

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        $("#gifs-area").empty();

        for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='item'>");

            var rating = $("<p>").text("Rating: " + results[i].rating); //adds rating

            var singleGif = $("<div><img src='" + results[i].images.fixed_height_still.url + "' class='static'><img src='" + results[i].images.fixed_height.url + "' style='display: none;' class='moving'></div>");

            gifDiv.prepend(singleGif);
            gifDiv.prepend(rating);

            $("#gifs-area").prepend(gifDiv);
            
            $(".static").click(function() {
                $(".static").hide();
                $(".moving").show();
            })

            $(".moving").click(function() {
                $(".moving").hide();
                $(".static").show();
            })

        }
    });
}


function createButtons() {
    $(".created-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("topic btn btn-secondary");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $(".created-buttons").append(button);
    }
}

$("#add-button").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#user-input").val().trim();
    topics.push(newTopic);
    createButtons();
});


$(document).on("click", ".topic", displayGifs);

createButtons();
