var Alternator = function(frontView, sideView) {
	frontView = d3.select(frontView);
	sideView = d3.select(sideView);

	var Front = function(svg) {
		var
			width = svg.attr('width'),
			height = svg.attr('height'),
			cx = svg.attr('width') / 2,
			cy = svg.attr('height') / 2;

		var stator = svg.append('g')
						.attr('transform', 'translate(' + cx + ',' + cy + ')');

		var statorOuterStroke = 2;
		var statorOuter = d3.svg.arc()
									.innerRadius(cx - statorOuterStroke)
									.outerRadius(cy)
									.startAngle(0)
									.endAngle(2 * Math.PI);



		var statorInnerStroke = 2;
		var statorInner = d3.svg.arc()
									.innerRadius(50 - statorInnerStroke)
									.outerRadius(50)
									.startAngle(0)
									.endAngle(2 * Math.PI);

		stator.append('path')
					.attr('d', statorOuter);

		stator.append('path')
					.attr('d', statorInner);

		for (var i = 0; i < 9; i++) {
			var rotation = (i * 360) / 9;
			var x = Math.sin((i * (2 * Math.PI)) / 9);
			var y = Math.cos((i * (2 * Math.PI)) / 9);

			stator.append('rect')
				.attr('x', -20)
				.attr('y', -149)
				.attr('width', 40)
				.attr('height', 60)
				.attr('class', 'coil')
				.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + ')');
		}

		var rotor = svg.append('g')
						.attr('transform', 'translate(' + cx + ',' + cy + ')');

		var rotorOuterStroke = 1;
		var rotorOuter = d3.svg.arc()
								.innerRadius(cx - 20 - rotorOuterStroke)
								.outerRadius(cy - 20)
								.startAngle(0)
								.endAngle(2 * Math.PI);

		var rotorBody = d3.svg.arc()
								.innerRadius(50)
								.outerRadius(cy - 20)
								.startAngle(0)
								.endAngle(2 * Math.PI);

		rotor.append('path')
					.attr('d', rotorOuter);

		rotor.append('path')
					.attr('d', rotorBody)
					.attr('class', 'rotor-body');

		rotor.append('circle')
				.attr('cx', 0)
				.attr('cy', 0)
				.attr('r', 5)
				.attr('class', 'axel');

		for (var i = 0; i < 4; i++) {
			var x = Math.sin((i * (2 * Math.PI)) / 4) * 65;
			var y = Math.cos((i * (2 * Math.PI)) / 4) * 65;

			rotor.append('circle')
					.attr('class', 'bolt-hole')
					.attr('cx', 0)
					.attr('cy', 0)
					.attr('r', 3)
					.attr('transform', 'translate(' + x + ',' + y + ')');
		}

		for (var i = 0; i < 12; i++) {
			var rotation = (i * 360) / 12;
			var x = Math.sin((i * (2 * Math.PI)) / 12);
			var y = Math.cos((i * (2 * Math.PI)) / 12);

			rotor.append('rect')
					.attr('x', -12.5)
					.attr('y', -145)
					.attr('width', 25)
					.attr('height', 50)
					.attr('class', 'magnet')
					.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + ')');
		}

		return {
			width: width,
			height: height,
			cx: cx,
			cy: cy,
			rotor: rotor
		};
	};

	var Side = function(svg) {
		var
			width = sideView.attr('width'),
			height = sideView.attr('height'),
			cx = sideView.attr('width') / 2,
			cy = sideView.attr('height') / 2;

			var stator = svg.append('g')
							.attr('transform', 'translate(' + cx + ',' + cy + ')');

			var statorWidth = 20;
			var statorHeight = height;
			stator.append("rect")
					.attr("x", -statorWidth / 2)
					.attr("y", -height / 2)
					.attr("width", statorWidth)
					.attr("height", statorHeight)
					.attr("class", "stator-body");

			var rotorWidth = 10;
			var rotorHeight = height - 40;
			var rotorSpacing = 34;

			var rotorLeft = svg.append('g')
								.attr('transform', 'translate(' + cx + ',' + cy + ')');

			rotorLeft.append("rect")
					.attr("x", -rotorWidth / 2 - rotorSpacing)
					.attr("y", -rotorHeight / 2)
					.attr("width", rotorWidth)
					.attr("height", rotorHeight)
					.attr("class", "stator-body");

			var rotorRight = svg.append('g')
								.attr('transform', 'translate(' + cx + ',' + cy + ')');

			rotorRight.append("rect")
					.attr("x", -rotorWidth / 2 + rotorSpacing)
					.attr("y", -rotorHeight / 2)
					.attr("width", rotorWidth)
					.attr("height", rotorHeight)
					.attr("class", "stator-body");

		var magnets = {
			height: 50,
			width: 25,
			depth: 10,
			pairs: new Array(2)
		};

		for (var i = 0; i < magnets.pairs.length; i++) {
			var time = 0;
			var position = Math.sin((time / 6) + i * (Math.PI / 6));
			var height = 25 + Math.abs(position) * 25;

			var left = rotorLeft.append('rect')
							.attr('x', -magnets.depth / 2 - rotorSpacing + rotorWidth)
							.attr('y', -1 * 120 * position - (height / 2))
							.attr('width', magnets.depth)
							.attr('height', height)
							.attr('class', 'magnet');

			var right = rotorRight.append('rect')
							.attr('x', -magnets.depth / 2 + rotorSpacing - rotorWidth)
							.attr('y', -1 * 120 * position - (height / 2))
							.attr('width', magnets.depth)
							.attr('height', height)
							.attr('class', 'magnet');

			magnets.pairs[i] = {
				left: left,
				right: right,
				lastPosition: 0,
				currentPosition: 0,
				z: 1 // 0 = behind, 1 = front
			};

			// add flux lines
		}

		return {
			width: width,
			height: height,
			rotorLeft: rotorLeft,
			rotorRight: rotorRight,
			magnets: magnets
		};
	};

	var front = Front(frontView);
	var side = Side(sideView);

	var draw = function(time) {
		var rotation = ((time / (2 * Math.PI)) * (360 / 6)) % 360;

		front.rotor
				.attr('transform', 'translate(' + front.cx + ',' + front.cy + ') rotate(' + rotation + ')');

		for (var i = 0; i < side.magnets.pairs.length; i++) {
			var position = Math.sin((time / 6) + i * (Math.PI / 6));
			var height = 25 + Math.abs(position) * 25;

			side.magnets.pairs[i].left
					.attr('y', -1 * 120 * position - (height / 2))
					.attr('height', height);

			side.magnets.pairs[i].right
					.attr('y', -1 * 120 * position - (height / 2))
					.attr('height', height);

			if (position > 0.866 && side.magnets.pairs[i].z == 1) {
				side.magnets.pairs[i].z = 0;

				//var pair = side.magnets.pairs.splice(i, 1)[0];
				//side.magnets.pairs.unshift(pair);

				// is now at back
			} else if (position < -0.9 && side.magnets.pairs[i].z == 0) {
				side.magnets.pairs[i].z = 1;

				// is now at front
			}
		}
	};

	return {
		draw: draw
	};
};

