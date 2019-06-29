  
var getCitations = function (dom, data) {
  // citations:
  var citations = [];
  var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
  citeTags.forEach(function (el) {
    var key = el.getAttribute("key");
    if (key) {
      var citationKeys = key.split(",");
      citationKeys.forEach(function (key) {
        if (citations.indexOf(key) == -1){
          citations.push(key);
          if (!(key in data.bibliography)){
            console.warn("No bibliography entry found for: " + key);
          }
        }
      });
    }
  });
  data.citations = citations;
}

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bibtexParse = createCommonjsModule(function (module, exports) {
/* start bibtexParse 0.0.22 */

//Original work by Henrik Muehe (c) 2010
//
//CommonJS port by Mikola Lysenko 2013
//
//Port to Browser lib by ORCID / RCPETERS
//
//Issues:
//no comment handling within strings
//no string concatenation
//no variable values yet
//Grammar implemented here:
//bibtex -> (string | preamble | comment | entry)*;
//string -> '@STRING' '{' key_equals_value '}';
//preamble -> '@PREAMBLE' '{' value '}';
//comment -> '@COMMENT' '{' value '}';
//entry -> '@' key '{' key ',' key_value_list '}';
//key_value_list -> key_equals_value (',' key_equals_value)*;
//key_equals_value -> key '=' value;
//value -> value_quotes | value_braces | key;
//value_quotes -> '"' .*? '"'; // not quite
//value_braces -> '{' .*? '"'; // not quite
(function(exports) {

    function BibtexParser() {
        
        this.months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        this.notKey = [',','{','}',' ','='];
        this.pos = 0;
        this.input = "";
        this.entries = new Array();

        this.currentEntry = "";

        this.setInput = function(t) {
            this.input = t;
        };

        this.getEntries = function() {
            return this.entries;
        };

        this.isWhitespace = function(s) {
            return (s == ' ' || s == '\r' || s == '\t' || s == '\n');
        };

        this.match = function(s, canCommentOut) {
            if (canCommentOut == undefined || canCommentOut == null)
                { canCommentOut = true; }
            this.skipWhitespace(canCommentOut);
            if (this.input.substring(this.pos, this.pos + s.length) == s) {
                this.pos += s.length;
            } else {
                throw "Token mismatch, expected " + s + ", found "
                        + this.input.substring(this.pos);
            }
            this.skipWhitespace(canCommentOut);
        };

        this.tryMatch = function(s, canCommentOut) {
            if (canCommentOut == undefined || canCommentOut == null)
                { canCommentOut = true; }
            this.skipWhitespace(canCommentOut);
            if (this.input.substring(this.pos, this.pos + s.length) == s) {
                return true;
            } else {
                return false;
            }
            this.skipWhitespace(canCommentOut);
        };

        /* when search for a match all text can be ignored, not just white space */
        this.matchAt = function() {
            var this$1 = this;

            while (this.input.length > this.pos && this.input[this.pos] != '@') {
                this$1.pos++;
            }

            if (this.input[this.pos] == '@') {
                return true;
            }
            return false;
        };

        this.skipWhitespace = function(canCommentOut) {
            var this$1 = this;

            while (this.isWhitespace(this.input[this.pos])) {
                this$1.pos++;
            }
            if (this.input[this.pos] == "%" && canCommentOut == true) {
                while (this.input[this.pos] != "\n") {
                    this$1.pos++;
                }
                this.skipWhitespace(canCommentOut);
            }
        };

        this.value_braces = function() {
            var this$1 = this;

            var bracecount = 0;
            this.match("{", false);
            var start = this.pos;
            var escaped = false;
            while (true) {
                if (!escaped) {
                    if (this$1.input[this$1.pos] == '}') {
                        if (bracecount > 0) {
                            bracecount--;
                        } else {
                            var end = this$1.pos;
                            this$1.match("}", false);
                            return this$1.input.substring(start, end);
                        }
                    } else if (this$1.input[this$1.pos] == '{') {
                        bracecount++;
                    } else if (this$1.pos >= this$1.input.length - 1) {
                        throw "Unterminated value";
                    }
                }
                if (this$1.input[this$1.pos] == '\\' && escaped == false)
                    { escaped = true; }
                else
                    { escaped = false; }
                this$1.pos++;
            }
        };

        this.value_comment = function() {
            var this$1 = this;

            var str = '';
            var brcktCnt = 0;
            while (!(this.tryMatch("}", false) && brcktCnt == 0)) {
                str = str + this$1.input[this$1.pos];
                if (this$1.input[this$1.pos] == '{')
                    { brcktCnt++; }
                if (this$1.input[this$1.pos] == '}')
                    { brcktCnt--; }
                if (this$1.pos >= this$1.input.length - 1) {
                    throw "Unterminated value:" + this$1.input.substring(start);
                }
                this$1.pos++;
            }
            return str;
        };

        this.value_quotes = function() {
            var this$1 = this;

            this.match('"', false);
            var start = this.pos;
            var escaped = false;
            while (true) {
                if (!escaped) {
                    if (this$1.input[this$1.pos] == '"') {
                        var end = this$1.pos;
                        this$1.match('"', false);
                        return this$1.input.substring(start, end);
                    } else if (this$1.pos >= this$1.input.length - 1) {
                        throw "Unterminated value:" + this$1.input.substring(start);
                    }
                }
                if (this$1.input[this$1.pos] == '\\' && escaped == false)
                    { escaped = true; }
                else
                    { escaped = false; }
                this$1.pos++;
            }
        };

        this.single_value = function() {
            var start = this.pos;
            if (this.tryMatch("{")) {
                return this.value_braces();
            } else if (this.tryMatch('"')) {
                return this.value_quotes();
            } else {
                var k = this.key();
                if (k.match("^[0-9]+$"))
                    { return k; }
                else if (this.months.indexOf(k.toLowerCase()) >= 0)
                    { return k.toLowerCase(); }
                else
                    { throw "Value expected:" + this.input.substring(start) + ' for key: ' + k; }
            
            }
        };

        this.value = function() {
            var this$1 = this;

            var values = [];
            values.push(this.single_value());
            while (this.tryMatch("#")) {
                this$1.match("#");
                values.push(this$1.single_value());
            }
            return values.join("");
        };

        this.key = function() {
            var this$1 = this;

            var start = this.pos;
            while (true) {
                if (this$1.pos >= this$1.input.length) {
                    throw "Runaway key";
                }
                                // а-яА-Я is Cyrillic
                //console.log(this.input[this.pos]);
                if (this$1.notKey.indexOf(this$1.input[this$1.pos]) >= 0) {
                    return this$1.input.substring(start, this$1.pos);
                } else {
                    this$1.pos++;
                    
                }
            }
        };

        this.key_equals_value = function() {
            var key = this.key();
            if (this.tryMatch("=")) {
                this.match("=");
                var val = this.value();
                return [ key, val ];
            } else {
                throw "... = value expected, equals sign missing:"
                        + this.input.substring(this.pos);
            }
        };

        this.key_value_list = function() {
            var this$1 = this;

            var kv = this.key_equals_value();
            this.currentEntry['entryTags'] = {};
            this.currentEntry['entryTags'][kv[0]] = kv[1];
            while (this.tryMatch(",")) {
                this$1.match(",");
                // fixes problems with commas at the end of a list
                if (this$1.tryMatch("}")) {
                    break;
                }
                
                kv = this$1.key_equals_value();
                this$1.currentEntry['entryTags'][kv[0]] = kv[1];
            }
        };

        this.entry_body = function(d) {
            this.currentEntry = {};
            this.currentEntry['citationKey'] = this.key();
            this.currentEntry['entryType'] = d.substring(1);
            this.match(",");
            this.key_value_list();
            this.entries.push(this.currentEntry);
        };

        this.directive = function() {
            this.match("@");
            return "@" + this.key();
        };

        this.preamble = function() {
            this.currentEntry = {};
            this.currentEntry['entryType'] = 'PREAMBLE';
            this.currentEntry['entry'] = this.value_comment();
            this.entries.push(this.currentEntry);
        };

        this.comment = function() {
            this.currentEntry = {};
            this.currentEntry['entryType'] = 'COMMENT';
            this.currentEntry['entry'] = this.value_comment();
            this.entries.push(this.currentEntry);
        };

        this.entry = function(d) {
            this.entry_body(d);
        };

        this.bibtex = function() {
            var this$1 = this;

            while (this.matchAt()) {
                var d = this$1.directive();
                this$1.match("{");
                if (d == "@STRING") {
                    this$1.string();
                } else if (d == "@PREAMBLE") {
                    this$1.preamble();
                } else if (d == "@COMMENT") {
                    this$1.comment();
                } else {
                    this$1.entry(d);
                }
                this$1.match("}");
            }
        };
    }
    
    exports.toJSON = function(bibtex) {
        var b = new BibtexParser();
        b.setInput(bibtex);
        b.bibtex();
        return b.entries;
    };

    /* added during hackathon don't hate on me */
    exports.toBibtex = function(json) {
        var out = '';
        for ( var i in json) {
            out += "@" + json[i].entryType;
            out += '{';
            if (json[i].citationKey)
                { out += json[i].citationKey + ', '; }
            if (json[i].entry)
                { out += json[i].entry ; }
            if (json[i].entryTags) {
                var tags = '';
                for (var jdx in json[i].entryTags) {
                    if (tags.length != 0)
                        { tags += ', '; }
                    tags += jdx + '= {' + json[i].entryTags[jdx] + '}';
                }
                out += tags;
            }
            out += '}\n\n';
        }
        return out;
        
    };

})(exports);

/* end bibtexParse */
});

