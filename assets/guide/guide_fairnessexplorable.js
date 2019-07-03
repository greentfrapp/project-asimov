Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

const annotations = [
  {
    note: {
      title: "Real Positives",
      label: "Fat animals (in blue).",
      padding: 3,
      align: "middle",
      wrap: 100
    },
    className: "tooltip-real-pos tooltip-base1",
    x: 332,
    y: 133,
    dx: -33,
    dy: -31,
    subject: {
      width: 89,
      height: 135
    },
    color: "#fccf35",
    type: d3.annotationCalloutRect
  },
  {
    note: {
      title: "Real Negatives",
      label: "Thin animals (in red).",
      padding: 3,
      align: "middle",
      wrap: 100
    },
    className: "tooltip-real-neg tooltip-base1",
    x: 179,
    y: 134,
    dx: 119,
    dy: 164,
    subject: {
      width: 89,
      height: 135
    },
    color: "#fccf35",
    type: d3.annotationCalloutRect
  },
  {
    note: {
      title: "Predicted Positives",
      label: "Animals predicted fat (blue-striped).",
      padding: 3,
      align: "middle",
      wrap: 150
    },
    className: "tooltip-pred-pos tooltip-base2",
    x: 333,
    y: 116,
    dx: -33,
    dy: -33,
    subject: {
      width: 180,
      height: 75
    },
    color: "#fccf35",
    type: d3.annotationCalloutRect
  },
  {
    note: {
      title: "Predicted Negatives",
      label: "Animals predicted not fat (no stripes).",
      padding: 3,
      align: "middle",
      wrap: 150
    },
    className: "tooltip-pred-neg tooltip-base2",
    x: 85,
    y: 210,
    dx: 212,
    dy: 107,
    subject: {
      width: 180,
      height: 75
    },
    color: "#fccf35",
    type: d3.annotationCalloutRect
  },
  {
    note: {
      title: "True Positives",
      label: "Fat cats that got caught.",
      padding: 3,
      align: "right",
      wrap: 100
    },
    className: "tooltip-tp tooltip-Cats",
    x: 130,
    y: 166,
    dx: -26,
    dy: -66,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Positives",
      label: "Thin cats that got predicted fat.",
      padding: 3,
      align: "left",
      wrap: 100
    },
    className: "tooltip-fp tooltip-Cats",
    x: 207,
    y: 153,
    dx: 36,
    dy: -57,
    color: "#fccf35"
  },
  {
    note: {
      title: "True Negatives",
      label: "Thin cats that got predicted thin.",
      padding: 3,
      align: "left",
      wrap: 100
    },
    className: "tooltip-tn tooltip-Cats",
    x: 213,
    y: 254,
    dx: 35,
    dy: 50,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Negatives",
      label: "Fat cats that escaped.",
      padding: 3,
      align: "right",
      wrap: 100
    },
    className: "tooltip-fn tooltip-Cats",
    x: 133,
    y: 242,
    dx: -26,
    dy: 63,
    color: "#fccf35",
    type: d3.annotationCallout
  },
  {
    note: {
      title: "True Positives",
      label: "Fat dogs that got caught.",
      padding: 3,
      align: "right",
      wrap: 100
    },
    className: "tooltip-tp tooltip-Dogs",
    x: 130+250,
    y: 166,
    dx: -26,
    dy: -66,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Positives",
      label: "Thin dogs that got predicted fat.",
      padding: 3,
      align: "left",
      wrap: 100
    },
    className: "tooltip-fp tooltip-Dogs",
    x: 207+250,
    y: 153,
    dx: 36,
    dy: -57,
    color: "#fccf35"
  },
  {
    note: {
      title: "True Negatives",
      label: "Thin dogs that got predicted thin.",
      padding: 3,
      align: "left",
      wrap: 100
    },
    className: "tooltip-tn tooltip-Dogs",
    x: 213+250,
    y: 254,
    dx: 35,
    dy: 50,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Negatives",
      label: "Fat dogs that escaped.",
      padding: 3,
      align: "right",
      wrap: 100
    },
    className: "tooltip-fn tooltip-Dogs",
    x: 133+250,
    y: 242,
    dx: -26,
    dy: 63,
    color: "#fccf35",
    type: d3.annotationCallout
  }
]

const makeAnnotations = d3.annotation()
  // .editMode(true)
  // .type(d3.annotationCallout)
  .annotations(annotations)

