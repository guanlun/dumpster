;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var dataXRange = { min: 40, max: 100 };
	// var xStartPos = 40;
	var xInterval = 60;
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "X Header";
	var yAxisLabelHeader = "Y Header";
	var circleRadius = 4;

	var data;
	var displayedData;
	var chart;
	var chartWidth;
	var chartHeight;

	var timer;

	function timerCallback(elapsed) {
		if (elapsed > 100) {
			updateChart();
			timer.restart(timerCallback);
		}
	}

	function updateChart() {
		dataXRange.min += 0.1;
		dataXRange.max += 0.1;
		// console.log("updating")

		// displayedData = data.slice(dataXRange.min, dataXRange.max);
		displayedData = data.filter(d => d.xVal > dataXRange.min && d.xVal < dataXRange.max);
		
		updateAxes();
		drawDots();
	}

	init();

	function init() {

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		// load data from json
		d3.json("./data/stream_1.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				data = json;
				console.log("JSON loaded");
				initializeChart();
				createAxes();
				// createAxes(xStartPos, xStartPos + xInterval);

				// displayedData = data.slice(dataXRange.min, dataXRange.max);

				// drawDots();

				timer = d3.timer(timerCallback);

				// you could load more data here using d3.json() again...

			}
		});

	}//end init

	function initializeChart() {
		chart = d3.select("#chartDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}

	function updateAxes() {
		chart.xScale.domain([dataXRange.min, dataXRange.max]);
		chart.select('.scatter-xaxis').call(chart.xAxis)
	}

	function createAxes(min, max) {
		// x axis
		chart.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]);

		chart.xAxis = d3.axisBottom()
			.tickSizeOuter(0)
			.scale(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart.xAxis);

		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}

	function drawDots() {
		// plot dots
		var dots = chart.plotArea.selectAll(".dot").data(displayedData, d => d.id);

		dots.enter().append("circle")
				.attr("class", "dot")
				.merge(dots)
				.attr("cx", function(d) { return chart.xScale(d.xVal); })
				.attr("cy", function(d) { return chart.yScale(d.yVal); })
				.attr("r", circleRadius)
				.on("click", function(d) {
					console.log("circle: ", d.xVal, ", ", d.yVal);
				});

		dots.exit().remove();
	}

})();
