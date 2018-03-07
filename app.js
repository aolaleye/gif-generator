// Initial array of topics
var topics = ["movies", "sports", "weather", "animals", "plants", "books", "music", "presidents", "holidays"];

// displayMovieInfo function re-creates the HTML to display the appropriate content
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

            var singleImage = $("<div><img src='" + results[i].images.fixed_height_still.url + "' class='static'><img src='" + results[i].images.fixed_height.url + "' style='display: none;' class='moving'></div>");

            gifDiv.prepend(singleImage);
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


// Function for displaying movie data
function createButtons() {

// Deletes the topics prior to adding new topics
// (this is necessary otherwise you will have repeat buttons)
$(".created-buttons").empty();
// Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("topic");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the .created-buttons div
        $(".created-buttons").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-button").on("click", function(event) {
    event.preventDefault();
// This line of code will grab the input from the textbox
    var newTopic = $("#user-input").val().trim();

// The movie from the textbox is then added to our array
    topics.push(newTopic);

// Calling createButtons which handles the processing of our movie array
    createButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".topic", displayGifs);

// Calling the createButtons function to display the intial buttons
createButtons();
