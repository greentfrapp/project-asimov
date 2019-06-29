
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 600;
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
    	.text('Scroller Demo')
    	.attr('opacity', 0)

    g.selectAll('circle.ball')
    	.data(data).enter()
    	.append('circle')
    	.attr('class', 'ball')
    	.attr('r', 50)
    	.attr('fill', (d, i) => colors[i])
    	.attr('cx', (d, i) => width / 2 - 150 + i * 150)
    	.attr('cy', height / 2)
    	.attr('opacity', 0)

    g.append('text')
  		.attr('id', 'end')
  		.attr('x', width / 2)
    	.attr('y', height / 2)
    	.attr('font-family', 'sans-serif')
    	.attr('font-weight', 'bold')
    	.attr('font-size', 64)
    	.attr('text-anchor', 'middle')
    	.text('End Demo')
    	.attr('opacity', 0)
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
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showCircle;
    activateFunctions[2] = moveCircle;
    activateFunctions[3] = expandCircle;
    activateFunctions[4] = endVis;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < 5; i++) {
      updateFunctions[i] = function () {};
    }
    updateFunctions[2] = updateMove;
    updateFunctions[3] = updateExpand;
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

  function showTitle() {
  	g.select('#title')
  		.transition()
  		.duration(500)
  		.attr('opacity', 1)
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(500)
  		.attr('opacity', 0)
  }

  function showCircle() {
  	g.select('#title')
  		.transition()
  		.duration(500)
  		.attr('opacity', 0)
  	g.selectAll('circle.ball')
      .transition()
      .duration(0)
      .attr('cy', height / 2)
  		.transition()
  		.duration(500)
  		.attr('opacity', 1)
  }

  function moveCircle() {
  	g.select('#title')
  		.transition()
  		.duration(0)
  		.attr('opacity', 0)
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('opacity', 1)
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('r', 50)
  }

  function expandCircle() {
  	let originalY = height / 2
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('cy', (d, i) => {
  			if (i == 0) {
  				return originalY + 200
  			} else if (i == 2) {
  				return originalY - 200
  			} else {
  				return originalY
  			}
  		})
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('opacity', 1)
  	g.select('text#end')
  		.transition()
  		.duration(0)
  		.attr('opacity', 0)
  }

  function endVis() {
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('r', (d, i) => {
  			if (i == 1) {
  				return 200
  			} else {
  				return 20
  			}
  		})
  		.transition()
  		.duration(500)
  		.attr('opacity', 0)
  	g.select('text#end')
  		.transition()
  		.duration(500)
  		.attr('opacity', 1)
  }

  function updateMove(progress) {
  	let originalY = height / 2
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('cy', (d, i) => {
  			if (i == 0) {
  				return originalY + progress * 200
  			} else if (i == 2) {
  				return originalY - progress * 200
  			} else {
  				return originalY
  			}
  		})
  }

  function updateExpand(progress) {
  	let originalSize = 50,
  	newBig = 200,
  	newSmall = 20
  	g.selectAll('circle.ball')
  		.transition()
  		.duration(0)
  		.attr('r', (d, i) => {
  			if (i == 1) {
  				return originalSize + (newBig - originalSize) * progress
  			} else {
  				return originalSize + (newSmall - originalSize) * progress
  			}
  		})
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
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('h2'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // Long form of above code
    // d3.selectAll('.step')
    //   .style('opacity', (d, i) => {
    //     if (i === index) {
    //       return 1
    //     } else {
    //       return 0.1
    //     }
    //   })

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

// load data and display
d3.csv("../assets/guide/data.csv").then(display)
