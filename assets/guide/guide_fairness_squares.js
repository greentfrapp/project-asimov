
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
  var g = null;
  var matrixGroupA = null;
  var matrixGroupB = null;

  var colors = [
  	"#e74c3c",
  	"#2ecc71",
  	"#3498db"
  ]

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

  		g = svg.append('g')

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
  	
  	g.append('text')
  		.attr('id', 'title')
  		.attr('x', width / 2)
    	.attr('y', height / 5 + 100)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 48)
    	.attr('text-anchor', 'middle')
      .attr('fill', '#DDDDDD')
    	.text('')

    let cyan = "#00B0F0",
    magenta = "#ED2690",
    yellow = "#FFF33F",
    black = "#000000",
    posDark = "#262d97",
    posLight = "#9ecadd",
    negDark = "#f14702",
    negLight = "#ffc409"

    // posLight = "#FFFFFF"
    // negLight = "#FFFFFF"

    let tpTxtr = textures.circles()
      .heavier()
      .fill(posLight)
      .background(posDark)
      .complement()
    let fpTxtr = textures.paths()
      .d("squares")
      .fill(posLight)
      .size(15)
      .stroke(posLight)
      .background(negDark)
    let tnTxtr = textures.paths()
      .d("squares")
      .fill("transparent")
      .size(15)
      .strokeWidth(2)
      .stroke(negLight)
      .background(negDark)
    let fnTxtr = textures.circles()
      .heavier()
      .fill("transparent")
      .radius(4)
      .strokeWidth(2)
      .stroke(negLight)
      .background(posDark)
      .complement()
    // consider using squares texture for empty squares and
    // lines to simulate filled squares 
    g.call(tpTxtr)
    g.call(tnTxtr)
    g.call(fpTxtr)
    g.call(fnTxtr)

    matrixStartX = 150
    matrixStartY = 350
    matrixWidth = 200
    matrixHeight = 200
    percRealPos = 0.6
    percRealNeg = 1 - percRealPos
    percRealPosPredPos = 0.8
    percRealNegPredNeg = 0.8
    percRealPosPredNeg = 1 - percRealPosPredPos
    percRealNegPredPos = 1 - percRealNegPredNeg
    matrixStroke = "#222222"
    matrixStrokeWidth = 2

    matrixGroupA = g.append("g")
                  .attr("id", "confusion-matrix-a")
    matrixGroupB = g.append("g")
                  .attr("id", "confusion-matrix-b")

    matrixGroupA.append("rect")
      .attr("id", "tp-area")
      .attr("x", matrixStartX)
      .attr("y", matrixStartY)
      .attr("width", matrixWidth * percRealPos)
      .attr("height", matrixHeight * percRealPosPredPos)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", tpTxtr.url())
    matrixGroupA.append("rect")
      .attr("id", "fp-area")
      .attr("x", matrixStartX + matrixWidth * percRealPos)
      .attr("y", matrixStartY)
      .attr("width", matrixWidth * percRealNeg)
      .attr("height", matrixHeight * percRealNegPredPos)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", fpTxtr.url())
    matrixGroupA.append("rect")
      .attr("id", "fn-area")
      .attr("x", matrixStartX)
      .attr("y", matrixStartY + matrixHeight * percRealPosPredPos)
      .attr("width", matrixWidth * percRealPos)
      .attr("height", matrixHeight * percRealPosPredNeg)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", fnTxtr.url())
    matrixGroupA.append("rect")
      .attr("id", "tn-area")
      .attr("x", matrixStartX + matrixWidth * percRealPos)
      .attr("y", matrixStartY + matrixHeight * percRealNegPredPos)
      .attr("width", matrixWidth * percRealNeg)
      .attr("height", matrixHeight * percRealNegPredNeg)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", tnTxtr.url())

    matrixGroupA.selectAll("rect").attr("opacity", 1)

    matrixStartX = 450
    matrixStartY = 350
    matrixWidth = 200
    matrixHeight = 200
    percRealPos = 0.4
    percRealNeg = 1 - percRealPos
    percRealPosPredPos = 0.8
    percRealNegPredNeg = 0.8
    percRealPosPredNeg = 1 - percRealPosPredPos
    percRealNegPredPos = 1 - percRealNegPredNeg
    matrixStroke = "#222222"
    matrixStrokeWidth = 2

     matrixGroupB.append("rect")
      .attr("id", "tp-area")
      .attr("x", matrixStartX)
      .attr("y", matrixStartY)
      .attr("width", matrixWidth * percRealPos)
      .attr("height", matrixHeight * percRealPosPredPos)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", tpTxtr.url())
    matrixGroupB.append("rect")
      .attr("id", "fp-area")
      .attr("x", matrixStartX + matrixWidth * percRealPos)
      .attr("y", matrixStartY)
      .attr("width", matrixWidth * percRealNeg)
      .attr("height", matrixHeight * percRealNegPredPos)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", fpTxtr.url())
    matrixGroupB.append("rect")
      .attr("id", "fn-area")
      .attr("x", matrixStartX)
      .attr("y", matrixStartY + matrixHeight * percRealPosPredPos)
      .attr("width", matrixWidth * percRealPos)
      .attr("height", matrixHeight * percRealPosPredNeg)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", fnTxtr.url())
    matrixGroupB.append("rect")
      .attr("id", "tn-area")
      .attr("x", matrixStartX + matrixWidth * percRealPos)
      .attr("y", matrixStartY + matrixHeight * percRealNegPredPos)
      .attr("width", matrixWidth * percRealNeg)
      .attr("height", matrixHeight * percRealNegPredNeg)
      .attr("stroke", matrixStroke)
      .attr("stroke-width", matrixStrokeWidth)
      .style("fill", tnTxtr.url())

    matrixGroupB.selectAll("rect").attr("opacity", 1)
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

    activateFunctions[1] = start;
    activateFunctions[2] = groupFairness;
    activateFunctions[3] = condStatParity;
    activateFunctions[4] = predictiveParity;
    activateFunctions[5] = FPErrorRateBalance;
    activateFunctions[6] = FNErrorRateBalance;
    activateFunctions[7] = equalisedOdds;
    activateFunctions[8] = condUseAccuracyEquality;
    activateFunctions[9] = overallAccuracyEquality;
    activateFunctions[10] = treatmentEquality;
    activateFunctions[11] = testFairness;
    activateFunctions[12] = wellCalibration;
    activateFunctions[13] = balancePositive;
    activateFunctions[14] = balanceNegative;
    activateFunctions[15] = causalDiscrimination;
    activateFunctions[16] = unawareness;
    activateFunctions[17] = awareness;
    activateFunctions[18] = counterfactual;
    activateFunctions[19] = noUnresolvedDisc;
    activateFunctions[20] = noProxyDisc;
    activateFunctions[21] = fairInference;

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

  let alphaHigh = 1,
  alphaMid = 0.6,
  alphaLow = 0.2

  function transformMatrix (group, opacities=[], predPosCorrect=0.5, predNegCorrect=0.5) {

    percRealPosPredPos = predPosCorrect
    percRealNegPredNeg = predNegCorrect
    percRealPosPredNeg = 1 - percRealPosPredPos
    percRealNegPredPos = 1 - percRealNegPredNeg

    group.select("#tp-area")
      .transition().duration(500)
      .attr("opacity", opacities[0])
      .attr("height", matrixHeight * percRealPosPredPos)
    group.select("#fp-area")
      .transition().duration(500)
      .attr("opacity", opacities[1])
      .attr("height", matrixHeight * percRealNegPredPos)
    group.select("#fn-area")
      .transition().duration(500)
      .attr("opacity", opacities[2])
      .attr("y", matrixStartY + matrixHeight * percRealPosPredPos)
      .attr("height", matrixHeight * percRealPosPredNeg)
    group.select("#tn-area")
      .transition().duration(500)
      .attr("opacity", opacities[3])
      .attr("y", matrixStartY + matrixHeight * percRealNegPredPos)
      .attr("height", matrixHeight * percRealNegPredNeg)
  }

  function start() {
    g.select('#title')
      .text("")
    // transformMatrix(matrixGroupA, [0, 0, 0, 0], 0.6)
    // transformMatrix(matrixGroupB, [0, 0, 0, 0], 0.4)
    transformMatrix(matrixGroupA, [1,1,1,1], 0.8, 0.8)
    transformMatrix(matrixGroupB, [1,1,1,1], 0.8, 0.8)
  }

  function groupFairness() {
    g.select('#title')
      .text("Group Fairness")
    transformMatrix(matrixGroupA, [alphaHigh, alphaHigh, alphaLow, alphaLow], 0.5)
    transformMatrix(matrixGroupB, [alphaHigh, alphaHigh, alphaLow, alphaLow], 0.5)
  }

  function condStatParity() {
    g.select('#title')
      .text("Conditional Statistical Parity")
    transformMatrix(matrixGroupA, [alphaHigh, alphaHigh, alphaLow, alphaLow], 0.5)
    transformMatrix(matrixGroupB, [alphaHigh, alphaHigh, alphaLow, alphaLow], 0.5)
  }

  function predictiveParity() {
    g.select('#title')
      .text("Predictive Parity")
  }

  function FPErrorRateBalance() {
    g.select('#title')
      .text("False Positive Error Rate Balance")
    transformMatrix(matrixGroupA, [alphaLow, alphaHigh, alphaLow, alphaHigh], 0.8, 0.8)
    transformMatrix(matrixGroupB, [alphaLow, alphaHigh, alphaLow, alphaHigh], 0.8, 0.8)
  }

  function FNErrorRateBalance() {
    g.select('#title')
      .text("False Negative Error Rate Balance")
    transformMatrix(matrixGroupA, [alphaHigh, alphaLow, alphaHigh, alphaLow], 0.8, 0.8)
    transformMatrix(matrixGroupB, [alphaHigh, alphaLow, alphaHigh, alphaLow], 0.8, 0.8)
  }

  function equalisedOdds() {
    g.select('#title')
      .text("Equalised Odds")
    transformMatrix(matrixGroupA, [alphaHigh, alphaHigh, alphaHigh, alphaHigh], 0.8, 0.8)
    transformMatrix(matrixGroupB, [alphaHigh, alphaHigh, alphaHigh, alphaHigh], 0.8, 0.8)
  }

  function condUseAccuracyEquality() {
    g.select('#title')
      .text("Conditional Use Accuracy Equality")
    transformMatrix(matrixGroupA, [alphaHigh, alphaLow, alphaLow, alphaHigh], 0.8, 0.8)
    transformMatrix(matrixGroupB, [alphaHigh, alphaLow, alphaLow, alphaHigh], 0.8, 0.8)
  }

  function overallAccuracyEquality() {
    g.select('#title')
      .text("Overall Accuracy Equality")
  }

  function treatmentEquality() {
    g.select('#title')
      .text("Treatment Equality")
  }

  function testFairness() {
    g.select('#title')
      .text("Test Fairness")
  }

  function wellCalibration() {
    g.select('#title')
      .text("Well Calibration")
  }

  function balancePositive() {
    g.select('#title')
      .text("Balance for Positive Class")
  }

  function balanceNegative() {
    g.select('#title')
      .text("Balance for Negative Class")
  }

  function causalDiscrimination() {
    g.select('#title')
      .text("Causal Discrimination")
  }

  function unawareness() {
    g.select('#title')
      .text("Fairness through Unawareness")
  }

  function awareness() {
    g.select('#title')
      .text("Fairness through Awareness")
  }

  function counterfactual() {
    g.select('#title')
      .text("Counterfactual Fairness")
  }

  function noUnresolvedDisc() {
    g.select('#title')
      .text("No Unresolved Discrimination")
  }

  function noProxyDisc() {
    g.select('#title')
      .text("No Proxy Discrimination")
  }

  function fairInference() {
    g.select('#title')
      .text("Fair Inference")
  }
  
  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    console.log(index)
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
