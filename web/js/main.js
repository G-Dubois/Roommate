$(document).ready( function(){

    $("#roommate-list").append("<li class='list-group-item active'>Grayson Dubois</li>");
    $("#roommate-list").append("<li class='list-group-item'>Brendan Fenton</li>");
    $("#roommate-list").append("<li class='list-group-item'>Regina Shelton</li>");
    $("#roommate-list-container").append("<span><input type='text' id='new-roommate-name' value='' placeholder='Enter New Roommate' style='width:20em;'></input>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-add-roommate' style='margin:4px;'>Add Roommate</button>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-remove-roommate' style='margin:4px;'>Remove Roommate</button></span>");

    $("#bills-table").append("<tr><td>Rent</td><td>$750</td></tr>");
    $("#bills-table").append("<tr><td>Murfreesboro Electric</td><td>$90.73</td></tr>");
    $("#bills-table").append("<tr><td>Murfreesboro Water and Sewer</td><td>$43.89</td></tr>");
    $("#bills-list-container").append("<span><input type='text' id='new-bill-name' value='' placeholder='Enter Bill Description' style='width:20em;'></input>" +
                                      "\t\t$<input type='number' id='new-bill-cost' value='0' placeholder='Enter Bill Amount' style='width:20em;'></input>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-add-bill' style='margin:4px;'>Add Bill</button>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-remove-bill' style='margin:4px;'>Remove Bill</button></span>");

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


    // Add a bill when the add button is clicked
    /*$("#btn-add-bill").click( function() {

        var validDesc = false;
        var validCost = false;

        if ( $("#new-bill-name").val() == NULL || $("#new-bill-name").val() == "" ) {
            alert("Please insert a bill description");
            validDesc = false;
        } else {
            validDesc = true;
        }

        if ( $("#new-bill-cost").val() ==  ) {
            alert("Please insert a bill cost");
            validCost = false;
        } else {
            validCost = true;
        }

        if ( validDesc && validCost ){
            $("#bills-list").append("<li class='list-group-item'>" +
                                        "<table><td><tr>" + $("#new-bill-name").val() + "</tr>" +
                                        "<tr>$" + $("#new-bill-cost").val() + "</tr></td></table>" +
                                    "</li>");

            // Enable selection of roommates
            $(".list-group li").click( function(){
                $(".list-group-item.active").removeClass("active");
                $(this).addClass("active");
            });
        }
    });*/
});
