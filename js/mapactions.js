jQuery(document).ready(function() {
	//Animate the map and the legenda as they are being build
	$('.main').fadeIn(1500, function() {
		$('.info').slideDown(500);
	});

	$.getJSON( "data/list.json", function(json) {
		var statelist = []
		, citylist = [];

		//Build items for states and highlight states on the map
		$.each(json.estados, function(i, obj_states) {			
			statelist.push("<a href=\"#\" class=\"stateListener\">" + obj_states.nombre + "</a> ");

			setTimeout(function() {
				$('path[data-state="' + obj_states.nombre + '"]').css("fill", "#9d2849");
			}, 1000);
		});

		//Build items for cities and highlight cities on the map
		$.each(json.ciudades, function(i, obj_cities) {
			citylist.push("<a href=\"#\" data-in-state=\"" + obj_cities.estado + "\" class=\"cityListener\">" + obj_cities.nombre + "</a> ");

			setTimeout(function() {
				$('path[data-city="' + obj_cities.nombre + '"][data-state="' + obj_cities.estado + '"]').css("fill", "#4f1631");
			}, 1000);
		});

		//Put all states and cities in lists, and count
		//how many there are in total
		$("#statelist").append(statelist);
			$(".states").append(" (" + statelist.length + ")");
		$("#citylist").append(citylist);
			$(".cities").append(" (" + citylist.length + ")");

		//Highlight the current hovered item on the map
		$('.stateListener').hover(function() {
			current = $(this).text();
			$('path[data-state="' + current + '"]').css("fill", "#e4d1b4");
		}, function () {			
			$('path[data-state="' + current + '"]').css("fill", "#9d2849");
		});

		$('.cityListener').hover(function() {
			currentc = $(this).text()
			, currents = $(this).attr("data-in-state");
			$('path[data-city="' + currentc + '"][data-state="' + currents + '"]').css("fill", "#e4d1b4");
		}, function () {			
			$('path[data-city="' + currentc + '"][data-state="' + currents + '"]').css("fill", "#4f1631");
		});
	});
});

