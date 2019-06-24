let framework = new Vue({
	el: "#app",
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
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.onScroll)
		window.removeEventListener('resize', this.onResize)
	},
	data: {
		showNavbar: false,
		showNavbarElements: true,
		isBurger: false,
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
		}
	}
})