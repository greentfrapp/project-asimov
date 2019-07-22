let framework = new Vue({
	el: "#app",
	components: {
		'dt-cite': dtCite,
		'dt-bibliography': dtBibliography,
		'fairness-explorable': fairnessExplorable,
		'tidbit': tidbit,
		'tofro': tofro
	},
	mounted: function() {
		let self = this
		window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onResize)
		if (document.documentElement.clientWidth < 950) {
			this.isBurger = true
			this.showNavbarElements = false
		}
		$('.ui.sidebar').sidebar({
		    onHidden: function() {
		      d3.select("#nav").classed("shift-right", false)
		      // d3.select("#nav").classed("hidden", false)
		      d3.select("#nav").classed("navbar-hidden", false)
		      // d3.select("#nav").classed("navbar-hidden", true)
		    },
		    onShow: function() {
		      d3.select("#nav").classed("shift-right", true)
		      // d3.select("#nav").classed("hidden", true)
		      d3.select("#nav").classed("navbar-hidden", true)
		    }
		});
		d3.select(".ui.sidebar").selectAll(".item").on("click", function () {
			$('.ui.sidebar')
			  .sidebar('hide')
			;
		})
		$('.ui.sidebar').sidebar('setting', 'dimPage', false);
		d3.selectAll('.toggle').on('click', function () {
			$('.ui.sidebar')
			  .sidebar('toggle')
			;
		})
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.onScroll)
		window.removeEventListener('resize', this.onResize)
	},
	data: {
		showNavbar: true,
		showNavbarElements: true,
		hideMenu: false,
		isBurger: false,
		coverHeight: 0,
		lastScrollPosition: 0,
		bibliography: bibliography,
		showBit: false
	},
	computed: {
	},
	methods: {
		onScroll () {
			this.showNavbarElements = false
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			if (currentScrollPosition >= 0) {
				this.showNavbar = currentScrollPosition < this.lastScrollPosition
				if (currentScrollPosition < this.lastScrollPosition) {
					d3.select("#nav").classed("navbar-hidden", false)
					// if (!this.sidebarHidden) {
					// 	d3.select("#nav").classed("navbar-hidden", false)
					// }
				} else {
					d3.select("#nav").classed("navbar-hidden", true)
				}
				this.lastScrollPosition = currentScrollPosition
			}
		},
		onResize () {
			if (document.documentElement.clientWidth < 950) {
				this.isBurger = true
				this.showNavbarElements = false
			} else {
				this.isBurger = false
				this.showNavbarElements = true
			}
		},
		onOffBurger () {
			this.showNavbarElements = !this.showNavbarElements
		},
		toggleMenu () {
			this.hideMenu = !this.hideMenu
		}
	}
})

