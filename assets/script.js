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
var database = firebase.database();

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
        
   
    
}
var storeUserGroceryList = {
    listItem: [],
};
storeUserGroceryList.listItem = list
console.log(storeUserGroceryList)
database.ref().push(storeUserGroceryList);
    
};

$("#add-groceries").on("click", function(event){
    event.preventDefault();
    
    var groceryInputValue = $("#groceries").val().trim();
    console.log(groceryInputValue);

    list.push(groceryInputValue);
    renderGroceryList(list);

    localStorage.setItem("groceryList", JSON.stringify(list));
    $("#groceries").val("");

    
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


$("#userInputSubmit").on("click", function(event){
    var userInput = $("#cuisine").val().trim();
    var queryURL = "https://api.edamam.com/search?app_id=8ce974d7&app_key=a17376a22bc1da177335c089eb303318&q=" + userInput;
    
    $("#recipeContent").empty();
    $("#cuisine").val("");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        var randomRecipe = Math.floor(Math.random() * 10);
        // console.log(randomRecipe);
            var recipeURL = response.hits[randomRecipe].recipe.url;
            // console.log(recipeURL);
            $("#recipeContent").append("<iframe style='width: 100%; height: 600px; overflow: show;' src='" + recipeURL + "' width='100' height='100' scrolling='yes'>Iframes not supported</iframe>")

            var ingredientAdd = response.hits[randomRecipe].recipe.ingredientLines;
            // console.log(ingredientAdd);
            for (var i = 0; i < ingredientAdd.length; i++) {
                // console.log(ingredientAdd[i]);
                list.push(ingredientAdd[i]);
                renderGroceryList(list);
            }

        });

    })




