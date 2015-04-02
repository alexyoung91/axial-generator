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

		var coils = new Array(9)
		for (var i = 0; i < coils.length; i++) {
			var rotation = (i * 360) / coils.length;
			var x = Math.sin((i * (2 * Math.PI)) / coils.length);
			var y = Math.cos((i * (2 * Math.PI)) / coils.length);

			stator.append('rect')
				.attr('x', -20)
				.attr('y', -149)
				.attr('width', 40)
				.attr('height', 60)
				.attr('class', 'coil')
				.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + ')');

			// Phase wiring
			if (i < 3) {
				stator.append('circle')
					.attr('cx', -20)
					.attr('cy', -165 + (i * -7))
					.attr('r', 5)
					.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + ')')
					.attr('class', i == 0 ? 'wire-phase1' : (i == 1) ? 'wire-phase2' : 'wire-phase3');
			} else if (i > 5) {
				stator.append('circle')
					.attr('cx', -20)
					.attr('cy', -164 + ((i - 6) * -7))
					.attr('r', 5)
					.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + 13.5 + ')')
					.attr('class', (i - 6) == 0 ? 'wire-phase1' : ((i - 6) == 1) ? 'wire-phase2' : 'wire-phase3');;
			}
		}

		// More phase wiring

		// Phase A (blue)
		var phaseA_1 = d3.svg.arc()
								.innerRadius(164)
								.outerRadius(166)
								.startAngle(0.11)
								.endAngle(2);

		var phaseA_2 = d3.svg.arc()
								.innerRadius(164)
								.outerRadius(166)
								.startAngle(2.18)
								.endAngle(4.1);

		stator.append('path')
					.attr('d', phaseA_1)
					.attr('class', 'wire-phase1');
		stator.append('path')
					.attr('d', phaseA_2)
					.attr('class', 'wire-phase1');

		// Phase B (red)
		var phaseB_1 = d3.svg.arc()
								.innerRadius(171)
								.outerRadius(173)
								.startAngle(0.79)
								.endAngle(2.68);

		var phaseB_2 = d3.svg.arc()
								.innerRadius(173)
								.outerRadius(175)
								.startAngle(2.9)
								.endAngle(4.8);

		stator.append('path')
					.attr('d', phaseB_1)
					.attr('class', 'wire-phase2');
		stator.append('path')
					.attr('d', phaseB_2)
					.attr('class', 'wire-phase2');

		// Phase C (green)
		var phaseC_1 = d3.svg.arc()
								.innerRadius(180)
								.outerRadius(182)
								.startAngle(1.48)
								.endAngle(3.37);

		var phaseC_2 = d3.svg.arc()
								.innerRadius(180)
								.outerRadius(182)
								.startAngle(3.58)
								.endAngle(5.5);

		stator.append('path')
					.attr('d', phaseC_1)
					.attr('class', 'wire-phase3');
		stator.append('path')
					.attr('d', phaseC_2)
					.attr('class', 'wire-phase3');

		//

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

			rotor.append('text')
					.text(i % 2 ? 'S' : 'N')
					.attr('x', 0)
					.attr('y', -125)
					.attr('width', 25)
					.attr('height', 50)
					.attr('text-anchor', 'middle')
					.attr('transform', 'translate(' + x + ',' + y + ') rotate(' + rotation + ')');
		}

		var draw = function(time) {
			var rotation = ((time / (2 * Math.PI)) * (360 / 6)) % 360;

			rotor
				.attr('transform', 'translate(' + cx + ',' + cy + ') rotate(' + rotation + ')');
		}

		return {
			draw: draw
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

			var magnets = svg.append('g')
								.attr('transform', 'translate(' + cx + ',' + cy + ')');

		var magnet = {
			height: 50,
			width: 25,
			depth: 10,
			pairs: new Array(12),
			position: 0
		};

		for (var i = 0; i < magnet.pairs.length; i++) {
			var time = 0;
			var position = Math.sin((time / 6) + i * (Math.PI / 6));
			var height = 25 + Math.abs(position) * 25;

			var left = magnets.append('rect')
							.attr('x', -magnet.depth / 2 - rotorSpacing + rotorWidth)
							.attr('y', 120 * position - (height / 2))
							.attr('width', magnet.depth)
							.attr('height', height)
							.attr('class', 'magnet magnet--' + i);

			var right = magnets.append('rect')
							.attr('x', -magnet.depth / 2 + rotorSpacing - rotorWidth)
							.attr('y', 120 * position - (height / 2))
							.attr('width', magnet.depth)
							.attr('height', height)
							.attr('class', 'magnet magnet--' + i);
			/*
			// TODO: add flux lines
			var flux = magnets.append('line')
							.attr('x1', -rotorSpacing + rotorWidth / 2 + magnet.depth)
							.attr('y1', 120 * position - (height / 2))
							.attr('x2', rotorSpacing - rotorWidth / 2 - magnet.depth)
							.attr('y2', 120 * position - (height / 2))
							.attr('class', 'flux');
			*/

			magnet.pairs[i] = {
				left: left,
				right: right
			};
		}

		var draw = function(time) {
			//var rotation_portion = Math.floor(((magnet.pairs.length) / (2 * Math.PI)) * (time / 6)) % magnet.pairs.length;

			for (var i = 0; i < magnet.pairs.length; i++) {
				var position = Math.sin((time / 6) + i * (Math.PI / 6));
				var height = 25 + Math.abs(position) * 25;

				magnet.pairs[i].left
						.attr('y', 120 * position - (height / 2))
						.attr('height', height);

				magnet.pairs[i].right
						.attr('y', 120 * position - (height / 2))
						.attr('height', height);
			}

			/*
			if (rotation_portion != magnet.position) {
				magnet.position = rotation_portion;
				magnets[0][0].insertBefore(magnets[0][0].lastChild, magnets[0][0].firstChild);
				magnet.pairs.unshift(magnet.pairs.pop());
			}
			*/
		}

		return {
			draw: draw
		};
	};

	var front = Front(frontView);
	var side = Side(sideView);

	var draw = function(time) {
		front.draw(time);
		side.draw(time);
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

	var draw = function(t, d, yRange) {
		time = t;
		dt = d;

		yScale
			.domain([-yRange, yRange])
			.range([0, height]);

		yaxis.attr(X1, xScale(0))
			.attr(Y1, yScale(-yRange))
			.attr(X2, xScale(0))
			.attr(Y2, yScale(yRange));

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
* Variables
*/

var alternator = new Alternator('#alternator-front', '#alternator-side');
var graph = new Graph('#graph');

var time = 0; // in radians 2pi radians = full phase cycle
var dt = 0.05; // change in time e.g 0.5 radians
var fps = 30; // Frame rate
var paused = false;

var yRange = 2.0;

var period = 0;
var frequency = 0;
var rpm = 0;

/*
* User interface
*/

// Speed slider
var speedSlider = document.getElementsByName('speed')[0];
var setSpeedFromSlider = function() {
	dt = speedSlider.value / 100;
}
speedSlider.addEventListener('input', setSpeedFromSlider);
setSpeedFromSlider();

// Y-range slider
var yRangeSlider = document.getElementsByName('yrange')[0];
var setYRangeFromSlider = function() {
	yRange = yRangeSlider.value / 10;
}
yRangeSlider.addEventListener('input', setYRangeFromSlider);
setYRangeFromSlider();

// Pause button
var pauseButton = document.getElementsByName('pause')[0];
var pauseAnimation = function() {
	paused = !paused;

	if (paused)
		pauseButton.value = 'Play';
	else
		pauseButton.value = 'Pause';
}
pauseButton.addEventListener('click', pauseAnimation);

/*
document.addEventListener('keydown', function(e) {
	speed_slider.value++;
	dt = speed_slider.value / 1000;
});
*/
// the above two functions need to share a common dt changing/getting function?

/*
* Calculations
*/

var getFrequency = function(dt, fps) {
	return (dt * fps) / (2 * Math.PI);
};

var getPeriod = function(dt, fps) {
	return 1 / getFrequency(dt, fps);
};

var getRPM = function(dt, fps) {
	// 6Hz = 1 rotor rev a second due to 12 magnets on rotor
	return getFrequency(dt, fps) * 10;
};

/*
* Animation and rendering
*/

var tick = function() {
	alternator.draw(time);
	graph.draw(time, dt, yRange);

	if (!paused) {
		time += dt;

		// 12 * pi == 1 revolution of the rotor
		while(time > 6 * 2 * Math.PI) {
			time -= 6 * 2 * Math.PI;
		}

		// TODO: change dt randomly simulating wind speed increases and decreases
		//dt += 0.01; // if dt changes the rotor is accelerating/decelerating
	}

	frequency = getFrequency(dt, fps);
	period = getPeriod(dt, fps);
	rpm = getRPM(dt, fps);

	document.getElementsByName('frequency')[0].value = frequency.toPrecision(3);
	document.getElementsByName('period')[0].value = period.toPrecision(3);
	document.getElementsByName('rpm')[0].value = rpm.toPrecision(3);

	// TODO: voltage displays

	setTimeout(function() {
		window.requestAnimationFrame(tick);
	}, 1e3 / fps);
};

tick();
