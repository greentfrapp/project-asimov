
let bibliography = {}
parsed = bibtexParse.toJSON(d3.select('script[type="text/bibliography"]').node().textContent)
parsed.forEach(function (e, i) {
	for (var k in e.entryTags){
	  var val = e.entryTags[k];
	  val = val.replace(/[\t\n ]+/g, " ");
	  val = val.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g,
	                    function (full, x, char) { return char; });
	  val = val.replace(/{\\([a-zA-Z])}/g,
	                    function (full, char) { return char; });
	  e.entryTags[k.toLowerCase()] = val;
	}
	bibliography[e.citationKey] = e.entryTags;
	bibliography[e.citationKey].type = e.entryType;
	bibliography[e.citationKey].idx = i + 1
	bibliography[e.citationKey].key = e.citationKey
});

function author_string(ent, template, sep, finalSep){
    var names = ent.author.split(" and ");
    var name_strings = names.map(function (name) {
      name = name.trim();
      if (name.indexOf(",") != -1){
        var last = name.split(",")[0].trim();
        var firsts = name.split(",")[1];
      } else {
        var last = name.split(" ").slice(-1)[0].trim();
        var firsts = name.split(" ").slice(0,-1).join(" ");
      }
      var initials = "";
      if (firsts != undefined) {
        initials = firsts.trim().split(" ").map(function (s) { return s.trim()[0]; });
        initials = initials.join(".")+".";
      }
      return template.replace("${F}", firsts)
                     .replace("${L}", last)
                     .replace("${I}", initials);
    });
    if (names.length > 1) {
      var str = name_strings.slice(0, names.length-1).join(sep);
      str += (finalSep || sep) + name_strings[names.length-1];
      return str;
    } else {
      return name_strings[0];
    }
  }

  function venue_string(ent) {
    var cite = (ent.journal || ent.booktitle || "");
    if ("volume" in ent){
      var issue = ent.issue || ent.number;
      issue = (issue != undefined)? "("+issue+")" : "";
      cite += ", Vol " + ent.volume + issue;
    }
    if ("pages" in ent){
      cite += ", pp. " + ent.pages;
    }
    if (cite != "") { cite += ". "; }
    if ("publisher" in ent){
      cite += ent.publisher;
      if (cite[cite.length-1] != ".") { cite += "."; }
    }
    return cite;
  }

  function link_string(ent){
    if ("url" in ent){
      var url = ent.url;
      var arxiv_match = (/arxiv\.org\/abs\/([0-9\.]*)/).exec(url);
      if (arxiv_match != null){
        url = "http://arxiv.org/pdf/" + (arxiv_match[1]) + ".pdf";
      }

      if (url.slice(-4) == ".pdf"){
        var label = "PDF";
      } else if (url.slice(-5) == ".html") {
        var label = "HTML";
      }
      return (" &ensp;<a href=\"" + url + "\">[" + (label||"link") + "]</a>");
    }/* else if ("doi" in ent){
      return ` &ensp;<a href="https://doi.org/${ent.doi}" >[DOI]</a>`;
    }*/ else {
      return "";
    }
  }
  function doi_string(ent, new_line){
    if ("doi" in ent) {
      return ((new_line?"<br>":"") + " <a href=\"https://doi.org/" + (ent.doi) + "\" style=\"text-decoration:inherit;\">DOI: " + (ent.doi) + "</a>");
    } else {
      return "";
    }
  }

let dtCite = {
	props: ['cite'],
	data: function () {
		return {
			count: 0
		}
	},
	computed: {
		citationKey: function() {
			let citationIds = []
			this.cite.split(',').forEach(c => citationIds.push('<a href="#' + c + '">' + bibliography[c].idx + '</a>'))
			return "[" + citationIds.join(",") + "]"
		}
	},
	methods: {
		showCitation: function() {
			// let bbox = d3.select(this).node().$el.getBoundingClientRect()
			// d3.select("#TEST")
			// 	.attr("style", `top: ${bbox.bottom}px; left: ${bbox.right}px; display: block; position: fixed;`)
			// 	.html("LALALA")
			// console.log("TEST")
		}
	},
	template: '<span class="dt-cite" @mouseover="showCitation" v-html="citationKey"></span>'
}

let dtBibliography = {
	props: [],
	mounted: function () {
		d3.select("#TEST").attr("style", "display:none; position:absolute;")
	},
	data: function () {
		return {
			bibliography: bibliography
		}
	},
	methods: {
		bibliography_cite: function (ent, fancy){
			if (ent){
			  var cite =  "<b>" + ent.title + "</b> ";
			  cite += link_string(ent) + "<br>";
			  cite += author_string(ent, "${L}, ${I}", ", ", " and ");
			  if (ent.year || ent.date){
			    cite += ", " + (ent.year || ent.date) + ". ";
			  } else {
			    cite += ". ";
			  }
			  cite += venue_string(ent);
			  cite += doi_string(ent);
			  return cite
			} else {
			  return "?";
			}
		}
	},
	computed: {},
	template: '<div id="dt-bibliography"><ol><li v-for="entry in bibliography" :id="entry.key" v-html="bibliography_cite(entry)"></li></ol></div>'
}

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
		    },
		    onShow: function() {
		      d3.select("#nav").classed("shift-right", true)
		    }
		});
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
		bibliography: bibliography
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

