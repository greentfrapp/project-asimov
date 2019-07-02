Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

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
    .on("mouseover.fp", d => holder.hover.fp = true)
    .on("mouseout.fp", d => holder.hover.fp = false)
  holder.tn = holder.g.append("path")
    .attr("id", `${name}-tn`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.tn.start), endAngle: self.pieScale(percs.tn.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.tn.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.tn", d => holder.hover.tn = true)
    .on("mouseout.tn", d => holder.hover.tn = false)
  holder.fn = holder.g.append("path")
    .attr("id", `${name}-fn`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.fn.start), endAngle: self.pieScale(percs.fn.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.fn.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.fn", d => holder.hover.fn = true)
    .on("mouseout.fn", d => holder.hover.fn = false)
  holder.tp = holder.g.append("path")
    .attr("id", `${name}-tp`)
    .datum({innerRadius: 0, outerRadius: self.pieParams.r, startAngle: self.pieScale(percs.tp.start), endAngle: self.pieScale(percs.tp.end)})
    .attr("d", self.arc)
    .style("fill", self.txtrs.tp.url())
    .on("mouseover.sector", mouseoverSector)
    .on("mouseout.sector", mouseoutSector)
    .on("mouseover.tp", d => holder.hover.tp = true)
    .on("mouseout.tp", d => holder.hover.tp = false)
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
      holder.tp.transition().duration(0)
        .attrTween("d", self.arcTween({start: t + Math.PI / 2, end: self.pieScale(percs.tp.end)}))
      holder.vals.tp = Math.round(100 * (percs.tp.end - (t + Math.PI / 2) / (2 * Math.PI)))
      holder.fn.transition().duration(0)
        .attrTween("d", self.arcTween({start: self.pieScale(percs.fn.start), end: t + Math.PI / 2}))
      holder.vals.fn = Math.round(100 * ((t + Math.PI / 2) / (2 * Math.PI) - percs.fn.start))
    }))

  // Negative Control
  holder.negCtrl = holder.g.append("circle")
    .attr("id", `${name}-negCtrl`)
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
        t += 2 * Math.PI
        holder.fp.transition().duration(0)
          .attrTween("d", self.arcTween({start: self.pieScale(percs.fp.start), end: t + Math.PI / 2}))
        holder.vals.fp = Math.round(100 * ((t + Math.PI / 2) / (2 * Math.PI) - percs.fp.start))
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
        t -= 2 * Math.PI
        holder.tn.transition().duration(0)
          .attrTween("d", self.arcTween({start: t + Math.PI / 2, end: self.pieScale(percs.tn.end)}))
        holder.vals.tn = Math.round(100 * (percs.tn.end - (t + Math.PI / 2) / (2 * Math.PI)))
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
    this.txtrs.tn = textures.lines()
                      .heavier()
                      .stroke(this.colors.negLight)
                      .background(this.colors.negDark)
    this.txtrs.fp = textures.paths()
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
    initChart(this.charts.A, this, this.pieParams.cA, "chartA", percs.A)
    initChart(this.charts.B, this, this.pieParams.cB, "chartB", percs.B)
  },
  beforeDestroy: function () {},
  data: function () {
    return {
      svgHeight: 500,
      svgWidth: 800,
      arc: d3.arc(),
      pieScale: d3.scaleLinear()
                  .domain([0, 1])
                  .range([0, 2 * Math.PI]),
      svg: null,
      pieParams: {
        cA: {x: 175, y: 300},
        cB: {x: 425, y: 300},
        r: 100,
        ctrlR: 110,
      },
      colors: {
        posDark: "#036ecd",
        posLight: "#dddddd",
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
      return {
        groupFairness: groupFairness,
        predictiveParity: predictiveParity,
        fpErrorBalance: fpErrorBalance,
        fnErrorBalance: fnErrorBalance,
        equalisedOdds: equalisedOdds
      }
    },
    test: function () {
      return this.charts.A.vals
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
    }
  },
  template: 
  `<div id="fairness-explorable">
    <svg></svg>
    <div>
      <div id="chartA-stats">
        <div class="ui tiny statistics">
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
        <div class="ui tiny statistics">
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
        <div class="ui tiny statistics">
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
        <div class="ui tiny statistics">
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
  </div>`
}