;(function() {

	const COLORS = {
		RED: 'rgba(255, 0, 0, 0.5)',
		GREEN: 'rgba(0, 255, 0, 0.5)',
		BLUE: 'rgba(0, 0, 255, 0.5)',
		YELLOW: 'rgba(220, 220, 0, 1)',
	};

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var dataXRange = { min: 40, max: 100 };
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "X Header";
	var yAxisLabelHeader = "Y Header";
	var circleRadius = 4;
	var squareSize = 8;

	var data;
	var chart;
	var chartWidth;
	var chartHeight;

	var dots, squares;

	init();

	function init() {
		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		d3.queue()
		.defer(d3.json, "./data/stream_1.json")
		.defer(d3.json, "./data/stream_2.json")
		.await((error, json1, json2) => {
			if (error) {
				return console.warn(error);
			} else {
				initializeChart();
				createAxes();
				drawDots(json1, json2);
				drawSquares(json2, json1);
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

	function createAxes() {

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

	function drawDots(plotDataSrc, connectedDataSrc) {
		dots = chart.plotArea.selectAll(".dot")
			.data(plotDataSrc)
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", function(d) { return chart.xScale(d.xVal); })
				.attr("cy", function(d) { return chart.yScale(d.yVal); })
				.attr("r", circleRadius)
				.attr("fill", function(d) { return COLORS.BLUE; })
				.on("click", function(d) {
					console.log("circle: ", d.xVal, ", ", d.yVal);
				})
				.on("mouseover", function(d) {
					d3.select(this).style('fill', COLORS.RED);
				})
				.on("click", function(d) {
					const matchedItemIndex = connectedDataSrc.findIndex(cd => cd.xVal === d.xVal);
					d3.select(squares._groups[0][matchedItemIndex]).style('fill', COLORS.YELLOW);
				})
				.on("mouseout", function(d) {
					d3.select(this).style('fill', COLORS.BLUE);

					const matchedItemIndex = connectedDataSrc.findIndex(cd => cd.xVal === d.xVal);
					d3.select(squares._groups[0][matchedItemIndex]).style('fill', COLORS.GREEN);
				})
	}

	function drawSquares(plotDataSrc, connectedDataSrc) {
		squares = chart.plotArea.selectAll(".square")
			.data(plotDataSrc)
			.enter().append("rect")
				.attr("class", "square")
				.attr("x", d => chart.xScale(d.xVal) - squareSize / 2)
				.attr("y", d => chart.yScale(d.yVal) - squareSize / 2)
				.attr("width", squareSize)
				.attr("height", squareSize)
				.attr("fill", d => COLORS.GREEN)
				.on("mouseover", function(d) {
					d3.select(this).style('fill', COLORS.RED);
				})
				.on("click", function(d) {
					const matchedItemIndex = connectedDataSrc.findIndex(cd => cd.xVal === d.xVal);
					d3.select(dots._groups[0][matchedItemIndex]).style('fill', COLORS.YELLOW);
				})
				.on("mouseout", function(d) {
					d3.select(this).style('fill', COLORS.GREEN);

					const matchedItemIndex = connectedDataSrc.findIndex(cd => cd.xVal === d.xVal);
					d3.select(dots._groups[0][matchedItemIndex]).style('fill', COLORS.BLUE);
				})
	}
})();
