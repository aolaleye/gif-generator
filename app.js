// Initial array of movies
var topics = ["movies", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
}


// Function for displaying movie data
function renderButtons() {

// Deletes the movies prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();
// Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function(event) {
    event.preventDefault();
// This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

// The movie from the textbox is then added to our array
    movies.push(movie);

// Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
