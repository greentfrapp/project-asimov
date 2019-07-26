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

		// Check darkmode

		d3.select("g.annotations").selectAll("path").attr("stroke-width", 3)
		d3.select("g.annotations").selectAll("text").attr("fill", "#222222")

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
			// d3.select("g.annotations").selectAll("path").attr("stroke", "#222222")
			d3.select("g.annotations").selectAll("path").attr("stroke-width", 1)
			d3.select("g.annotations").selectAll("text").attr("fill", "#fccf35")
		}

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
		    onHide: function() {
		    	d3.select("div.guide-content").style("transform", "translate3d(0, 0, 0)")
		    },
		    onShow: function() {
		      d3.select("#nav").classed("shift-right", true)
		      // d3.select("#nav").classed("hidden", true)
		      d3.select("#nav").classed("navbar-hidden", true)
		      // d3.select("div.guide-content").style("margin-left", "25px")
		    },
		    onVisible: function() {
		    	d3.select("div.guide-content").style("transform", "translate3d(-130px, 0, 0)")
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
		showNavbar: true,
		showNavbarElements: true,
		hideMenu: false,
		isBurger: false,
		coverHeight: 0,
		lastScrollPosition: 0,
		bibliography: bibliography,
		showBit: false,
		darkmode: false,
		cookieconsent: true
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
				d3.select("g.annotations").selectAll("path").attr("stroke-width", 3)
				d3.select("g.annotations").selectAll("text").attr("fill", "#222222")
			} else {
				d3.select("div#app")
					.classed("light", false)
				d3.selectAll("img.comic")
					.attr("src", function () {
						return d3.select(this).attr("src").replace(".png", "_inverted.png").replace(".gif", "_inverted.gif")
				})
				d3.select("div.ui.sidebar.menu")
					.classed("light", false)
				d3.select("g.annotations").selectAll("path").attr("stroke-width", 1)
				d3.select("g.annotations").selectAll("text").attr("fill", "#fccf35")
			}
			if (this.cookieconsent) {
				Cookies.set("darkmode", !this.darkmode, { expires: 7 })
			}
		}
	}
})

