
let config = {
	width: 800,
	height: 700,
	topBar: 50,
	topScale: 6,
	topShift: 20,
	botBar: 400,
	problemBar: 600,
	colors: [
		"#2980b9",
		"#16a085",
		"#27ae60",
		"#f39c12",
		"#d35400",
		"#c0392b",
		"#8e44ad",
		"#2c3e50"
	],
	subPLength: 100,
	subPWidth: 3,
	linkWidth: 2,
	ogOpacity: 0.5
}

let framework = new Vue({
	el: "#framework-diagram",
	mounted: function() {
		let self = this
		self.svg = d3.select("#framework-diagram > svg")
		d3.json("../assets/principles.json").then(function(data) {
			self.data = data
			self.dataByContents = d3.nest()
				.key(d => d.content).entries(self.data)
			self.dataByReports = d3.nest()
				.key(d => d.report).key(d => d.content)
				.entries(self.data)
			self.dataByPrinciples = d3.nest()
				.key(d => d.principle)
				.sortKeys((a, b) => self.principles.indexOf(a) - self.principles.indexOf(b))
				.entries(self.data)


			let count = 0
			self.dataByReports.forEach(report => {
				report.startX = count * config.topScale + config.topShift
				count += report.values.length
				report.endX = count * config.topScale + config.topShift
				count += 3
				self.reportsStartPos[report.key] = report.startX
				self.nodes.push({
					type: "report",
					name: report.key,
					x: report.startX
				})
				self.nodes.push({
					type: "report",
					name: report.key,
					x: report.endX
				})
				self.contentsStartPos[report.key] = {}
				report.values.forEach((subp, i) => {
					let x = i * 6 + self.reportsStartPos[report.key]
					self.contentsStartPos[report.key][subp.key] = x
					self.nodes.push({
						type: "content",
						name: subp.key,
						report: report.key,
						x: x
					})
				})
			})
			self.dataByPrinciples.forEach((principle, i) => {
				self.principlesStartPos[principle.key] = i * 100 + 50
				self.nodes.push({
					type: "principle",
					name: principle.key,
					x: i * 100 + 50
				})
			})

			// Top Bar
			self.svg.selectAll("line.report-line")
				.data(self.dataByReports).enter()
				.append("line")
				.attr("class", "report-line")
				.attr("x1", d => d.startX)
				.attr("y1", config.topBar)
				.attr("x2", d => d.endX)
				.attr("y2", config.topBar)
				.attr("stroke", "#AAAAAA")

			self.svg.selectAll("text.report-name")
				.data(self.dataByReports).enter()
				.append("text")
				.attr("class", "report-name")
				.attr("x", d => d.startX)
				.attr("y", config.topBar - 5)
				.attr("font-size", 10)
				.attr("font-family", "Open Sans")
				.attr("font-weight", "300")
				.attr("text-anchor", "left")
				.text(d => d.key.split(" ")[0])

			// Bottom Bar
			self.svg.selectAll("circle.principle-line")
				.data(self.dataByPrinciples).enter()
				.append("circle")
				.attr("class", "principle-line")
				.attr("r", 10)
				.attr("cx", (d, i) => i * 100 + 50)
				.attr("cy", config.botBar)
				.attr("fill", (d, i) => config.colors[i])
			self.svg.selectAll("text.principle-name")
				.data(self.dataByPrinciples).enter()
				.append("text")
				.attr("class", "principle-name")
				.attr("x", (d, i) => i * 100 + 50)
				.attr("y", config.botBar + 30)
				.attr("font-size", 14)
				.attr("fill", (d, i) => config.colors[i])
				.attr("font-family", "Open Sans")
				.attr("font-weight", "300")
				.attr("text-anchor", "middle")
				.text(d => d.key)

			// Links
			// Top Link
			let reportGroups = self.svg.selectAll("g.report-group")
				.data(self.dataByReports).enter()
				.append("g")
				.attr("class", "report-group")
				.attr("val", d => d.key)
				.lower()
			let subPrincipleGroups = reportGroups.selectAll("g.subprinciple")
				.data(d => d.values).enter()
				.append("g")
				.attr("class", "subprinciple")
			subPrincipleGroups.append("line")
				.attr("class", "subprinciple-line")
				.attr("x1", (d, i) => self.contentsStartPos[d.values[0].report][d.key])
				.attr("y1", config.topBar)
				.attr("x2", (d, i) => self.contentsStartPos[d.values[0].report][d.key])
				.attr("y2", config.topBar + config.subPLength)
				.attr("stroke", "#AAAAAA")
				.attr("stroke-width", config.subPWidth)
				.attr("opacity", config.ogOpacity)
			// Bottom Link
			subPrincipleGroups.selectAll("path.link")
				.data(e => e.values).enter()
				.append("path")
				.attr("class", "link")
				// .attr("val", e => e.content)
				.attr("d", (e, i) => self.getPath(i, e.report, e.principle, e.content))
				// .attr("stroke", "#AAAAAA")
				.attr("stroke", e => config.colors[self.principles.indexOf(e.principle)])
				.attr("fill", "transparent")
				.attr("stroke-width", config.linkWidth)
				.attr("opacity", config.ogOpacity)

			self.loadVoronoi()
		})
		
		d3.json("../assets/problems.json").then(function(data) {
			self.dataProblems = d3.nest()
				.key(d => d.problem)
				// .key(d => d.principle)
				// .sortKeys((a, b) => self.principles.indexOf(a) - self.principles.indexOf(b))
				.entries(data)

			self.dataProblems.forEach((problem, i) => {
				problem.values.forEach(link => {
					link.problemId = i
				})
			})

			// Top Bar
			self.svg.selectAll("circle.problem-source")
				.data(self.principles).enter()
				.append("circle")
				.attr("class", "problem-source")
				.attr("r", 10)
				.attr("cx", (d, i) => i * 100 + 50)
				.attr("cy", config.botBar + 50)
				.attr("fill", (d, i) => config.colors[i])

			// Bottom Bar
			self.svg.selectAll("circle.problem-target")
				.data(self.dataProblems).enter()
				.append("circle")
				.attr("class", "problem-target")
				.attr("r", 15)
				.attr("cx", (d, i) => i * 120 + 100)
				.attr("cy", config.problemBar)
				.attr("fill", "#AAAAAA")
			self.svg.selectAll("text.problem-name")
				.data(self.dataProblems).enter()
				.append("text")
				.attr("class", "problem-name")
				.attr("x", (d, i) => i * 120 + 100)
				.attr("y", config.problemBar + 40)
				.attr("font-size", 14)
				.attr("fill", "#333333")
				.attr("font-family", "Open Sans")
				.attr("font-weight", "300")
				.attr("text-anchor", "middle")
				.text(d => d.key)
				.attr("opacity", config.ogOpacity)

			// Links
			self.svg.selectAll("g.problem-group")
				.data(self.dataProblems).enter()
				.append("g")
				.attr("class", "problem-group")
				.lower()
				.selectAll("path.problem-link")
				.data(d => d.values).enter()
				.append("path")
				.attr("class", "problem-link")
				.attr("d", e => {
					let startX = self.principles.indexOf(e.principle) * 100 + 50,
					startY = config.botBar + 50,
					endX = e.problemId * 120 + 100,
					endY = config.problemBar
					path = "M "
					path += [startX, startY].join(" ")
					path += " C "
					path += [startX, startY + 100].join(" ")
					path += ", "
					path += [endX, endY - 100].join(" ")
					path += ", "
					path += [endX, endY].join(" ")
					return path
				})
				// .attr("stroke", "#AAAAAA")
				.attr("stroke", e => config.colors[self.principles.indexOf(e.principle)])
				.attr("fill", "transparent")
				.attr("stroke-width", config.linkWidth)
				.attr("opacity", config.ogOpacity)

			self.loadVoronoi()
		})

		d3.json("../assets/reportsText.json").then(data => {
			self.reportsText = data
			self.loadVoronoi()
		})
		d3.json("../assets/subPrinciplesText.json").then(data => {
			self.subPrinciplesText = data
			self.loadVoronoi()
		})
		d3.json("../assets/principlesText.json").then(data => {
			self.principlesText = data
			self.loadVoronoi()
		})
		d3.json("../assets/problemsText.json").then(data => {
			self.problemsText = data
			self.loadVoronoi()
		})
	},
	data: {
		data: [],
		svg: null,
		dataByContents: null,
		dataByReports: null,
		dataByPrinciples: null,
		dataProblems: null,
		reportsText: null,
		subPrinciplesText: null,
		principlesText: null,
		problemsText: null,
		reportsStartPos: {},
		principlesStartPos: {},
		contentsStartPos: {},
		nodes: [],
		problemNodes: [],
		principles: [
			"Well-being",
			"Autonomy",
			"Privacy",
			"Fairness",
			"Accountability",
			"Transparency",
			"Robustness",
			"Others"
		],
		selected: false,
		captionType: "",
		captionName: "",
		captionContents: ""
	},
	computed: {
	},
	methods: {
		getPath: function(i, report, principle, content) {
			let startX = this.contentsStartPos[report][content],
			endX = this.principlesStartPos[principle],
			startY = config.topBar + config.subPLength,
			endY = config.botBar
			let path = "M "
			path += [startX, startY].join(" ")
			path += " C "
			path += [startX, startY + 100].join(" ")
			path += ", "
			path += [endX, endY - 100].join(" ")
			path += ", "
			path += [endX, endY].join(" ")
			return path
		},
		loadVoronoi: function() {
			self = this
			if (this.dataProblems && this.dataByPrinciples && this.reportsText && this.subPrinciplesText && this.principlesText && this.problemsText) {
				this.dataProblems.forEach((problem, i) => {
					this.nodes.push({
						type: "problem",
						name: problem.key,
						x: i * 120 + 100,
						text: problem.values[0].text
					})
				})
				this.nodes.forEach(node => {
					if (node.type === "report") {
						node.text = self.reportsText[node.name]
					} else if (node.type === "problem") {
						node.text = self.problemsText[node.name]
					} else if (node.type === "principle") {
						node.text = self.principlesText[node.name]
					} else if (node.type === "content") {
						node.text = self.subPrinciplesText[node.report][node.name]
					}
				})
				let voronoi = d3.voronoi()
					.x(d => d.x)
					.y(d => {
						if (d.type === "report") {
							return config.topBar - config.subPLength / 2
						} else if (d.type === "content") {
							return config.topBar + config.subPLength / 2
						} else if (d.type === "principle") {
							return config.topBar + 3 * config.subPLength / 2
						} else if (d.type === "problem") {
							return config.topBar + 3 * config.subPLength / 2 + 600
						}
					})
					.extent([[0, 0], [config.width, config.height]])
				let voronoiGroup = this.svg.append("g")
					.attr("class", "voronoi1")
				voronoiGroup.selectAll("path")
					.data(voronoi.polygons(this.nodes))
					.enter().append("path")
					.attr("d", d => d ? "M" + d.join("L") + "Z" : null)
					// .attr('stroke', '#ccc')
					.attr("fill", "transparent")
					.on("mouseover", this.mouseover)
					.on("mouseout", this.mouseout)
					.on("click", this.click)
			}
		},
		focus: function(d, focus, unfocus) {
			let feature = d.data.type,
			name = d.data.name,
			contentReport = d.data.report
			this.svg.selectAll("path.link")
				.attr("opacity", d => d[feature] === name && (feature !== "content" || d.report === contentReport) ? focus : unfocus)
			this.svg.selectAll("path.problem-link")
				.attr("opacity", d => d[feature] === name && (feature !== "content" || d.report === contentReport) ? focus : unfocus)
			this.svg.selectAll("line.subprinciple-line")
				.attr("opacity", d => {
					let present = false
					d.values.forEach(e => {
						if (e[feature] === name && (feature !== "content" || e.report === contentReport)) {
							present = true
						}
					})
					if (present) {
						return focus
					} else {
						return unfocus
					}
				})
			if (feature === "problem") {
				if (unfocus === 0) {
					this.svg.selectAll('circle.problem-target')
					.attr("opacity", d => d.key === name ? focus : unfocus)
				}
				this.svg.selectAll('text.problem-name')
					.attr("opacity", d => d.key === name ? focus : unfocus)
			}
		},
		writeCaption: function(d) {
			let feature = d.data.type,
			name = d.data.name,
			contentReport = d.data.report,
			text = d.data.text
			if (feature === "content") {
				feature = "subprinciple"
			}
			this.captionType = feature
			this.captionName = name
			this.captionContents = text
		},
		clearCaption: function(d) {
			this.captionType = ""
			this.captionName = ""
			this.captionContents = ""
		},
		mouseover: function(d) {
			if (!this.selected) {
				this.focus(d, 1, 0.2)
				this.writeCaption(d)
			}
			
		},
		mouseout: function(d) {
			if (!this.selected) {
				this.svg.selectAll("path.link")
					.attr("opacity", config.ogOpacity)
				this.svg.selectAll("line.subprinciple-line")
					.attr("opacity", config.ogOpacity)
				this.svg.selectAll("path.problem-link")
					.attr("opacity", config.ogOpacity)
				this.svg.selectAll('circle.problem-target')
					.attr("opacity", 1)
				this.svg.selectAll('text.problem-name')
					.attr("opacity", config.ogOpacity)
				this.clearCaption()
			}
		},
		click: function(d) {
			if (!this.selected) {
				this.focus(d, 1, 0)
				this.selected = !this.selected
			} else {
				this.selected = !this.selected
				this.mouseout(d)
			}
		},
		
	}
})