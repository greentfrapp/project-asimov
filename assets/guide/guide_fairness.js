
let arc = d3.arc()

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
  var width = 800;
  var height = document.documentElement.clientHeight;
  var margin = { top: 0, left: 20, bottom: 40, right: 10 };

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
    	.attr('y', height / 5)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 48)
    	.attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
    	.text('')

    // Pie Charts

    let cA = {x: 250, y: 400},
    cB = {x: 550, y: 400},
    radius = 125,
    ctrlRadius = 135,
    chartColors = {
      posDark: "#262d97",
      posLight: "#9ecadd",
      negDark: "#f14702",
      negLight: "#ffc409"
    }

    // Textures https://riccardoscalco.it/textures/

    let tpTxtr = textures.circles()
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
      .complement()
    
    svg.call(tpTxtr)
    svg.call(tnTxtr)
    svg.call(fpTxtr)
    svg.call(fnTxtr)

    // Chart A

    chartA.g = svg.append("g")
      .attr("transform", `translate(${cA.x}, ${cA.y})`)
      .attr("id", "chartA")

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
      .attr("opacity", 1)

    // Chart B

    chartB.g = svg.append("g")
      .attr("transform", `translate(${cB.x}, ${cB.y})`)
      .attr("id", "chartB")

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
      .attr("opacity", 1)

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
    activateFunctions[2] = groupFairness;
    // activateFunctions[3] = condStatParity;
    // activateFunctions[4] = predictiveParity;
    // activateFunctions[5] = FPErrorRateBalance;
    // activateFunctions[6] = FNErrorRateBalance;
    // activateFunctions[7] = equalisedOdds;
    // activateFunctions[8] = condUseAccuracyEquality;
    // activateFunctions[9] = overallAccuracyEquality;
    // activateFunctions[10] = treatmentEquality;
    // activateFunctions[11] = testFairness;
    // activateFunctions[12] = wellCalibration;
    // activateFunctions[13] = balancePositive;
    // activateFunctions[14] = balanceNegative;
    // activateFunctions[15] = causalDiscrimination;
    // activateFunctions[16] = unawareness;
    // activateFunctions[17] = awareness;
    // activateFunctions[18] = counterfactual;
    // activateFunctions[19] = noUnresolvedDisc;
    // activateFunctions[20] = noProxyDisc;
    // activateFunctions[21] = fairInference;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < activateFunctions.length; i++) {
      updateFunctions[i] = function () {};
    }
    // updateFunctions[2] = updateMove;
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

  let hi=1, mid=0.6, lo=0.2

  function reset() {
    title.text("")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", hi)
    textBox.text("Suppose for a moment that dogs are more likely to be fat, as compared to cats. In fact, cats only have a 40% chance of being fat, while dogs have a 60% chance of being fat. Fortunately, a company develops an AI system to diagnose if a pet is fat! Pets diagnosed as fat are then kept on a diet, which means less foo")
  }

  function start() {
    title.text("")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0.05 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.05 * 360, end: 0.35 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.35 * 360, end: 0.55 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.55 * 360, end: 270}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: -0.05 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.05 * 360, end: 0.15 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.15 * 360, end: 0.45 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.45 * 360, end: 270}))
      .attr("opacity", hi)
    
  }

  function groupFairness() {
    title.text("Group Fairness")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: 0.05 * 360}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.05 * 360, end: 0.35 * 360}))
      .attr("opacity", hi)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.35 * 360, end: 0.55 * 360}))
      .attr("opacity", hi)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.55 * 360, end: 270}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: -90, end: -0.05 * 360}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: -0.05 * 360, end: 0.15 * 360}))
      .attr("opacity", hi)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.15 * 360, end: 0.45 * 360}))
      .attr("opacity", hi)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.45 * 360, end: 270}))
      .attr("opacity", hi)
  }

  function condStatParity() {
    title.text("Conditional Statistical Parity")
  }

  function predictiveParity() {
    title.text("Predictive Parity")
    chartA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    chartA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.85*360}))
      .attr("opacity", lo)
    chartA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.85*360, end: 360}))
      .attr("opacity", lo)
    chartA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.25}))
      .attr("opacity", hi)
    chartB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    chartB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.65*360}))
      .attr("opacity", lo)
    chartB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.65*360, end: 360}))
      .attr("opacity", lo)
    chartB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.25}))
      .attr("opacity", hi)
  }

  function FPErrorRateBalance() {
    title.text("False Positive Error Rate Balance")
  }

  function FNErrorRateBalance() {
    title.text("False Negative Error Rate Balance")
  }

  function equalisedOdds() {
    title.text("Equalised Odds")
  }

  function condUseAccuracyEquality() {
    title.text("Conditional Use Accuracy Equality")
  }

  function overallAccuracyEquality() {
    title.text("Overall Accuracy Equality")
  }

  function treatmentEquality() {
    title.text("Treatment Equality")
  }

  function testFairness() {
    title.text("Test Fairness")
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
  }

  function unawareness() {
    title.text("Fairness through Unawareness")
  }

  function awareness() {
    title.text("Fairness through Awareness")
  }

  function counterfactual() {
    title.text("Counterfactual Fairness")
  }

  function noUnresolvedDisc() {
    title.text("No Unresolved Discrimination")
  }

  function noProxyDisc() {
    title.text("No Proxy Discrimination")
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
