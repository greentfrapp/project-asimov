window.cookieconsent.initialise({
  container: document.getElementById("cookieconsent"),
  palette: {
    popup: {
      background: "#191919",
      text: "#DDDDDD"
    },
    button: {
      background: "#4BCFFF",
      text: "#000000"
    }
  },
  theme: "edgeless",
  type: "opt-out",
  content: {
    message: "This website uses cookies to save your Dark Mode setting and cookies permission.",
    allow: "Okay, got it!",
    deny: "Refuse cookies.",
    link: "Learn more."
  },
  // position: "bottom-right",
  onInitialise: function (status) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      framework.cookieconsent = true
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
      framework.cookieconsent = false
      Object.keys(Cookies.get()).forEach(function(cookie) {
        Cookies.remove(cookie);
      });
    }
  },
  onStatusChange: function(status, chosenBefore) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      framework.cookieconsent = true
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
      framework.cookieconsent = false
      Object.keys(Cookies.get()).forEach(function(cookie) {
        Cookies.remove(cookie);
      });
    }
  },
  onRevokeChoice: function() {
    var type = this.options.type;
    if (type == 'opt-in') {
      // disable cookies
      framework.cookieconsent = false
      Object.keys(Cookies.get()).forEach(function(cookie) {
        Cookies.remove(cookie);
      });
    }
    if (type == 'opt-out') {
      // enable cookies
      framework.cookieconsent = true
    }
  }
});