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

