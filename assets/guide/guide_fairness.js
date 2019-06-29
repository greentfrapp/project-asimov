
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 1000;
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
    	.attr('y', height / 2)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 64)
    	.attr('text-anchor', 'middle')
    	.text('')
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

    activateFunctions[1] = blank;
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

  function blank() {
    g.select('#title')
      .text("")
  }

  function groupFairness() {
    g.select('#title')
      .text("Group Fairness")
  }

  function condStatParity() {
    g.select('#title')
      .text("Conditional Statistical Parity")
  }

  function predictiveParity() {
    g.select('#title')
      .text("Predictive Parity")
  }

  function FPErrorRateBalance() {
    g.select('#title')
      .text("False Positive Error Rate Balance")
  }

  function FNErrorRateBalance() {
    g.select('#title')
      .text("False Negative Error Rate Balance")
  }

  function equalisedOdds() {
    g.select('#title')
      .text("Equalised Odds")
  }

  function condUseAccuracyEquality() {
    g.select('#title')
      .text("Conditional Use Accuracy Equality")
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
