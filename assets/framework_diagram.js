function divideCircle(cx, cy, radius, i, n, delta) {
	let theta = i * 2. * Math.PI / n + delta,
	dx = radius * Math.cos(theta) + cx,
	dy = radius * Math.sin(theta) + cy;
	return {x: dx, y: dy};
}

function drawOutline() {
	d3.select(this)
		.attr('stroke', '#000')
		.attr('stroke-width', 1)
		.attr('stroke-opacity', 0.5);
}

function clearOutline() {
	d3.select(this)
		.attr('stroke-opacity', 0);
}

function subCircle(cx, cy, radius, i, n, delta) {
	let center = divideCircle(cx, cy, radius, i, n, delta);
	return {
		x: Math.random() * 2 * radius + center.x - radius,
		y: Math.random() * 2 * radius + center.y - radius
	}
}

function incOpacity() {
	d3.select(this).attr('fill-opacity', 1);
}

function decOpacity() {
	d3.select(this).attr('fill-opacity', 0.5);
}

let svg = d3.select('#framework-diagram > svg'),
width = 400,
height = 400,
centerX = 200,
centerY = 200;

var framework = new Vue({
	el: "#framework-diagram",
	mounted: function() {
		// Draw main circles
		d3.select('#framework-diagram > svg').selectAll('circle.principle')
			.data(this.principlesMain).enter()
			.append('circle')
			.attr('class', 'principle')
			.attr('r', (d, i) => (i > 0) ? 75 : 150)
			.attr('cx', (d, i) => {if (i > 0) {return divideCircle(centerX, centerY, 50, i, this.principlesMain.length - 1, 0).x;} else {return centerX;}})
			.attr('cy', (d, i) => {if (i > 0) {return divideCircle(centerX, centerY, 50, i, this.principlesMain.length - 1, 0).y;} else {return centerY;}})
			.attr('fill', (d, i) => this.principlesColors[i])
			.attr('fill-opacity', 0.2)
			.on('mouseover', drawOutline)
			.on('mouseout', clearOutline);
		// Scatter subprinciples
		d3.select('#framework-diagram > svg').selectAll('circle.subprinciple')
			.data(this.principlesSub).enter()
			.append('circle')
			.attr('class', 'subprinciple')
			.attr('r', 5)
			.attr('cx', (d, i) => {
					if (d.principle !== "Well-being") {
						return subCircle(centerX, centerY, 50, this.principlesMain.indexOf(d.principle), this.principlesMain.length - 1, 0).x
					} else {
						return divideCircle(centerX, centerY, 140, d.content.length, 15, 0).x
					}
				})
			.attr('cy', (d, i) => {
					if (d.principle !== "Well-being") {
						return subCircle(centerX, centerY, 50, this.principlesMain.indexOf(d.principle), this.principlesMain.length - 1, 0).y
					} else {
						return divideCircle(centerX, centerY, 140, d.content.length, 15, 0).y
					}
				})
			.attr('fill', d => this.principlesColors[this.principlesMain.indexOf(d.principle)])
			.attr('fill-opacity', 0.5)
			.on('mouseover.caption', this.captionSubPrinciple)
			.on('mouseover.opacity', incOpacity)
			.on('mouseout.caption', this.clearCaption)
			.on('mouseout.opacity', decOpacity);
	},
	data: {
		principlesMain: principlesMain,
		principlesSub: principlesSub,
		principlesColors: principlesColors,
		caption: ""
	},
	computed: {
	},
	methods: {
		captionSubPrinciple: function(d) {
			this.caption = d.principle;
		},
		clearCaption: function() {
			this.caption = "";
		}
	}
});