let framework = new Vue({
	el: "#app",
	components: {
		'tidbit': tidbit,
		'tofro': tofro
	},
	mounted: function() {
		window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onResize)
		if (document.documentElement.clientWidth < 950) {
			this.isBurger = true
			this.showNavbarElements = false
		}
		if (document.documentElement.clientWidth < 500) {
			this.introQuestionsClasses = "ui one cards"
		}
		$('.ui.sidebar').sidebar({
		    onHidden: function() {
		      d3.select("#nav").classed("shift-right", false)
		      d3.select("#nav").classed("navbar-hidden", true)
		    },
		    onShow: function() {
		      d3.select("#nav").classed("shift-right", true)
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
		showNavbar: false,
		showNavbarElements: true,
		isBurger: false,
		hideMenu: true,
		coverHeight: 0,
		lastScrollPosition: 0,
		introQuestionsClasses: "ui two cards"
	},
	computed: {
	},
	methods: {
		onScroll () {
			this.coverHeight = d3.select('img#cover-image').node().getBoundingClientRect().height
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			this.showNavbar = currentScrollPosition > this.coverHeight

			if (currentScrollPosition > this.coverHeight) {
				d3.select("#nav").classed("navbar-hidden", false)
			} else {
				d3.select("#nav").classed("navbar-hidden", true)
			}
			
			this.showNavbarElements = false
			// if (currentScrollPosition < 0) {
			//   return
			// }
			// this.showNavbar = currentScrollPosition < this.lastScrollPosition
			// this.lastScrollPosition = currentScrollPosition
		},
		onResize () {
			// console.log(document.documentElement.clientWidth)
			if (document.documentElement.clientWidth < 600) {
				this.introQuestionsClasses = "ui one cards"
			} else {
				this.introQuestionsClasses = "ui two cards"
			}
			
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