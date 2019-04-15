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











