function divideCircle(cx, cy, radius, i, n, delta) {
	let theta = i * 2. * Math.PI / n + delta,
	dx = radius * Math.cos(theta) + cx,
	dy = radius * Math.sin(theta) + cy;
	return [dx, dy];
}

function drawOutline(d, i, nodes) {
	nodes.forEach((node, j) => {
		if (i === j) {
			d3.select(node)
				.attr('stroke', '#000')
				.attr('stroke-width', 1)
				.attr('stroke-opacity', 0.5);
		} else {
			d3.select(node)
				.attr('stroke-width', 0)
				.attr('stroke-opacity', 0);
		}
	});
}

let principles = [
	{
		"name": "Well-being"
	},
	{
		"name": "Autonomy"
	},
	{
		"name": "Privacy"
	},
	{
		"name": "Fairness"
	},
	{
		"name": "Accountability"
	},
	{
		"name": "Transparency"
	},
	{
		"name": "Robustness"
	}
]

let svg = d3.select('svg#framework-diagram'),
centerX = 200,
centerY = 200;

svg.selectAll('circle.principle')
	.data(principles).enter()
	.append('circle')
	.attr('class', 'principle')
	.attr('r', (d, i) => (i > 0) ? 75 : 150)
	.attr('cx', (d, i) => {if (i > 0) {return divideCircle(centerX, centerY, 50, i, principles.length - 1, 0)[0];} else {return centerX;}})
	.attr('cy', (d, i) => {if (i > 0) {return divideCircle(centerX, centerY, 50, i, principles.length - 1, 0)[1];} else {return centerY;}})
	.attr('fill', "#000000")
	.attr('fill-opacity', 0.2)
	.on('mouseover', drawOutline);
