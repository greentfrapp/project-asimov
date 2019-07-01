
let arc = d3.arc()

let rectScale = d3.scaleLinear()
  .domain([0, 1])
  .range([0, 250]);

if (document.documentElement.clientWidth > 1500) {
  d3.select("#fairness-vis").style("right", (document.documentElement.clientWidth - 1400) * 0.5 + "px")
} else {
  d3.select("#fairness-vis").style("right", document.documentElement.clientWidth * 0.05 + "px")
}

function arcTween ({r=null, start=null, end=null, degrees=true, shift=Math.PI/2, shortest=true}) {

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

    // if (shortest) {
    //   if (Math.abs(start - d.startAngle) > Math.PI) {
    //     if (start > d.startAngle) {
    //       start -= 2 * Math.PI
    //       end -= 2 * Math.PI
    //     } else {
    //       start += 2 * Math.PI
    //       end += 2 * Math.PI
    //     }
    //   }
    // }

    // while (start >= d.startAngle + 2 * Math.PI) start -= 2 * Math.PI
    // while (end >= d.endAngle + 2 * Math.PI) end -= 2 * Math.PI

    var interRadius = d3.interpolate(d.outerRadius, r),
    interStartAngle = d3.interpolate(d.startAngle, start),
    interEndAngle = d3.interpolate(d.endAngle, end);
    return function(t) {
      d.outerRadius = interRadius(t);
      d.startAngle = interStartAngle(t);
      d.endAngle = interEndAngle(t);
      return arc(d);
    };
  };
}

