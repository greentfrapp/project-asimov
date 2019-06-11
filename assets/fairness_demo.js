// fairnessdemo1

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

let svg = d3.select('svg#fairnessdemo'),
text = d3.select('p#explain'),
centerX = 300,
centerY = 200,
baseXCat = 50,
baseXDog = 200,
baseY = 350,
colors = {
	good: "#3498db",
	bad: "#e74c3c",
	goodStroke: "#2980b9",
	badStroke: "#c0392b"
},
texts = [
	"Suppose for a moment that there's a new disease going around infecting our beloved pets, called the Bloody Angry Disease (BAD). As per its name, it causes our pets to get really angry and aggressive. Turns out that it affects 40% of cats and 60% of dogs and these are called BAD cats and BAD dogs.",
	"Fortunately, a company develops an AI system to diagnose if a pet has gotten BAD, by tracking its temperature, weight and appetite. Pets diagnosed with BAD are then sent for treatment, which involves lots of cold baths and cones of shame boohoo.",
	"The company states that its system is fair to both cats and dogs, because its predictions are 80% accurate, regardless of species. Specifically, when a pet is diagnosed to be BAD, there is 80% chance it is actually BAD and 20% chance it isn't. Likewise when a pet is diagnosed to be not BAD.",
	"Here we see 100 dogs and 100 cats being diagnosed by this system.",
	"And we see that the company's claim seems to hold true, approximately.",
	"Let's just consider the case for cats only. The results seem reasonable. Although we do have a few sad cats that got wrongly diagnosed and a few that slipped pass the system. After all, the system isn't perfect.",
	"Next let's take a look at the results for dogs. This seems alright as well. The system does seem to label more dogs as BAD but that seems fair given that dogs are more likely to be BAD.",
	"So... everything is good right?",
	"Hmm... what if we look at things from the point of view from a cat that is not BAD.",
	"What about a dog that is not BAD?",
	"Cats that are BAD",
	"Dogs that are BAD"
];

// Frame 1

