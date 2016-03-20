$(document).ready( function(){

    $("#roommate-list").append("<li class='list-group-item active'>Grayson Dubois</li>");
    $("#roommate-list").append("<li class='list-group-item'>Brendan Fenton</li>");
    $("#roommate-list").append("<li class='list-group-item'>Regina Shelton</li>");
    $("#roommate-list-container").append("<span><input type='text' id='new-roommate-name' value='' placeholder='Enter New Roommate' style='width:20em;'></input>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-add-roommate'>Add Roommate</button>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-remove-roommate'>Remove Roommate</button></span>");

    // Add a roommate when the add button is clicked
    $("#btn-add-roommate").click( function() {
        if ( $("#new-roommate-name").val() != "" || $("#new-roommate-name").val() != NULL ) {
            $("#roommate-list").append("<li class='list-group-item'>" + $("#new-roommate-name").val() + "</li>");

            // Enable selection of roommates
            $(".list-group li").click( function(){
                $(".list-group-item.active").removeClass("active");
                $(this).addClass("active");
            });
        }
    });

    // Remove a roommate when the remove button is cicked
    $("#btn-remove-roommate").click( function(){
        if ( confirm("Are you sure you want to remove " + $(".list-group-item.active").text() + " from your household?") ) {
            $(".list-group-item.active").remove();
            $("#roommate-list").children().first().addClass("active");
            alert($("#roommate-list").children().first().text());
        }
    });


    // Enable selection of roommates
    $(".list-group li").click( function(){
        $(".list-group-item.active").removeClass("active");
        $(this).addClass("active");
    });

});
