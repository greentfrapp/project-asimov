let framework = new Vue({
	el: "#app",
	components: {
		'tidbit': tidbit,
		'tofro': tofro
	},
	mounted: function() {

		// Check darkmode

		if (this.cookieconsent) {
			if (!(Cookies.get("darkmode"))) {
			Cookies.set("darkmode", this.darkmode, { expires: 7 })
			} else {
				this.darkmode = (Cookies.get("darkmode") === "true")
			}
		}

		if (this.darkmode) {
			d3.select("div#app")
				.classed("light", false)
			d3.selectAll("img.comic")
				.attr("src", function () {
					return d3.select(this).attr("src").replace(".png", "_inverted.png").replace(".gif", "_inverted.gif")
				})
			d3.select("div.ui.sidebar.menu")
				.classed("light", false)
		}

		d3.select("div#cover-image")
			.style("height", (document.documentElement.clientHeight + 50) + "px")

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
		      d3.select("#nav").classed("navbar-hidden", false)
		    },
		    onHide: function() {
		    	d3.select("div#start.guide-content").style("transform", "translate3d(0, 0, 0)")
		    },
		    onShow: function() {
		      d3.select("#nav").classed("shift-right", true)
		      d3.select("#nav").classed("navbar-hidden", true)
		    },
		    onVisible: function() {
		    	if (document.documentElement.clientWidth > 1000) {
		    		d3.select("div.guide-content").style("transform", "translate3d(-130px, 0, 0)")
		    	}
		    }
		});
		d3.select(".ui.sidebar").selectAll(".item").on("click", function () {
			$('.ui.sidebar')
			  .sidebar('hide')
			;
		})
		$('.ui.sidebar').sidebar('setting', 'dimPage', false);
		d3.selectAll('.toggle-menu').on('click', function () {
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
		introQuestionsClasses: "ui two cards",
		darkmode: false,
		cookieconsent: true
	},
	computed: {
	},
	methods: {
		onScroll () {
			this.coverHeight = document.documentElement.clientHeight - 5
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
			d3.select("div#cover-image")
				.style("height", (document.documentElement.clientHeight + 100) + "px")
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
		},
		toggleDarkmode () {
			if (this.darkmode) {
				// Change to light
				d3.select("div#app")
					.classed("light", true)
				d3.selectAll("img.comic")
					.attr("src", function () {
						return d3.select(this).attr("src").replace("_inverted.png", ".png").replace("_inverted.gif", ".gif")
					})
				d3.select("div.ui.sidebar.menu")
					.classed("light", true)
			} else {
				d3.select("div#app")
					.classed("light", false)
				d3.selectAll("img.comic")
					.attr("src", function () {
						return d3.select(this).attr("src").replace(".png", "_inverted.png").replace(".gif", "_inverted.gif")
				})
				d3.select("div.ui.sidebar.menu")
					.classed("light", false)
			}
			if (this.cookieconsent) {
				Cookies.set("darkmode", !this.darkmode, { expires: 7 })
			}
		}
	}
})