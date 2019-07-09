let tidbit = {
	props: ['content'],
	data: function () {
		return {
			shownContent: "",
			hidden: true
		}
	},
	computed: {},
	methods: {
		expand: function() {
			this.hidden = !this.hidden
		}
	},
	// template: '<span class="tidbit" v-text="content"></span>'
	template: '<span class="tidbit-holder"><i class="plus circle large icon tidbit-link" :class="{ closed: !hidden }" @click="expand"></i><span v-text="content" class="tidbit-content" :class="{ hidden: hidden }"></span></span>'
}