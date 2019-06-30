
let arc = d3.arc()
let drag = d3.drag()

let arcTween = function({r=null, start=null, end=null, degrees=true}) {

  return function(d) {
    if (r === null) r = d.outerRadius
    if (start === null) {
      start = d.startAngle
    } else if (degrees) {
      start = start / 180 * Math.PI
    }
    if (end === null) {
      end = d.endAngle
    } else if (degrees) {
      end = end / 180 * Math.PI
    }

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
  sectorsA = {},
  sectorsB = {},
  posPred = 0.5

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
    	.attr('y', height / 5 + 100)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 48)
    	.attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
    	.text('')

    // Pie Charts

    let cx1 = 250,
    cy1 = 500,
    cx2 = 550,
    cy2 = 500,
    radius = 125,
    ctrlRadius = 135

    let posDark = "#262d97",
    posLight = "#9ecadd",
    negDark = "#f14702",
    negLight = "#ffc409"

    let tpTxtr = textures.circles()
      .heavier()
      .fill(posLight)
      .background(posDark)
      .complement(),
    fpTxtr = textures.paths()
      .d("squares")
      .fill(posLight)
      .size(15)
      .stroke(posLight)
      .background(negDark),
    tnTxtr = textures.paths()
      .d("squares")
      .fill("transparent")
      .size(15)
      .strokeWidth(2)
      .stroke(negLight)
      .background(negDark),
    fnTxtr = textures.circles()
      .heavier()
      .fill("transparent")
      .radius(4)
      .strokeWidth(2)
      .stroke(negLight)
      .background(posDark)
      .complement()
    
    svg.call(tpTxtr)
    svg.call(tnTxtr)
    svg.call(fpTxtr)
    svg.call(fnTxtr)

    pieA = svg.append("g")
      .attr("transform", `translate(${cx1}, ${cy1})`)
      .attr("id", "pieA")

    sectorsA.fp = pieA.append("path")
      .attr("id", "sectorsA-fp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0, endAngle: 0.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fpTxtr.url())
    sectorsA.tn = pieA.append("path")
      .attr("id", "sectorsA-tn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.5 * Math.PI, endAngle: Math.PI})
      .attr("d", arc)
      .style("fill", tnTxtr.url())
    sectorsA.fn = pieA.append("path")
      .attr("id", "sectorsA-fn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: Math.PI, endAngle: 1.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fnTxtr.url())
    sectorsA.tp = pieA.append("path")
      .attr("id", "sectorsA-tp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 1.5 * Math.PI, endAngle: 2 * Math.PI})
      .attr("d", arc)
      .style("fill", tpTxtr.url())
    pieA.selectAll("path")
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 1)

    pieB = svg.append("g")
      .attr("transform", `translate(${cx2}, ${cy2})`)
      .attr("id", "pieB")

    sectorsB.fp = pieB.append("path")
      .attr("id", "sectorsB-fp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0, endAngle: 0.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fpTxtr.url())
    sectorsB.tn = pieB.append("path")
      .attr("id", "sectorsB-tn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 0.5 * Math.PI, endAngle: Math.PI})
      .attr("d", arc)
      .style("fill", tnTxtr.url())
    sectorsB.fn = pieB.append("path")
      .attr("id", "sectorsB-fn")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: Math.PI, endAngle: 1.5 * Math.PI})
      .attr("d", arc)
      .style("fill", fnTxtr.url())
    sectorsB.tp = pieB.append("path")
      .attr("id", "sectorsB-tp")
      .datum({innerRadius: 0, outerRadius: radius, startAngle: 1.5 * Math.PI, endAngle: 2 * Math.PI})
      .attr("d", arc)
      .style("fill", tpTxtr.url())
    pieB.selectAll("path")
      .attr("stroke", "#222222")
      .attr("stroke-width", 3)
      .attr("opacity", 1)

    // Controls

    sectorsA.posCtrl = pieA.append("circle")
                        .attr("id", "sectorsA-posCtrl")
                        .datum({r: 10, x: 0, y: -ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#FF0000")
                        .call(d3.drag().on("drag", dragPosCtrlA))

    function dragPosCtrlA(d) {
      let r = (d3.event.x ** 2 + d3.event.y ** 2) ** 0.5,
      t = Math.atan2(d3.event.y, d3.event.x)
      tDegree = t / Math.PI * 180
      tDegree = clipAngle(tDegree, -162, -18)
      t = tDegree / 180 * Math.PI

      d3.select(this)
        .attr("cx", d.x = ctrlRadius * Math.cos(t))
        .attr("cy", d.y = ctrlRadius * Math.sin(t))
      startTP = t * 180 / Math.PI + 90
      sectorsA.fn.transition().duration(0)
        .attrTween("d", arcTween({start: 288, end: startTP + 360}))
        .attr("opacity", hi)
      sectorsA.tp.transition().duration(0)
        .attrTween("d", arcTween({start: startTP, end: 72}))
        .attr("opacity", hi)
    }

    sectorsA.negCtrl = pieA.append("circle")
                        .attr("id", "sectorsA-negCtrl")
                        .datum({r: 10, x: 0, y: ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#00FF00")
                        .call(d3.drag().on("drag", dragNegCtrlA))

    sectorsB.posCtrl = pieB.append("circle")
                        .attr("id", "sectorsB-posCtrl")
                        .datum({r: 10, x: 0, y: -ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#FF0000")
                        .call(d3.drag().on("drag", dragPosCtrlB))

    sectorsB.negCtrl = pieB.append("circle")
                        .attr("id", "sectorsB-negCtrl")
                        .datum({r: 10, x: 0, y: ctrlRadius})
                        .attr("r", d => d.r)
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)
                        .attr("fill", "#00FF00")
                        .call(d3.drag().on("drag", dragNegCtrlB))

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
      sectorsB.negCtrl.attr("cx", d => {
          prevT = Math.atan2(d.y, d.x)
          newT = prevT + deltaT
          d.x = ctrlRadius * Math.cos(newT)
          return d.x
        })
        .attr("cy", d => {
          prevT = Math.atan2(d.y, d.x)
          newT = prevT + deltaT
          d.y = ctrlRadius * Math.sin(newT)
          return d.y
        })
      startTN = t * 180 / Math.PI + 90
      while (startTN < 0) startTN += 360
      sectorsA.fp.transition().duration(0)
        .attrTween("d", arcTween({start: 72, end: startTN}))
        .attr("opacity", hi)
      sectorsA.tn.transition().duration(0)
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
      sectorsB.fn.transition().duration(0)
        .attrTween("d", arcTween({start: 252, end: startTP + 360}))
        .attr("opacity", hi)
      sectorsB.tp.transition().duration(0)
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
      console.log(startTN)
      sectorsB.fp.transition().duration(0)
        .attrTween("d", arcTween({start: 72, end: startTN}))
        .attr("opacity", hi)
      sectorsB.tn.transition().duration(0)
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
    // activateFunctions[2] = groupFairness;
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
    sectorsA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", hi)
    sectorsA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    sectorsA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", hi)
    sectorsA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 270, end: 360}))
      .attr("opacity", hi)
    sectorsB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0, end: 90}))
      .attr("opacity", hi)
    sectorsB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    sectorsB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 270}))
      .attr("opacity", hi)
    sectorsB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 270, end: 360}))
      .attr("opacity", hi)
  }

  function start() {
    title.text("")
    sectorsA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2*360, end: 180}))
      .attr("opacity", hi)
    sectorsA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.8*360}))
      .attr("opacity", hi)
    sectorsA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.8*360, end: 360}))
      .attr("opacity", hi)
    sectorsA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.2}))
      .attr("opacity", hi)
    sectorsB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3*360, end: 180}))
      .attr("opacity", hi)
    sectorsB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.7*360}))
      .attr("opacity", hi)
    sectorsB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.7*360, end: 360}))
      .attr("opacity", hi)
    sectorsB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.3}))
      .attr("opacity", hi)
    
  }

  function groupFairness() {
    title.text("Group Fairness")
    sectorsA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.2*360, end: 180}))
      .attr("opacity", hi)
    sectorsA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.8*360}))
      .attr("opacity", lo)
    sectorsA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.8*360, end: 360}))
      .attr("opacity", lo)
    sectorsA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.2}))
      .attr("opacity", hi)
    sectorsB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 0.3*360, end: 180}))
      .attr("opacity", hi)
    sectorsB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.7*360}))
      .attr("opacity", lo)
    sectorsB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.7*360, end: 360}))
      .attr("opacity", lo)
    sectorsB.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.3}))
      .attr("opacity", hi)
  }

  function condStatParity() {
    title.text("Conditional Statistical Parity")
  }

  function predictiveParity() {
    title.text("Predictive Parity")
    sectorsA.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    sectorsA.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.85*360}))
      .attr("opacity", lo)
    sectorsA.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.85*360, end: 360}))
      .attr("opacity", lo)
    sectorsA.tp.transition().duration(500)
      .attrTween("d", arcTween({start: 360, end: 360 * 1.25}))
      .attr("opacity", hi)
    sectorsB.fp.transition().duration(500)
      .attrTween("d", arcTween({start: 90, end: 180}))
      .attr("opacity", hi)
    sectorsB.tn.transition().duration(500)
      .attrTween("d", arcTween({start: 180, end: 0.65*360}))
      .attr("opacity", lo)
    sectorsB.fn.transition().duration(500)
      .attrTween("d", arcTween({start: 0.65*360, end: 360}))
      .attr("opacity", lo)
    sectorsB.tp.transition().duration(500)
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
