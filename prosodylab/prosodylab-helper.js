/* prosodylab-jspsych-helper Michael Wagner chael@mcgill.ca */

prosodylab = {

  // render screen with button to press
  screen: function(name, text, buttonText, participantCode, align,showCode) {
    if (!align) {
      var align = 'left';
    }
    if (!buttonText) { // default button text
      buttonText = 'Click here to continue!'
    }
    text = `<div style="text-align: ${align}"> ${text} 
       </div><br>`;
    if (showCode) { // completion code for final screen
      text = `${text} <b>${participantCode}</b> <br><br><br>`
    }
    var screenObject = {
      type: 'html-button-response',
      timing_post_trial: 0,
      choices: [buttonText],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      is_html: true,
      stimulus: text,
      data: {
        component: name,
        participant: participantCode,
        buttonResponseText: buttonText
      }
    };
    timeline.push(screenObject);
  },

  // convert markdown to html
  md2html: function(text) {
     //showdown  = require('showdown'),
      var converter = new showdown.Converter(),
      html = converter.makeHtml(text);
    return html;
  },

  // load text file
  loadTxt: function(fileName) {
    var file = [];
    $.ajax({
      type: "Get",
      async: false,
      cache: false,
      url: fileName,
      error: function() {
        file = `File not found: ${fileName}!`
        console.error(file)
      },
      success: function(txt) {
        file = txt
      }
    });
    return file;
  },

  // load markdown file and convert to html
  loadMD: function(fileName) {
    var txt = this.loadTxt(fileName);
    txt = this.md2html(txt);
    return txt;
  },

  // load tab-delimited csv and convert to html
  loadCSV: function(fileName) {
    var txt = this.loadTxt(fileName);
    txt = Papa.parse(txt, {
      header: true,
      delimiter: '\t'
    });;
    return txt.data;
  },
  

  saveData: function(fileName){

    var saveData = {
      type: 'call-function',
      async: true,
      func: function(done){
          var data = jsPsych.data.get().json();
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response_data = xhr.responseText;
                done(response_data);
            }
          }
          xhr.open('POST', 'prosodylab/write_data.php');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({filename: fileName, filedata: data}));
       }
    };
    return saveData;
  },
  
  consent: function(consentText,participantCode) {
    var buttonText = consentText.substring(consentText.lastIndexOf('<p>')+3,consentText.lastIndexOf("</p>"))
    consentText = consentText.substring(0,consentText.lastIndexOf('<p>'))
    consentText = `${consentText}<br><br>`
    buttonText = `<button class="jspsych-btn" 
     style="white-space:normal; text-align: justify; font-size: 18px;width:95%;"> 
     <b>${buttonText}</b></button><br><br><br><br><br>`
    
    var screenObject = {
      type: 'html-button-response',
      timing_post_trial: 0,
      choices: [buttonText],
      button_html: buttonText,
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      is_html: true,
      stimulus: consentText,
      data: {
        component: 'Consent',
        participant: participantCode,
        buttonResponseText: buttonText
      }
    };
    timeline.push(screenObject);
  
  },

  // Debriefing questions
  debriefing: function(participantCode) {
    var debriefing = [];
    debriefing.html = prosodylab.loadTxt('prosodylab/debriefing.html');
    debriefing.type = 'survey-html-form';
    debriefing.data = {
        component: 'Debriefing',
        participant: participantCode
    };
    
    timeline.push(debriefing);
  },


  languageQuestionnaire: function(participantCode) {

    var lq = prosodylab.loadTxt('prosodylab/languageQuestionnaire.html');
    var languageQuestionnaire = {
      type: 'survey-html-form',
      html: lq,
      data: {
        component: 'Language Questionnaire',
        participant: participantCode
      },
      on_load: function() {
        gds.init()
      }
    };
    timeline.push(languageQuestionnaire);
  },


  musicQuestionnaire: function (modules,participantCode) {
  /*Chin, T.-C., Coutinho, E., Scherer, K. R., and Rickard, N. S. (2018). Musebaq: A modular tool for music research to assess musicianship, musical capacity, music preferences, and motivations for music use. Music Perception: An Interdisciplinary Journal, 35(3):376–399.

So far only implemented: Module 1, musicianship
*/

                 if(!modules) { var modules = 'MusicianShip';}
                 
                 var scaleYears = [ 'None',
                                    '1 year',
                                    '2 years',
                                    '3 years',
                                    '4 years',
                                    '5 years',
                                    '6 years', 
                                    '7 years',
                                    '8 years',
                                    'more than 8 years'
                                    ];
                                    
                 var scaleHowMuch = ['Nothing',
                                     'A little',
                                     'A fair amount',
                                     'A moderate amount',
                                     'A great deal'
                                     ]; 
                                     
                 var scaleHowOften = ['Never',
                                     'Rarely',
                                     'Sometimes',
                                     'Often',
                                     'All the time'
                                     ]; 
                                     
                 var moduleMusicianship = {
                         type: 'survey-likert',
                         questions: [
                           {prompt: "How many years of formal music training (theory) have you had?", name: 'M1Q1', labels: scaleYears, required: 1},
                           {prompt: "How much do you know about music structure and theory?", name: 'M1Q2', labels: scaleHowMuch, required: 1},
                           {prompt: "How many years of formal music training (practice) have you had?", name: 'M1Q3', labels: scaleYears, required: 1},
                           {prompt: "How often do you engage in professional music making (e.g., singing, playing an instrument, composing)?", name: 'M1Q4', labels: scaleHowOften, required: 1},
                           {prompt: "How often did or do you practice or rehearse with an instrument or singing?", name: 'M1Q5', labels: scaleHowOften, required: 1},
                           {prompt: "How often do you engage in music making as a hobby or as an amateur?", name: 'M1Q6', labels: scaleHowOften, required: 1}
                         ],
                         randomize_question_order: false,
                         data: {
                           component: 'Music Questionnaire',
                           participant: participantCode
                         }
                 };
                 timeline.push(moduleMusicianship);

},


  soundCheck: function(soundFile,participantCode) {

    var buttonText = ['Play Sound'];
    var soundCheckObject = {
      type: 'html-button-response',
      stimulus: '<b> Sound Check</b>' +
        '<br> <em>Please connect your headphones and adjust the volume!</em>' +
        '<br><br>',
      choices: buttonText,
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Sound check instructions',
        choices: buttonText,
        participant: participantCode
      },
    }
    timeline.push(soundCheckObject);


    var choiceOne = 'Play sound again';
    var choiceTwo = 'I can hear the sound at a comfortable volume';
    soundCheckObject = {
      type: 'audio-button-response',
      stimulus: soundFile,
      prompt: '<br><br>' +
        "<style> .centered {position: fixed; top: 50%; left: 50%;" +
        " transform: translate(-50%, -50%);}</style>" +
        '<img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">' +
        '<p><em>adjust the volume if necessary</p></>',
      choices: [choiceOne, choiceTwo],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Sound check',
        choices: [choiceOne, choiceTwo],
        participant: participantCode
      },
      button_html: '<button class="jspsych-btn">%choice% </button>'
    };


    var loop_node = {
      timeline: [soundCheckObject],
      loop_function: function(data) {
        if ('0' == data.values()[0].button_pressed) {
          return true;
        } else {
          return false;
        }
      }
    }
    timeline.push(loop_node);

  },

  latinsquareConditionSelection: function(items, conditions, pListN) {

    var result = [];
    for (var i = 0; i < items; i++) {
      for (var j = 0; j < conditions; j++) {
        result.push(1 + (j + pListN - 1) % conditions);
      }
    }
    return result;
  },

  withinConditionSelection: function(items, conditions, pListN) {

    var result = [];
    var block = [];
    var pListBlock = [];
    // randomize order of blocks after the first
    var conditionBlock = this.digitSequence(conditions);
    var index = conditionBlock.indexOf(pListN);
    if (index !== -1) {conditionBlock.splice(index, 1)};
    conditionBlock = jsPsych.randomization.shuffle(conditionBlock);
    conditionBlock = [pListN, ...conditionBlock];

    for (var i = 0; i < conditions; i++) {
      block = conditionBlock[i];
      result[i] = this.latinsquareConditionSelection(items, conditions, block);
    }
    return result;
  },


  blockedConditionSelection: function(items, conditions, playListN) {

    // pListN is condition # of first block
    // randomize order of conditions other than first
    var conditionBlock = this.digitSequence(conditions);
    var index = conditionBlock.indexOf(playListN);
    if (index !== -1) conditionBlock.splice(index, 1);
    conditionBlock = jsPsych.randomization.shuffle(conditionBlock);
    conditionBlock = [playListN, ...conditionBlock];

    var result = [];

    for (var i = 0; i < conditions; i++) {
      result[i] = [];
      for (var j = 0; j < items; j++) {
        result[i].push(conditionBlock[i]);
      }
    }
    return result;
  },


  // assigns playList
  getPlaylist: function(conditions) {
    // xx right now: random
    // xx next step: based on # participants
    // xx even better: actual participant# that completed playlists based on log
    var playList = Math.floor((Math.random() * conditions) + 1);;
    return playList
  },

  // generate sequence of integers
  digitSequence: function(length) {
    var result = [];
    for (var i = 1; i <= length; i++) {
      result.push(i);
    }
    return result
  },


  generatePlaylist: function(stimuli) {
    var conditions = Math.max(...stimuli.map(value => value.condition));
    var items = Math.max(...stimuli.map(value => value.item));
    var design = [...new Set(stimuli.map(value => value.design))];
    
    var pList = this.getPlaylist(conditions);
    var playList = [];
    var conditionSelection = [];

    if (design == 'Between') {

      // same condition from each item
      for (var i = 1; i <= items; i++) {
        playList[i] = stimuli.find(obj => {
          return obj.item == i && obj.condition == pList
        })
        // randomize order of trials
        playList = jsPsych.randomization.shuffle(playList);
      }

    } else if (design == 'Blocked') {

      // all stimuli, organized in blocks by condition
      conditionSelection = this.blockedConditionSelection(items, conditions, pList);
      for (var j = 0; j < conditions; j++) {
        blockList = [];
        for (var i = 0; i < items; i++) {
          blockList[i] = stimuli.find(obj => {
            return obj.item == (i + 1) && obj.condition == conditionSelection[(j)][i]
          })
        }
        // randomize order of trials within block
        blockList = jsPsych.randomization.shuffle(blockList);
        // add block to playList
        playList = [...playList, ...blockList];
      }
    } else if (design == 'LatinSquare') {

      // one condition from each item, balanced # conditons
      conditionSelection = this.latinsquareConditionSelection(items, conditions, pList);
      for (var i = 0; i < items; i++) {
        playList[i] = stimuli.find(obj => {
          return obj.item == (i + 1) && obj.condition == conditionSelection[i];
        });
      }
      // randomize order of trials
      playList = jsPsych.randomization.shuffle(playList);

    } else if (design == 'Within') {

      // all stimuli in pseudorandom order, a sequence several LQ blocks
      conditionSelection = this.withinConditionSelection(items, conditions, pList);
      var blockList = [];
      for (var j = 0; j < conditions; j++) {
        blockList = [];
        for (var i = 0; i < items; i++) {
          blockList[i] = stimuli.find(obj => {
            return obj.item == (i + 1) && obj.condition == conditionSelection[j][i]
          })
        }
        // randomize order of trials within block
        blockList = jsPsych.randomization.shuffle(blockList);
        // add block to playList
        playList = [...playList, ...blockList];
      }

    } else if (design == 'Random') {

      // random stimulus order
      playList = jsPsych.randomization.shuffle(stimuli);

    } else { // fixed stimulus order
      playList = stimuli;
    }

    return playList;
  }, //  end of this.generatePlaylist

  fixation: function(trialInfo) {
    var result = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      data: trialInfo,
    };
    result.data.trialPart = 'fixation';
    return result;
  },


  generateKeyChoices: function(nChoices){
    var result = [];
    for (i=1;i<=nChoices;i++){
        result.push(`${i}`)
    }
    return result;
  },

  
  questionKeyOptions: function(question){

   question.choices = this.generateKeyChoices(question.data.options.length);
   question.stimulus = [];
   
    if (question.data.options.length<=2){
        seperator = '&nbsp&nbsp;'
    } else{
        seperator = '<br><br>'
    }
    for (i=0; i<question.data.options.length; i++){
      question.stimulus = `${question.stimulus}${question.choices[i]} = ${question.data.options[i]}${seperator}`;
    } 
    question.stimulus = `${question.data.text} <br/> ${question.stimulus}`;
    
    return question
  },
  
 
  addTrial: function(session, trial,trialInfo) {

    if (trial.contextFile) {
      session.push(this.fixation(trialInfo));
     
      var playSound =  {
        type: 'audio-keyboard-response',
        prompt: function() {
        var html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.contextFile}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: trialInfo
      }
    }
      
    session.push(playSound);


    // replace with while loop
    for (questionN=1;questionN<=3;questionN++){
      
    if (trial[`question${questionN}`]) { //  build question 1
      var question = [];
      
      if (!trial[`question${questionN}Type`]) {
        // Likert Scale with number key as responses as default
        qType='LikertKey'
      } else {
        qType = trial[`question${questionN}Type`]
      }
      
      
      // default question type
      question.type = "html-keyboard-response";
      // convert question text from markdown into html:
      question.data = {text: this.md2html(trial[`question${questionN}`])};
      question.data.trialPart =  'question';
      question.data = {...question.data,...trialInfo};
      
      
      if (qType=='FixedButtonOptions'){
      
        question.type = 'html-button-response';
        question.stimulus = question.data.text;
        question.choices = eval(trial[`question${questionN}Options`]);
        question.button_html = '<button class="jspsych-btn"><b>%choice%</b></button>'
        question.data.options = question.choices;
        
      } else if (qType=='ButtonOptions'){
      
        question.type = 'html-button-response';
        question.stimulus = question.data.text;
        question.choices = jsPsych.randomization.shuffle(eval(trial[`question${questionN}Options`]));
        question.button_html = '<button class="jspsych-btn"><b>%choice%</b></button>'
        question.data.options = question.choices;
        
      } else if (qType=='FixedOptions'){
          // choice between n options, using number keys
          question.data.options = eval(trial[`question${questionN}Options`]);
          question = this.questionKeyOptions(question);
          
      } else if (qType=='Options'){
          // same as fixed choices, but order randomized
          question.data.options = jsPsych.randomization.shuffle( eval(trial[`question${questionN}Options`]));
          question = this.questionKeyOptions(question);
          
      } else if (qType=='ConditionalFixedOptions'){
          // question options dependent on prior question, fixed option  order
            
          question.data.conditionalOptions = eval(trial[`question${questionN}Options`]);          
          
          question.choices  = function(){
            var  choices = [];
            // get data from last trial
            var lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2+1]) {
                choices = question.data.conditionalOptions[(choice+1)*2];
                choices = this.generateKeyChoices(choices.length);
                return choices
              }
            
            }
           }     
                
          question.stimulus  = function(){
            var  stimulus = [];
            // get data from last trial
            var lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                var options = question.data.conditionalOptions[choice*2+1];
                
                if (options.length<=2){
                   seperator = '&nbsp&nbsp;'
                } else{
                   seperator = '<br><br>'
                }
                
                for (i=0; i<options.length; i++){
                   stimulus = `${stimulus}${i+1} = ${options[i]}${seperator}`;
                }
                
                stimulus = `${question.data.text} <br/> ${stimulus}`;
                
                return stimulus
              }
            }
           }
           
          question.data.options  = function(){
            // get data from last trial
            var lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                var options = question.data.conditionalOptions[choice*2+1];
                return options
              }
            }
          }
      } else if (qType=='ConditionalOptions'){
          // question options dependent on prior question, random option  order
          // xx 'question.data.chosen'  will not  be computed  for  this yet
            
          question.data.conditionalOptions = eval(trial[`question${questionN}ConditionalOptions`]);          
          
          question.choices  = function(){
            var  choices = [];
            // get data from last trial
            var lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2+1]) {
                choices = question.data.conditionalOptions[(choice+1)*2];
                choices = this.generateKeyChoices(choices.length);
                return choices
              }
            
            }
           }     
                
          question.stimulus  = function(){
            var  stimulus = [];
            // get data from last trial
            var lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                var options = question.data.conditionalOptions[choice*2+1];
                options = jsPsych.randomization.shuffle(options);
                
                if (options.length<=2){
                   seperator = '&nbsp&nbsp;'
                } else{
                   seperator = '<br><br>'
                }
                
                for (i=0; i<options.length; i++){
                   stimulus = `${stimulus}${i+1} = ${options[i]}${seperator}`;
                }
                
                stimulus = `${question.data.text} <br/> ${stimulus}`;
                
                return stimulus
              }
            }
           }
           
           
      } else if (qType=='Slider'){
      
          question.type = 'html-slider-response';
          
          if (!trial[`question${questionN}EndPoints`]){ 
             question.labels = ['completely unnatural','completely natural']
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.labels = eval(trial[`question${questionN}EndPoints`])
          }
          
          question.stimulus = question.data.text;
          question.button_label = 'Continue';
          question.require_movement = true;
        
      } else if (qType=='Likert'){
          if (!trial[`question${questionN}LikertScale`]){
             question.data.options=this.generateKeyChoices(6)
          } else {
             question.data.options = eval(trial[`question${questionN}LikertScale`])
          }
          
          if (!trial[`question${questionN}EndPoints`]){ 
             question.data.endPoints = ['completely unnatural','completely natural']
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.data.endPoints = eval(trial[`question${questionN}EndPoints`])
          }

          question.data.options[0] = `${question.data.options[0]} = ${question.data.endPoints[0]}`;
          question.data.options[question.data.options.length-1] = 
            `${question.data.options[question.data.options.length-1]} = ${question.data.endPoints[1]}`;
            
          question.type = 'survey-likert';
          question.questions  = [{ 
            prompt: question.data.text, 
            labels: question.data.options
          }]
         
      } else {// LikertKey with number key response as default
         // use naturalness scale  as default endpoint labels
         if (!trial[`question${questionN}EndPoints`]){ 
             question.data.endPoints = ['completely unnatural','completely natural']
         } else { // or else use endpoint labels given in experiment spreadsheet
             question.data.endPoints = eval(trial[`question${questionN}EndPoints`])
         }
         // default likert scale with even number of choices in order
         // to avoid 3-partite partition into 'low','neutral/don't  know', 'high'
         // I use 6 as the default number of options
         if (!trial[`question${questionN}LikertScale`]){
             question.choices=this.generateKeyChoices(6)
         } else {
             question.choices = eval(trial[`question${questionN}LikertScale`])
         }
         
         question.data.options = question.choices;
         question.stimulus = `${question.data.text} <br/><br/>  
            <em>Rate on a scale between: <br><br> 
            ${question.choices[0]} = <b>${question.data.endPoints[0]}</b> and 
            ${question.choices[question.choices.length-1]} = <b>${question.data.endPoints[1]}</b></em>`;
       }

      
       if (question.type == 'html-keyboard-response' && !(qType == 'ConditionalOptions')) {
         question.on_finish = function(data) {
            var keyPressed = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
            data.chosenOption = data.options[parseInt(keyPressed)-1];
         }
        } else if (question.type == 'html-button-response') {
            question.on_finish = function(data) {
              data.chosenOption = data.options[data.button_pressed];
            }
        }

       session.push(question);
         
    }}

    return session;

  }


} // end of  object prosodylab
