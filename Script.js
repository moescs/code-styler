var csm; 
(function (csm) { 
"use strict";
var util;
(function (util) {

    util.loadJQuery = function (callback) {    
        //don't load if if we have it
        if (typeof $ !== 'undefined') {
            callback();
            return;
        }
    
        //create script element
        var script = document.createElement('script');
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
        
        //bind the event to the callback function 
        script.onload = callback;
    
        // add script to the head
        var head = document.getElementsByTagName('head')[0];
        // fire the loading
        head.appendChild(script);
    }

    //return: jqXHR
    util.getCachedScript = function (url, options) {
      // allow user to set any option except for dataType, cache, and url
      options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
      });
 
      // Use $.ajax() since it is more flexible than $.getScript
      // Return the jqXHR object so we can chain callbacks
      return $.ajax(options);
    };
    
})(csm.util = util || {})

var codeStyler;
(function (codeStyler) {
    var imports = csm.util;

    function styleCode() {  
        //For each pre element that has a code element...
        $('pre code').each(function(i, e) {
            if (!$(e).hasClass('highlighted_syntax')) {
                $(e).addClass('highlighted_syntax');
                hljs.highlightBlock(e);
            }
        }); 
    }

    codeStyler.run = function () {
        imports.loadJQuery((function() {
            //base64 GUID
            var cssId = 'D-qnT2WAQYqbSgAAk9ywWQ';
            //add css if it's not here
            if ($('head link#'+cssId).length == 0) {
                var highlightCss = $.parseHTML('<link'
                    +' id="' + cssId + '"'
                    +' rel="stylesheet"'
                    +' href="http://yandex.st/highlightjs/7.4/styles/default.min.css"/>');
                $('head').append(highlightCss);
            
                //customize for horizontal scrolling
                var customCss = $.parseHTML('<style>'
                    +'pre code {'
                    	+'overflow-x: auto;'
                    	+'white-space: pre;'
                    	+'word-wrap: normal; }'
                    +'</style>');
                $('head').append(customCss);
            }
            
            //Style code
            imports.getCachedScript("http://yandex.st/highlightjs/7.4/highlight.min.js")
                //and finally what we all came here for...
                .done(function() { styleCode(); });
        }));
    }

})(csm.codeStyler = codeStyler || {})
})(csm = csm || {})

//highlight the code
csm.codeStyler.run();
