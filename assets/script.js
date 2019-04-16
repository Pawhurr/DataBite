
console.log("hyah");


$("#userInputSubmit").on("click", function (event) {
    event.preventDefault();
    var cuisineInput = $("#cuisine").val().trim();
    var ingredientInput = $("#ingredient").val().trim();
    var servingsInput = $("#servings").val().trim();

    console.log("hyah");
    console.log(cuisineInput);
    console.log(ingredientInput);
    console.log(servingsInput);

});

    // function submit() {
    //     var cuisineInput = document.getElementById("#cuisine").value;
    //     console.log(cuisineInput);
    // }




var list = JSON.parse(localStorage.getItem("groceryList"));

function renderGroceryList(list) {
    $("#ingredientDataDisplayed").empty();

    for (var i = 0; i < list.length; i++) {
        var row = $("<tr>")
        var groceryItem = $("<td>");
        groceryItem.text(list[i]);

        var groceryItemClose = $("<button>");

        groceryItemClose.attr("data-grocery-item", i);
        groceryItemClose.addClass("checkbox");
        groceryItemClose.text("✓");

        groceryItem.prepend(groceryItemClose);

        row.append(groceryItem);
        
        $("#ingredientDataDisplayed").append(row);   
           console.log(row);
    }
}

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
console.log(list)