// Graph
var Graph = function(id) {
	var
		X1      = 'x1',
		X2      = 'x2',
		Y1      = 'y1',
		Y2      = 'y2',

		svg     = d3.select(id),
		width	= svg.attr('width'),
		height	= svg.attr('height'),
		data    = [],
		xMin    = -10,
		xMax    = 0,
		yMin    = -2,//-height * (xMax - xMin) / width / 2,
		yMax    = 2,//-yMin,
		xScale  = d3.scale.linear(),
		yScale  = d3.scale.linear(),
		axes    = svg.append('svg:g'),
		plot    = svg.append('svg:g'),
		phase1  = plot.append('svg:path'),
		phase2  = plot.append('svg:path'),
		phase3  = plot.append('svg:path'),
		sine1   = d3.svg.line(),
		sine2   = d3.svg.line(),
		sine3   = d3.svg.line(),
		time    = 0,
		dt      = 0.1;

	for (i = 0; i < 100; i++) {
		data.push(i / 5);
	}

	xScale
		.domain([xMin, xMax])
		.range([0, width]);

	yScale
		.domain([yMin, yMax])
		.range([0, height]);

	phase1.attr('class', 'phase1');
	phase2.attr('class', 'phase2');
	phase3.attr('class', 'phase3');

	sine1
		.x(function (d, i) { return xScale(-d); })
		.y(function (d, i) { return yScale(2 * dt * Math.sin(d - time)); });

	sine2
		.x(function (d, i) { return xScale(-d + ((2 * Math.PI) / 3)); })
		.y(function (d, i) { return yScale(2 * dt * Math.sin(d - time)); });

	sine3
		.x(function (d, i) { return xScale(-d + ((4 * Math.PI) / 3)); })
		.y(function (d, i) { return yScale(2 * dt * Math.sin(d - time)); });

	// X-Axis
	/*
	axes.append('svg:line')
		.attr('class', 'axis')
		.attr(X1, xScale(xMin))
		.attr(Y1, yScale(0))
		.attr(X2, xScale(xMax))
		.attr(Y2, yScale(0));
	*/
/*
	axes.append('svg:line')
		.attr('class', 'axis')
		.attr(X1, xScale(Math.PI))
		.attr(Y1, yScale(0))
		.attr(X2, xScale(Math.PI))
		.attr(Y2, yScale(0) + 8);

	axes.append("svg:text")
		.text(String.fromCharCode(960))
		.attr("x", Math.round(xScale(Math.PI)))
		.attr("y", (yScale(0)) + 24)
		.attr("text-anchor", "middle");

	axes.append('svg:line')
		.attr('class', 'axis')
		.attr(X1, xScale(2 * Math.PI))
		.attr(Y1, yScale(0))
		.attr(X2, xScale(2 * Math.PI))
		.attr(Y2, yScale(0) + 8);

	axes.append("svg:text")
		.text('2' + String.fromCharCode(960))
		.attr("x", Math.round(xScale(2 * Math.PI)))
		.attr("y", (yScale(0)) + 24)
		.attr("text-anchor", "middle");
*/
	// Y-Axis
	var yaxis = axes.append('svg:line')
						.attr('class', 'axis')
						.attr(X1, xScale(0))
						.attr(Y1, yScale(yMin))
						.attr(X2, xScale(0))
						.attr(Y2, yScale(yMax));

	var draw = function(t, d, yrange) {
		time = t;
		dt = d;

		yScale
			.domain([-yrange, yrange])
			.range([0, height]);

		yaxis.attr(X1, xScale(0))
			.attr(Y1, yScale(-yrange))
			.attr(X2, xScale(0))
			.attr(Y2, yScale(yrange));

		phase1
		.attr('d', sine1(data));

		phase2
		.attr('d', sine2(data));

		phase3
		.attr('d', sine3(data));
	};

	return {
		data: data,
		width: width,
		height: height,
		draw: draw
	};
};

