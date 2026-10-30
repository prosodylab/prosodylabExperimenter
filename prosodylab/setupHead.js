setup = {

    loadGeoDataMessages: function (language) {
        var head = document.getElementsByTagName('head')[0];
        var url = `javascripts/node_modules/country-region-dropdown-menu/languages/${language}/LC_MESSAGES/${language}.po`
        let link = document.createElement('link');
        link.rel = 'gettext';
        link.type = 'application/x-po';
        link.href = url;
        head.appendChild(link);
    },

    loadScript: function (url) {
        var head = document.getElementsByTagName('head')[0];

        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = url;
            script.async = false;
            script.onload = function () {
                resolve(url);
            };
            script.onerror = function () {
                reject(url);
            };
            head.appendChild(script);
        });
    },

    loadCSS: function (url) {
        var head = document.getElementsByTagName('head')[0];
        return new Promise(function (resolve, reject) {
            let link = document.createElement('link');
            //link.id = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            link.media = 'all';
            link.async = false;
            link.onload = function () {
                resolve(url);
            };
            link.onerror = function () {
                reject(url);
            };
            head.appendChild(link);
        });
    },

    linkGettext: function (url) {
        var head = document.getElementsByTagName('head')[0];
        return new Promise(function (resolve, reject) {
            let link = document.createElement('link');
            //link.id = url;
            link.rel = 'gettext';
            link.type = 'application/x-po';
            link.href = url;
            link.onload = function () {
                resolve(url);
            };
            link.onerror = function () {
                reject(url);
            };
            head.appendChild(link);
        });
    },

    loadAll: function (language) {

        // Order matters: dependencies FIRST, dependents LAST.
        let scripts = [
            // core dependencies first
            "javascripts/jquery.min.js",
            "javascripts/jquery-ui.min.js",
            "javascripts/papaparse.min.js",
            "javascripts/showdown.min.js",

            // jspsych core BEFORE its plugins
            "javascripts/jspsych-6.1.0/jspsych.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-call-function.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-fullscreen.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-html-slider-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-html-button-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-audio-button-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-audio-keyboard-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-instructions.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-survey-text.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-survey-likert.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-survey-html-form.js",

            // geo scripts (need jQuery) BEFORE your code
            "javascripts/node_modules/country-region-dropdown-menu/assets/js/geodatasource-cr.min.js",
            "javascripts/node_modules/country-region-dropdown-menu/assets/js/Gettext.js",

            // your code LAST (uses $, jsPsych, plugins)
            "prosodylab/prosodylab-experimenter.js",
            "prosodylab/headphoneScreener/headphoneScreener.js",
        ];

        let cssFiles = [
            "javascripts/jquery-ui.css",
            "javascripts/node_modules/country-region-dropdown-menu/assets/css/geodatasource-countryflag.css",
            "javascripts/jspsych-6.1.0/css/jspsych.css"
        ];

        // CSS, catch if it takes longer
        cssFiles.forEach(function (url) {
            setup.loadCSS(url).catch(function (failed) {
                console.warn('CSS failed to load (continuing anyway):', failed);
            });
        });

        // Scripts strictly sequential: each .then awaits the previous load.
        return scripts.reduce(function (chain, url) {
            return chain.then(function () { return setup.loadScript(url); });
        }, Promise.resolve());

    }
}