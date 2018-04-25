;(function() {
	function aggrByDistributor(movieData) {

	}

	// Returns a function to compute the interquartile range.
	function iqr(k) {
	  return function(d, i) {
	    var q1 = d.quartiles[0],
	        q3 = d.quartiles[2],
	        iqr = (q3 - q1) * k,
	        i = -1,
	        j = d.length;
	    while (d[++i] < q1 - iqr);
	    while (d[--j] > q3 + iqr);
	    return [i, j];
	  };
	}

	const COLORS = {
		RED: 'rgba(255, 0, 0, 0.5)',
		GREEN: 'rgba(0, 255, 0, 0.5)',
		BLUE: 'rgba(0, 0, 255, 0.5)',
		YELLOW: 'rgba(220, 220, 0, 1)',
	};

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var min = Number.Infinity,
		max = -Number.Infinity;
	var data;
	var chart;
	var chartWidth;
	var chartHeight;

	var dots, squares;

	init();

	function init() {
		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		d3.json('./data/movies-2015.json', (err, data) => {
			if (err) {
				return console.warn(err);
			} else {
				initializeChart();
				createAxes();
				const moviesByDistributor = aggrByDistributor(data);
				// drawDots(data);
			}
		})

	}//end init

	function initializeChart() {
		// chart = d3.select("#chartDiv").append("svg")
		// 	.attr("width", width)
		// 	.attr("height", height);

		// chart.plotArea = chart.append("g")
		// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		chart = d3.box()
			.whiskers(iqr(1.5))
			.height(height)	
			.domain([min, max])
			.showLabels(labels);
	}

	function drawDots(movieDataSrc) {
		dots = chart.plotArea.selectAll(".dot")
			.data(movieDataSrc)
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", function(d) { return chart.xScale(d['Rank']); })
				.attr("cy", function(d) { return chart.yScale(1); })
				.attr("r", circleRadius)
				.attr("fill", function(d) { return COLORS.BLUE; })
	}
})();
