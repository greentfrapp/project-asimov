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
    x: 280,
    y: 97,
    dx: -33,
    dy: -33,
    subject: {
      width: 90,
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
    x: 130,
    y: 97,
    dx: 119,
    dy: 164,
    subject: {
      width: 90,
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
    x: 285,
    y: 92,
    dx: -33,
    dy: -33,
    subject: {
      width: 180,
      height: 65
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
    x: 35,
    y: 173,
    dx: 212,
    dy: 97,
    subject: {
      width: 180,
      height: 65
    },
    color: "#fccf35",
    type: d3.annotationCalloutRect
  },
  {
    note: {
      title: "True Positives",
      label: "Fat cats that got caught.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-tp tooltip-Cats",
    x: 84,
    y: 136,
    dx: -32,
    dy: -76,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Positives",
      label: "Thin cats that got predicted fat.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-fp tooltip-Cats",
    x: 154,
    y: 124,
    dx: 56,
    dy: -64,
    color: "#fccf35"
  },
  {
    note: {
      title: "True Negatives",
      label: "Thin cats that got predicted thin.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-tn tooltip-Cats",
    x: 155,
    y: 205,
    dx: 55,
    dy: 65,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Negatives",
      label: "Fat cats that escaped.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-fn tooltip-Cats",
    x: 85,
    y: 195,
    dx: -33,
    dy: 75,
    color: "#fccf35",
    type: d3.annotationCallout
  },
  {
    note: {
      title: "True Positives",
      label: "Fat dogs that got caught.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-tp tooltip-Dogs",
    x: 346,
    y: 126,
    dx: -51,
    dy: -65,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Positives",
      label: "Thin dogs that got predicted fat.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-fp tooltip-Dogs",
    x: 415,
    y: 136,
    dx: 46,
    dy: -76,
    color: "#fccf35"
  },
  {
    note: {
      title: "True Negatives",
      label: "Thin dogs that got predicted thin.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-tn tooltip-Dogs",
    x: 415,
    y: 194,
    dx: 45,
    dy: 76,
    color: "#fccf35"
  },
  {
    note: {
      title: "False Negatives",
      label: "Fat dogs that escaped.",
      padding: 3,
      align: "middle",
      wrap: 125
    },
    className: "tooltip-fn tooltip-Dogs",
    x: 346,
    y: 205,
    dx: -51,
    dy: 65,
    color: "#fccf35",
    type: d3.annotationCallout
  },
  {
    note: {
      title: "Controls!",
      label: "",
      padding: 3,
      wrap: 125
    },
    className: "tooltip-controls",
    x: 235,
    y: 165,
    dx: -1,
    dy: 111,
    subject: {
      radius: 14
    },
    color: "#fccf35",
    type: d3.annotationCalloutCircle
  },
  {
    note: {
      title: "Controls!",
      label: "",
      padding: 3,
      wrap: 125
    },
    className: "tooltip-controls",
    x: 15,
    y: 165,
    dx: 0,
    dy: 111,
    subject: {
      radius: 14
    },
    color: "#fccf35",
    type: d3.annotationCalloutCircle
  },
  {
    note: {
      title: "Controls!",
      label: "",
      padding: 3,
      wrap: 125
    },
    className: "tooltip-controls",
    x: 485,
    y: 165,
    dx: -1,
    dy: 111,
    subject: {
      radius: 14
    },
    color: "#fccf35",
    type: d3.annotationCalloutCircle
  },
  {
    note: {
      title: "Controls!",
      label: "",
      padding: 3,
      wrap: 125
    },
    className: "tooltip-controls",
    x: 265,
    y: 165,
    dx: 0,
    dy: 111,
    subject: {
      radius: 14
    },
    color: "#fccf35",
    type: d3.annotationCalloutCircle
  }
]

const makeAnnotations = d3.annotation()
  // .editMode(true)
  // .type(d3.annotationCallout)
  .annotations(annotations)

const makeKeywordAnnotations = d3.annotation()
  // .editMode(true)
  .annotations([
    {
      note: {
        title: "Predicted Positives",
        // label: "Animals predicted fat (blue-striped).",
        padding: 3,
        align: "middle",
        wrap: 150
      },
      className: "tooltip-keyword tooltip-keyword-predPos",
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
        // title: "Predicted Positives",
        // label: "Animals predicted fat (blue-striped).",
        padding: 3,
        align: "middle",
        wrap: 150
      },
      className: "tooltip-keyword tooltip-keyword-predPos",
      x: 83,
      y: 116,
      dx: 217,
      dy: -33,
      subject: {
        width: 180,
        height: 75
      },
      color: "#fccf35",
      type: d3.annotationCalloutRect
    }
  ])

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
    .attr("class", "sector")
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
    .attr("class", "sector")
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
    .attr("class", "sector")
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
    .attr("class", "sector")
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
  holder.g.selectAll(".sector")
    // .attr("stroke", "#222222")
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
      self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", false);
      tpMidAngle = (self.pieScale(percs.tp.end) + t + Math.PI / 2) / 2 - Math.PI / 2
      tpMidX = 50 * Math.cos(tpMidAngle) + c.x
      tpMidY = 50 * Math.sin(tpMidAngle) + c.y
      d3.selectAll(`.tooltip-tp.tooltip-${name}`).each(d => {
        d.x = tpMidX
        d.y = tpMidY
        d.dx = name == "Cats" ? 52-tpMidX : 50-tpMidX + 245
        d.dy = 60-tpMidY
      })
      fnMidAngle = (self.pieScale(percs.fn.start) + t + Math.PI / 2) / 2 - Math.PI / 2
      fnMidX = 50 * Math.cos(fnMidAngle) + c.x
      fnMidY = 50 * Math.sin(fnMidAngle) + c.y
      d3.selectAll(`.tooltip-fn.tooltip-${name}`).each(d => {
        d.x = fnMidX
        d.y = fnMidY
        d.dx = name == "Cats" ? 52-fnMidX : 50-fnMidX + 245
        d.dy = 270-fnMidY
      })
      makeAnnotations.update()
      self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true);
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
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", false);
        tnMidAngle = (self.pieScale(percs.tn.end) + t + Math.PI / 2) / 2 - Math.PI / 2
        tnMidX = 50 * Math.cos(tnMidAngle) + c.x
        tnMidY = 50 * Math.sin(tnMidAngle) + c.y
        d3.selectAll(`.tooltip-tn.tooltip-${name}`).each(d => {
          d.x = tnMidX
          d.y = tnMidY
          d.dx = name == "Cats" ? 210-tnMidX : 210-tnMidX + 250
          d.dy = 270-tnMidY
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
          d.dx = name == "Cats" ? 210-fpMidX : 210-fpMidX + 250
          d.dy = 60-fpMidY
        })
        makeAnnotations.update()
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true);
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
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", false);
        fpMidAngle = (self.pieScale(percs.fp.start) + t + Math.PI / 2) / 2 - Math.PI / 2
        fpMidX = 50 * Math.cos(fpMidAngle) + c.x
        fpMidY = 50 * Math.sin(fpMidAngle) + c.y
        d3.selectAll(`.tooltip-fp.tooltip-${name}`).each(d => {
          d.x = fpMidX
          d.y = fpMidY
          d.dx = name == "Cats" ? 210-fpMidX : 210-fpMidX + 250
          d.dy = 60-fpMidY
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
          d.dx = name == "Cats" ? 210-tnMidX : 210-tnMidX + 250
          d.dy = 270-tnMidY
        })
        makeAnnotations.update()
        self.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true);
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
      // .attr('fill', '#DDDDDD')
      .attr('class', 'chart-title')
      .text(`${name}`)
}

