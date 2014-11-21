var width = 1200,
    height = 680;

/* Full map:
    .center([0, 24])
    .scale(1850)
*/

var projection = d3.geo.conicConformal()
    .rotate([102, 0])

    /* .center([5, 22]) */
    .center([3, 23])
    /* .scale(3050) */
    .scale(2550)

    .parallels([17.5, 29.5])
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body")
		.append("div")
		.attr("class", "main")
		.append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/map_mexico.json", function(error, mx) {
  svg.append("g")
      .attr("class", "cities")
    .selectAll("path")
      .data(topojson.feature(mx, mx.objects.municipalities).features)
    .enter().append("path")
      .attr("d", path)
			.attr("data-state", function(d) { return d.properties.state; })
			.attr("data-city", function(d) { return d.properties.name })
		.append("title")
      .text(function(d) { return d.properties.name; });			

  svg.append("path")
      .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state !== b.properties.state; }))
      .attr("class", "state-boundary")
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(mx, mx.objects.municipalities, function(a, b) { return a.properties.state === b.properties.state && a !== b; }))
      .attr("class", "city-boundary")
      .attr("d", path);
});

d3.select(self.frameElement).style("height", height + "px");
