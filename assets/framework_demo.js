

function divideCircle(cx, cy, radius, i, n, delta) {
	let theta = i * 2. * Math.PI / n + delta,
	dx = radius * Math.cos(theta) + cx,
	dy = radius * Math.sin(theta) + cy;
	return {x: dx, y: dy, t: theta, r: radius};
}

function subCircle(cx, cy, radius, i, n, delta) {
	let center = divideCircle(cx, cy, radius, i, n, delta);
	return {
		x: Math.random() * 2 * radius + center.x - radius,
		y: Math.random() * 2 * radius + center.y - radius
	}
}

function increaseOpacity() {
	d3.select(this).raise().attr('opacity', 1);
}

function decreaseOpacity() {
	d3.select(this).attr('opacity', 0.5);
}

let svg = d3.select('#framework-diagram > svg'),
width = 800,
height = 800,
centerX = 400,
centerY = 400;

var framework = new Vue({
	el: "#framework-diagram",
	mounted: function() {
		this.principlesSub.forEach(d => {
			d.randa = Math.random();
			d.randb = Math.random();
			d.principleId = principlesMain.indexOf(d.principle);
		});
		this.svg = d3.select('#framework-diagram > svg');
		let subsByMain = d3.nest()
			.key(function(d) { return d.principle; })
			.entries(this.principlesSub);
		// Draw main principles
		this.svg.selectAll('circle.principle')
			.data(this.principlesMain).enter()
			.append('circle')
			.attr('class', 'principle')
			.attr('r', 50)
			.attr('cx', (d, i) => divideCircle(centerX, centerY, 75, i, this.principlesMain.length, 0).x)
			.attr('cy', (d, i) => divideCircle(centerX, centerY, 75, i, this.principlesMain.length, 0).y)
			.attr('fill', (d, i) => this.principlesColors[i])
			.attr('opacity', 0.5)
			.on('mouseover.opacity', increaseOpacity)
			.on('mouseout.opacity', decreaseOpacity)
			.on('mouseover.caption', d => this.writeCaption(d))
			.on('mouseout.caption', this.clearCaption);
		// Draw subprinciples
		subsByMain.forEach((subs, i) => {
			let subgrps = this.svg.selectAll('.sub ' + subs.key)
						.data(subs.values).enter()
						.append('g')
						.attr('class', d => 'sub ' + subs.key)
						.attr('opacity', d => d.principleId === -1? 0 : 0.5)
						.on('mouseover.opacity', increaseOpacity)
						.on('mouseout.opacity', decreaseOpacity)
						.on('mouseover.caption', d => this.writeCaption(d.principle))
						.on('mouseout.caption', this.clearCaption);
					// Draw nodes
					let nodes = subgrps
						.append('circle')
						.attr('class', 'node')
						.attr('r', 10)
						.attr('cx', d => this.randomSectorPosition(d).x)
						.attr('cy', d => this.randomSectorPosition(d).y)
						.attr('fill', d => this.principlesColors[d.principleId])
						.attr('opacity', d => d.principleId === -1? 0 : 1)
					// let nodes = svg.selectAll('circle.node');
					// Draw links
					let links = subgrps.append('line')
						.attr('class', 'link')
						.attr('x1', d => this.randomSectorPosition(d).x)
						.attr('y1', d => this.randomSectorPosition(d).y)
						.attr('x2', d => divideCircle(centerX, centerY, 75, d.principleId, this.principlesMain.length, 0).x)
						.attr('y2', d => divideCircle(centerX, centerY, 75, d.principleId, this.principlesMain.length, 0).y)
						.attr('stroke', d => this.principlesColors[d.principleId])
						.attr('opacity', 0)
					// Add force
					let simulation = d3.forceSimulation(subs.values)
						.force('collision', d3.forceCollide().radius(20))
						.force('center', d3.forceCenter(divideCircle(centerX, centerY, 250, principlesMain.indexOf(subs.key), principlesMain.length, 0).x, divideCircle(centerX, centerY, 250, principlesMain.indexOf(subs.key), principlesMain.length, 0).y))
						.on('tick', tick);

					function tick() {
						nodes.attr('cx', d => d.x)
							.attr('cy', d => d.y)
						links.attr('x1', d => d.x)
							.attr('y1', d => d.y)
					}
		})
		
	},
	data: {
		svg: undefined,
		principlesMain: principlesMain,
		principlesSub: principlesSub,
		principlesColors: principlesColors,
		caption: ""
	},
	computed: {
		subsByReport: function() {
			return d3.nest()
				.key(function(d) { return d.report; })
				.entries(this.principlesSub);
		}
	},
	methods: {
		writeCaption: function(text) {
			this.caption = text;
		},
		clearCaption: function() {
			this.caption = "";
		},
		randomSectorPosition: function(d) {
			let mainCircle = divideCircle(centerX, centerY, 75, d.principleId, this.principlesMain.length, 0),
			minR = 65,
			maxR = 200,
			r = d.randa * (maxR - minR) + minR,
			minT = mainCircle.t - (Math.PI / this.principlesMain.length),
			maxT = mainCircle.t + (Math.PI / this.principlesMain.length),
			t = d.randb * (maxT - minT) + minT,
			dx = r * Math.cos(t) + mainCircle.x,
			dy = r * Math.sin(t) + mainCircle.y;
			return {x: dx, y: dy, t: t, r: r};
		},
		highlightReport: function(report) {
			this.svg.selectAll('.sub')
					.attr('opacity', d => d.report === report ? 1 : 0.2)
		},
		unhighlight: function() {
			this.svg.selectAll('.sub')
					.attr('opacity', 0.5)
		}
	}
});