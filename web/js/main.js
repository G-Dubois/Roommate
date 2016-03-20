$(document).ready( function(){

    var tenantsList = [];
    var billsList = [];

    $("#roommate-list-container").append("<span><input type='text' id='new-roommate-name' value='' placeholder='Enter New Roommate' style='width:20em;'></input>" +
                                         "\t<input type='checkbox' id='new-roommate-is-primary'> Is Primary?</input>" +
                                         "\t<input type='number' id='new-roommate-bill-percentage' placeholder='Bill Percentage'>%</input>" +
                                         "\t<input type='number' id='new-roommate-living-at-id' placeholder='House ID'></input>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-add-roommate' style='margin:4px;'>Add Roommate</button>" +
                                         "<button type='submit' class='pull-right btn btn-primary' id='btn-remove-roommate' style='margin:4px;'>Remove Roommate</button></span>");


    $("#bills-list-container").append("<br><span><input type='number' id='new-bill-charge-to-number' placeholder='Charge to House ID' style='width:15em;'>\t</input>" +
                                      "\tDate: <input type='text' id='new-bill-year' placeholder='YYYY' style='width: 4em;'></input>" +
                                      "<input type='text' id='new-bill-month' placeholder='MM' style='width: 2em;'></input>" +
                                      "<input type='text' id='new-bill-day' placeholder='DD' style='width: 2em;'></input>" +
                                      "<br><input type='text' id='new-bill-name' value='' placeholder='Enter Bill Name' style='width:15em;'></input>" +
                                      "\t<input type='text' id='new-bill-company-name' placeholder='Enter Company Name'></input>" +
                                      "\t$<input type='text' id='new-bill-cost' placeholder='Enter Bill Amount' ></input>" +
                                      "<button type='submit' class='pull-right btn btn-primary' id='btn-add-bill' style='margin:4px;'>Add Bill</button>" +
                                      "<button type='submit' class='pull-right btn btn-primary' id='btn-remove-bill' style='margin:4px;'>Remove Bill</button></span>");


    // Add a roommate when the add button is clicked
    $("#btn-add-roommate").click( function(){
        if ( $("#new-roommate-name").val() != "" || $("#new-roommate-name").val() != NULL ) {

            var isPrimary = ( $("#new-roommate-is-primary").checked ? 1 : 0 );

            var data = {
                "TenantName": $("#new-roommate-name").val(),
                "IsPrimary": isPrimary,
                "BillPercentage": parseFloat( $("#new-roommate-bill-percentage").val() * .01 ),
                "LivingAtId": $("#new-roommate-living-at-id").val()
            };
            var xhr = $.post({
                url: "/api/tenants",
                data: data,
                dataType: 'json'
            });

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

            var data = {};
            var roommateId = 0;
            for (var i =0; i < tenantsList.length; i++){
                if (tenantsList[i].TenantName == $(".list-group-item.active").text()){
                    roommateId = tenantsList[i].TenantId;
                }
            }

            var xhr = $.ajax({
                url: "/api/roommate/" + roommateId,
                type: 'DELETE',
                data: data,
                dataType: 'json'
            });

            xhr.success(function(data){
                ;
            });

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
    $("#btn-add-bill").click( function() {

        alert("Button Click!");

        var validDesc = true;
        var validCost = true;

        if ( validDesc && validCost ){

            alert("Add Bill!");
            $("#bills-table").append("<tr><td>" + $("#new-bill-name").val() + "</td>" +
                                        "<td>$" + $("#new-bill-cost").val() + "</td></tr>");

            var data = {
                "ChargeToId": $("#new-bill-charge-to-number").val(),
                "DayOfTheMonth": $("#new-bill-year").val() + $("#new-bill-month").val() + $("#new-bill-day").val(),
                "PaymentTotal": parseFloat( $("#new-bill-cost").val() ),
                "BillName": $("#new-bill-name").val(),
                "CompanyName": $("#new-bill-company-name").val()
            };
            var xhr = $.post({
                url: "/api/bills",
                data: data,
                dataType: 'json'
            });
        }
    });

    var self = this;
    var data = {};
    var xhr = $.ajax({
        url: "/api/tenants",
        data: data,
        dataType: 'json',
        async: false
    });

    xhr.success(function(data){
        tenantsList = data;
    });

    data = {};
    xhr = $.ajax({
        url: "/api/bills",
        data: data,
        dataType: 'json',
        async: false
    });

    xhr.success(function(data){
        billsList = data;
    });

    for (var i = 0; i < billsList.length; i++) {
        $("#bills-table").append( "<tr><td>" + billsList[i].BillName + "</td>" +
                                  "<td>" + billsList[i].PaymentTotal + "</td></tr>");
    }

    for (var i = 0; i < tenantsList.length; i++){

        $("#roommate-list").append("<li class='list-group-item'>" + tenantsList[i].TenantName + "</li>");

        // Enable selection of roommates
        $(".list-group li").click( function(){
            $(".list-group-item.active").removeClass("active");
            $(this).addClass("active");
        });
    }

});