function clipAngle(t, min, max) {
  let newT = t - min
  let newMax = max - min
  // All values should be > 0 and < 360
  while (newT < 0) newT += 360
  while (newT > 360) newT -= 360
  while (newMax < 0) newMax += 360
  while (newMax > 360) newMax -= 360
  if (newT > newMax) {
    if (newT > newMax / 2 + 180) {
      return min
    } else {
      return max
    }
  } else {
    return t
  }
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 500;
  var height = document.documentElement.clientHeight;
  var margin = { top: 0, left: 0, bottom: 40, right: 0 };

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  // var g = null;
  // var matrixGroupA = null;
  // var matrixGroupB = null;
  var title = null,
  chartA = {},
  chartB = {}

  let posTxtr = null,
  negTxtr = null,
  tpTxtr = null,
  fpTxtr = null,
  fnTxtr = null,
  tnTxtr = null,
  radius = 0

  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
  	selection.each(function (data) {
  		
  		svg = d3.select(this)
  			.append('svg')
  			.attr('width', width + margin.left + margin.right)
  			.attr('height', height + margin.top + margin.bottom)

      textBox = d3.select(this)
        .append('div')
        .attr("class", "vis-textbox")
        .append('p')

  		// g = svg.append('g')

    	setupVis(data);

    	setupSections();
    })
  };


  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param wordData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  var setupVis = function (data) {

    // Title
  	
  	title = svg.append('text')
  		.attr('id', 'title')
  		.attr('x', width / 2)
    	.attr('y', height / 6)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 36)
    	.attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
    	.text('')
    titleTop = svg.append('text')
      .attr('id', 'title')
      .attr('x', width / 2)
      .attr('y', height / 6 - 18)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('font-size', 36)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('')
    titleBot = svg.append('text')
      .attr('id', 'title')
      .attr('x', width / 2)
      .attr('y', height / 6 + 18)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('font-size', 36)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('')

    // Pie Charts

    cA = {x: 125, y: 300}
    cB = {x: 375, y: 300}
    radius = 100
    ctrlRadius = 135
    chartColors = {
      // posDark: "#262d97",
      // posLight: "#9ecadd",
      // negDark: "#f14702",
      // negLight: "#ffc409"
      posDark: "#036ecd",
      posLight: "#dddddd",
      negDark: "#f3442d",
      negLight: "#dddddd"
    }

    // Textures https://riccardoscalco.it/textures/

    posTxtr = textures.circles()
      .heavier()
      .fill("#FFFFFF")
      .background(chartColors.posDark)
      .complement(),
    negTxtr = textures.paths()
      .d("squares")
      .fill("#FFFFFF")
      .size(15)
      .stroke("#FFFFFF")
      .background(chartColors.negDark),
    tpTxtr = textures.circles()
      .heavier()
      .fill(chartColors.posLight)
      .background(chartColors.posDark)
      .complement(),
    fpTxtr = textures.paths()
      .d("squares")
      .fill(chartColors.posLight)
      .size(15)
      .stroke(chartColors.posLight)
      .background(chartColors.negDark),
    tnTxtr = textures.paths()
      .d("squares")
      .fill("transparent")
      .size(15)
      .strokeWidth(2)
      .stroke(chartColors.negLight)
      .background(chartColors.negDark),
    fnTxtr = textures.circles()
      .heavier()
      .fill("transparent")
      .radius(4)
      .strokeWidth(2)
      .stroke(chartColors.negLight)
      .background(chartColors.posDark)
      .complement(),
    tnTxtr = textures.lines()
      .heavier()
      .stroke(chartColors.negLight)
      .background(chartColors.negDark),
    tpTxtr = textures.lines()
      .heavier()
      .stroke(chartColors.posLight)
      .background(chartColors.posDark),
    fpTxtr = textures.paths()
      .d(s => '')
      .background(chartColors.negDark),
    fnTxtr = textures.paths()
      .d(s => '')
      .background(chartColors.posDark),
    negTxtr = textures.paths()
      .d(s => '')
      .background(chartColors.negDark),
    posTxtr = textures.paths()
      .d(s => '')
      .background(chartColors.posDark)
    
    svg.call(posTxtr)
    svg.call(negTxtr)
    svg.call(tpTxtr)
    svg.call(tnTxtr)
    svg.call(fpTxtr)
    svg.call(fnTxtr)

    // Chart A

    chartA.g = svg.append("g")
      .attr("transform", `translate(${cA.x}, ${cA.y})`)
      .attr("id", "chartA")

    chartA.title = chartA.g.append("text")
      .attr('id', 'chartA-title')
      .attr('x', 0)
      .attr('y', - radius - 20)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('Cats')
      .attr("opacity", 0)
    chartA.title2 = chartA.g.append("text")
      .attr('id', 'chartA-title2')
      .attr('x', 0)
      .attr('y', radius + 35)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('Cats Predicted Fat')
      .attr("opacity", 0)
    chartA.x0 = chartA.g.append("text")
      .attr('id', 'chartA-x0')
      .attr('x', -radius)
      .attr('y', radius + 101)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('0%')
      .attr("opacity", 0)
    chartA.x1 = chartA.g.append("text")
      .attr('id', 'chartA-x1')
      .attr('x', radius)
      .attr('y', radius + 101)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('100%')
      .attr("opacity", 0)

    chartA.rect1 = chartA.g.append("rect")
      .attr("id", "chartA-rect1")
      .attr("x", -radius)
      .attr("y", radius + 50)
      .attr("width", rectScale(0.8))
      .attr("height", 35)
      .attr("fill", tpTxtr.url())
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)
    chartA.rect2 = chartA.g.append("rect")
      .attr("id", "chartA-rect2")
      .attr("x", -radius + rectScale(0.8))
      .attr("y", radius + 50)
      .attr("width", rectScale(0.2))
      .attr("height", 35)
      .attr("fill", fpTxtr.url())
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)

    chartA.pos = chartA.g.append("path")
      .attr("id", "chartA-pos")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.55 * 2 * Math.PI, endAngle: 0.95 * 2 * Math.PI})
      .attr("d", arc)
      .style("fill", posTxtr.url())
    chartA.neg = chartA.g.append("path")
      .attr("id", "chartA-neg")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: -0.05 * 2 * Math.PI, endAngle: 0.55 * 2 * Math.PI})
      .attr("d", arc)
      .style("fill", negTxtr.url())
    chartA.fp = chartA.g.append("path")
      .attr("id", "chartA-fp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0, endAngle: 0.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fpTxtr.url())
    chartA.tn = chartA.g.append("path")
      .attr("id", "chartA-tn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.5 * Math.PI, endAngle: Math.PI})
      .attr("d", arc)
      .style("fill", tnTxtr.url())
    chartA.fn = chartA.g.append("path")
      .attr("id", "chartA-fn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: Math.PI, endAngle: 1.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fnTxtr.url())
    chartA.tp = chartA.g.append("path")
      .attr("id", "chartA-tp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 1.5 * Math.PI, endAngle: 2 * Math.PI})
      .attr("d", arc)
      .style("fill", tpTxtr.url())
    chartA.g.selectAll("path")
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)

    // Chart B

    chartB.g = svg.append("g")
      .attr("transform", `translate(${cB.x}, ${cB.y})`)
      .attr("id", "chartB")

    chartB.title = chartB.g.append("text")
      .attr('id', 'chartB-title')
      .attr('x', 0)
      .attr('y', - radius - 20)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('Dogs')
      .attr("opacity", 0)
    chartB.title2 = chartB.g.append("text")
      .attr('id', 'chartB-title2')
      .attr('x', 0)
      .attr('y', radius + 35)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('Dogs Predicted Fat')
      .attr("opacity", 0)

    chartB.rect1 = chartB.g.append("rect")
      .attr("id", "chartB-rect1")
      .attr("x", -radius)
      .attr("y", radius + 50)
      .attr("width", rectScale(0.8))
      .attr("height", 35)
      .attr("fill", tpTxtr.url())
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)
    chartB.rect2 = chartB.g.append("rect")
      .attr("id", "chartB-rect2")
      .attr("x", -radius + rectScale(0.8))
      .attr("y", radius + 50)
      .attr("width", rectScale(0.2))
      .attr("height", 35)
      .attr("fill", fpTxtr.url())
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)
    chartB.x0 = chartB.g.append("text")
      .attr('id', 'chartB-x0')
      .attr('x', -radius)
      .attr('y', radius + 101)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('0%')
      .attr("opacity", 0)
    chartB.x1 = chartB.g.append("text")
      .attr('id', 'chartB-x1')
      .attr('x', radius)
      .attr('y', radius + 101)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
      .text('100%')
      .attr("opacity", 0)

    chartB.pos = chartB.g.append("path")
      .attr("id", "chartB-pos")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.45 * 2 * Math.PI, endAngle: 1.05 * 2 * Math.PI})
      .attr("d", arc)
      .style("fill", posTxtr.url())
    chartB.neg = chartB.g.append("path")
      .attr("id", "chartB-neg")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.05 * 2 * Math.PI, endAngle: 0.45 * 2 * Math.PI})
      .attr("d", arc)
      .style("fill", negTxtr.url())
    chartB.fp = chartB.g.append("path")
      .attr("id", "chartB-fp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0, endAngle: 0.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fpTxtr.url())
    chartB.tn = chartB.g.append("path")
      .attr("id", "chartB-tn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.5 * Math.PI, endAngle: Math.PI})
      .attr("d", arc)
      .style("fill", tnTxtr.url())
    chartB.fn = chartB.g.append("path")
      .attr("id", "chartB-fn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: Math.PI, endAngle: 1.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fnTxtr.url())
    chartB.tp = chartB.g.append("path")
      .attr("id", "chartB-tp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 1.5 * Math.PI, endAngle: 2 * Math.PI})
      .attr("d", arc)
      .style("fill", tpTxtr.url())
    chartB.g.selectAll("path")
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 0)

    // Controls

    chartA.posCtrl = chartA.g.append("circle")
                        .attr("id", "chartA-posCtrl")
                        .datum({r: 10, x: 0, y: -ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#FF0000")
                        .call(d3.drag().on("drag", dragPosCtrlA))
                        .attr("class", "hidden")

    chartA.negCtrl = chartA.g.append("circle")
                        .attr("id", "chartA-negCtrl")
                        .datum({r: 10, x: 0, y: ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#00FF00")
                        .call(d3.drag().on("drag", dragNegCtrlA))
                        .attr("class", "hidden")

    chartB.posCtrl = chartB.g.append("circle")
                        .attr("id", "chartB-posCtrl")
                        .datum({r: 10, x: 0, y: -ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#FF0000")
                        .call(d3.drag().on("drag", dragPosCtrlB))
                        .attr("class", "hidden")

    chartB.negCtrl = chartB.g.append("circle")
                        .attr("id", "chartB-negCtrl")
                        .datum({r: 10, x: 0, y: ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#00FF00")
                        .call(d3.drag().on("drag", dragNegCtrlB))
                        .attr("class", "hidden")

    function dragPosCtrlA(d) {
      theta = Math.degrees(Math.atan2(d3.event.y, d3.event.x))
      theta = clipAngle(theta, -162, -18)

      d3.select(this)
        .attr("cx", d.x = ctrlRadius * Math.cos(Math.radians(theta)))
        .attr("cy", d.y = ctrlRadius * Math.sin(Math.radians(theta)))
      startTP = theta + 90
      chartA.fn.transition().duration(0)
        .attrTween("d", arcTween({start: 288, end: startTP + 360}))
        .attr("opacity", hi)
      chartA.tp.transition().duration(0)
        .attrTween("d", arcTween({start: startTP, end: 72}))
        .attr("opacity", hi)
    }

    function dragNegCtrlA(d) {
      let initialT = Math.atan2(d.y, d.x)
      let r = (d3.event.x ** 2 + d3.event.y ** 2) ** 0.5,
      t = Math.atan2(d3.event.y, d3.event.x)
      deltaT = t - initialT
      tDegree = t / Math.PI * 180
      tDegree = clipAngle(tDegree, -18, 198)
      t = tDegree / 180 * Math.PI

      d3.select(this)
        .attr("cx", d.x = ctrlRadius * Math.cos(t))
        .attr("cy", d.y = ctrlRadius * Math.sin(t))
      
      startTN = t * 180 / Math.PI + 90
      while (startTN < 0) startTN += 360
      chartA.fp.transition().duration(0)
        .attrTween("d", arcTween({start: 72, end: startTN}))
        .attr("opacity", hi)
      chartA.tn.transition().duration(0)
        .attrTween("d", arcTween({start: startTN, end: 288}))
        .attr("opacity", hi)
    }

    function dragPosCtrlB(d) {
      let r = (d3.event.x ** 2 + d3.event.y ** 2) ** 0.5,
      t = Math.atan2(d3.event.y, d3.event.x)
      tDegree = t / Math.PI * 180
      tDegree = clipAngle(tDegree, -198, 18)
      t = tDegree / 180 * Math.PI

      d3.select(this)
        .attr("cx", d.x = ctrlRadius * Math.cos(t))
        .attr("cy", d.y = ctrlRadius * Math.sin(t))
      startTP = t * 180 / Math.PI + 90
      while (startTP > 180) startTP -= 360
      chartB.fn.transition().duration(0)
        .attrTween("d", arcTween({start: 252, end: startTP + 360}))
        .attr("opacity", hi)
      chartB.tp.transition().duration(0)
        .attrTween("d", arcTween({start: startTP, end: 108}))
        .attr("opacity", hi)
    }

    function dragNegCtrlB(d) {
      let r = (d3.event.x ** 2 + d3.event.y ** 2) ** 0.5,
      t = Math.atan2(d3.event.y, d3.event.x)
      tDegree = t / Math.PI * 180
      tDegree = clipAngle(tDegree, 18, -198)
      t = tDegree / 180 * Math.PI

      d3.select(this)
        .attr("cx", d.x = ctrlRadius * Math.cos(t))
        .attr("cy", d.y = ctrlRadius * Math.sin(t))
      startTN = t * 180 / Math.PI + 90
      while (startTN < 0) startTN += 360
      chartB.fp.transition().duration(0)
        .attrTween("d", arcTween({start: 72, end: startTN}))
        .attr("opacity", hi)
      chartB.tn.transition().duration(0)
        .attrTween("d", arcTween({start: startTN, end: 288}))
        .attr("opacity", hi)
    }
  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes

    d3.selectAll('.step').each((d, i) => {
      let a = i
      activateFunctions[i] = function () {};
    })

    activateFunctions[0] = reset;
    activateFunctions[1] = start;
    activateFunctions[2] = predict;
    activateFunctions[3] = groupFairness;
    activateFunctions[4] = condStatParity;
    activateFunctions[5] = predictiveParity;
    activateFunctions[6] = FPErrorRateBalance;
    activateFunctions[7] = FNErrorRateBalance;
    activateFunctions[8] = equalisedOdds;
    activateFunctions[9] = condUseAccuracyEquality;
    activateFunctions[10] = overallAccuracyEquality;
    activateFunctions[11] = treatmentEquality;
    activateFunctions[12] = testFairness;
    activateFunctions[13] = wellCalibration;
    activateFunctions[14] = balancePositive;
    activateFunctions[15] = balanceNegative;
    activateFunctions[16] = causalDiscrimination;
    activateFunctions[17] = unawareness;
    activateFunctions[18] = awareness;
    activateFunctions[19] = counterfactual;
    activateFunctions[20] = noUnresolvedDisc;
    activateFunctions[21] = noProxyDisc;
    activateFunctions[22] = fairInference;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < activateFunctions.length; i++) {
      updateFunctions[i] = function () {};
    }
    // updateFunctions[2] = groupFairnessProgress;
    // updateFunctions[3] = updateExpand;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  let hi=1, mid=0.6, lo=0.1

  function reset() {
    title.text("")
    chartA.title.transition().duration(500)
      .attr("opacity", 0)
    chartB.title.transition().duration(500)
      .attr("opacity", 0)
    chartA.pos.transition().duration(500)
      .attr("opacity", 0)
    chartA.neg.transition().duration(500)
      .attr("opacity", 0)
    chartB.pos.transition().duration(500)
      .attr("opacity", 0)
    chartB.neg.transition().duration(500)
      .attr("opacity", 0)
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0}))
      .attr("opacity", 0)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", 0)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", 0)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", 0)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0}))
      .attr("opacity", 0)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", 0)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", 0)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", 0)
    textBox.text("")
  }

  function start() {
    title.text("")
    chartA.title.transition().duration(500)
      .attr("opacity", 1)
    chartB.title.transition().duration(500)
      .attr("opacity", 1)
    chartA.pos.transition().duration(500)
      .attr("opacity", 1)
    chartA.neg.transition().duration(500)
      .attr("opacity", 1)
    chartB.pos.transition().duration(500)
      .attr("opacity", 1)
    chartB.neg.transition().duration(500)
      .attr("opacity", 1)
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: 0}))
      .attr("opacity", 0)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 0.3 * 360}))
      .attr("opacity", 0)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", 0)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", 0)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0}))
      .attr("opacity", 0)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 0.2 * 360}))
      .attr("opacity", 0)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", 0)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", 0)
    textBox.text("Fat animals are represented in dark blue with circles. Thin animals are represented in orange with squares.")
  }

  function predict() {
    title.text("")
    chartA.pos.transition().duration(500)
      .attr("opacity", 0)
    chartA.neg.transition().duration(500)
      .attr("opacity", 0)
    chartB.pos.transition().duration(500)
      .attr("opacity", 0)
    chartB.neg.transition().duration(500)
      .attr("opacity", 0)
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: 0}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 0.3 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 0.2 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("Animals predicted fat are in light blue solid shapes, animals predicted thin are in yellow empty shapes.")
  }

  function groupFairness() {
    title.text("Group Fairness")
    titleTop.text("")
    titleBot.text("")
    // chartA
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.3 * 360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    // chartB
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("In this case, both cats and dogs have the same 40% chance of being predicted fat (light blue). It does not matter whether the predictions are correct.")
  }

  function condStatParity() {
    title.text("")
    titleTop.text("Conditional")
    titleBot.text("Statistical Parity")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.3 * 360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("This is similar to Group Fairness, except that the equality only applies for cats and dogs that are the same (e.g. same age and same weight).")
  }

  function predictiveParity() {
    title.text("Predictive Parity")
    titleTop.text("")
    titleBot.text("")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.25 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.25 * 360, end: 0.3 * 360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.4 * 360}))
      .attr("opacity", lo)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.4 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("In this case, any animal predicted as fat (light blue) has an 80% chance of actually being fat (dark blue), for both cats and dogs. This disregards animals predicted to be thin (yellow).")
  }

  function FPErrorRateBalance() {
    title.text("")
    titleTop.text("False Positive")
    titleBot.text("Error Rate Balance")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.3 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.5 * 360}))
      .attr("opacity", lo)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.7 * 360}))
      .attr("opacity", lo)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.067 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.067 * 360, end: 0.2 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.4 * 360}))
      .attr("opacity", lo)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.4 * 360, end: 0.8 * 360}))
      .attr("opacity", lo)
    textBox.text("For example, a thin animal (orange) could have a 33% chance of being wrongly predicted as fat (light blue), no matter cat or dog. This disregards fat animals.")

    chartA.title2.text("Cats Actually Thin")
    chartA.rect1.transition().duration(500)
      .attr("fill", fpTxtr.url())
      .attr("width", rectScale(0.33))
    chartA.rect2.transition().duration(500)
      .attr("fill", tnTxtr.url())
      .attr("x", -radius + rectScale(0.33))
      .attr("width", rectScale(0.67))

    chartB.title2.text("Dogs Actually Thin")
    chartB.rect1.transition().duration(500)
      .attr("fill", fpTxtr.url())
      .attr("width", rectScale(0.33))
    chartB.rect2.transition().duration(500)
      .attr("fill", tnTxtr.url())
      .attr("x", -radius + rectScale(0.33))
      .attr("width", rectScale(0.67))
  }

  function FNErrorRateBalance() {
    title.text("")
    titleTop.text("False Negative")
    titleBot.text("Error Rate Balance")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.1 * 360}))
      .attr("opacity", lo)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.3 * 360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.34 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.34 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.067 * 360}))
      .attr("opacity", lo)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.067 * 360, end: 0.2 * 360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.26 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.26 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("For instance, a fat animal (dark blue) could have a 10% chance of being wrongly predicted as thin (yellow), no matter cat or dog. This disregards thin animals.")
  }

  function equalisedOdds() {
    title.text("Equalised Odds")
    titleTop.text("")
    titleBot.text("")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.1 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.1 * 360, end: 0.3 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.34 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.34 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: -0.067 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.067 * 360, end: 0.2 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.267 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.267 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("This combines the previous two cases. It also means that the chance of being falsely accused and the chance of escaping from a diet are the same for both cats and dogs.")
  }

  function condUseAccuracyEquality() {
    title.text("")
    titleTop.text("Conditional Use")
    titleBot.text("Accuracy Equality")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.233 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.233 * 360, end: 0.3 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.567 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.567 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.067 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.067 * 360, end: 0.2 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.267 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.267 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("For an animal predicted to be fat (yellow), it has a 60% chance of actually being fat (orange). For an animal predicted to be thin (light blue), it has a 60% chance of actually being thin (dark blue). This applies for both cats and dogs.")
  }

  function overallAccuracyEquality() {
    title.text("Overall Accuracy Equality")
    titleTop.text("")
    titleBot.text("")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: 0}))
      .attr("opacity", mid)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 0.3 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.4 * 360}))
      .attr("opacity", mid)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.4 * 360, end: 0.7 * 360}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.1 * 360}))
      .attr("opacity", mid)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.3 * 360}))
      .attr("opacity", mid)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.8 * 360}))
      .attr("opacity", hi)
    textBox.text("In this case, the chance of a correct prediction (yellow on orange and light blue on dark blue) is 60% for both cats and dogs. This disregards the type of prediction that is correct.")
  }

  function treatmentEquality() {
    title.text("Treatment Equality")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.2 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.3 * 360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.4 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.4 * 360, end: 0.7 * 360}))
      .attr("opacity", lo)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.1 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", lo)
    textBox.text("For example, the ratio of falsely accused thin animals and escaped fat animals could be 1:1 for both cats and dogs. But this says nothing about the absolute accuracies. In this case, the predictions are obviously more inaccurate for dogs.")
  }

  function testFairness() {
    title.text("Test Fairness")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.3 * 360, end: -0.2 * 360}))
      .attr("opacity", 0)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.3 * 360}))
      .attr("opacity", 0)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3 * 360, end: 0.4 * 360}))
      .attr("opacity", 0)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.4 * 360, end: 0.7 * 360}))
      .attr("opacity", 0)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -0.2 * 360, end: 0.1 * 360}))
      .attr("opacity", 0)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.1 * 360, end: 0.2 * 360}))
      .attr("opacity", 0)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2 * 360, end: 0.5 * 360}))
      .attr("opacity", 0)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.5 * 360, end: 0.8 * 360}))
      .attr("opacity", 0)
    textBox.text("")
  }

  function wellCalibration() {
    title.text("Well Calibration")
  }

  function balancePositive() {
    title.text("Balance for Positive Class")
  }

  function balanceNegative() {
    title.text("Balance for Negative Class")
  }

  function causalDiscrimination() {
    title.text("Causal Discrimination")
    titleTop.text("")
    titleBot.text("")
  }

  function unawareness() {
    title.text("")
    titleTop.text("Fairness")
    titleBot.text("through Unawareness")
  }

  function awareness() {
    title.text("")
    titleTop.text("Fairness")
    titleBot.text("through Awareness")
  }

  function counterfactual() {
    title.text("Counterfactual Fairness")
    titleTop.text("")
    titleBot.text("")
  }

  function noUnresolvedDisc() {
    title.text("")
    titleTop.text("No Unresolved")
    titleBot.text("Discrimination")
  }

  function noProxyDisc() {
    title.text("No Proxy Discrimination")
    titleTop.text("")
    titleBot.text("")
  }

  function fairInference() {
    title.text("Fair Inference")
  }
  
  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#fairness-vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#guide-body'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

// load data and display
d3.csv("../../assets/guide/data.csv").then(display)
