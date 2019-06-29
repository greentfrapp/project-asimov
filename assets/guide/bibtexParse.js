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