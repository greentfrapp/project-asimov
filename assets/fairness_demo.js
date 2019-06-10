// fairnessdemo1

// let pets = [
// 	{
// 		"species": "dog",
// 		"bad": true
// 	},
// 	{
// 		"species": "dog",
// 		"bad": true
// 	},
// 	{
// 		"species": "dog",
// 		"bad": true
// 	},
// 	{
// 		"species": "dog",
// 		"bad": true
// 	},
// 	{
// 		"species": "dog",
// 		"bad": true
// 	},
// 	{
// 		"species": "dog",
// 		"bad": false
// 	},
// 	{
// 		"species": "dog",
// 		"bad": false
// 	},
// 	{
// 		"species": "dog",
// 		"bad": false
// 	},
// 	{
// 		"species": "dog",
// 		"bad": false
// 	},
// 	{
// 		"species": "dog",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": true
// 	},
// 	{
// 		"species": "cat",
// 		"bad": true
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	},
// 	{
// 		"species": "cat",
// 		"bad": false
// 	}
// ]
let pets = Array.from({length: 200})
				.map((x,i) => {
					let species = (i < 100) ? "cat" : "dog",
					bad = false;
					if (i < 40 || (i >= 100 && i < 160)) {
						bad = true;
					}
					return {
						species: species,
						bad: bad
					}
				});

let svg1 = d3.select('svg#fairnessdemo1'),
centerX = 300,
centerY = 200,
baseXCat = 50,
baseXDog = 200,
baseY = 350,
colors = {
	good: "#3498db",
	bad: "#e74c3c"
};

svg1.selectAll('circle.principle')
	.data(pets).enter()
	.append('circle')
	.attr('class', 'principle')
	.attr('r', 5)
	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
	.attr('cy', (d, i) => baseY - 15 * (i % 10))
	.attr('fill', d => d.bad ? colors.bad : colors.good)
	.attr('fill-opacity', 0.8);

// fairnessdemo2

function diagnose() {
	// randomly select pets to match 80% diagnosis
	// calculated with Bayes theorem
	let idxs = [],
	scale = 2;
	for (let i=0; i<200; i++) {
		let dice = false;
		if (i < 100) {
			if (i < 40) {
				dice = Math.random() < 0.2 * scale;
			} else {
				dice = Math.random() < 0.0333 * scale;
			}
		} else {
			if (i < 160) {
				dice = Math.random() < 0.1333 * scale;
			} else {
				dice = Math.random() < 0.05 * scale;
			}
		}
		idxs.push(dice)
	}
	return idxs
}

let diagnosis = diagnose();

let svg2 = d3.select('svg#fairnessdemo2');
svg2.selectAll('circle.principle')
	.data(pets).enter()
	.append('circle')
	.attr('class', 'principle')
	.attr('r', 5)
	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
	.attr('cy', (d, i) => baseY - 15 * (i % 10))
	.attr('fill', d => d.bad ? colors.bad : colors.good)
	.attr('fill-opacity', (d, i) => diagnosis[i] ? 0.8 : 0.2)
	.attr('stroke', (d, i) => diagnosis[i] ? "#c0392b" : "none")
	.attr('stroke-width', 3)
	.attr('stroke-opacity', 0.8);

// fairnessdemo3

let svg3 = d3.select('svg#fairnessdemo3');
svg3.selectAll('circle.principle')
	.data(pets).enter()
	.append('circle')
	.attr('class', 'principle')
	.attr('r', 10)
	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 25 * (Math.floor(i / 10)) : baseXDog + 25 * (Math.floor(i / 10)))
	.attr('cy', (d, i) => baseY - 25 * (i % 10))
	.attr('fill', d => d.bad ? colors.bad : colors.good)
	.attr('fill-opacity', 0.8)
	.attr('stroke', (d, i) => {
		if ((i % 10) < 6) {
			if (d.bad) {
				return colors.bad
			} else {
				return colors.good
			}
		} else {
			if (!d.bad) {
				return colors.bad
			} else {
				return colors.good
			}
		}
	})
	.attr('stroke-width', 3)
	.attr('stroke-opacity', 1);

