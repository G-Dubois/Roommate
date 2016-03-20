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

    GET_tenants();

});

function GET_tenants(){
    var self = this;
    var data = {};
    var xhr = jQuery.get({
        url: "localhost:8080/api/tenants",
        data: data,
        success: function(data){alert(JSON.stringify(data));},
        dataType: 'json'
    });

    alert(JSON.stringify(data));
}

function DBSCHTUFF(){
    var Plan = {

		// object cache
		cache : {
			loading : $('.loading-svg'),
			legsListing : $('.legs-listing')
		},

		config : {
			getUrl : '/api/phases',
			updateSortUrl : '/api/phases/phase_sort'
		},

		// initialize functionality
		init : function () {
			var self = this;

			self.initClickEvents();
		},

		initClickEvents : function () {
			var self = this;

			// on click of add leg
			$('button.new-leg').on('click', function() {

				var xhr = $.post({
					url : '/api/phases',
					data : {
						"name":"new leg",
						"sort":1
					       	},
					dataType: 'json'
				});
			});
		},

		getPhases : function() {
			var self = this;

			var data = {};

			var xhr = $.ajax({
				url : self.config.getUrl,
				data : data,
				dataType: 'json'
			});

			xhr.success(function(data) {
				var phases = data;

				if (phases.length <= 0){
					//no phases
				}

				var count = 1;
				$.each(phases, function(index, val) {
					var phase = val;

					var	$leg = $('<li class="leg panel panel-default col-md-12" data-id="'+phase.id+'"></li>'),
						$legHeader = $('<div class="leg-header panel-heading col-md-12"><div class="header col-md-9">Leg <span class="leg-number">'+count+'</span> - <span class="leg-name">'+phase.name+'</span></div></div>'),
						$actions = $('<div class="leg-header-actions col-pull-right col-md-3"></div>'),
						$addDestination = $('<button class="btn btn-primary add-destination">Add Destination</button>'),
						$deleteLeg = $('<button class="btn btn-warning delete-leg">X</div>'),
						$legBody = $('<div class="leg-body panel-body"></div>');

					$actions.append($addDestination);
					$actions.append($deleteLeg);
					$legHeader.append($actions);
					$leg.append($legHeader);

					$.each(phase.destinations, function(index, value){
						var destination = value;
						if (destination.dest_photo === null) {
							destination.dest_photo = '';
						}

						if (destination.map_photo === null) {
							destination.map_photo = '';
						}

						var $dest = $('<div class="destination col-md-12"></div>'),
							$photo = $('<div class="photo col-md-2"><img src="'+destination.dest_photo+'" height="75px" width="75px"/></div>'),
							$header = $('<div class="destination-header col-md-6"><a href ="http://hackmags.com/destination.html?dest_id='+destination.id + '">' + destination.name + '</a></div>'),
							$distance = $('<div class="distance col-md-2">'+destination.distance+' Miles</div>'),
							$mapPhoto = $('<div class="map-photo col-md-2"><img height="75px" width="75px" src="'+destination.map_photo+'"/></div>');

						$dest.append($photo);
						$dest.append($header);
						$dest.append($distance);
						$dest.append($mapPhoto);
						$legBody.append($dest);
					});
					$leg.append($legBody);

					self.cache.legsListing.append($leg);
					count++;
				});

				self.cache.legsListing.sortable({
					handle: $('.leg-header'),
					start: function(event, ui) {
						var start_pos = ui.item.index();
				        ui.item.data('start_pos', start_pos);
					},
					stop: function(event, ui) {
						var start_pos = ui.item.data('start_pos');
						var new_pos = ui.item.index();

						$.each($('.legs-listing').children('.leg'), function(index, val) {
							$(this).find('.leg-number').html(index+1);
						});

						if($('.update-order-btn').length <= 0 && start_pos != new_pos) {
							var $btn = $('<button class="update-order-btn btn-danger">Update</button>');
							$('.voyages-body').prepend($btn);

							//click event for updating
							$btn.on('click', function() {
								self.updateSort();
							});
						}
					}
				});

/*
				$('.leg-name').dblClick(function(e) {
					$(this).html('<input class="thVal" type="text" value="' + value + '" />');
				    $(".thVal").focus();
				    $(".thVal").keyup(function (event) {
			        	if (event.keyCode == 13) {
            				$(currentEle).html($(".thVal").val().trim());
        				}
    				});
    				$(document).click(function () {
            			$(currentEle).html($(".thVal").val().trim());
				    });
				});*/

				$('button.add-destination').on('click', function() {
					alert('if only there was time..');
				});
				$('button.delete-leg').on('click', function() {
					alert('if only there was time...');
				});

				self.cache.loading.fadeOut(1000, function() {
					self.cache.legsListing.fadeIn(1000);
				});


			});

			xhr.fail(function(jqXHR, textStatus, errorThrown) {
				alert('api error');
			});
		},

		updateSort : function() {
			var self = this;
			var data = {};

			$.each($('.legs-listing').children('.leg'), function(index, val) {
				var id = $(this).attr('data-id');
				data[id.toString()] = (index+1).toString();
			});

			var xhr = $.ajax({
				url: self.config.updateSortUrl,
				data: data,
				type: 'POST',
			});
			xhr.always(function(data){
			});
			xhr.success(function(data) {
				window.location = '/';
				return false;
			});
		}
	};

	Plan.init();
	Plan.getPhases();
}
