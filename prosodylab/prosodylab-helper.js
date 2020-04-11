/* prosodylab-jspsych-helper Michael Wagner chael@mcgill.ca */

prosodylab = {

  // render screen with button to press
  screen: function(name, text, buttonText, align, code) {
    if (!align) {
      var align = 'left';
    }
    if (!buttonText) {
      buttonText = 'Click here to continue!'
    }
    text = '<div style="text-align: ' + align + '">' +
      text +
      '</div><br>';
    if (code) {
      text = text + '<b>' + code + '</b>' + '<br><br><br>'
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
        buttonResponseText: buttonText
      }
    };
    timeline.push(screenObject);
  },

  // convert markdown to html
  md2html: function(text) {
    var //showdown  = require('showdown'),
      converter = new showdown.Converter(),
      text = text,
      html = converter.makeHtml(text);
    return html;
  },

  // load text file
  loadTxt: function(fileName) {
    $.ajax({
      type: "Get",
      async: false,
      cache: false,
      url: fileName,
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
  
  consent: function(consentText) {
    var buttonText = consentText.substring(consentText.lastIndexOf('<p>')+3,consentText.lastIndexOf("</p>"))
    consentText = consentText.substring(0,consentText.lastIndexOf('<p>'))
    consentText = `${consentText}<br><br>`
    buttonText = `<button class="jspsych-btn" 
     style="white-space:normal; text-align: justify; font-size: 18px;width:95%;"> 
     <b>${buttonText}</b></button><br><br><br><br><br>`
    //this.screen('consent', consentTxt, buttonText, 'justify');
    
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
        component: 'consent',
        buttonResponseText: buttonText
      }
    };
    timeline.push(screenObject);
  
  },

  // Debriefing questions (this should   really be an html form)
  debriefing: function() {
    var debriefingSurvey = {
      type: 'survey-text',
      questions: [{
          prompt: "What do you think the experiment was about? (required)",
          rows: 10,
          columns: 80,
          name: 'guessExperimentGoal',
          required: 1
        },
        {
          prompt: "Which problems/typos did you notice (if any)? Or any other feedback?",
          rows: 10,
          columns: 80,
          name: 'feedback'
        }
        //{prompt: "How much do you know about the field of linguistics?", name: 'lingustics', labels: scaleHowOften, required: 1}
      ],
      data: {
        component: 'Debriefing'
      }
    };
    timeline.push(debriefingSurvey);
  },
  
    // Debriefing questions (this should   really be an html form)
  debriefing: function() {
    var debriefing = [];
    debriefing.html = prosodylab.loadTxt('prosodylab/debriefing.html');
    debriefing.type = 'survey-html-form';
    debriefing.data = {
        component: 'Debriefing'
    };
    
    timeline.push(debriefing);
  },


  languageQuestionnaire: function() {

    var lq = prosodylab.loadTxt('prosodylab/languageQuestionnaire.html');
    var languageQuestionnaire = {
      type: 'survey-html-form',
      html: lq,
      data: {
        component: 'Language Questionnaire'
      },
      on_load: function() {
        gds.init()
      }
    };
    timeline.push(languageQuestionnaire);
  },


  soundCheck: function(soundFile) {

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
        component: 'soundCheckInstructions',
        choices: buttonText
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
        '<img src="prosodylab/headphones.jpg" alt="headphones" width="90">' +
        '<p><em>adjust the volume if necessary</p></>',
      choices: [choiceOne, choiceTwo],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'soundCheck',
        choices: [choiceOne, choiceTwo]
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

  fixation: function(experiment) {
    var result = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      // xx what does this duration exactly specify? maxlength?
      trial_duration: 1000,
      data: {
        component: experiment,
        trialPart: 'fixation'
      }
    };
    return result;
  },

  playSound: function(soundFile, experiment) {

    var result = {
      type: "audio-keyboard-response",
      prompt: function() {
        var html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
        return html;
      },
      stimulus: soundFile,
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true,
      data: {
        component: experiment,
        trialPart: soundFile
      }
    }
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
  
 
  addTrial: function(session, trial) {

    if (trial.contextFile) {
      session.push(this.fixation(trial.experiment));
      //session.push(this.playSound(`${pathMaterials}/audio/${trial.contextFile}`, trial.experiment));
    }

    // replace with while loop
    for (questionN=1;questionN<=3;questionN++){
      
    if (trial[`question${questionN}`]) { //  build question 1
      var question = [];
      
      // default question type
      question.type = "html-keyboard-response";
      // convert question text from markdown into html:
      question.data = {text: this.md2html(trial[`question${questionN}`])};
      question.data.component = trial.experiment;
      question.data.trialPart =  'question';
      
      // determine text for choices
      
      if (trial[`question${questionN}FixedOptions`]){
          // choice between n options, using number keys
          question.data.options = eval(trial[`question${questionN}FixedOptions`]);
          console.log(question.data.options);
          question = this.questionKeyOptions(question);
          
      } else if (trial[`question${questionN}Options`]){
          // same as fixed choices, but order randomized
          question.data.options = jsPsych.randomization.shuffle( eval(trial[`question${questionN}Options`]));
          question = this.questionKeyOptions(question);
          
      } else if (trial[`question${questionN}ConditionalFixedOptions`]){
          // question options dependent on prior question, fixed option  order
            
          question.data.conditionalOptions = eval(trial[`question${questionN}ConditionalFixedOptions`]);          
          
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
      } else if (trial[`question${questionN}ConditionalOptions`]){
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
           
           
      } else if (trial[`question${questionN}ConditionalOptionsTest`]){
          // question dependent on prior question
          console.log('here2');
            
          question = function(){
            var fQuestion = {
              type: "html-keyboard-response",
              choices: ['1','2'],
              stimulus: 'test'
            }
            return fQuestion 
        }
             
      } else if (trial[`question${questionN}LikertSlider`]){
      
          question.type = 'html-slider-response';
          question.labels = trial[`question${questionN}LikertSlider`];
          question.prompt = question.data.text;
          question.button_label = 'Continue';
          require_movement = true;
        
      } else if (trial[`question${questionN}Likert`]){
          if (!trial[`question${questionN}LikertScale`]){
             question.choices=this.generateKeyChoices(6)
         } else {
             question.choices = eval(trial[`question${questionN}LikertScale`])
         }
          question.type = 'survey-likert',
          question.labels = question.choices,
          question.prompt = question.data.text
         
      } else {// Likert scale with number key response as default
         // use naturalness scale  as default endpoint labels
         if (!trial[`question${questionN}questionLikertKey`]){ 
             question.endPoints = ['Completely unnatural','Completely natural']
         } else { // or else use endpoint labels given in experiment spreadsheet
             question.endPoints = eval(trial[`question${questionN}questionLikertKey`])
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
            ${question.choices[0]} = <b>${question.endPoints[0]}</b> and 
            ${question.choices[question.choices.length-1]} = <b>${question.endPoints[1]}</b></em>`;
       }

       if (question.type=='html-keyboard-response'&&(!trial[`question${questionN}ConditionalOptions`])) {
         question.on_finish = function(data) {
           var keyPressed = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
           data.chosenOption = data.options[parseInt(keyPressed)-1];
         }
       }

       session.push(question);
         
    }}

/*    if (trial.question2) {

      var question = {
        type: "html-keyboard-response",
        // stimulus: this.md2html(trial.question2),
        stimulus: function() {
          var text = '<p style="font-size:150%;"> Which word did you hear? </p>';
          var lastTrial = jsPsych.data.get().last(1).values()[0];
          if (lastTrial.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1')) {
            return text + "<p>1 = BAga &nbsp; 2=  baGA</p>";
          } else {
            return text + "<p>1 = GAba &nbsp; 2=  gaBA</p>"
          }
        },
        choices: ['1', '2'],
        data: {
          component: trial.experiment,
          trialPart: 'question2',
        }
      }
      session.push(question);
    }*/

    return session;

  }


} // end of  object prosodylab
