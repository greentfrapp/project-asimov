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
baseXCat = 5,
baseXDog = 305,
baseY = 300,
colors = {
	good: "#3498db",
	bad: "#e74c3c",
	goodStroke: "#2980b9",
	badStroke: "#c0392b"
},
texts = [
	"Suppose for a moment that certain pets tend to be fatter than other pets, and that dogs are more likely to be fat, as compared to cats. In fact, cats only have a 40% chance of being fat, while dogs have a 60% chance of being fat.",
	"Fortunately, a company develops an AI system to diagnose if a pet is fat! Pets diagnosed as fat are then kept on a diet, which means less food and no treats boohoo.",
	"The company states that its system is fair to both cats and dogs! Because its predictions are 80% accurate, regardless of species. Specifically, when a pet is diagnosed to be fat, there is 80% chance it is actually fat. Likewise, when a no-fat diagnosis is made, there is 80% chance the pet is not fat.",
	"Here we see 100 dogs and 100 cats being diagnosed by this system.",
	"And we see that the company's claim seems to hold true, approximately. In all cases, the accuracy seems to be similar regardless of whether we are looking at cats or dogs. This seems fair enough.",
	"But what if we look at fairness another way?",
	"Consider if we actually have a fat pet, does it make a difference if our pet is a cat or a dog? Which is more likely to escape the prying eyes of the AI?",
	"Next let's assume we actually have a thin pet. It will be pretty sad for a thin pet to be wrongly punished because of a misdiagnosis. Does it matter if it is a cat or a dog?",
	""
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
			return [this.frame0, this.frame1, this.frame2, this.frame3, this.frame4, this.frame5, this.frame6, this.frame7, this.frame8];
			// return [this.frame0, this.frame1, this.frame2, this.frame3, this.frame4, this.frame5]
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
			let size = 29;
			let pets = svg.selectAll('.pets')
				.data(this.pets, function(d) { return d.name; }).enter()
				.append('g')
				.attr('class', (d, i) => this.diagnosis[i].diagnosis ? "pets diagnoseBad" : "pets diagnoseGood")

			pets.append('image')
				.attr('xlink:href', (d, i) => {
					if (i < 100) {
						return '../assets/imagenet_cats/' +imagenet_cats_dict[i]
					} else {
						return '../assets/imagenet_dogs/' +imagenet_dogs_dict[i - 100]
					}
				})
				.attr('x', (d, i) => (d.species == "cat") ? baseXCat + size * (Math.floor(i / 10)) + 13 : baseXDog + size * (Math.floor((i - 100) / 10)) + 39)
				.attr('y', (d, i) => baseY - size * (i % 10))
				.attr('width', size)
      			.attr('height', size)
      			.attr('preserveAspectRatio', 'xMidYMin slice')
      			.attr('opacity', 0.8)
      			.style('filter', d => d.bad ? 'url("#red")' : 'url("#blue")')

			pets.append('rect')
				.attr('x', (d, i) => (d.species == "cat") ? baseXCat + size * (Math.floor(i / 10)) + 14 : baseXDog + size * (Math.floor((i - 100) / 10)) + 40)
				.attr('y', (d, i) => baseY - size * (i % 10))
				.attr('width', size)
  				.attr('height', size)
  				.attr('fill-opacity', 0)
  				.attr('stroke', d => d.bad ? colors.bad : colors.good)
  				.attr('stroke-width', 5)
  				.attr('stroke-opacity', 0)
				.on('mouseover.expand', expand)
				.on('mouseover.respond', d => respond(d.bad, d.species))
				.on('mouseout', contract);

			function expand() {
				let size = 100;

				d3.select(this.parentNode)
					.raise()

				d3.select(this.parentNode)
					.select('image')
					.attr('width', size)
					.attr('height', size)
					.attr('opacity', 1)
      				.style('filter', undefined)
      			
      			d3.select(this)
					.attr('width', size)
					.attr('height', size)
					.attr('stroke-opacity', 1)
      				
			}
			function contract() {
				d3.select(this.parentNode)
					.select('image')
					.attr('width', size)
					.attr('height', size)
					.attr('opacity', 0.8)
					.style('filter', d => d.bad ? 'url("#red")' : 'url("#blue")')
				d3.select(this)
					.attr('width', size)
					.attr('height', size)
					.attr('stroke-opacity', 0)
				d3.select('#response')
					.text('')
      			
			}
			function respond(bad, species) {
				d3.select('#response')
					.text(bad ? "Fat " + species + "!" : "Thin " + species + "!");
			}

			svg.append('text')
				.attr('class', 'f0')
				.text('CATS')
				.attr('x', 160)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f0')
				.text('DOGS')
				.attr('x', 490)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('id', 'response')
				.attr('class', 'f0')
				.text('')
				.attr('x', 320)
				.attr('y', 370)
				.attr('font-size', 24)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frameNA: function(svg) {
			svg.selectAll('circle.pets')
				.data(this.pets).enter()
				.append('circle')
				.attr('class', 'pets')
				.attr('r', 5)
				.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
				.attr('cy', (d, i) => baseY - 15 * (i % 10))
				.attr('fill', d => d.bad ? colors.bad : colors.good)
				.attr('fill-opacity', 0.8)
		},
		frame1: function(svg) {
			svg.selectAll('.f0')
				.data([]).exit().remove()

			svg.selectAll('.pets')
				// .transition()
				// .duration(this.timeIn)
				.attr('opacity', 0)
				.select('rect')
				.on('mouseover.expand', undefined)
				.on('mouseover.respond', undefined)
				.on('mouseout', undefined);
			svg.selectAll('.diagnosis')
				.data([{"diagnosis":true},{"diagnosis":false}]).enter()
				.append('circle')
				.attr('class', 'diagnosis')
				.attr('r', 140)
				.attr('cx', d => d.diagnosis ? centerX - 150 + 13 : centerX + 150 + 39)
				.attr('cy', centerY - 10)
				.attr('fill', "#FFF")
				.attr('stroke', d => d.diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-width', 5)

			let samplesData = Array.from({length: 20})
				.map((x, i) => {
					let diagnosis = (i < 10),
					bad = diagnosis,
					image = '../assets/imagenet_cats/' + imagenet_cats_dict[i];
					if (i < 2 || (i >= 10 && i < 12)) {
						bad = !bad;
					}

					let text = ""
					if (diagnosis !== bad) {
						text += "WRONG! "
						if (bad) {
							text += "This fat pet got away!"
						} else {
							text += "This thin pet got punished for nothing!"
						}
					} else {
						text += "CORRECT! "
						if (bad) {
							text += "This fat pet goes on a diet!"
						} else {
							text += "This thin pet gets snacks!"
						}
					}
					return {
						bad: bad,
						diagnosis: diagnosis,
						image: image,
						text: text
					}
				})

			let size = 50;

			let samples = svg.selectAll('.samples')
				.data(samplesData, function(d) { return d.name; }).enter()
				.append('g')
				.attr('class', 'samples')

			samples.append('image')
				.attr('xlink:href', d => d.image)
				.attr('x', centerX)
				.attr('y', centerY - 30)
				.attr('width', size)
      			.attr('height', size)
      			.attr('preserveAspectRatio', 'xMidYMin slice');

      		let simulation = d3.forceSimulation(samplesData)
				.force('center', d3.forceCenter(centerX - 0.5 * size + 23, centerY - 10 - 0.5 * size))
				.force('x', d3.forceX().x(d => d.diagnosis ? centerX - 150 + 13 : centerX + 150 + 39))
				.force('y', d3.forceY().y(centerY - 10))
				.force('collision', d3.forceCollide().radius(35))
				.on('tick', ticked);

			function ticked() {
				svg.selectAll('.samples')
					.select('image')
					.attr('x', d => d.x)
					.attr('y', d => d.y)
			}

			svg.append('text')
				.attr('class', 'f2')
				.text('Diagnosed Fat')
				.attr('x', 160)
				.attr('y', 30)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f1')
				.text("These pets get less food")
				.attr('x', 160)
				.attr('y', 358)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f1')
				.text("and no more treats.")
				.attr('x', 160)
				.attr('y', 378)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f2')
				.text('Diagnosed Thin')
				.attr('x', 490)
				.attr('y', 30)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f1')
				.text("These pets get to chill")
				.attr('x', 490)
				.attr('y', 358)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f1')
				.text("and eat more treats!")
				.attr('x', 490)
				.attr('y', 378)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

		},
		frame2: function(svg) {
			svg.selectAll('.f1')
				.data([]).exit().remove()

			svg.append('text')
				.attr('id', 'explainer2')
				.attr('x', 320)
				.attr('y', 395)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle');
				
			svg.selectAll('.samples')
				.select('image')
				.style('filter', d => d.bad ? 'url("#red")' : 'url("#blue")')
				.on('mouseover.image', expand)
				.on('mouseover.caption', d => showCaption(d.text))
				.on('mouseout', hideCaption);

			function expand() {
				d3.select(this.parentNode)
					.raise();
				d3.select(this)
					.attr('width', 60)
					.attr('height', 60);
			}

			function showCaption(t) {
				svg.select('text#explainer2')
					.text(t)
			}

			function hideCaption() {
				svg.select('text#explainer2')
					.text('')
				d3.select(this)
					.attr('width', 50)
					.attr('height', 50)
			}

			svg.append('text')
				.attr('class', 'f2')
				.text("Certified 80% Correct")
				.attr('x', 160)
				.attr('y', 358)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f2')
				.text("Certified 80% Correct")
				.attr('x', 490)
				.attr('y', 358)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

		},
		frame2a: function(svg) {
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
			svg.selectAll('.f2')
				.data([]).exit().remove()

			svg.selectAll('.diagnosis')
				.data([]).exit().remove()
			svg.selectAll('.samples')
				.data([]).exit().remove()
			svg.selectAll('.pets')
				.transition()
				.duration(this.timeIn)
				.attr('opacity', 1)
			svg.selectAll('.pets')
				.select('image')
				.style('filter', undefined)
				.on('mouseover', undefined)
				.on('mouseout', undefined)

			let size = 29;
			svg.selectAll('.pets')
				.select('rect')
				// .raise()
				.attr('x', (d, i) => (d.species == "cat") ? baseXCat + size * (Math.floor(i / 10)) + 14 : baseXDog + size * (Math.floor((i - 100) / 10)) + 40)
				.attr('y', (d, i) => baseY - size * (i % 10))
				.attr('width', 28)
				.attr('height', 28)
				.attr('stroke', (d, i) => this.diagnosis[i].diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-opacity', 1)
				.attr('stroke-width', 2)

			svg.append('text')
				.attr('class', 'f3')
				.text('CATS')
				.attr('x', 160)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f3')
				.text('DOGS')
				.attr('x', 490)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame3a: function(svg) {
			svg.selectAll('circle.diagnosis').attr('opacity', 0)
			svg.selectAll('circle.actual').attr('opacity', 0)
			svg.selectAll('circle.pets')
				.attr('opacity', 1)
				.attr('fill-opacity', 0)
				.attr('stroke', (d, i) => this.diagnosis[i].diagnosis ? colors.badStroke : colors.goodStroke)
				.attr('stroke-width', 3)
		},
		frame4: function(svg) {
			svg.selectAll('.f3')
				.data([]).exit().remove()

			let size = 24,
			duration = 1000;
			svg.selectAll('.pets')
				.select('image')
				.transition().duration(duration)
				.attr('width', size)
				.attr('height', size)
				.attr('x', (d, i) => {
					if (this.diagnosis[i].diagnosis) {
						if (d.species === 'cat') {
							return 12 + size * (this.diagnosis[i].idx % 6)
						} else {
							return 170 + size * (this.diagnosis[i].idx % 6)
						}
					} else {
						if (d.species === 'cat') {
							return 340 + size * (this.diagnosis[i].idx % 6)
						} else {
							return 496 + size * (this.diagnosis[i].idx % 6)
						}
					}
				})
				.attr('y', (d, i) => baseY + 7 - size * Math.floor(this.diagnosis[i].idx / 6))
				// .attr('x', (d, i) => this.diagnosis[i].diagnosis ? baseXCat + size * (Math.floor(this.diagnosis[i].idx / 10)) : baseXDog + 27 + size * (Math.floor(this.diagnosis[i].idx / 10)))
				// .attr('y', (d, i) => baseY - size * (this.diagnosis[i].idx % 10))
				.style('filter', d => d.bad ? 'url("#red")' : 'url("#blue")')
			
			svg.selectAll('.pets')
				.select('rect')
				.on('mouseover', (d, i) => respond(d.bad, this.diagnosis[i].diagnosis, d.species))
				.on('mouseout', clear)
				
			svg.selectAll('.pets')
				.select('rect')
				.transition().duration(duration)
				// .attr('x', (d, i) => this.diagnosis[i].diagnosis ? baseXCat + size * (Math.floor(this.diagnosis[i].idx / 10)) + 1 : baseXDog + 27 + size * (Math.floor(this.diagnosis[i].idx / 10)) + 1)
				// .attr('y', (d, i) => baseY - size * (this.diagnosis[i].idx % 10))
				.attr('width', size)
				.attr('height', size)
				.attr('x', (d, i) => {
					if (this.diagnosis[i].diagnosis) {
						if (d.species === 'cat') {
							return 12 + size * (this.diagnosis[i].idx % 6)
						} else {
							return 170 + size * (this.diagnosis[i].idx % 6)
						}
					} else {
						if (d.species === 'cat') {
							return 340 + size * (this.diagnosis[i].idx % 6)
						} else {
							return 496 + size * (this.diagnosis[i].idx % 6)
						}
					}
				})
				.attr('y', (d, i) => baseY + 7 - size * Math.floor(this.diagnosis[i].idx / 6))

			svg.append('text')
				.attr('class', 'f4')
				.text('Cats Diagnosed Fat')
				.attr('x', 85)
				.attr('y', 18)
				.attr('font-size', 14)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f4')
				.text('Dogs Diagnosed Fat')
				.attr('x', 243)
				.attr('y', 18)
				.attr('font-size', 14)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f4')
				.text('Cats Diagnosed Thin')
				.attr('x', 413)
				.attr('y', 18)
				.attr('font-size', 14)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f4')
				.text('Dogs Diagnosed Thin')
				.attr('x', 568)
				.attr('y', 18)
				.attr('font-size', 14)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f4')
				.text((100 * this.stats.cat.TP / (this.stats.cat.TP + this.stats.cat.FP)).toFixed(1) +"% Correct")
				.attr('x', 85)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f4')
				.text((100 * this.stats.dog.TP / (this.stats.dog.TP + this.stats.dog.FP)).toFixed(1) +"% Correct")
				.attr('x', 243)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)

			svg.append('rect')
				.lower()
				.attr('class', 'f4')
				.attr('x', 2)
				.attr('y', 0)
				.attr('width', 323)
				.attr('height', 363)
				.attr('fill', colors.bad)
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 0.2)

			svg.append('text')
				.attr('class', 'f4')
				.text((100 * this.stats.cat.TN / (this.stats.cat.TN + this.stats.cat.FN)).toFixed(1) +"% Correct")
				.attr('x', 413)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f4')
				.text((100 * this.stats.dog.TN / (this.stats.dog.TN + this.stats.dog.FN)).toFixed(1) +"% Correct")
				.attr('x', 568)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 1)

			svg.append('rect')
				.lower()
				.attr('class', 'f4')
				.attr('x', 330)
				.attr('y', 0)
				.attr('width', 323)
				.attr('height', 363)
				.attr('fill', colors.good)
				.attr('opacity', 0)
				.transition().duration(duration)
				.attr('opacity', 0.2)

			svg.append('text')
				.attr('class', 'f4')
				.attr('id', 'explainer4')
				.text('')
				.attr('x', 320)
				.attr('y', 393)
				.attr('font-size', 24)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 1)

			function respond(bad, diagnosis, species) {
				let msg = ""
				if (bad) {
					msg += "This bad " + species
					if (diagnosis) {
						msg += " was diagnosed correctly!";
					} else {
						msg += " was diagnosed wrongly!";
					}
				} else {
					msg += "This good " + species
					if (diagnosis) {
						msg += " was diagnosed wrongly!";
					} else {
						msg += " was diagnosed correctly!";
					}
				}
				d3.select('#explainer4').text(msg);
			}

			function clear() {
				d3.select('#explainer4').text('');
			}
		},
		frame4a: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('cx', (d, i) => centerX - 50 + 15 * (this.diagnosis[i].idx % 10))
				.attr('cy', (d, i) => this.diagnosis[i].diagnosis ? baseY - 200 - 15 * Math.floor(this.diagnosis[i].idx / 10) : baseY - 15 * Math.floor(this.diagnosis[i].idx / 10))
				.attr('fill-opacity', 0.8)
			svg.append('text')
				.attr('id', 'accuracyBad')
				.attr('x', 100)
				.attr('y', 100)
				.text((this.stats.total.TP / (this.stats.total.TP + this.stats.total.FP)).toString())
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('id', 'accuracyGood')
				.attr('x', 100)
				.attr('y', 200)
				.text((this.stats.total.TN / (this.stats.total.TN + this.stats.total.FN)).toString())
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame5: function(svg) {
			svg.selectAll('.f4')
				.data([]).exit().remove()

			let size = 29;

			svg.selectAll('.pets')
				.select('image')
				.transition().duration(1000)
				.attr('width', size)
				.attr('height', size)
				.attr('x', (d, i) => (d.species == "cat") ? baseXCat + size * (Math.floor(i / 10)) + 13 : baseXDog + size * (Math.floor((i - 100) / 10)) + 39)
				.attr('y', (d, i) => baseY - size * (i % 10))

			svg.selectAll('.pets')
				.select('rect')
				.transition().duration(1000)
				.attr('width', size)
				.attr('height', size)
				.attr('x', (d, i) => (d.species == "cat") ? baseXCat + size * (Math.floor(i / 10)) + 14 : baseXDog + size * (Math.floor((i - 100) / 10)) + 40)
				.attr('y', (d, i) => baseY - size * (i % 10))

			svg.append('text')
				.attr('class', 'f5')
				.text('CATS')
				.attr('x', 160)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f5')
				.text('DOGS')
				.attr('x', 490)
				.attr('y', 27)
				.attr('font-size', 28)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(1000)
				.attr('opacity', 1)
		},
		frame5a: function(svg) {
			svg.select('text#accuracyBad').transition().duration(500).attr('opacity', 0);
			svg.select('text#accuracyGood').transition().duration(500).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'cat' ? 1 : 0)
		},
		frame6: function(svg) {
			svg.selectAll('.f5')
				.data([]).exit().remove()

			svg.selectAll('.pets')
				.select('image')
				.transition().duration(500)
				.attr('opacity', d => d.bad ? 0.6 : 0.2)
			svg.selectAll('.pets')
				.select('rect')
				.transition().duration(500)
				.attr('opacity', d => d.bad ? 1 : 0)
				.attr('stroke-opacity', (d, i) => this.diagnosis[i].diagnosis ? 0 : 1)
				.attr('stroke-width', 3)
			// svg.selectAll('.diagnoseBad')
			// 	.lower()
			// svg.selectAll('.diagnoseGood')
			// 	.raise()

			svg.append('text')
				.attr('class', 'f6')
				.text('If you are a fat cat...')
				.attr('x', 160)
				.attr('y', 27)
				.attr('font-size', 24)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f6')
				.text("You have a " + (100 * this.stats.cat.FN / (this.stats.cat.TP + this.stats.cat.FN)).toFixed(1) + "% chance of being")
				.attr('x', 160)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f6')
				.text("diagnosed wrongly and escaping.")
				.attr('x', 160)
				.attr('y', 383)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f6')
				.text('If you are a fat dog...')
				.attr('font-size', 24)
				.attr('x', 490)
				.attr('y', 27)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f6')
				.text("You have a " + (100 * this.stats.dog.FN / (this.stats.dog.TP + this.stats.dog.FN)).toFixed(1) + "% chance of being")
				.attr('x', 490)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f6')
				.text("diagnosed wrongly and escaping.")
				.attr('x', 490)
				.attr('y', 383)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame6a: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'dog' ? 1 : 0)
		},
		frame7: function(svg) {
			svg.selectAll('.f6')
				.data([]).exit().remove()

			svg.selectAll('.pets')
				.select('image')
				.transition().duration(500)
				.attr('opacity', d => !d.bad ? 0.6 : 0.2)
			svg.selectAll('.pets')
				.select('rect')
				.transition().duration(500)
				.attr('opacity', d => !d.bad ? 1 : 0)
				.attr('stroke-opacity', (d, i) => !this.diagnosis[i].diagnosis ? 0 : 1)
			// svg.selectAll('.diagnoseGood')
			// 	.lower()
			// svg.selectAll('.diagnoseBad')
			// 	.raise()

			svg.append('text')
				.attr('class', 'f7')
				.text('If you are a thin cat...')
				.attr('font-size', 24)
				.attr('x', 160)
				.attr('y', 27)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f7')
				.text("You have a " + (100 * this.stats.cat.FP / (this.stats.cat.TN + this.stats.cat.FP)).toFixed(1) + "% chance of being")
				.attr('x', 160)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f7')
				.text("wrongly punished.")
				.attr('x', 160)
				.attr('y', 383)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f7')
				.text('If you are a thin dog...')
				.attr('font-size', 24)
				.attr('x', 490)
				.attr('y', 27)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f7')
				.text("You have a " + (100 * this.stats.dog.FP / (this.stats.dog.TN + this.stats.dog.FP)).toFixed(1) + "% chance of being")
				.attr('x', 490)
				.attr('y', 353)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f7')
				.text("wrongly punished.")
				.attr('x', 490)
				.attr('y', 383)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame7a: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', 1)
				.attr('cx', (d, i) => (d.species == "cat") ? baseXCat + 15 * (Math.floor(i / 10)) : baseXDog + 15 * (Math.floor(i / 10)))
				.attr('cy', (d, i) => baseY - 15 * (i % 10))
		},
		frame8: function(svg) {
			svg.selectAll('.f7')
				.data([]).exit().remove()

			svg.selectAll('.pets')
				.select('image')
				.transition().duration(500)
				.attr('opacity', 0.1)
			svg.selectAll('.pets')
				.select('rect')
				.transition().duration(500)
				.attr('opacity', 0.1)
				.attr('stroke-opacity', 0.5)

			svg.append('text')
				.attr('class', 'f8')
				.text('In other words...')
				.attr('x', 320)
				.attr('y', 87)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '300')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f8')
				.text('Fat cats are far more likely to escape')
				.attr('x', 320)
				.attr('y', 147)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f8')
				.text('as compared to fat dogs.')
				.attr('x', 320)
				.attr('y', 172)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f8')
				.text('And thin dogs are far more likely to be wrongly')
				.attr('x', 320)
				.attr('y', 217)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
			svg.append('text')
				.attr('class', 'f8')
				.text('punished as compared to thin cats.')
				.attr('x', 320)
				.attr('y', 242)
				.attr('font-size', 20)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

			svg.append('text')
				.attr('class', 'f8')
				.text('Is that fair?')
				.attr('x', 320)
				.attr('y', 297)
				.attr('font-size', 24)
				.attr('font-family', 'Open Sans')
				.attr('font-weight', '600')
				.attr('text-anchor', 'middle')
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)

		},
		frame8a: function(svg) {
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'cat' && !d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'goodCat')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.cat.FP / (this.stats.cat.TN + this.stats.cat.FP)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame9: function(svg) {
			svg.select('text#goodCat').transition().duration(500).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'dog' && !d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'goodDog')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.dog.FP / (this.stats.dog.TN + this.stats.dog.FP)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame10: function(svg) {
			svg.select('text#goodDog').transition().duration(500).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'cat' && d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'badCat')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.cat.TP / (this.stats.cat.TP + this.stats.cat.FN)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		frame11: function(svg) {
			svg.select('text#badCat').transition().duration(500).attr('opacity', 0);
			svg.selectAll('circle.pets')
				.transition().duration(500)
				.attr('opacity', d => d.species === 'dog' && d.bad ? 1 : 0.2);
			svg.append('text')
				.attr('id', 'badDog')
				.attr('x', 100)
				.attr('y', 100)
				.text("Chance of diagnosing BAD: " + (100 * this.stats.dog.TP / (this.stats.dog.TP + this.stats.dog.FN)).toFixed(0) +"%")
				.attr('opacity', 0)
				.transition().duration(500)
				.attr('opacity', 1)
		},
		diagnose: function() {
			// randomly select pets to match 80% diagnosis
			// calculated with Bayes theorem
			let diagnosis = [],
			trueCountCat = 0,
			trueCountDog = 0,
			falseCountCat = 0,
			falseCountDog = 0;
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
					if (i < 100) {
						diagnosis.push({
							diagnosis: dice,
							idx: trueCountCat
						});
						trueCountCat += 1;
					} else {
						diagnosis.push({
							diagnosis: dice,
							idx: trueCountDog
						});
						trueCountDog += 1;
					}
				} else {
					if (i < 100) {
						diagnosis.push({
							diagnosis: dice,
							idx: falseCountCat
						});
						falseCountCat += 1;
					} else {
						diagnosis.push({
							diagnosis: dice,
							idx: falseCountDog
						});
						falseCountDog += 1;
					}
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