var app = new Vue({
	el: "#main",
	mounted: function() {
		d3.select('p#explain').text(this.texts[this.step]);
		this.updateSvg();
	},
	data: {
		step: 0,
		texts: texts,
		pets: pets,
		timeIn: 500,
		timeOut: 500
	},
	computed: {
		frames: function() {
			return [this.frame0, this.frame1, this.frame2, this.frame3, this.frame4, this.frame5, this.frame6, this.frame7, this.frame8, this.frame9, this.frame10, this.frame11];
			// return [this.frame3]
		},
		diagnosis: function() {
			return this.diagnose();
		},
		stats: function() {
			let stats = {
				cat: {
					TP: 0,
					FP: 0,
					TN: 0,
					FN: 0
				},
				dog: {
					TP: 0,
					FP: 0,
					TN: 0,
					FN: 0
				},
				total: {
					TP: 0,
					FP: 0,
					TN: 0,
					FN: 0
				},
			};
			this.diagnosis.forEach((el, i) => {
				let pet = this.pets[i];
				if (el.diagnosis && pet.bad) {
					stats[pet.species].TP += 1;
					stats.total.TP += 1;
				} else if (!el.diagnosis && !pet.bad) {
					stats[pet.species].TN += 1;
					stats.total.TN += 1;
				} else if (el.diagnosis && !pet.bad) {
					stats[pet.species].FP += 1;
					stats.total.FP += 1;
				} else if (!el.diagnosis && pet.bad) {
					stats[pet.species].FN += 1;
					stats.total.FN += 1;
				}
			});
			return stats;
		}
	},
	methods: {
		transitText: function() {
			if (this.step < this.texts.length - 1) {
				this.step += 1;
				this.updateText();
				this.updateSvg();
			}
		},
		updateText: function() {
			d3.select('p#explain').text(this.texts[this.step])
			// d3.select('p#explain').transition()
			// 	.duration(this.timeIn)
			// 	.style('opacity', 0)
			// 	.on('end', () => d3.select('p#explain').transition()
			// 		.duration(this.timeOut)
			// 		.text(this.texts[this.step]).style('opacity', 1));
		},
		updateSvg: function() {
			let svg = d3.select('svg#fairnessdemo');
			this.frames[this.step](svg);
		},
		frame0: function(svg) {
			svg.selectAll('circle.pets')
				.data(this.pets).enter()
				.append('circle')
				.attr('class', 'pets')
				.attr('r', 5)
				.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
				.attr('cy', (d, i) => baseY - 15 * (i % 10))
				.attr('fill', d => d.bad ? colors.bad : colors.good)
				.attr('fill-opacity', 0.8);
		},
		frame1: function(svg) {
			svg.selectAll('circle.pets')
				// .transition()
				// .duration(this.timeIn)
				.attr('opacity', 0);
			svg.selectAll('circle.diagnosis')
				.data([{"diagnosis":true},{"diagnosis":false}]).enter()
				.append('circle')
				.attr('class', 'diagnosis')
				.attr('r', 50)
				.attr('cx', centerX)
				.attr('cy', d => d.diagnosis ? centerY - 100 : centerY + 100)
				.attr('fill', "#FFF")
				.attr('stroke', d => d.diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-width', 5)
		},
		frame2: function(svg) {
			let actualData = Array.from({length: 20})
				.map((x,i) => {
					let diagnosis = (i < 10),
					bad = diagnosis;
					if (i < 2 || (i >= 10 && i < 12)) {
						bad = !bad;
					}
					return {
						bad: bad,
						diagnosis: diagnosis
					}
				});

			svg.selectAll('circle.actual')
				.data(actualData).enter()
				.append('circle')
				.attr('class', 'actual')
				.attr('r', 10)
				.attr('cx', centerX)
				.attr('cy', d => d.bad ? centerY - 100 : centerY + 100)
				.attr('fill', d => d.bad ? colors.bad : colors.good)
				.attr('stroke', d => d.diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-width', 4);

			let simulation = d3.forceSimulation(actualData)
				// .force('charge', d3.forceManyBody().strength(-10))
				.force('center', d3.forceCenter(centerX, centerY))
				.force('x', d3.forceX().x(centerX))
				.force('y', d3.forceY().y(d => d.diagnosis ? centerY - 100 : centerY + 100))
				.force('collision', d3.forceCollide().radius(12))
				.on('tick', ticked);

			function ticked() {
				svg.selectAll('circle.actual')
					.attr('cx', d => d.x)
					.attr('cy', d => d.y)
			}		
		},
		frame3: function(svg) {
			svg.selectAll('circle.diagnosis').attr('opacity', 0)
			svg.selectAll('circle.actual').attr('opacity', 0)
			svg.selectAll('circle.pets')
				.attr('opacity', 1)
				.attr('fill-opacity', 0)
				.attr('stroke', (d, i) => this.diagnosis[i].diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-width', 3)
		},
		frame4: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('cx', (d, i) => centerX - 50 + 15 * (this.diagnosis[i].idx % 10))
				.attr('cy', (d, i) => this.diagnosis[i].diagnosis ? baseY - 200 - 15 * Math.floor(this.diagnosis[i].idx / 10) : baseY - 15 * Math.floor(this.diagnosis[i].idx / 10))
				.attr('fill-opacity', 0.8)
			svg.append('text')
				.attr('id', 'accuracyBad')
				.attr('x', 100)
				.attr('y', 100)
				.text((this.stats.total.TP / (this.stats.total.TP + this.stats.total.FP)).toString())
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
			svg.append('text')
				.attr('id', 'accuracyGood')
				.attr('x', 100)
				.attr('y', 200)
				.text((this.stats.total.TN / (this.stats.total.TN + this.stats.total.FN)).toString())
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		frame5: function(svg) {
			svg.select('text#accuracyBad').transition().duration(1000).attr('opacity', 0);
			svg.select('text#accuracyGood').transition().duration(1000).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'cat' ? 1 : 0)
		},
		frame6: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'dog' ? 1 : 0)
		},
		frame7: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', 1)
				.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
				.attr('cy', (d, i) => baseY - 15 * (i % 10))
		},
		frame8: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'cat' && !d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'goodCat')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.cat.FP / (this.stats.cat.TN + this.stats.cat.FP)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		frame9: function(svg) {
			svg.select('text#goodCat').transition().duration(1000).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'dog' && !d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'goodDog')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.dog.FP / (this.stats.dog.TN + this.stats.dog.FP)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		frame10: function(svg) {
			svg.select('text#goodDog').transition().duration(1000).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'cat' && d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'badCat')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.cat.TP / (this.stats.cat.TP + this.stats.cat.FN)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		frame11: function(svg) {
			svg.select('text#badCat').transition().duration(1000).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(1000)
				.attr('opacity', d => d.species === 'dog' && d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'badDog')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.dog.TP / (this.stats.dog.TP + this.stats.dog.FN)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		diagnose: function() {
			// randomly select pets to match 80% diagnosis
			// calculated with Bayes theorem
			let diagnosis = [],
			trueCount = 0,
			falseCount = 0;
			for (let i=0; i<200; i++) {
				let dice = false;
				if (i < 100) {
					if (i < 40) {
						dice = Math.random() < 4/6;
					} else {
						dice = Math.random() < 1/9;
					}
				} else {
					if (i < 160) {
						dice = Math.random() < 8/9;
					} else {
						dice = Math.random() < 1/3;
					}
				}
				if (dice) {
					diagnosis.push({
						diagnosis: dice,
						idx: trueCount
					});
					trueCount += 1;
				} else {
					diagnosis.push({
						diagnosis: dice,
						idx: falseCount
					});
					falseCount += 1;
				}
			}
			return diagnosis
		}
	}
});




