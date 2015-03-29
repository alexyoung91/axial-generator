var Alternator = function(frontView, sideView) {
	frontView = d3.select(frontView);
	sideView = d3.select(sideView);

	var frontInit = function(svg) {
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

	var sideInit = function(svg) {
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
					.attr("x", (-rotorWidth / 2) - rotorSpacing)
					.attr("y", -rotorHeight / 2)
					.attr("width", rotorWidth)
					.attr("height", rotorHeight)
					.attr("class", "stator-body");

			var rotorRight = svg.append('g')
								.attr('transform', 'translate(' + cx + ',' + cy + ')');

			rotorRight.append("rect")
					.attr("x", (-rotorWidth / 2) + rotorSpacing)
					.attr("y", -rotorHeight / 2)
					.attr("width", rotorWidth)
					.attr("height", rotorHeight)
					.attr("class", "stator-body");

		var magnetHeight = 50;
		var magnetWidth = 25;
		var magnetDepth = 10;

		var magnetsLeft = new Array(12);
		var magnetsRight = new Array(12);
		for (var i = 0; i < 12; i++) {
			magnetsLeft[i] = rotorLeft.append('rect')
									.attr('x', -28)
									.attr('y', 0 - magnetHeight / 2)
									.attr('width', magnetDepth)
									.attr('height', magnetHeight)
									.attr('class', 'magnet');

			magnetsRight[i] = rotorLeft.append('rect')
									.attr('x', 18)
									.attr('y', 0 - magnetHeight / 2)
									.attr('width', magnetDepth)
									.attr('height', magnetHeight)
									.attr('class', 'magnet');
		}

		return {
			width: width,
			height: height,
			magnetsLeft: magnetsLeft,
			magnetsRight: magnetsRight
		};
	};

	var front = frontInit(frontView);
	var side = sideInit(sideView);

	var draw = function(time) {
		var rotation = ((time / (2 * Math.PI)) * (360 / 6)) % 360;

		front.rotor
				.attr('transform', 'translate(' + front.cx + ',' + front.cy + ') rotate(' + rotation + ')');

		for (var i = 0; i < 12; i++) {
			var new_time = time / 6;
			var s = 25 + Math.abs(Math.sin(new_time + i * (Math.PI / 6))) * 25;

			side.magnetsLeft[i]
					.attr('y', -1 * 120 * Math.sin(new_time + i * (Math.PI / 6)) - (s / 2))
					.attr('height', s);

			side.magnetsRight[i]
					.attr('y', -1 * 120 * Math.sin(new_time + i * (Math.PI / 6)) - (s / 2))
					.attr('height', s);
		}
	};

	return {
		draw: draw
	};
}

// Graph
var Graph = function(id, width, height) {
	var
		X1      = 'x1',
		X2      = 'x2',
		Y1      = 'y1',
		Y2      = 'y2',

		data    = [],
		xMin    = -1.2,
		xMax    = 8,
		yMin    = -0.8,//-height * (xMax - xMin) / width / 2,
		yMax    = 0.8,//-yMin,
		xScale  = d3.scale.linear(),
		yScale  = d3.scale.linear(),
		svg     = d3.select(id),
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

	for (i = -100; i < 100; i++) {
		data.push(i / 10);
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
		.y(function (d, i) { return yScale(3 * dt * Math.sin(d - time)); });

	sine2
		.x(function (d, i) { return xScale(-d + ((2 * Math.PI) / 3)); })
		.y(function (d, i) { return yScale(3 * dt * Math.sin(d - time)); });

	sine3
		.x(function (d, i) { return xScale(-d + ((4 * Math.PI) / 3)); })
		.y(function (d, i) { return yScale(3 * dt * Math.sin(d - time)); });

	// X-Axis
	axes.append('svg:line')
		.attr('class', 'axis')
		.attr(X1, xScale(xMin))
		.attr(Y1, yScale(0))
		.attr(X2, xScale(xMax))
		.attr(Y2, yScale(0));
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
	axes.append('svg:line')
		.attr('class', 'axis')
		.attr(X1, xScale(0))
		.attr(Y1, yScale(yMin))
		.attr(X2, xScale(0))
		.attr(Y2, yScale(yMax));

	var draw = function(t, d) {
		time = t;
		dt = d;

		phase1
		.attr('d', sine1(data));

		phase2
		.attr('d', sine2(data));

		phase3
		.attr('d', sine3(data));
	}

	return {
		data: data,
		width: width,
		height: height,
		draw: draw
	};
}

/*
* Animation and rendering
*/

var alternator = new Alternator('#alternator-front', '#alternator-side');
var graph = new Graph('#graph', 800, 400);

var time = 0; // in radians 2pi radians = full phase cycle
var dt = 0.2; // change in time e.g 0.5 radians

var fps = 1;

var tick = function() {
	graph.draw(time, dt);
	alternator.draw(time);

	time += dt;


	// TODO: change dt randomly simulating wind speed increases and decreases
	//dt += 0.01; // if dt changes the rotor is accelerating/decelerating



	setTimeout(function() {
		window.requestAnimationFrame(tick);
		// Drawing code goes here
	}, 1000 / fps);
}

tick();

//setInterval(tick, 20);