let keyword = {
  props: ["word", "action"],
  mounted: function(){},
  beforeDestroy: function () {},
  data: function () {
    return {}
  },
  computed: {
    actions: function() {
      return {
        test: this.test
      }
    }
  },
  methods: {
    test: function () {
      console.log("LALALA")
    }
  },
  template: 
  `
    <span @mouseover="actions[action]">
      {{ word }}
    </span>
  `
}

let accSegment = {
  props: ["title", "pass", "content", "eqn"],
  components: {
    "keyword": keyword
  },
  mounted: function(){},
  beforeDestroy: function () {},
  data: function () {
    return {}
  },
  computed: {
    color: function () {
      if (this.pass) return "#2ecc71"
      else return "#DDDDDD"
    }
  },
  methods: {
    test: function () {
      console.log("TEST")
    }
  },
  template: 
  `
    <div>
      <div class="title" :class="{pass: pass}">
        <i class="dropdown icon"></i>
        <span>{{ title }}</span>
        <br/>
        <i class="icon"></i><span>{{ eqn }}</span>
      </div>
      <div class="content" v-html="content">
      </div>
    </div>
  `
}

let fairnessExplorable = {
  props: [],
  components: {
    'acc-segment': accSegment
  },
  mounted: function() {
    let self = this
    this.svg = d3.select("#charts-stats > svg")
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
    
    this.svg.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true);
    $('.ui.accordion').accordion()

    //Bind hover events to keywords
    this.svg.append("g")
      .attr("class", "annotation-keywords")
      .call(makeKeywordAnnotations)
    this.svg.selectAll(".tooltip-keyword").classed("hidden", true);
    d3.selectAll(".keyword.keyword-tp")
      .on("mouseover.keyword", this.keywordHandler("tp"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-fp")
      .on("mouseover.keyword", this.keywordHandler("fp"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-tn")
      .on("mouseover.keyword", this.keywordHandler("tn"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-fn")
      .on("mouseover.keyword", this.keywordHandler("fn"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-predPos")
      .on("mouseover.keyword", this.keywordHandler("tp-fp"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-predNeg")
      .on("mouseover.keyword", this.keywordHandler("tn-fn"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-realPos")
      .on("mouseover.keyword", this.keywordHandler("tp-fn"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
    d3.selectAll(".keyword.keyword-realNeg")
      .on("mouseover.keyword", this.keywordHandler("tn-fp"))
      .on("mouseout.keyword", this.keywordHandler("reset"))
  },
  beforeDestroy: function () {},
  data: function () {
    return {
      svgHeight: 475,
      svgWidth: 520,
      arc: d3.arc(),
      pieScale: d3.scaleLinear()
                  .domain([0, 1])
                  .range([0, 2 * Math.PI]),
      svg: null,
      pieParams: {
        // cA: {x: 175, y: 200},
        // cB: {x: 425, y: 200},
        cA: {x: 125, y: 165},
        cB: {x: 375, y: 165},
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
      // return {
      //   groupFairness: groupFairness,
      //   predictiveParity: predictiveParity,
      //   fpErrorBalance: fpErrorBalance,
      //   fnErrorBalance: fnErrorBalance,
      //   equalisedOdds: equalisedOdds,
      //   condUseAccuracyEqualityPos: condUseAccuracyEqualityPos,
      //   overallAccuracyEquality: overallAccuracyEquality,
      //   treatmentEquality: treatmentEquality
      // }
      return [
        {
          name: "Group Fairness", value: groupFairness,
          eqn: `[${this.charts.A.vals.tp+this.charts.A.vals.fp}% : ${this.charts.B.vals.tp+this.charts.B.vals.fp}%]`,
          content: `
          <p>
            Both cats and dogs should have equal chances of being predicted fat.
          </p>
          <p>
            The chance of a positive prediction (<span class="keyword keyword-tp">TP</span> + <span class="keyword keyword-fp">FP</span>) should be equal.
          </p>
          `
        },
        // {
        //   name: "Predictive Parity", value: predictiveParity,
        //   eqn: `[${(100*this.charts.A.vals.tp/(this.charts.A.vals.tp+this.charts.A.vals.fp)).toFixed()}% : ${(100*this.charts.B.vals.tp/(this.charts.B.vals.tp+this.charts.B.vals.fp)).toFixed()}%]`,
        //   content: `
        //   <p>
        //     Pets predicted fat should have the same chance of being actually fat, no matter cat or dog.
        //   </p>
        //   <p>
        //     Equal positive predictive value (PPV) or precision i.e. <span class="keyword keyword-tp">TP</span> / <span class="keyword keyword-predPos">Predicted Positives</span>.
        //   </p>
        //   `
        // },
        // {
        //   name: "FP Error Balance", value: fpErrorBalance,
        //   eqn: `[${(100*this.charts.A.vals.fp/(this.charts.A.vals.fp+this.charts.A.vals.tn)).toFixed()}% : ${(100*this.charts.B.vals.fp/(this.charts.B.vals.fp+this.charts.B.vals.tn)).toFixed()}%]`,
        //   content: `
        //   <p>
        //     Both thin cats and thin dogs should have equal rates of false alarms (thin pets misdiagnosed as fat).
        //   </p>
        //   <p>
        //     Equal false positive rate (FPR) i.e. <span class="keyword keyword-fp">FP</span> / <span class="keyword keyword-realNeg">Real Negatives</span>
        //   </p>
        //   `
        // },
        // {
        //   name: "FN Error Balance", value: fnErrorBalance,
        //   eqn: `[${(100*this.charts.A.vals.fn/(this.charts.A.vals.fn+this.charts.A.vals.tp)).toFixed()}% : ${(100*this.charts.B.vals.fn/(this.charts.B.vals.fn+this.charts.B.vals.tp)).toFixed()}%]`,
        //   content: `
        //   <p>
        //     Both fat cats and fat dogs should have equal rates of escaping (fat pets misdiagnosed as thin).
        //   </p>
        //   <p>
        //     Equal false negative rate (FNR) i.e. <span class="keyword keyword-fn">FN</span> / <span class="keyword keyword-realPos">Real Positives</span>
        //   </p>
        //   `
        // },
        {
          name: "Equalised Odds", value: equalisedOdds,
          eqn: `[${(100*this.charts.A.vals.fn/(this.charts.A.vals.fn+this.charts.A.vals.tp)).toFixed()}% : ${(100*this.charts.B.vals.fn/(this.charts.B.vals.fn+this.charts.B.vals.tp)).toFixed()}%] & [${(100*this.charts.A.vals.fp/(this.charts.A.vals.fp+this.charts.A.vals.tn)).toFixed()}% : ${(100*this.charts.B.vals.fp/(this.charts.B.vals.fp+this.charts.B.vals.tn)).toFixed()}%]`,
          content: `
          <p>
            Both thin cats and thin dogs should have equal rates of false alarms (thin pets misdiagnosed as fat). Both fat cats and fat dogs should also have equal rates of escaping (fat pets misdiagnosed as thin).
          </p>
          <p>
            Equal false positive rate (FPR) i.e. <span class="keyword keyword-fp">FP</span> / <span class="keyword keyword-realNeg">Real Negatives</span> and equal false negative rate (FNR) i.e. <span class="keyword keyword-fn">FN</span> / <span class="keyword keyword-realPos">Real Positives</span>.
          </p>
          `
        },
        {
          name: "Conditional Use Accuracy Equality", value: condUseAccuracyEquality,
          eqn: `[${(100*this.charts.A.vals.tp/(this.charts.A.vals.tp+this.charts.A.vals.fp)).toFixed()}% : ${(100*this.charts.B.vals.tp/(this.charts.B.vals.tp+this.charts.B.vals.fp)).toFixed()}%] & [${(100*this.charts.A.vals.tn/(this.charts.A.vals.tn+this.charts.A.vals.fn)).toFixed()}% : ${(100*this.charts.B.vals.tn/(this.charts.B.vals.tn+this.charts.B.vals.fn)).toFixed()}%]`,
          content: `
          <p>
            Whether predicted fat or not, the probability of the prediction being correct should be equal for cats and dogs.
          </p>
          <p>
            Equal positive predictive value (PPV) or precision i.e. <span class="keyword keyword-tp">TP</span> / <span class="keyword keyword-predPos">Predicted Positives</span> and equal negative predictive value (NPV) i.e. <span class="keyword keyword-tn">TN</span> / <span class="keyword keyword-predNeg">Predicted Negatives</span>.
          </p>
          `
        },
        {
          name: "Overall Accuracy Equality", value: overallAccuracyEquality,
          eqn: `[${this.charts.A.vals.tp+this.charts.A.vals.tn}% : ${this.charts.B.vals.tp+this.charts.B.vals.tn}%]`,
          content: `
          <p>
            The probability of the prediction being correct should be equal for cats and dogs. This disregards the type of prediction.
          </p>
          <p>
            Equal accuracy i.e. <span class="keyword keyword-tp">TP</span> + <span class="keyword keyword-tn">TN</span>.
          </p>
          `
        },
        {
          name: "Treatment Equality", value: treatmentEquality,
          eqn: `[${(this.charts.A.vals.fp/this.charts.A.vals.fn).toFixed(2)} : ${(this.charts.B.vals.fp/this.charts.B.vals.fn).toFixed(2)}]`,
          content: `
          <p>
            The ratio of escaped fat animals to wrongly accused thin animals should be equal for cats and dogs. The idea here is that wrong predictions lead to either false alarms (<span class="keyword keyword-fp">FP</span>) or escapes (<span class="keyword keyword-fn">FN</span>). So the ratio of these two effects should be equal between cats and dogs.
          </p>
          <p>
            Equal ratios of wrong predictions i.e. <span class="keyword keyword-fp">FP</span> / <span class="keyword keyword-fn">FN</span>.
          </p>
          `
        }
      ]
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
    },
    showCorrect: function() {
      d3.selectAll(".sector").attr("opacity", 0.5)
      d3.select("#Dogs-tp").attr("opacity", 1)
      d3.select("#Cats-tp").attr("opacity", 1)
      d3.select("#Dogs-tn").attr("opacity", 1)
      d3.select("#Cats-tn").attr("opacity", 1)
      this.charts.A.hover.tp = true
      this.charts.B.hover.tp = true
      this.charts.A.hover.tn = true
      this.charts.B.hover.tn = true
      d3.selectAll(".tooltip-tp").classed("hidden", false)
      d3.selectAll(".tooltip-tn").classed("hidden", false)
    },
    showWrong: function() {
      d3.selectAll(".sector").attr("opacity", 0.5)
      d3.select("#Dogs-fp").attr("opacity", 1)
      d3.select("#Cats-fp").attr("opacity", 1)
      d3.select("#Dogs-fn").attr("opacity", 1)
      d3.select("#Cats-fn").attr("opacity", 1)
      this.charts.A.hover.fp = true
      this.charts.B.hover.fp = true
      this.charts.A.hover.fn = true
      this.charts.B.hover.fn = true
      d3.selectAll(".tooltip-fp").classed("hidden", false)
      d3.selectAll(".tooltip-fn").classed("hidden", false)
    },
    showControls: function() {
      d3.selectAll(".tooltip-controls").classed("hidden", false)
    },
    mouseout: function() {
      d3.selectAll(".sector").attr("opacity", 1)
      for (var prop in self.charts.A.hover) {
        if (self.charts.A.hover.hasOwnProperty(prop)) self.charts.A.hover[prop] = false
        if (self.charts.B.hover.hasOwnProperty(prop)) self.charts.B.hover[prop] = false
      }
      d3.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true)
    },
    keywordHandler: function(key) {
      self = this
      // let handlers = {
      //   reset: function(){
      //     for (var prop in self.charts.A.hover) {
      //       if (self.charts.A.hover.hasOwnProperty(prop)) self.charts.A.hover[prop] = false
      //       if (self.charts.B.hover.hasOwnProperty(prop)) self.charts.B.hover[prop] = false
      //     }
      //     self.charts.A.g.selectAll("path").attr("opacity", 1)
      //     self.charts.B.g.selectAll("path").attr("opacity", 1)
      //   },
      //   tp: function(){
      //     self.charts.A.hover.tp = true
      //     self.charts.B.hover.tp = true
      //     d3.selectAll(`.tooltip-tp`).classed("hidden", false)
      //     d3.selectAll(".sector").attr("opacity", 0.5)
      //     d3.select("#Cats-tp").attr("opacity", 1)
      //     d3.select("#Dogs-tp").attr("opacity", 1)
      //   },
      //   fp: function(){
      //     self.charts.A.hover.fp = true
      //     self.charts.B.hover.fp = true
      //     d3.selectAll(`.tooltip-fp`).classed("hidden", false)
      //     d3.selectAll(".sector").attr("opacity", 0.5)
      //     d3.select("#Cats-fp").attr("opacity", 1)
      //     d3.select("#Dogs-fp").attr("opacity", 1)
      //   }
      // }
      // return handlers[key]
      if (key === "reset") {
        return function(){
          for (var prop in self.charts.A.hover) {
            if (self.charts.A.hover.hasOwnProperty(prop)) self.charts.A.hover[prop] = false
            if (self.charts.B.hover.hasOwnProperty(prop)) self.charts.B.hover[prop] = false
          }
          d3.selectAll(".tooltip-base1, .tooltip-base2, .tooltip-Cats, .tooltip-Dogs, .tooltip-controls").classed("hidden", true);
          d3.selectAll(".sector").attr("opacity", 1)
        }
      } else if (["tp-fp", "tn-fn", "tp-fn", "tn-fp"].indexOf(key) != -1) {
        return function(){
          d3.selectAll(".sector").attr("opacity", 0.5)
          key.split("-").forEach(k => {
            self.charts.A.hover[k] = true
            self.charts.B.hover[k] = true
            // d3.selectAll(`.tooltip-${k}`).classed("hidden", false)
            d3.select(`#Cats-${k}`).attr("opacity", 1)
            d3.select(`#Dogs-${k}`).attr("opacity", 1)
          })
        }
      } else {
        return function(){
          self.charts.A.hover[key] = true
          self.charts.B.hover[key] = true
          d3.selectAll(`.tooltip-${key}`).classed("hidden", false)
          d3.selectAll(".sector").attr("opacity", 0.5)
          d3.select(`#Cats-${key}`).attr("opacity", 1)
          d3.select(`#Dogs-${key}`).attr("opacity", 1)
        }
      }
    }
  },
  template: 
  `<div id="fairness-explorable">
    <div id="tooltip-qns">
      <p>
        The truth is shown by the colors of the sectors - <span class="keyword" @mouseover="showTooltip('tooltip-base1')" @mouseout="hideTooltip('tooltip-base1')">red for fat and blue for not fat</span>. So here we have 40% red for cats and 60% red for dogs. Positive (fat) predictions by our AI system are shown by <span class="keyword" @mouseover="showTooltip('tooltip-base2')" @mouseout="hideTooltip('tooltip-base2')">the striped sectors</span>. In other words, sectors with blue stripes on blue background and no stripes on red background are <span class="keyword" @mouseover="showCorrect()" @mouseout="mouseout()">correct predictions</span>. The other two sectors represent <span class="keyword" @mouseover="showWrong()" @mouseout="mouseout()">wrong predictions</span>.
      </p>
      <p>
        Some common fairness metrics are shown on the right, along with some relevant calculations. If the fairness metric is fulfilled, it will turn green. Try <span class="keyword" @mouseover="showControls()" @mouseout="mouseout()">tuning the accuracy</span> to achieve different fairness definitions. Click on the definitions for more details.
      </p>
    </div>
    <br/>
    <div id="explorable">
    <div id="charts-stats">
      <svg></svg>
      <div id="stats">
        <div id="chartA-stats">
          <div class="ui mini statistics" style="margin-left: -25px;">
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
          <div class="ui mini statistics" style="margin-left: -25px;">
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
    </div>
    <div id="fairness-types">
      <h3 style="margin-top:0;">Some Fairness Metrics</h3>
      <div class="ui inverted accordion fairness-types-segment">
        <acc-segment v-for="(el, idx) in fairnessTypes" :key="idx" :title="el.name" :eqn="el.eqn" :pass="el.value" :content="el.content"></acc-segment>
      </div>
    </div>
    </div>
  </div>`
}
