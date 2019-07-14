let tofro = {
	props: ['prevtext', 'prevlink', 'nexttext', 'nextlink'],
	data: function () {
		return {
		}
	},
	computed: {},
	methods: {
	},
	template: '<div class="tofro"><hr/><div><div class="prev" v-if="prevtext"><a :href="prevlink"><i class="icon angle left"></i><span v-text="prevtext"></span></a></div><div class="next" v-if="nexttext"><a :href="nextlink"><span v-text="nexttext"></span><i class="icon angle right"></i></a></div></div><hr/></div>'
}