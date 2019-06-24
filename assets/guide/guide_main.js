let framework = new Vue({
	el: "#app",
	mounted: function() {
		window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onResize)
		if (document.documentElement.clientWidth < 950) {
			this.isBurger = true
			this.showNavbarElements = false
		}
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.onScroll)
		window.removeEventListener('resize', this.onResize)
	},
	data: {
		showNavbar: true,
		showNavbarElements: true,
		isBurger: false,
		coverHeight: 0,
		lastScrollPosition: 0
	},
	computed: {
	},
	methods: {
		onScroll () {
			this.showNavbarElements = false
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
		}
	}
})