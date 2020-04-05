// chael@mcgill.ca  April 2020

prosodylab  = {

            // render screen with button to press
            screen: function(name,text,buttonText,align,code) {
                if(!align) { var align = 'left';}
                if(!buttonText) {buttonText='Click here to continue!'}
                text = '<div style="text-align: ' + align +'">'+
                             text + 
                             '</div><br>';
                if(code) {text = text+'<b>'+code+'</b>'+'<br><br><br>'}
                var screenObject = {
                  type: 'html-button-response',
                  timing_post_trial: 0,
                  choices: [buttonText],
                  on_trial_start: function() { 
                     setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)
                    },
                  is_html: true,
                  stimulus: text,
                  data: {experimentPart: name,
                         buttonResponseText: buttonText
                         }
                  };
                timeline.push(screenObject);
            },
            
            // convert markdown to html
            md2html: function(text){
                   var //showdown  = require('showdown'),
                       converter = new showdown.Converter(),
                       text      = text,
                       html      = converter.makeHtml(text);
                   return html;
            },
           
            // load text file
            loadTxt: function(fileName) {
                $.ajax({
                  type: "Get",
                  async: false,
                  cache: false,
                  url: fileName,
                  success: function(txt){file=txt}
                 }); 
                 return  file;
            },

           // load markdown file and convert to html
            loadMD: function(fileName) {
                txt = this.loadTxt(fileName);
                txt = this.md2html(txt);
                return txt;
             },
            
           // load tab-delimited csv and convert to html
            loadCSV: function(fileName) {
                txt = this.loadTxt(fileName);
                txt = Papa.parse(txt, {header: true, delimiter: '\t'});;
                return txt;
             },
             
             // Debriefing questions
             debriefing: function() {
                var debriefingSurvey = {
                  type: 'survey-text',
                  questions: [
                    {prompt: "What do you think the experiment was about? (required)", 
                       rows: 10, columns: 80, name: 'guessExperimentGoal',required: 1}, 
                    {prompt: "Which problems/typos did you notice (if any)? Or any other feedback?", 
                       rows: 10, columns: 80, name: 'feedback'}
                  ],
                  data: {experimentPart: 'Debriefing'}
                };
                timeline.push(debriefingSurvey);
             },
              
             languageQuestionnaire: function () {
                                     
                var lq = prosodylab.loadTxt('prosodylab/languageQuestionnaire.html')                    
                var languageQuestionnaire = {
                        type: 'survey-html-form',
                        preamble: '<h2> Language Background Questionnaire</h2><br>',
                        html: lq,
                        data: {experimentPart: 'Language Questionnaire'},
                        on_load: function() { gds.init() }
                };
                timeline.push(languageQuestionnaire);
             },
            
             
             soundCheck: function (soundFile) {
             
                 var buttonText = ['Play Sound'];
                 var soundCheckObject =  {
                     type: 'html-button-response',
                     stimulus: '<b> Sound Check</b>'+
                        '<br> <em>Please connect your headphones and adjust the volume!</em>'+
                        '<br><br>',
                     choices: buttonText,
                     on_trial_start: function() { 
                         setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)
                     },
                     data: {experimentPart: 'soundCheckInstructions',
                            choices: buttonText
                            },
                 }
                 timeline.push(soundCheckObject);
                 
             
                 var choiceOne = 'Play sound again';
                 var choiceTwo = 'I can hear the sound at a comfortable volume'; 
                 soundCheckObject = {
                   type: 'audio-button-response',
                   stimulus: soundFile,
                   prompt: '<br><br>'+
                        "<style> .centered {position: fixed; top: 50%; left: 50%;"+
                        " transform: translate(-50%, -50%);}</style>" + 
                        '<img src="prosodylab/headphones.jpg" alt="headphones" width="90">'+
                        '<p><em>adjust the volume if necessary</p></>',
                   choices: [choiceOne,choiceTwo],
                   on_trial_start: function() { 
                     setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)
                    },
                   data: {experimentPart: 'soundCheck',
                         choices:  [choiceOne,choiceTwo]
                         },
                   button_html: '<button class="jspsych-btn">%choice% </button>'
                 };
                
                
                var loop_node = {
                     timeline: [soundCheckObject],
                     loop_function: function(data){
                        if('0' == data.values()[0].button_pressed){
                           return true;
                        } else {
                           return false;
                        }
                     }
                 }
                timeline.push(loop_node);
                
              }
             
            }
            
           
           