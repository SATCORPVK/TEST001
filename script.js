// Environment & CMS setup
(function() {
    window._ENV_ = 'production';
    window._CMS_ = "%CMS%";
    window._UNSUPPORTED_PAGE_ = "unsupported.html";

    // Optional chaining test for old browser support
    try {
        eval("let obj = {}; obj?.prop");
    } catch(e) {
        window.location.replace(window._UNSUPPORTED_PAGE_);
        return;
    }

    // Cache versioning
    window._CACHE_ = "1746999829739";
    window.UIL_STATIC_PATH = "assets/data/uil." + window._CACHE_ + ".json";

    // Preload & async load main app script
    var s = "assets/js/app." + window._CACHE_ + ".js",
        h = document.head,
        link = document.createElement("link");
    link.href = s;
    link.rel = "preload";
    link.as = "script";
    h.appendChild(link);

    var script = document.createElement("script");
    script.src = s;
    script.async = true;
    h.appendChild(script);
})();