var bibliography = function(dom, data) {
  var el = dom.querySelector('script[type="text/bibliography"]');
  var bibliography = {};
  //TODO If we don't have a local element, make a request for the document.
  if (el) {
    var rawBib = el.textContent;
    var parsed = bibtexParse.toJSON(rawBib);
    if(parsed) {
      parsed.forEach(function (e) {
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
      });
    }
  }
  data.bibliography = bibliography;
};

var citation = function(dom, data) {
  var css = "\n    dt-cite {\n      color: hsla(206, 90%, 20%, 0.7);\n    }\n    dt-cite .citation-number {\n      cursor: default;\n      white-space: nowrap;\n      font-family: -apple-system, BlinkMacSystemFont, \"Roboto\", Helvetica, sans-serif;\n      font-size: 75%;\n      color: hsla(206, 90%, 20%, 0.7);\n      display: inline-block;\n      line-height: 1.1em;\n      text-align: center;\n      position: relative;\n      top: -2px;\n      margin: 0 2px;\n    }\n    figcaption dt-cite .citation-number {\n      font-size: 11px;\n      font-weight: normal;\n      top: -2px;\n      line-height: 1em;\n    }\n  ";

  var style = dom.createElement("style");
  style.textContent = css;
  dom.querySelector("body").appendChild(style);

  var citations = data.citations;
  /*if (data.citations) {
    citations = Object.keys(data.citations).map(c => data.citations[c]);
    citations.sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  }*/
  
  var appendCiteHoverDiv = (function() {
    function nodeFromString(str) {
      var div = dom.createElement("div");
      div.innerHTML = str;
      return div.firstChild;
    }
    var hover_boxes_container = nodeFromString("<div id=\"cite-hover-boxes-container\"></div>");
    dom.querySelector("body").appendChild(hover_boxes_container);
    var hover_n = 0;
    return function appendHoverDiv(content) {
      var id = "dt-cite-hover-box-" + hover_n;
      hover_n += 1;
      var str = "<div style=\"display:none;\" class=\"dt-hover-box\" id=\"" + id + "\" >" + content + "</div>";
      var div = nodeFromString(str);
      hover_boxes_container.appendChild(div);
      return id;
    }
  })();

  var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
  citeTags.forEach(function (el,n) {
    var key = el.getAttribute("key");
    if (key) {
      var keys = key.split(",");
      var cite_string = inline_cite_short(keys);
      var cite_hover_str = "";
      keys.map(function (key,n) {
        if (n>0) { cite_hover_str += "<br><br>"; }
        cite_hover_str += hover_cite(data.bibliography[key]);
      });
      var ref_id = appendCiteHoverDiv(cite_hover_str);
      //cite_hover_str = cite_hover_str.replace(/"/g, "&#39;")
      var orig_string = el.innerHTML;
      if (orig_string != "") { orig_string += " "; }
      el.innerHTML = "<span id=\"citation-" + n + "\" data-hover-ref=\"" + ref_id + "\">" + orig_string + "<span class=\"citation-number\">" + cite_string + "</span></span>";
    }
  });

  var bibEl = dom.querySelector("dt-bibliography");
  if (bibEl) {
    var ol = dom.createElement("ol");
    citations.forEach(function (key) {
      var el = dom.createElement("li");
      el.innerHTML = bibliography_cite(data.bibliography[key]);
      ol.appendChild(el);
    });
    bibEl.appendChild(ol);
  }

  function inline_cite_short(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var n = data.citations.indexOf(key)+1;
        return ""+n;
      } else {
        return "?";
      }
    }
    return "["+keys.map(cite_string).join(", ")+"]";
  }

  function inline_cite_long(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var ent = data.bibliography[key];
        var names = ent.author.split(" and ");
        names = names.map(function (name) { return name.split(",")[0].trim(); });
        var year = ent.year;
        if (names.length == 1) { return names[0] + ", " + year; }
        if (names.length == 2) { return names[0] + " & " + names[1] + ", " + year; }
        if (names.length  > 2) { return names[0] + ", et al., " + year; }
      } else {
        return "?";
      }
    }
    return keys.map(cite_string).join(", ");
  }

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

  function bibliography_cite(ent, fancy){
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
      /*var cite =  author_string(ent, "${L}, ${I}", ", ", " and ");
      if (ent.year || ent.date){
        cite += ", " + (ent.year || ent.date) + ". "
      } else {
        cite += ". "
      }
      cite += "<b>" + ent.title + "</b>. ";
      cite += venue_string(ent);
      cite += doi_string(ent);
      cite += link_string(ent);
      return cite*/
    } else {
      return "?";
    }
  }

  function hover_cite(ent){
    if (ent){
      var cite = "";
      cite += "<b>" + ent.title + "</b>";
      cite += link_string(ent);
      cite += "<br>";

      var a_str = author_string(ent, "${I} ${L}", ", ") + ".";
      var v_str = venue_string(ent).trim() + " " + ent.year + ". " + doi_string(ent, true);

      if ((a_str+v_str).length < Math.min(40, ent.title.length)) {
        cite += a_str + " " + v_str;
      } else {
        cite += a_str + "<br>" + v_str;
      }
      return cite;
    } else {
      return "?";
    }
  }


  //https://scholar.google.com/scholar?q=allintitle%3ADocument+author%3Aolah
  function get_GS_URL(ent){
    if (ent){
      var names = ent.author.split(" and ");
      names = names.map(function (name) { return name.split(",")[0].trim(); });
      var title = ent.title.split(" ");//.replace(/[,:]/, "")
      var url = "http://search.labs.crossref.org/dois?";//""https://scholar.google.com/scholar?"
      url += uris({q: names.join(" ") + " " + title.join(" ")});
    }

  }
};