/*
* Animation and rendering
*/

var alternator = new Alternator('#alternator-front', '#alternator-side');
var graph = new Graph('#graph');

var time = 0; // in radians 2pi radians = full phase cycle
var dt = 0.1; // change in time e.g 0.5 radians
var fps = 10; // Frame rate
var paused = false;

var yrange = 2.0;

var tick = function() {
	alternator.draw(time);
	graph.draw(time, dt, yrange);

	if (!paused) {
		time += dt;

		// TODO: change dt randomly simulating wind speed increases and decreases
		//dt += 0.01; // if dt changes the rotor is accelerating/decelerating
	}

	// TODO: frequency display, period display, voltage displays etc

	setTimeout(function() {
		window.requestAnimationFrame(tick);
	}, 1e3 / fps);
};

tick();

// if paused increment value and draw, else just increment value

var speed_slider = document.getElementsByName('speed')[0];
speed_slider.addEventListener('input', function() {
	dt = speed_slider.value / 100;
});
/*
document.addEventListener('keydown', function(e) {
	speed_slider.value++;
	dt = speed_slider.value / 1000;
});
*/
// the above two functions need to share a common dt changing/getting function?

var yrange_slider = document.getElementsByName('yrange')[0];
yrange_slider.addEventListener('input', function() {
	yrange = yrange_slider.value / 10;
});

var pause_button = document.getElementsByName('pause')[0];
pause_button.addEventListener('click', function() {
	paused = !paused;

	if (paused)
		pause_button.value = 'Play';
	else
		pause_button.value = 'Pause';
});
