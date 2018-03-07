
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
            
            // var rating = $("<h6>").text("Rating: " + results[i].rating.toUpperCase()); //adds rating

            var singleGif = $("<div class='col-3 static'><h6>Rating: " + results[i].rating.toUpperCase() + "</h6><img src='" + results[i].images.fixed_height_still.url + "'></div><div class='col-3 moving' style='display: none;'><h6>Rating: " + results[i].rating.toUpperCase() + "</h6><img src='" + results[i].images.fixed_height.url + "'></div>");

            // singleGif.prepend(rating);

            $("#gifs-area").prepend(singleGif);
            
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