function nodeFromString(str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div.firstChild;
}

function make_hover_css(pos) {
  var pretty = window.innerWidth > 600;
  var padding = pretty? 18 : 12;
  var outer_padding = pretty ? 18 : 0;
  var bbox = document.querySelector("body").getBoundingClientRect();
  var left = pos[0] - bbox.left, top = pos[1] - bbox.top;
  var width = Math.min(window.innerWidth-2*outer_padding, 648);
  left = Math.min(left, window.innerWidth-width-outer_padding);
  width = width - 2*padding;
  return (`position: absolute;
     background-color: #FFF;
     opacity: 0.95;
     max-width: ${width}px;
     top: ${top}px;
     left: ${left}px;
     border: 1px solid rgba(0, 0, 0, 0.25);
     padding: ${padding}px;
     border-radius: ${pretty? 3 : 0}px;
     box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
     z-index: ${1e6};`);
}

function DtHoverBox(div_id) {
  this.div = document.querySelector("#"+div_id);
  this.visible = false;
  this.bindDivEvents();
  DtHoverBox.box_map[div_id] = this;
}

DtHoverBox.box_map = {};

DtHoverBox.get_box = function get_box(div_id) {
  if (div_id in DtHoverBox.box_map) {
    return DtHoverBox.box_map[div_id];
  } else {
    return new DtHoverBox(div_id);
  }
}

