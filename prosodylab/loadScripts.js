setup = {

    loadScript: function (url) {
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
            document.body.appendChild(script);
        });

    },
    
    promises: function (language) {

        let scripts = [
            // prosodyExperimenter scripts
            'prosodylab/prosodylab-experimenter.js',
            'prosodylab/headPhoneScreener/headPhoneScreener.js',

            // jspsych scripts
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
            "javascripts/jspsych-6.1.0/plugins/jspsych-html-slider-response.js",
            "javascripts/jspsych-6.1.0/plugins/jspsych-survey-html-form.js",

            // other scripts
            "javascripts/papaparse.min.js",
            "javascripts/jquery.min.js",
            "javascripts/jquery-ui.min.js",
            "javascripts/showdown.min.js",

            // country
            "javascripts/node_modules/country-region-dropdown-menu/assets/js/geodatasource-cr.min.js",
            "javascripts/node_modules/country-region-dropdown-menu/assets/js/Gettext.js"
        ];

        // save all Promises as array
        let promises = [];
        scripts.forEach(function (url) {
            promises.push(setup.loadScript(url));
        });

        return promises


    }
}
