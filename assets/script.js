  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC33S_VNYky9BqJO3q-rHbB98w7JHA3b5s",
    authDomain: "databite-6d5a7.firebaseapp.com",
    databaseURL: "https://databite-6d5a7.firebaseio.com",
    projectId: "databite-6d5a7",
    storageBucket: "databite-6d5a7.appspot.com",
    messagingSenderId: "693471225405"
  };
  firebase.initializeApp(config);

var database = firebase.database()

$("#password-input").hide();
$("#food-input").show();
$(".modal").hide();
$("#userInputSubmit").show();
$("#loadingBtn").hide();
$("#flipBtn").hide();

$("#clickhere").on("click", function(){
    $(".modal").show(); 
});

$("#cancel").on("click", function(){
    $(".modal").hide(); 
});

$("#exout").on("click", function(){
    $(".modal").hide();
});


// $("#newUserSubmit").on("click", function(event){
//     event.preventDefault();
//     var newUserInput = $("#newUserID").val();
//     var newPasswordInput = $("#newPassword").val();

//     database.ref(newUserInput).push({ 
//         fbPassword: newPasswordInput
//     });
//     console.log(newUserInput);
//     console.log(newPasswordInput);
//     $(".modal").hide();
//     $("#newUserInput").val("");
//     $("#newPassword").val("");
// });

$("#userPasswordSubmit").on("click", function(event) {
    // event.preventDefault();
    // var username = $("#userID").val();
    // var userpassword = $("#password").val();
    // console.log(database.ref(username.fbPassword))

    
    // if ((username === database.ref(username)) && (userpassword === database.ref(username.fbPassword))) {
    $("#password-input").hide();
    $("#food-input").show();
    // };
});


var list = JSON.parse(localStorage.getItem("groceryList"));
function renderGroceryList(list) {
    $("#ingredientDataDisplayed").empty();

    for (var i = 0; i < list.length; i++) {
        var row = $("<tr>")
        var groceryItem = $("<td>");
        groceryItem.text(" " + list[i]);

        var groceryItemClose = $("<button>");

        groceryItemClose.attr("data-grocery-item", i);
        groceryItemClose.addClass("checkbox");
        groceryItemClose.text("✓");

        groceryItem.prepend(groceryItemClose);

        row.append(groceryItem);
        
        $("#ingredientDataDisplayed").append(row);   
        //    console.log(row);
           
           var userItem = list[i]

           console.log(userItem);
           
       var itemToStore = list[i];
       var storeUserGroceryList = {
           listItem: itemToStore,
       };
       console.log(storeUserGroceryList.listItem)
       database.ref().push(storeUserGroceryList);
   
       }
        

   
    
}
var storeUserGroceryList = {
    listItem: [],
};
storeUserGroceryList.listItem = list
console.log(storeUserGroceryList)
database.ref().push(storeUserGroceryList);
    


$("#add-groceries").on("click", function(event){
    event.preventDefault();
    $(".error").remove();
    
    var groceryInputValue = $("#groceries").val().trim();
    console.log(groceryInputValue);

    if (groceryInputValue.length < 1) {
      $("#groceries").after('<span class="error">This field is required</span>')
    } else {
      list.push(groceryInputValue);
      renderGroceryList(list);
      localStorage.setItem("groceryList", JSON.stringify(list));
      $("#groceries").val("");
    }
    
});

$(document).on("click", ".checkbox", function(){
    var groceryNumber = $(this).attr("data-grocery-item");

    list.splice(groceryNumber, 1);

    renderGroceryList(list);
    
    localStorage.setItem("groceryList", JSON.stringify(list));
});


if (!Array.isArray(list)) {
    list = [];
}

renderGroceryList(list);
// console.log(list)


$("#userInputSubmit").on("click", function(event) {
  event.preventDefault();
  $(".error").remove();
  var cuisineVal = $("#cuisine").val().trim();
  if (cuisineVal.length < 1) {
    $("#cuisine").after('<span class="error">This field is required</span>');
  } else {
    getRecipe();
    $("#userInputSubmit").hide();
    $("#loadingBtn").show();
    run();
    }

    });

$("#flipBtn").on("click", function(){
  $("#card").flip(true);
})

$(document).on("click", "#reset", function(){
  $("#card").flip(false);
  $("#flipBtn").hide();
  $("#userInputSubmit").show();

});


function getRecipe(){
var userInput = $("#cuisine").val().trim();
var queryURL = "https://api.edamam.com/search?app_id=8ce974d7&app_key=a17376a22bc1da177335c089eb303318&q=" + userInput;


$("#recipeContent").empty();

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    var randomRecipe = Math.floor(Math.random() * 10);
    console.log(randomRecipe);
        var recipeURL = response.hits[randomRecipe].recipe.url;
        console.log(recipeURL);
        var newURL = "https://" + recipeURL.split("//")[1]
        console.log("new",newURL)
        $("#recipeContent").append("<iframe style='width: 100%; height: 520px; overflow: show;' src='" + newURL + "' width='100' height='100' scrolling='yes'>Iframes not supported</iframe>")
        $("#recipeContent").append("<div class='control'><button class='button is-warning ' id='reset'>Search Again</button><span>  </span><button class='button is-warning ' id='shopPush'>Let's Shop!</button></div>")
        var ingredientAdd = response.hits[randomRecipe].recipe.ingredientLines;
        console.log(ingredientAdd);
        $("#shopPush").on("click", function (){
        for (var i = 0; i < ingredientAdd.length; i++) {
            console.log(ingredientAdd[i]);
            list.push(ingredientAdd[i]);
            renderGroceryList(list);
        }
    })
    })
}

// function initMap() {
//     var charlotte = {lat: 35.228912, lng: -80.835326};
//     var map = new google.maps.Map(
//     document.getElementById('map'), {zoom: 4, center: charlotte});
//     var marker = new google.maps.Marker({position: charlotte, map: map});
//   };
//   // This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center:{lat: 35.228912, lng: -80.835326},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('zipCodeInput');
  // var options = {
  //   types: "supermarket",
  // };
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// $("#recipeCard1").on("click", function(){
//   $("#recipeCard1").animate({height: "550px"});
// })



$("#card").flip({
  trigger: 'manual'
});
var intervalId;
var number = 3;
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
    number = 3;
}

function decrement() {
    number--
    if (number === 0) {
        $("#loadingBtn").hide()
    $("#flipBtn").show()
    stop();
    }
}