// let svg1 = d3.select('svg#fairnessdemo1'),
// centerX = 300,
// centerY = 200,
// baseXCat = 50,
// baseXDog = 200,
// baseY = 350,
// colors = {
// 	good: "#3498db",
// 	bad: "#e74c3c"
// };

// svg1.selectAll('circle.principle')
// 	.data(pets).enter()
// 	.append('circle')
// 	.attr('class', 'principle')
// 	.attr('r', 5)
// 	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
// 	.attr('cy', (d, i) => baseY - 15 * (i % 10))
// 	.attr('fill', d => d.bad ? colors.bad : colors.good)
// 	.attr('fill-opacity', 0.8);

// // fairnessdemo2



// let diagnosis = diagnose();

// let svg2 = d3.select('svg#fairnessdemo2');
// svg2.selectAll('circle.principle')
// 	.data(pets).enter()
// 	.append('circle')
// 	.attr('class', 'principle')
// 	.attr('r', 5)
// 	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
// 	.attr('cy', (d, i) => baseY - 15 * (i % 10))
// 	.attr('fill', d => d.bad ? colors.bad : colors.good)
// 	.attr('fill-opacity', (d, i) => diagnosis[i] ? 0.8 : 0.2)
// 	.attr('stroke', (d, i) => diagnosis[i] ? "#c0392b" : "none")
// 	.attr('stroke-width', 3)
// 	.attr('stroke-opacity', 0.8);

// // fairnessdemo3

// let svg3 = d3.select('svg#fairnessdemo3');
// svg3.selectAll('circle.principle')
// 	.data(pets).enter()
// 	.append('circle')
// 	.attr('class', 'principle')
// 	.attr('r', 10)
// 	.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 25 * (Math.floor(i / 10)) : baseXDog + 25 * (Math.floor(i / 10)))
// 	.attr('cy', (d, i) => baseY - 25 * (i % 10))
// 	.attr('fill', d => d.bad ? colors.bad : colors.good)
// 	.attr('fill-opacity', 0.8)
// 	.attr('stroke', (d, i) => {
// 		if ((i % 10) < 6) {
// 			if (d.bad) {
// 				return colors.bad
// 			} else {
// 				return colors.good
// 			}
// 		} else {
// 			if (!d.bad) {
// 				return colors.bad
// 			} else {
// 				return colors.good
// 			}
// 		}
// 	})
// 	.attr('stroke-width', 3)
// 	.attr('stroke-opacity', 1);

