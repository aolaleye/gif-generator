
var topics = ["movies", "sports", "weather", "animals", "plants", "books", "music", "planets", "holidays", "food", "presidents", "clothing"];

function displayGifs() {
    $(".load-more").remove();

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=100";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        $("#gifs-area").empty();

        var counter = 0;

        for (var i = 0; i < 12; i++) {

            counter += 1;

            var singleGif = $("<div class='col-3 mb-5'><img src='" + results[i].images.fixed_width_downsampled.url + "' data-still='" + results[i].images.fixed_width_still.url + "' data-animate='" + results[i].images.fixed_width_downsampled.url + "' data-state='animate' class='gif'></div>");

            $("#gifs-area").append(singleGif); //<--- prints gifs
        }

        

        $("#gifs-area").after('<div class="row mb-5"><button type="submit" class="btn btn-primary load-more col">Load More...</button></div>');

        //page moves to the gifs-area when a topic is clicked
        $('html, body').animate({
            scrollTop: $("#gifs-area").offset().top
        }, 1000);

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
        }); 

        $(".load-more").on("click", function() {
            var length = counter + 10;

            if (counter < results.length) {
                for (var i = counter; i < length; i++) {

                    counter += 1;

                    var singleGif = $("<div class='col-3 mb-5'><img src='" + results[i].images.fixed_width_downsampled.url + "' data-still='" + results[i].images.fixed_width_still.url + "' data-animate='" + results[i].images.fixed_width_downsampled.url + "' data-state='animate' class='gif'></div>");
        
                    $("#gifs-area").append(singleGif); //<--- prints gifs
                }
            } else {
                $(".load-more").text("No More Gifs");
            }
        }); 

    });
}

function trending() {
    $(".load-more").remove();

    var queryURL = "https://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit=12"; //<--- limits gifs to 12

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        $("#gifs-area").empty();

        for (var i = 0; i < results.length; i++) {

            var singleGif = $("<div class='col-3 mb-5'><img src='" + results[i].images.fixed_width_downsampled.url + "' data-still='" + results[i].images.fixed_width_still.url + "' data-animate='" + results[i].images.fixed_width_downsampled.url + "' data-state='animate' class='gif'></div>");

            $("#gifs-area").append(singleGif); //<--- prints gifs
        }

        //page moves to the gifs-area when a topic is clicked
        $('html, body').animate({
            scrollTop: $("#gifs-area").offset().top
        }, 1000);

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
        }); 
    });
}

function random() {
    $(".load-more").remove();

    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&limit=10"; //<--- limits gifs to 10

    $("#gifs-area").empty();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data; 

        var singleGif = $("<div class='col mb-5 text-center'><img src='" + results.images.fixed_width_downsampled.url + "' data-still='" + results.images.fixed_width_still.url + "' data-animate='" + results.images.fixed_width_downsampled.url + "' data-state='animate' class='gif'></div>");

        $("#gifs-area").append(singleGif); //<--- prints gifs

        //page moves to the gifs-area when a topic is clicked
        $('html, body').animate({
            scrollTop: $("#gifs-area").offset().top
        }, 1000);

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
        }); 
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
$(document).on("click", ".trending", trending);
$(document).on("click", ".random", random);

createButtons();

