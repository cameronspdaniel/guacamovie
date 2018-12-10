var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/movies").then(function(dat, error){
    // filter 
	//var data2015 = data.filter(function(d){return d.year == '2015';});
	//var data2016 = data.filter(function(d){return d.year == '2016';});
	// filter year
	var data = dat.filter(function(d){return d.year == '2015';});
	// Get every column value
	//var elements = Object.keys(data[0])
	//	.filter(function(d){
	//		return ((d != "year") & (d != "State"));
	//	});
	//var selection = elements[0];
	let res = { };
	for (let movie of data) {
		let genre = movie.genre;
		let revenue = movie.revenue;
		if (!res[genre]) {
			res[genre] = {
				genre: genre,
				revenue: 0
			};
		}
		res[genre].revenue += revenue;
	}

	let genreRevenues = Object.values(res).sort((x, y) => x.genre.localeCompare(y.genre));

	var y = d3.scaleLinear()
			.domain([0, d3.max(genreRevenues, d => d.revenue)])
			.range([height, 0]);

	var x = d3.scaleBand()
			.domain(Object.keys(res))
			.range([0, width]);


	// var xAxis = d3.axisBottom(x)
	// 	.scale(x)
	//     .orient("bottom");

	// var yAxis = d3.svg.axis()
	// 	.scale(y)
	// 	.orient("left");
		
	var xAxis = d3.axisBottom(x)
	var yAxis = d3.axisLeft(y)

	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-65)" );


 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

	svg.selectAll("rectangle")
		.data(genreRevenues)
		.enter()
		.append("rect")
		.attr("class","rectangle bar")
		.attr("width", width/genreRevenues.length)
		.attr("height", function(d){
			return height - y(d.revenue);
		})
		.attr("x", function(d, i){
			return x(d.genre);
		})
		.attr("y", function(d){
			return y(d.revenue);
		})
		.append("title")
		.text(function(d){
			return d.genre + " : " + d.revenue;
		});

	var selector = d3.select("#selDataset")
    	//.append("select")
    	//.attr("id","dropdown")
    	.on("change", function(d){
			selection = document.getElementById("selDataset");
			

			var data = dat.filter(function(d){return d.year == selection.value;});
			// Get every column value
			//var elements = Object.keys(data[0])
			//	.filter(function(d){
			//		return ((d != "year") & (d != "State"));
			//	});
			//var selection = elements[0];
			let res = { };
			for (let movie of data) {
				let genre = movie.genre;
				let revenue = movie.revenue;
				if (!res[genre]) {
					res[genre] = {
						genre: genre,
						revenue: 0
					};
				}
				res[genre].revenue += revenue;
			}

			let genreRevenues = Object.values(res).sort((x, y) => x.genre.localeCompare(y.genre));
		
			var y = d3.scaleLinear()
					.domain([0, d3.max(genreRevenues, d => d.revenue)])
					.range([height, 0]);

        	y.domain([0, d3.max(genreRevenues, function(d){
				return d.revenue;})]);

        	yAxis.scale(y);

			d3.selectAll(".rectangle")
				.data(genreRevenues)
           		.transition()
				.attr("height", function(d){
					return height - y(d.revenue);
				})
				.attr("x", function(d, i){
					return x(d.genre);
				})
				.attr("y", function(d){
					return y(d.revenue);
				});
      
           	d3.selectAll("g.y.axis")
           		.transition()
				   .call(yAxis);
				   
			d3.selectAll(".rectangle")
				.select("title")
				.text(function(d){
					return d.genre + " : " + d.revenue;
				});

         });

    // selector.selectAll("option")
    //   .data(elements)
    //   .enter().append("option")
    //   .attr("value", function(d){
    //     return d;
    //   })
    //   .text(function(d){
    //     return d;
    //   })


});