function initChart(holder, self, c, name, percs) {
  holder.g = self.svg.append("g")
    .attr("id", `${name}-g`)
    .attr("transform", `translate(${c.x}, ${c.y})`)
  
  function mouseoverSector () {
    holder.g.selectAll("path").attr("opacity", 0.5)
    d3.select(this).attr("opacity", 1)
  }

  function mouseoutSector () {
    holder.g.selectAll("path").attr("opacity", 1)
  }

  holder.fp = holder.g.append("path")
    .attr("id", `${name}-fp`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.fp.start), endAngle: self.pieScale(percs.fp.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.fp.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.fp", d => {
      holder.hover.fp = true
      d3.select(`.tooltip-fp.tooltip-${name}`).classed("hidden", false)
    })
    .on("mouseout.fp", d => {
      holder.hover.fp = false
      d3.select(`.tooltip-fp.tooltip-${name}`).classed("hidden", true)
    })
  holder.tn = holder.g.append("path")
    .attr("id", `${name}-tn`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.tn.start), endAngle: self.pieScale(percs.tn.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.tn.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.tn", d => {
      holder.hover.tn = true
      d3.select(`.tooltip-tn.tooltip-${name}`).classed("hidden", false)
    })
    .on("mouseout.tn", d => {
      holder.hover.tn = false
      d3.select(`.tooltip-tn.tooltip-${name}`).classed("hidden", true)
    })
  holder.fn = holder.g.append("path")
    .attr("id", `${name}-fn`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.fn.start), endAngle: self.pieScale(percs.fn.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.fn.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.fn", d => {
      holder.hover.fn = true
      d3.select(`.tooltip-fn.tooltip-${name}`).classed("hidden", false)
    })
    .on("mouseout.fn", d => {
      holder.hover.fn = false
      d3.select(`.tooltip-fn.tooltip-${name}`).classed("hidden", true)
    })
  holder.tp = holder.g.append("path")
    .attr("id", `${name}-tp`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.tp.start), endAngle: self.pieScale(percs.tp.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.tp.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.tp", d => {
      holder.hover.tp = true
      d3.select(`.tooltip-tp.tooltip-${name}`).classed("hidden", false)
    })
    .on("mouseout.tp", d => {
      holder.hover.tp = false
      d3.select(`.tooltip-tp.tooltip-${name}`).classed("hidden", true)
    })
  holder.g.selectAll("path")
    .attr("stroke", "#222222")
    .attr("stroke-width", 2)

  // Stats Printout
  // holder.stats = {}
  // holder.stats.tp = holder.g.append("text")
  //   .attr('id', `${name}-tpStat`)
  //   .attr('x', -50)
  //   .attr('y', self.pieParams.r + 30)
  //   .attr('font-family', 'sans-serif')
  //   .attr('font-size', 18)
  //   .attr('text-anchor', 'middle')
  //   .attr('fill', '#DDDDDD')
  //   .html("TP%")
  // holder.stats.fn = holder.g.append("text")
  //   .attr('id', `${name}-fnStat`)
  //   .attr('x', -50)
  //   .attr('y', self.pieParams.r + 60)
  //   .attr('font-family', 'sans-serif')
  //   .attr('font-size', 18)
  //   .attr('text-anchor', 'middle')
  //   .attr('fill', '#DDDDDD')
  //   .html("FN%")
  // holder.stats.tn = holder.g.append("text")
  //   .attr('id', `${name}-tnStat`)
  //   .attr('x', 50)
  //   .attr('y', self.pieParams.r + 60)
  //   .attr('font-family', 'sans-serif')
  //   .attr('font-size', 18)
  //   .attr('text-anchor', 'middle')
  //   .attr('fill', '#DDDDDD')
  //   .html("TN%")
  // holder.stats.fp = holder.g.append("text")
  //   .attr('id', `${name}-fpStat`)
  //   .attr('x', 50)
  //   .attr('y', self.pieParams.r + 30)
  //   .attr('font-family', 'sans-serif')
  //   .attr('font-size', 18)
  //   .attr('text-anchor', 'middle')
  //   .attr('fill', '#DDDDDD')
  //   .text(self.svgHeight)

  // Positive Control
  holder.posCtrl = holder.g.append("circle")
    .attr("id", `${name}-posCtrl`)
    .attr("class", "chart-control")
    .datum({r: 10, x: -self.pieParams.ctrlR, y: 0})
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", self.colors.posDark)
    .call(d3.drag().on("drag", function(d) {
      let t = Math.atan2(d3.event.y, d3.event.x)
      if (t < 0) t += 2 * Math.PI

      t += Math.PI / 2
      if (t > self.pieScale(percs.tp.end)) t = self.pieScale(percs.tp.end)
      else if (t < self.pieScale(percs.fn.start)) t = self.pieScale(percs.fn.start)
      t -= Math.PI / 2

      d3.select(this)
        .attr("cx", d.x = self.pieParams.ctrlR * Math.cos(t))
        .attr("cy", d.y = self.pieParams.ctrlR * Math.sin(t))
      // Update TP
      holder.tp.transition().duration(0)
        .attrTween("d", self.arcTween({start: t + Math.PI / 2, end: self.pieScale(percs.tp.end)}))
      holder.vals.tp = Math.round(100 * (percs.tp.end - (t + Math.PI / 2) / (2 * Math.PI)))
      // Update FN
      holder.fn.transition().duration(0)
        .attrTween("d", self.arcTween({start: self.pieScale(percs.fn.start), end: t + Math.PI / 2}))
      holder.vals.fn = Math.round(100 * ((t + Math.PI / 2) / (2 * Math.PI) - percs.fn.start))
      // Update tooltips
      self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", false);
      tpMidAngle = (self.pieScale(percs.tp.end) + t + Math.PI / 2) / 2 - Math.PI / 2
      tpMidX = 50 * Math.cos(tpMidAngle) + c.x
      tpMidY = 50 * Math.sin(tpMidAngle) + c.y
      d3.selectAll(`.tooltip-tp.tooltip-${name}`).each(d => {
        d.x = tpMidX
        d.y = tpMidY
        d.dx = name == "Cats" ? 104-tpMidX : 104-tpMidX + 250
        d.dy = 100-tpMidY
      })
      fnMidAngle = (self.pieScale(percs.fn.start) + t + Math.PI / 2) / 2 - Math.PI / 2
      fnMidX = 50 * Math.cos(fnMidAngle) + c.x
      fnMidY = 50 * Math.sin(fnMidAngle) + c.y
      d3.selectAll(`.tooltip-fn.tooltip-${name}`).each(d => {
        d.x = fnMidX
        d.y = fnMidY
        d.dx = name == "Cats" ? 107-fnMidX : 107-fnMidX + 250
        d.dy = 305-fnMidY
      })
      makeAnnotations.update()
      self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", true);
    }))

  // Negative Control
  holder.negCtrl = holder.g.append("circle")
    .attr("id", `${name}-negCtrl`)
    .attr("class", "chart-control")
    .datum({r: 10, x: self.pieParams.ctrlR, y: 0})
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", self.colors.negDark)
    .call(d3.drag().on("drag", function(d) {
      let t = Math.atan2(d3.event.y, d3.event.x)
      if (t < 0) t += 2 * Math.PI

      if (t < Math.PI) {
        t += Math.PI / 2
        if (t > self.pieScale(percs.tn.end)) t = self.pieScale(percs.tn.end)
        t -= Math.PI / 2
        d3.select(this)
          .attr("cx", d.x = self.pieParams.ctrlR * Math.cos(t))
          .attr("cy", d.y = self.pieParams.ctrlR * Math.sin(t))
        holder.tn.transition().duration(0)
          .attrTween("d", self.arcTween({start: t + Math.PI / 2, end: self.pieScale(percs.tn.end)}))
        holder.vals.tn = Math.round(100 * (percs.tn.end - (t + Math.PI / 2) / (2 * Math.PI)))
        // Update tooltips
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", false);
        tnMidAngle = (self.pieScale(percs.tn.end) + t + Math.PI / 2) / 2 - Math.PI / 2
        tnMidX = 50 * Math.cos(tnMidAngle) + c.x
        tnMidY = 50 * Math.sin(tnMidAngle) + c.y
        d3.selectAll(`.tooltip-tn.tooltip-${name}`).each(d => {
          d.x = tnMidX
          d.y = tnMidY
          d.dx = name == "Cats" ? 248-tnMidX : 248-tnMidX + 250
          d.dy = 304-tnMidY
        })
        t += 2 * Math.PI
        holder.fp.transition().duration(0)
          .attrTween("d", self.arcTween({start: self.pieScale(percs.fp.start), end: t + Math.PI / 2}))
        holder.vals.fp = Math.round(100 * ((t + Math.PI / 2) / (2 * Math.PI) - percs.fp.start))
        fpMidAngle = (self.pieScale(percs.fp.start) + t + Math.PI / 2) / 2 - Math.PI / 2
        fpMidX = 50 * Math.cos(fpMidAngle) + c.x
        fpMidY = 50 * Math.sin(fpMidAngle) + c.y
        d3.selectAll(`.tooltip-fp.tooltip-${name}`).each(d => {
          d.x = fpMidX
          d.y = fpMidY
          d.dx = name == "Cats" ? 243-fpMidX : 243-fpMidX + 250
          d.dy = 100-fpMidY
        })
        makeAnnotations.update()
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", true);
      } else {
        t += Math.PI / 2
        if (t < self.pieScale(percs.fp.start)) t = self.pieScale(percs.fp.start)
        t -= Math.PI / 2
        d3.select(this)
          .attr("cx", d.x = self.pieParams.ctrlR * Math.cos(t))
          .attr("cy", d.y = self.pieParams.ctrlR * Math.sin(t))
        holder.fp.transition().duration(0)
          .attrTween("d", self.arcTween({start: self.pieScale(percs.fp.start), end: t + Math.PI / 2}))
        holder.vals.fp = Math.round(100 * ((t + Math.PI / 2) / (2 * Math.PI) - percs.fp.start))
        // Update tooltips
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", false);
        fpMidAngle = (self.pieScale(percs.fp.start) + t + Math.PI / 2) / 2 - Math.PI / 2
        fpMidX = 50 * Math.cos(fpMidAngle) + c.x
        fpMidY = 50 * Math.sin(fpMidAngle) + c.y
        d3.selectAll(`.tooltip-fp.tooltip-${name}`).each(d => {
          d.x = fpMidX
          d.y = fpMidY
          d.dx = name == "Cats" ? 243-fpMidX : 243-fpMidX + 250
          d.dy = 100-fpMidY
        })
        t -= 2 * Math.PI
        holder.tn.transition().duration(0)
          .attrTween("d", self.arcTween({start: t + Math.PI / 2, end: self.pieScale(percs.tn.end)}))
        holder.vals.tn = Math.round(100 * (percs.tn.end - (t + Math.PI / 2) / (2 * Math.PI)))
        tnMidAngle = (self.pieScale(percs.tn.end) + t + Math.PI / 2) / 2 - Math.PI / 2
        tnMidX = 50 * Math.cos(tnMidAngle) + c.x
        tnMidY = 50 * Math.sin(tnMidAngle) + c.y
        d3.selectAll(`.tooltip-tn.tooltip-${name}`).each(d => {
          d.x = tnMidX
          d.y = tnMidY
          d.dx = name == "Cats" ? 248-tnMidX : 248-tnMidX + 250
          d.dy = 304-tnMidY
        })
        makeAnnotations.update()
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", true);
      }
    }))

    // Title
    holder.title = holder.g.append("text")
      .attr('id', `${name}-title`)
      .attr('x', 0)
      .attr('y', - self.pieParams.r - 20)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text(`${name}`)
}