DtHoverBox.prototype.show = function show(pos){
  this.visible = true;
  this.div.setAttribute("style", make_hover_css(pos) );
  for (var box_id in DtHoverBox.box_map) {
    var box = DtHoverBox.box_map[box_id];
    if (box != this) box.hide();
  }
}

DtHoverBox.prototype.showAtNode = function showAtNode(node){
    var bbox = node.getBoundingClientRect();
    this.show([bbox.right, bbox.bottom]);
}

DtHoverBox.prototype.hide = function hide(){
  this.visible = false;
  if (this.div) this.div.setAttribute("style", "display:none");
  if (this.timeout) clearTimeout(this.timeout);
}

DtHoverBox.prototype.stopTimeout = function stopTimeout() {
  if (this.timeout) clearTimeout(this.timeout);
}

DtHoverBox.prototype.extendTimeout = function extendTimeout(T) {
  //console.log("extend", T)
  var this_ = this;
  this.stopTimeout();
  this.timeout = setTimeout(function(){this_.hide();}.bind(this), T);
}

// Bind events to a link to open this box
DtHoverBox.prototype.bind = function bind(node) {
  if (typeof node == "string"){
    node = document.querySelector(node);
  }

  node.addEventListener("mouseover", function(){
    if (!this.visible) this.showAtNode(node);
    this.stopTimeout();
  }.bind(this));

  node.addEventListener("mouseout", function(){this.extendTimeout(250);}.bind(this));

  node.addEventListener("touchstart", function(e) {
    if (this.visible) {
      this.hide();
    } else {
      this.showAtNode(node);
    }
    // Don't trigger body touchstart event when touching link
    e.stopPropagation();
  }.bind(this));
}

DtHoverBox.prototype.bindDivEvents = function bindDivEvents(){
  // For mice, same behavior as hovering on links
  this.div.addEventListener("mouseover", function(){
    if (!this.visible) this.showAtNode(node);
    this.stopTimeout();
  }.bind(this));
  this.div.addEventListener("mouseout", function(){this.extendTimeout(250);}.bind(this));

  // Don't trigger body touchstart event when touching within box
  this.div.addEventListener("touchstart", function(e){e.stopPropagation();});
  // Close box when touching outside box
  document.body.addEventListener("touchstart", function(){this.hide();}.bind(this));
}

data = {}

bibliography(window.document, data)
getCitations(window.document, data)
citation(window.document, data)

var hover_es = document.querySelectorAll("span[data-hover-ref]");
  hover_es = [].slice.apply(hover_es);
hover_es.forEach(function(e,n){
  var ref_id = e.getAttribute("data-hover-ref");
  DtHoverBox.get_box(ref_id).bind(e);
})