let fairnessExplorable = {
  props: [],
  mounted: function() {
    let self = this
    this.svg = d3.select("#fairness-explorable > svg")
      .attr("height", this.svgHeight)
      .attr("width", this.svgWidth)

    // Initialize Textures
    this.txtrs.pos = textures.paths()
                      .d(s => '')
                      .background(this.colors.posDark)
    this.txtrs.neg = textures.paths()
                      .d(s => '')
                      .background(this.colors.negDark)
    this.txtrs.tp = textures.lines()
                      .heavier()
                      .stroke(this.colors.posLight)
                      .background(this.colors.posDark)
    this.txtrs.fp = textures.lines()
                      .heavier()
                      .stroke(this.colors.posLight)
                      .background(this.colors.negDark)
    this.txtrs.tn = textures.paths()
                      .d(s => '')
                      .background(this.colors.negDark)
    this.txtrs.fn = textures.paths()
                      .d(s => '')
                      .background(this.colors.posDark)

    this.svg.call(this.txtrs.pos)
    this.svg.call(this.txtrs.neg)
    this.svg.call(this.txtrs.tp)
    this.svg.call(this.txtrs.tn)
    this.svg.call(this.txtrs.fp)
    this.svg.call(this.txtrs.fn)

    // Initialize Charts
    percs = {
      A: {
        tp: {start: .75, end: .95},
        fp: {start: .95, end: 1.25},
        tn: {start: .25, end: .55},
        fn: {start: .55, end: .75},
      },
      B: {
        tp: {start: .75, end: 1.05},
        fp: {start: 1.05, end: 1.25},
        tn: {start: .25, end: .45},
        fn: {start: .45, end: .75},
      }
    }
    initChart(this.charts.A, this, this.pieParams.cA, "Cats", percs.A)
    initChart(this.charts.B, this, this.pieParams.cB, "Dogs", percs.B)
    this.svg.append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)
    //HERE
    this.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs").classed("hidden", true);
  },
  beforeDestroy: function () {},
  data: function () {
    return {
      svgHeight: 400,
      svgWidth: 600,
      arc: d3.arc(),
      pieScale: d3.scaleLinear()
                  .domain([0, 1])
                  .range([0, 2 * Math.PI]),
      svg: null,
      pieParams: {
        cA: {x: 175, y: 200},
        cB: {x: 425, y: 200},
        r: 100,
        ctrlR: 110,
      },
      colors: {
        posDark: "#036ecd",
        // posLight: "#dddddd",
        // posLight: "#262d97", //darkblue
        posLight: "#9ecadd", //liteblue
        negDark: "#f3442d",
        negLight: "#dddddd"
      },
      txtrs: {},
      charts: {
        A: {
          vals:{tp: 20, fn: 20, tn: 30, fp: 30},
          hover:{tp: false, fn: false, tn: false, fp: false}
        },
        B: {
          vals:{tp: 30, fn: 30, tn: 20, fp: 20},
          hover:{tp: false, fn: false, tn: false, fp: false}
        }
      }
    }
  },
  computed: {
    fairnessTypes: function () {
      //groupFairness
      groupFairness = this.comparePerc((this.charts.A.vals.tp + this.charts.A.vals.fp), (this.charts.B.vals.tp + this.charts.B.vals.fp))
      //predictiveParity
      predictiveParity = this.comparePerc((this.charts.A.vals.tp / (this.charts.A.vals.tp + this.charts.A.vals.fp)), (this.charts.B.vals.tp / (this.charts.B.vals.tp + this.charts.B.vals.fp)))
      //fpErrorBalance
      fpErrorBalance = this.comparePerc((this.charts.A.vals.fp / (this.charts.A.vals.fp + this.charts.A.vals.tn)), (this.charts.B.vals.fp / (this.charts.B.vals.fp + this.charts.B.vals.tn))),
      //fnErrorBalance
      fnErrorBalance = this.comparePerc((this.charts.A.vals.fn / (this.charts.A.vals.fn + this.charts.A.vals.tp)), (this.charts.B.vals.fn / (this.charts.B.vals.fn + this.charts.B.vals.tp)))
      //equalisedOdds
      equalisedOdds = fpErrorBalance && fnErrorBalance
      //condUseAccuracyEquality
      condUseAccuracyEqualityPos = this.comparePerc((this.charts.A.vals.tp / (this.charts.A.vals.tp + this.charts.A.vals.fp)), (this.charts.B.vals.tp / (this.charts.B.vals.tp + this.charts.B.vals.fp)))
      condUseAccuracyEqualityNeg = this.comparePerc((this.charts.A.vals.tn / (this.charts.A.vals.tn + this.charts.A.vals.fn)), (this.charts.B.vals.tn / (this.charts.B.vals.tn + this.charts.B.vals.fn)))
      condUseAccuracyEquality = condUseAccuracyEqualityPos && condUseAccuracyEqualityNeg
      //overallAccuracyEquality
      overallAccuracyEquality = this.comparePerc((this.charts.A.vals.tp + this.charts.A.vals.tn), (this.charts.B.vals.tp + this.charts.B.vals.tn))
      //treatmentEquality
      treatmentEquality = this.comparePerc((this.charts.A.vals.fp / this.charts.A.vals.fn), (this.charts.B.vals.fp / this.charts.B.vals.fn))
      return {
        groupFairness: groupFairness,
        predictiveParity: predictiveParity,
        fpErrorBalance: fpErrorBalance,
        fnErrorBalance: fnErrorBalance,
        equalisedOdds: equalisedOdds,
        condUseAccuracyEqualityPos: condUseAccuracyEqualityPos,
        overallAccuracyEquality: overallAccuracyEquality,
        treatmentEquality: treatmentEquality
      }
    }
  },
  methods: {
    arcTween: function({r=null, start=null, end=null, degrees=false, shift=0, shortest=true}) {
      let self = this
      return function(d) {
        if (r === null) r = d.outerRadius
        if (start === null) {
          start = d.startAngle
        } else if (degrees) {
          start = Math.radians(start)
        }
        if (end === null) {
          end = d.endAngle
        } else if (degrees) {
          end = Math.radians(end)
        }
        start += shift
        end += shift

        var interRadius = d3.interpolate(d.outerRadius, r),
        interStartAngle = d3.interpolate(d.startAngle, start),
        interEndAngle = d3.interpolate(d.endAngle, end)
        return function(t) {
          d.outerRadius = interRadius(t)
          d.startAngle = interStartAngle(t)
          d.endAngle = interEndAngle(t)
          return self.arc(d)
        }
      }
    },
    comparePerc: function(a, b, eps=0.01) {
      if (a < b + eps && a > b - eps) {
        return true
      } else {
        return false
      }
    },
    showTooltip: function(className) {
      d3.selectAll(`.${className}`).classed("hidden", false)
    },
    hideTooltip: function(className) {
      d3.selectAll(`.${className}`).classed("hidden", true)
    }
  },
  template: 
  `<div id="fairness-explorable">
    <svg></svg>
    <div id="stats">
      <div id="chartA-stats">
        <div class="ui mini statistics">
          <div class="statistic" :class="{'hover-pos': charts.A.hover.tp}">
            <div class="value">
              {{ charts.A.vals.tp }}%
            </div>
            <div class="label">
              True Positives
            </div>
          </div>
          <div class="statistic" :class="{'hover-neg': charts.A.hover.fp}">
            <div class="value">
              {{ charts.A.vals.fp }}%
            </div>
            <div class="label">
              False Positives
            </div>
          </div>
        </div>
        <div class="ui mini statistics">
          <div class="statistic" :class="{'hover-pos': charts.A.hover.fn}">
            <div class="value">
              {{ charts.A.vals.fn }}%
            </div>
            <div class="label">
              False Negatives
            </div>
          </div>
          <div class="statistic" :class="{'hover-neg': charts.A.hover.tn}">
            <div class="value">
              {{ charts.A.vals.tn }}%
            </div>
            <div class="label">
              True Negatives
            </div>
          </div>
        </div>
      </div>
      <div id="chartB-stats">
        <div class="ui mini statistics">
          <div class="statistic" :class="{'hover-pos': charts.B.hover.tp}">
            <div class="value">
              {{ charts.B.vals.tp }}%
            </div>
            <div class="label">
              True Positives
            </div>
          </div>
          <div class="statistic" :class="{'hover-neg': charts.B.hover.fp}">
            <div class="value">
              {{ charts.B.vals.fp }}%
            </div>
            <div class="label">
              False Positives
            </div>
          </div>
        </div>
        <div class="ui mini statistics">
          <div class="statistic" :class="{'hover-pos': charts.B.hover.fn}">
            <div class="value">
              {{ charts.B.vals.fn }}%
            </div>
            <div class="label">
              False Negatives
            </div>
          </div>
          <div class="statistic" :class="{'hover-neg': charts.B.hover.tn}">
            <div class="value">
              {{ charts.B.vals.tn }}%
            </div>
            <div class="label">
              True Negatives
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="fairness-types">
      <a class="ui big label" :class="{grey: !value, green: value}" v-for="(value, key) in fairnessTypes">{{key}}</a>
    </div>
    <div id="tooltip-qns">
      <p @mouseover="showTooltip('tooltip-base1')" @mouseout="hideTooltip('tooltip-base1')">What do the colors mean?</p>
      <p @mouseover="showTooltip('tooltip-base2')" @mouseout="hideTooltip('tooltip-base2')">What do the stripes mean?</p>
    </div>
  </div>`
}