/* prosodylab-experimenter helper scripts Michael Wagner chael@mcgill.ca */

prosodylab = {

  
  getURLParameters: function() {
  // get URL parameters from web address
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    // same params if there are any
    if (decodeURI(urlParams)){
        jsonUrlParams = JSON.parse('{"' + decodeURI(urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        prosodylab.appendJson([jsonUrlParams],`${study.path}/urlParamsLog.json`)
    }
    
    if (urlParams.get('STUDY_ID')) {
        jsPsych.data.addProperties({studyID: urlParams.get('STUDY_ID')});
    }
    return urlParams;
  },

  // assign participant number
  assignParticipantcode: function(participantCodeMethod,urlParams){
    let participantCode = [];
    // determine participant number 

    if (participantCodeMethod ==  'SESSION_ID') {
      participantCode = urlParams.get('SESSION_ID');
    } else if (participantCodeMethod ==  'PROLIFIC_PID') {
      participantCode = urlParams.get('PROLIFIC_PID');
    } else {   // unique random 6-digit participant code
      participantCode = jsPsych.randomization.randomID(6); 
    }
    jsPsych.data.addProperties({participant: participantCode});
    
    return participantCode
  },
  
  // go to full screen
  fullScreenOn: function(){
  
    result = {
      type: 'fullscreen',
      message: `<p><br><br> <em>${messages.fullScreen}</em></p>`,
      fullscreen_mode: true,
      button_label: messages.continueButton,
      data: {
       component: 'full screen',
       trialPart: 'fullScreenOn'
      }
    };
   
     return result;
  },

  // convert markdown to html
  md2html: function(text) {
     //showdown  = require('showdown'),
      const converter = new showdown.Converter(),
      html = converter.makeHtml(text);
    return html;
  },
  
  // save json
  saveJson: async function(data,fileName) {
    const response = await fetch("prosodylab/write_data.php", {
      method: "POST",
      headers: {
         "content-type": "application/json"
      },
      body: JSON.stringify({ filename: fileName, filedata: data })
    });
    if (response.ok) {
       const responseBody = await response.text();
       return responseBody;
    }
  },
  
  appendJson: function(data,fileName){
        let existingFile = this.loadLog(fileName);
        if (Object.keys(existingFile).length) {// if existingFile not empty, append
          data = [...existingFile, ...data];
        }
        data=JSON.stringify(data);
        
        this.saveJson(data,fileName);
  
  },
  
  appendJsonCallFunction: function(data,fileName){
        saveData = {
          type: 'call-function',
          async: true,
          func: async function(done) {
            let existingFile = prosodylab.loadLog(fileName);
            if (Object.keys(existingFile).length) {// if studyLog not empty, append
              data = [...existingFile, ...data];
            }
            data=JSON.stringify(data);
            const response = await fetch("prosodylab/write_data.php", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ filename: fileName, filedata: data })
            });
            if (response.ok) {
              const responseBody = await response.text();
              done(responseBody);
            }
          }
        }
    return saveData;
  
  },

  // load json file
  loadLog: function(fileName) {
    let file = [];
    $.ajax({
      type: "Get",
      dataType: 'json',
      async: false,
      cache: false,
      url: fileName,
      error: function() {
        console.error(`Created new ${fileName} since there was none!`);
        prosodylab.saveJson(JSON.stringify({}),fileName);
      },
      success: function(txt) {
        file = txt
      }
    });
    return file;
  },
  
  storeExperimentSettings: function(study){
    // add experiment settings to output data
    var result = {
      type: 'call-function',
      func: function(){},
      data: {...study,component: 'experimentSettings'}
    }
    return result;
  },


  // load text file
  loadTxt: function(fileName) {
    let file = [];
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
    let txt = this.loadTxt(fileName);
    txt = this.md2html(txt);
    return txt;
  },

  // load tab-delimited csv and convert to html
  loadCSV: function(fileName, header=true) {
    let txt = this.loadTxt(fileName);
    txt = Papa.parse(txt, {
      header: header,
      delimiter: '\t'
    });;
    return txt.data;
  },

  transpose: function(a) {

  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
},

  getMessages: function(language){
  	// load messages spreadsheet and return messages from desired language
    var allMessages = this.loadCSV(`prosodylab/messages.tsv`,false);
    var allMessages = this.transpose(allMessages);
 
    var languages  = allMessages.map(x => x[0]);
    var thisLanguage = languages.indexOf(language);

    // create new object with messages from the desired language
    var keys = allMessages[0];
    var values = allMessages[thisLanguage];
    var messages = {};
    keys.forEach((key, i) => messages[key] = values[i]);
  
   return messages;
 
  },

  saveData: function(fileName,format){
    // save  as json by default
    if (!format){ format = 'json';}
    // add extension to filename
    fileName = `${fileName}.${format}`
    // create saveData object using fetch
    let saveData = [];
    if (format == 'json') {
        saveData = {
          type: 'call-function',
          async: true,
          func: async function(done) {
            let data = jsPsych.data.get().json();
            const response = await fetch("prosodylab/write_data.php", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ filename: fileName, filedata: data })
            });
            if (response.ok) {
              const responseBody = await response.text();
              done(responseBody);
            }
          }
        }
    } else {
        saveData = {
          type: 'call-function',
          async: true,
          func: async function(done) {
            let data = jsPsych.data.get().csv();
            const response = await fetch("prosodylab/write_data.php", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ filename: fileName, filedata: data })
            });
            if (response.ok) {
              const responseBody = await response.text();
              done(responseBody);
            }
          }
        }
    }
    return saveData;
  },

  // render screen with button to press
  screen: function(text, name, choice, align, participantCode) {
    if (!align) {
      let align = 'left';
    }
    if (!choice) { // default button text
      choice = messages.continueButton;
    }
    text = `<div style="text-align: ${align}"> ${text} 
       </div><br>`;
    if (participantCode) { // completion code for final screen
      text = `${text} <b>${participantCode}</b> <br><br><br>`
    }
    const screenObject = {
      type: 'html-button-response',
      timing_post_trial: 0,
      choices: [choice],
      button_html: `<button class="jspsych-btn" 
            style="white-space:normal; text-align: center; font-size: 18px;width:95%;"> 
            <b>%choice%</b>
            </button><br><br><br><br>`,
      stimulus: text,
      is_html: true,
      data: {
        component: name,
        buttonResponseText: choice
      }
    };
    return screenObject;
  },
  
    // render screen with button to press
  screenFromMD: function(file, name, align, completionCode) {
  
    // load markdown and convert into html
    let text = prosodylab.loadMD(file);
    // default alignment is lelt-alignment
    if (!align) {
      let align = 'left';
    }
    // 
    let choice = [text.substring(text.lastIndexOf('<p>')+3,text.lastIndexOf("</p>"))];
    text = text.substring(0,text.lastIndexOf('<p>'))
    text =  `<div style="text-align: ${align}">${text}</div><br><br>`;
    // display participant code if desired (for final screen)
    if (completionCode) { // completion code for final screen
      text = `${text} <b>${messages.completionCode}: ${completionCode}</b> <br><br><br>`
    }
    // screen object
    const screenObject = {
      type: 'html-button-response',
      // take last paragraph of html as button text
      choices: choice,
      // format button:
      button_html: `<button class="jspsych-btn" 
            style="white-space:normal; text-align: center; font-size: 18px;width:95%;"> 
            <b>%choice%</b>
            </button><br><br><br><br>`,
      // present rest of text as stimulus:
      stimulus: text,      
      is_html: true,
      data: {
        component: name,
        buttonResponseText: choice
      }
    };
    return screenObject;
  },
  
  
  // Post-experiment questions
  postExQuestionnaire: function(language) {
    if (!language) {language = 'en'}
    let postEx = [];
    postEx.html = prosodylab.loadTxt(`prosodylab/debriefing_${language}.html`);
    postEx.type = 'survey-html-form';
    postEx.button_label = messages.continueButton,
    postEx.data = {
        component: 'Post-experiment Questionnaire'
    };
    
    return postEx;
  },


  languageQuestionnaire: function(language) {
    if (!language) {language = 'en'}
    
    const lq = prosodylab.loadTxt(`prosodylab/languageQuestionnaire_${language}.html`);
    const languageQuestionnaire = {
      type: 'survey-html-form',
      html: lq,
      button_label: messages.continueButton,
      data: {
        component: 'Language Questionnaire'
      },
      on_load: function() {
        gds.init() // initializes country drop-down menu
      }
    };
    return languageQuestionnaire;
  },


  musicQuestionnaire: function (modules) {
  /*Chin, T.-C., Coutinho, E., Scherer, K. R., and Rickard, N. S. (2018). Musebaq: A modular tool for music research to assess musicianship, musical capacity, music preferences, and motivations for music use. Music Perception: An Interdisciplinary Journal, 35(3):376–399.

So far only implemented: Module 1, musicianship
*/

                 if(!modules) { const modules = 'MusicianShip';}

                 const moduleMusicianship = {
                         type: 'survey-likert',
                         button_label: messages.continueButton,
                         questions: [
                           {prompt: messages.mqTrainingTheory, name: 'M1Q1-YearsTrainingTheory', labels: messages.scaleYears, required: 1},
                           {prompt: messages.mqKnowTheory, name: 'M1Q2-KnowledgeTheory', labels: messages.scaleHowMuch, required: 1},
                           {prompt: messages.mqTrainingPractice, name: 'M1Q3-YearsTrainingPractice', labels: messages.scaleYears, required: 1},
                           {prompt: messages.mqMakeProfessional, name: 'M1Q4-HowOftenProfessionalMusicMaking', labels: messages.scaleHowOften, required: 1},
                           {prompt: messages.mqMakePractice, name: 'M1Q5-HowOftenMusicPractice', labels: messages.scaleHowOften, required: 1},
                           {prompt: messages.mqMakeHobby, name: 'M1Q6-HowOftenAmateurMusicMaking', labels: messages.scaleHowOften, required: 1}
                         ],
                         randomize_question_order: false,
                         data: {
                           component: 'Music Questionnaire'
                         }
                 };
                 return moduleMusicianship;

},

 soundCheck: function(soundFile) {

    let soundCheck = [];
    
    const buttonText = ['Play Sound'];
    let soundCheckObject = {
      type: 'html-button-response',
      stimulus: `<em>${messages.connectHeadphones}</em><br><br>`,
      choices: [messages.playSound],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Sound check instructions',
        options: messages.playSound
      },
    }
    soundCheck.push(soundCheckObject);

    const choiceOne = messages.playAgain;
    const choiceTwo = messages.soundCheckOk;
    soundCheckObject = {
      type: 'audio-button-response',
      stimulus: soundFile,
      prompt: '<br><br>' +
        `<style> .centered {position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);}</style>
        <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
        <p><em>${messages.adjustVolume}</p></>`,
      choices: [choiceOne, choiceTwo],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Sound check',
        options: [choiceOne, choiceTwo]
      },
      button_html: '<button class="jspsych-btn">%choice% </button>'
    };

    const loop_node = {
      timeline: [soundCheckObject],
      loop_function: function(data) {
        if ('0' == data.values()[0].button_pressed) {
          return true;
        } else {
          return false;
        }
      }
    }
    soundCheck.push(loop_node);https://open.spotify.com/artist/4QkSD9TRUnMtI8Fq1jXJJe

    return soundCheck;
  },
  
  micCheck: function(soundFileName,recordingTimeOut,lab) {
      
    if (!lab){
      var lab = messages.productionTestSentence;
    }

    let recordCheck = [];
    
    // record instructions screen
    let recordCheckObject = {
      type: 'html-button-response',
      stimulus: `<em>${messages.adjustMic}. <br>
      <em>${messages.saySentence} </em>
      <br><br> 
      <b>${lab}</b>
      <br><br><br>`,
      choices: [messages.recordSound],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Mic check instructions',
        options: messages.recordSound
      },
    }
    recordCheck.push(recordCheckObject);
    
    var recordLoop = [];
    
    soundFileName = `micCheck_${participantCode}`

    let html = `<em>${messages.speakNow}</em>
      <br><br> <b>${lab}</b> <br><br>`;
    
     recordLoop.push(...prosodylab.recordTillClick(html, {component: `micCheckRecording`},soundFileName,lab));  
  
    const choiceOne = messages.recordAgain;
    const choiceTwo = messages.recordCheckOk;
    const choiceThree = messages.recordCheckNotOk;
    
    recordCheckObject = {
      type: 'html-button-response',
      stimulus: ``,//`prosodylab/soundcheck_da.mp3`, // 
      prompt: '<br><br>' +
        `<style> .centered {position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);}</style>
        <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
        <p><em>${messages.adjustMicAfter}</p></>`,
      choices: [choiceOne, choiceTwo,choiceThree],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Mic check',
        options: [choiceOne, choiceTwo,choiceThree]
      },
      button_html: '<button class="jspsych-btn">%choice% </button>'
    };
    
    recordLoop.push(recordCheckObject);

    const loop_node = {
      timeline: [...recordLoop],
      loop_function: function(data) {

        if ('0' == data.values()[3].button_pressed) {
          return true;
        } else {
          if ('2'== data.values()[3].button_pressed){
             prosodylab.screen(`<em>Recording didn't work--contact experimenter</em>`,'noSessionIdError','Click here to leave experiment','center'); 
             throw new Error("Recording not working");
          } else { 
          
           return false;
          }
        }
       }
      };
    
    recordCheck.push(loop_node);

    return recordCheck;
  },


  headPhoneScreener: function() {
    const path = 'prosodylab/headphonescreener'
    const sounds = [`stereoInPhaseQuietShort.mp3`,`stereoInPhaseShort.mp3`,`stereoOutOfPhaseShort.mp3`];
    
    let headPhoneScreenerTrial= [];
    let playSound = [];
    let question = [];
    
    const instructionsHeadPhoneScreener = {
      type: 'html-button-response',
      stimulus: messages.instructionsHeadphoneCheck,
      choices: [messages.startHeadphoneTest],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Headphone screener',
        trialPart:  'Headphone screener instructions',
        choices: messages.startHeadphoneTest
      },
    }
    headPhoneScreenerTrial.push(instructionsHeadPhoneScreener);
    
    
    // create variable for random order
    let randomOrder = [0,1,2];
    
    let correct  = 0;
        
    for  (let i=0;i<6;i++){
    
      randomOrder  = jsPsych.randomization.shuffle(randomOrder);
          
      correctButton = randomOrder.indexOf(0);
      
      for (let j=0;j<3;j++) {
      
        playSound = {
          type: 'audio-keyboard-response',
          prompt: function() {
          const html = `<style> .centered {position: fixed; top: 50%; 
            left: 50%; transform: translate(-50%, -50%);}</style>
            <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
            return html;
          },
          stimulus: `${path}/${sounds[randomOrder[j]]}`,
          choices: jsPsych.NO_KEYS,
          trial_ends_after_audio: true,
          post_trial_gap: 500,
          data:  {
            component: 'Headphone screener',
            trialPart: `Listen to head phone screener sequence ${i} sound ${j}`,
            sound: `${sounds[randomOrder[j]]}`,
            setUsed: sounds,
            correctButton: correctButton
          }
        }
        headPhoneScreenerTrial.push(playSound);
        
      }
      
      question = {
        type: 'html-button-response',
        stimulus: messages.questionHeadphoneTest,
        choices: messages.optionsHeadphoneTest,
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        data:  {
          options: messages.optionsHeadphoneTest,
          component: 'Headphone screener',
          trialPart:  `Headphone screener question ${i}`,
          setUsed: sounds,
          correctButton: correctButton
        },   
        on_finish: function(data){
          if(data.button_pressed==data.correctButton){
              data.correct = 1;
          } else {
              data.correct = 0;
          }
        }   
      }      
      headPhoneScreenerTrial.push(question);
      
    }

    return headPhoneScreenerTrial;
  },

  headPhoneScreenerMixed: function() {
    const path = 'prosodylab/headphonescreener'
    let sounds = [];
    sounds[0] = [`stereoInPhaseQuietShort.mp3`,`stereoInPhaseShort.mp3`,`stereoOutOfPhaseShort.mp3`];
    sounds[1] = [`stereoInPhaseQuiet.mp3`,`stereoInPhase.mp3`,`stereoOutOfPhase.mp3`];
    let soundsUsed = [];
    let soundsUsedText = [];
    
    let headPhoneScreenerTrial= [];
    let headPhoneScreenerSounds = ['sound1.mp3','adf'];
    let playSound = [];
    let question = [];
    
    const instructionsHeadPhoneScreener = {
      type: 'html-button-response',
      stimulus: messages.instructionsHeadphoneCheck,
      choices: [messages.startHeadphoneTest],
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Headphone screener',
        trialPart:  'Headphone screener instructions',
        choices: messages.startHeadphoneTest
      },
    }
    headPhoneScreenerTrial.push(instructionsHeadPhoneScreener);
    
    // select whether short or long set is used first for this participant
    let randomOrderShortLong = [0,1];
    randomOrderShortLong = jsPsych.randomization.shuffle(randomOrderShortLong);
    
    // create variable for random order
    let randomOrder = [0,1,2];
    
    let correct  = 0;
        
    for  (let i=0;i<6;i++){
    
      randomOrder  = jsPsych.randomization.shuffle(randomOrder);
    
      // Use short and long sounds alternately
      if ((i+randomOrderShortLong[0])/2==Math.floor((i+randomOrderShortLong[0])/2)){
           soundsUsed = sounds[1];
           soundsUsedText = 'Long Set'
          } else { 
           soundsUsed = sounds[0];
           soundsUsedText = 'Short Set'
          }
      
      correctButton = randomOrder.indexOf(0);
      
      for (let j=0;j<3;j++) {
      
        playSound = {
          type: 'audio-keyboard-response',
          prompt: function() {
          const html = `<style> .centered {position: fixed; top: 50%; 
            left: 50%; transform: translate(-50%, -50%);}</style>
            <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
            return html;
          },
          stimulus: `${path}/${soundsUsed[randomOrder[j]]}`,
          choices: jsPsych.NO_KEYS,
          trial_ends_after_audio: true,
          post_trial_gap: 500,
          data:  {
            component: 'Headphone screener',
            trialPart: `Listen to head phone screener sequence ${i} sound ${j}`,
            sound: `${soundsUsed[randomOrder[j]]}`,
            setUsed: soundsUsedText,
            correctButton: correctButton
          }
        }
        headPhoneScreenerTrial.push(playSound);
        
      }
      
      question = {
        type: 'html-button-response',
        stimulus: messages.questionHeadphoneTest,
        choices: messages.optionsHeadphoneTest,
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        data:  {
          options: messages.optionsHeadphoneTest,
          component: 'Headphone screener',
          trialPart:  `Headphone screener question ${i}`,
          setUsed: soundsUsedText,
          correctButton: correctButton
        },   
        on_finish: function(data){
          if(data.button_pressed==data.correctButton){
              data.correct = 1;
          } else {
              data.correct = 0;
          }
        }   
      }      
      headPhoneScreenerTrial.push(question);
      
    }

    return headPhoneScreenerTrial;
  },


  headPhoneScreenerOriginal: function() {
    const path = 'prosodylab/headphonescreener/original'
    let sounds = [];
    sounds = ['antiphase_HC_IOS.wav',
              'antiphase_HC_ISO.wav',
              'antiphase_HC_OIS.wav',
              'antiphase_HC_OSI.wav',
              'antiphase_HC_SIO.wav',
              'antiphase_HC_SOI.wav'
              ];
    const correctChoice = [2,1,2,1,0,0];
    let randomOrder = [0,1,2,3,4,5];
    randomOrder  = jsPsych.randomization.shuffle(randomOrder);
    
    let headPhoneScreenerTrial= [];
    let playSound = [];
    let question = [];
    let correctButton = [];
    
    const buttonText = [messages.startHeadphoneTest];
    const instructionsHeadPhoneScreener = {
      type: 'html-button-response',
      stimulus: messages.instructionsHeadphoneCheck,
      choices: buttonText,
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Headphone screener instructions',
        choices: buttonText
      },
    }
    headPhoneScreenerTrial.push(instructionsHeadPhoneScreener);
    
    // create variable for random order

    let correct  = 0;
    
    for  (let i=0;i<6;i++){
      
      
        correctButton = correctChoice[randomOrder[i]];
        
        playSound = {
          type: 'audio-keyboard-response',
          prompt: function() {
          const html = `<style> .centered {position: fixed; top: 50%; 
            left: 50%; transform: translate(-50%, -50%);}</style>
            <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
            return html;
          },
          stimulus: `${path}/${sounds[randomOrder[i]]}`,
          choices: jsPsych.NO_KEYS,
          trial_ends_after_audio: true,
          post_trial_gap: 500,
          data:  {
            component: 'Headphone screener sound',
            trialPart: `Listen to head phone screener sound ${i}`,
            sound: `${sounds[randomOrder[i]]}`,
            setUsed: 'original',
            correctButton: correctButton
          }
        }
        headPhoneScreenerTrial.push(playSound);
      

      
      question = {
        type: 'html-button-response',
        stimulus: messages.questionHeadphoneTest,
        choices: messages.optionsHeadphoneTest,
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        data:  {
          options: messages.optionsHeadphoneTest,
          component: 'Headphone screener question',
          setUsed: 'original',
          correctButton: correctButton
        },   
        on_finish: function(data){
          if(data.button_pressed==data.correctButton){
              data.correct = 1;
          } else {
              data.correct = 0;
          }
        }   
      }      
      headPhoneScreenerTrial.push(question);
      
    }
    return headPhoneScreenerTrial;
  },
  
  latinsquareConditionSelection: function(items, conditions, pListN) {

    let result = [];
    for (let i = 0; i < items; i++) {
      for (let j = 0; j < conditions; j++) {
        result.push(1 + (j + pListN - 1) % conditions);
      }
    }
    return result;
  },

  withinConditionSelection: function(items, conditions, pListN) {

    let result = [];
    let block = [];
    let pListBlock = [];
    // randomize order of blocks after the first
    let conditionBlock = this.digitSequence(conditions);
    let index = conditionBlock.indexOf(pListN);
    if (index !== -1) {conditionBlock.splice(index, 1)};
    conditionBlock = jsPsych.randomization.shuffle(conditionBlock);
    conditionBlock = [pListN, ...conditionBlock];

    for (let i = 0; i < conditions; i++) {
      block = conditionBlock[i];
      result[i] = this.latinsquareConditionSelection(items, conditions, block);
    }
    return result;
  },


  blockedConditionSelection: function(items, conditions, playListN) {

    // pListN is condition # of first block
    // randomize order of conditions other than first
    let conditionBlock = this.digitSequence(conditions);
    let index = conditionBlock.indexOf(playListN);
    if (index !== -1) conditionBlock.splice(index, 1);
    conditionBlock = jsPsych.randomization.shuffle(conditionBlock);
    conditionBlock = [playListN, ...conditionBlock];

    let result = [];

    for (let i = 0; i < conditions; i++) {
      result[i] = [];
      for (let j = 0; j < items; j++) {
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
    const playList = Math.floor((Math.random() * conditions) + 1);
    return playList
  },

  // generate sequence of integers
  digitSequence: function(length) {
    let result = [];
    for (let i = 1; i <= length; i++) {
      result.push(i);
    }
    return result
  },
  
  countOccurrences: function(priorAssignments) {
    var counts = {};
    
    for (let i = 0; i < priorAssignments.length; i++) {
      var num = priorAssignments[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    
    return counts;
  },

  generatePlaylist: function(stimuli,studyLog,pListMethod) {
  
    const conditions = Math.max(...stimuli.map(value => value.condition));
    const items = Math.max(...stimuli.map(value => value.item));
    const design = [...new Set(stimuli.map(value => value.design))];
    const experiment = [...new Set(stimuli.map(value => value.experiment))];
    
    // create empty array for counting pList assignments
    let counts = Array(conditions).fill(0);
    
    // count up prior pList assignments if there are any
    if (Object.keys(studyLog).length){ // only do if prior assignments
             let logExperiment = studyLog.filter(obj => obj.experiment == experiment);
             let priorAssignments = logExperiment.map(function (el) { return el.pList; });

             // count how often each pList has been assigned
             for (let i = 0; i < priorAssignments.length; i++) {
               counts[priorAssignments[i]-1]++;
             }
             minCount = Math.min(...counts);
             
    }
    
    /* determine pList were applicable
    If playList wasn't hard-coded in index file:
    For some designs, a participant only sees a subset of the stimuli
    For  example, they might only see condition 1, if they get pList in design 'Between'
    for others, the order will depend on pList, for example condition 1 comes  as 
    the first block for  pList 1 with design 'Blocked' */
    

    pList = [];
     
    if (design=='Fixed'||design=='Random') {
        // playlist assignment not necessary for Fixed and Random designs, so set to 0
        pList = 0;
     } else if (/^\d+$/.test(pListMethod)) {
        pList = pListMethod;
        pListMethod = 'Hardcoded'
     } else {       
      // Assign a pList number between 1 and the number of conditions
      
      if (Object.keys(studyLog).length&&pListMethod!='random'){ // use studyLog to determine pList if there is one
                   
             var indices = [];
             // determine which pLists have been assigned least often
             for(let i= 0; i < counts.length; i++) {
                if (counts[i] === minCount) {
                     indices.push(i);
                }
             }
             if (indices.length>1){ // if more than one, pick one randomly
              let random = this.digitSequence(indices.length);
              random = jsPsych.randomization.shuffle(random);
              indices = [indices[random[0]-1]];
             }
             pList = indices[0]+1;
              
        } else  { //assign random pList number
            pList = Math.floor((Math.random() * conditions) + 1);
        }
    }
    
           
    // add playList info to all trials by passing it to stimuli object
    stimuli = stimuli.map(v => ({...v, pList: pList}));
    
    let playList = [];
    let conditionSelection = [];

    if (design == 'Between') {

      // same condition from each item set
      for (let i = 0; i < items; i++) {
        playList[i] = stimuli.find(obj => {
          return obj.item == (i+1) && obj.condition == pList
        })
        // randomize order of trials
        playList = jsPsych.randomization.shuffle(playList);
      }

    } else if (design == 'Blocked') {

      // all stimuli, organized in blocks by condition
      conditionSelection = this.blockedConditionSelection(items, conditions, pList);
      for (let j = 0; j < conditions; j++) {
        blockList = [];
        for (let i = 0; i < items; i++) {
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
      for (let i = 0; i < items; i++) {
        playList[i] = stimuli.find(obj => {
          return obj.item == (i + 1) && obj.condition == conditionSelection[i];
        });
      }
      // randomize order of trials
      playList = jsPsych.randomization.shuffle(playList);

    } else if (design == 'Within') {

      // all stimuli in pseudorandom order, a sequence several LQ blocks
      conditionSelection = this.withinConditionSelection(items, conditions, pList);
      let blockList = [];
      for (let j = 0; j < conditions; j++) {
        blockList = [];
        for (let i = 0; i < items; i++) {
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

   // Randomize option order for questions with OptionsFixedWithin
   

   // show experiment informaton in console
   
   let participants = counts.reduce(function(counts, b) { return counts + b; }, 0);
   
    console.log(
       'Experiment: ',experiment, 
       '\nDesign',design[0],
       '\nConditions',conditions,
       'Items:',items,
       'Length: ',playList.length,
       '\nParticipants: ',participants,
       '\npList: ', pList, 'Assignment method:',pListMethod,
       '\nPrior assginments: ', counts,
       //'\nplayList',playList
    );

    return playList;
  }, //  end of this.generatePlaylist

  fixation: function(trialInfo,duration) {
    return prosodylab.showText(trialInfo,duration,'<div style="font-size:60px;">+</div>');
  },
  
  showText: function(trialInfo,duration,message){
       //default message empty
       if(!message){var message = ''}
       //default duration 1 sec
       if(!duration){duration=1000}
       
       var showTextElement = {
          type: 'html-keyboard-response',
          stimulus: message,
          choices: jsPsych.NO_KEYS,
          trial_duration: duration,
          data: {...trialInfo, component: 'experiment',trialPart:'Fixation' } 
       };
       
       
       return showTextElement;
  },
  
  noDataRecordedFlag: function(){
  
    var flagText = `<div style="font-size:50px;color:red">
      <em>Test run <br><br><br> No data will be saved!</em></div>`;
  
    return prosodylab.showText({component:'NoDataRecordedFlag'},2000,flagText);
  
  },
  
  thankYouFlag: function(){
  
    var flagText = `<div style="font-size:50px;color:red">
      <em><br><br><br> ${messages.thankyou}</em></div>`;
      
    return prosodylab.showText({component:'ThankYouFlag' },2000,flagText);
  },

  generateKeyChoices: function(nChoices){
    // creates array of n choices, e.g. ['1','2','3']
    let result = this.digitSequence(nChoices);
    return result.map(String);
  },
  

  permute: function(permutation) { 
     // creates permutations of n elements
     // https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
    var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

    while (i < length) {
     if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
    }
    return result;
  },

  shuffle: function(choices,randomNumber){
        result = [];       
        let permutations = this.permute(this.digitSequence(choices.length));
        permutationChoice = permutations[Math.floor(randomNumber*permutations.length)];
        for (let i=0;i<choices.length;i++) {
          result.push(choices[permutationChoice[i]-1]);
        }
        return result
  },
  
  questionKeyOptions: function(question){

   question.choices = this.generateKeyChoices(question.data.options.length);
   question.stimulus = [];
   
    if (question.data.options.length<=2){
        separator = '&nbsp&nbsp;'
    } else{
        separator = '<br><br>'
    }
    for (let i=0; i<question.data.options.length; i++){
      question.stimulus = `${question.stimulus}${question.choices[i]} = ${question.data.options[i]}${separator}`;
    } 
    question.stimulus = `${question.data.text} <br/> ${question.stimulus}`;
    
    return question
  },
  

  // start audio recording
  startRecording: function (fileName,labtext) {
   return {
    type: "call-function", 
    func: function() {
      chunks = []; // clears  prior recordings
      soundFileName = `${study.path}/dataSound/${fileName}`; 
      lab = labtext;
      recorder.start();
    }
   }
  },
  
  // function for stopping audio recording
  stopRecording: function () {
   return {
    type: "call-function",
    func: function() {
      setTimeout(function() {
        recorder.stop(); // stops recording and triggers onstop event
      }, 300); // wait a bit so the recording does not get cut off early
    }
   }
  },

 //
  recordScreen: function(html,trialInfo,soundFileName,lab,recordingTimeOut,message,contextFile) {
  
    let result = [];
        
    if (!trialInfo){var trialInfo=[];}
    if (!message){message = messages.doneRecording};
    
    if (!contextFile){

       result = {
        type: 'html-button-response',
        stimulus: html,
        choices: [message],
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        trial_duration: recordingTimeOut,
        data: {...trialInfo,
             trialPart:'recordAndClickkMessage',
             recordedFile: soundFileName,
             labText: lab
        }
      };
    
     } else {
    
       result = {
        type: 'audio-button-response',
        stimulus: `experiment/audio/${contextFile}`,
        prompt: html,
        choices: [message],
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        data: {...trialInfo,
             trialPart:'recordAndClickkMessage',
             contextFile: contextFile,
             recordedFile: soundFileName,
             labText: lab
        }
       };    
       
    }
           
    return result;
  },

  recordTillClick: function(html,trialInfo,soundFileName,lab,message, recordOption,contextFile) {
   
    if (!message) {
       message = messages.doneRecording;
    }
   
    let recordTrial = []; 
   
    recordTrial.push(prosodylab.startRecording(soundFileName,lab));
  
    recordTrial.push(prosodylab.recordScreen(
         html,trialInfo,soundFileName,lab,study.recordingTimeOut,message,contextFile));
     
    recordTrial.push(prosodylab.stopRecording());
    
    if (recordOption=='rerecord'){
        
        const choiceOne = messages.recordAgain;
        const choiceTwo = messages.recordCheckOk;
        
        let recordCheck = {
            type: 'html-button-response',
            stimulus: ``,//`prosodylab/soundcheck_da.mp3`, // 
            prompt: '<br><br>' +
                 `<style> .centered {position: fixed; top: 50%; left: 50%;
                 transform: translate(-50%, -50%);}</style>
                <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
                <p><em>${messages.adjustMicAfter}</p></>`,
            choices: [choiceOne, choiceTwo],
            on_trial_start: function() {
               setTimeout(function() {
               setDisplay("jspsych-btn", "")
              }, 1000)
            },
            data: {
            component: 'RerecordPrompt',
            recordedFile: soundFileName,
            options: [choiceOne, choiceTwo]
         },
            button_html: '<button class="jspsych-btn">%choice% </button>'
          };
          
          recordTrial.push(recordCheck);
          
          loop_node = {
             timeline: [...recordTrial],
             loop_function: function(data) {
               if ('0' == data.values()[3].button_pressed) {
                 return true;
               } else { 
                 return false;
               } 
             }
          }
          
          recordTrial = [loop_node];
    }  
    
    return recordTrial;
    
  },

  // save audio data
  // this should be turned into async function!
  saveAudio: function(filename, audioData,lab) {
  
    if (!lab){ var lab = ""}
    var url = 'prosodylab/record_audio.php'; // external .php file that should be in same folder as your experiment

    form_data = new FormData();
    form_data.append("filename", filename);
    form_data.append("filedata", audioData);
    form_data.append("lab", lab);
    fetch(url, {
      method: 'POST', 
      body: form_data
    });
  },
  
  // throw error
  errorQuit: function (message) {
   var body = document.getElementsByTagName('body')[0];
   body.innerHTML = '<p style="color: #FF0000">'+message+'</p>'+body.innerHTML;
   throw error;
  },
  
  
  audioRecorder: function(testRun,play){
    // cf. https://air.ghost.io/recording-to-an-audio-file-using-html5-and-js/
  
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {
      try {
        recorder = new MediaRecorder(stream);
      } catch(error) { // if MediaRecorder not supported
       prosodylab.errorQuit("Please try using Chrome or Firefox instead.");
      };
    
    recorder.ondataavailable = e => {
        chunks.push(e.data);//pushes blob to "chunks" variable above
    };

    recorder.onstop = e => { //what should happen when audio recording stops
        let blob = new Blob(chunks,{type:'audio/webm'});
        audioUrl = URL.createObjectURL(blob);
        if(!testRun) {
          prosodylab.saveAudio(soundFileName, blob,lab);
        }
        if(play){
          var audio = new Audio(audioUrl);
          audio.play();
        }
    }})
    .catch(// // error if browser doesn't support MediaRecorder or mic permission denied
       error => {errorQuit("Please allow microphone access and reload the page!")});
  },
  
  
  repeatTrial: function(trialTimeline,trialInfo,repeatMessage,repeatOptions,times){
     
     // if number of allowed repetitions is not specified, set it to unlimited (=0)
     if(!times){
       var times = 0;
     }
     
     // if no options and message specified, assume it is about replaying a soundfile
     if(!repeatOptions){
       var repeatOptions = [messages.playAgain,messages.proceed];
     }  
     
     if(!repeatMessage){
       var repeatMessage = messages.askReplay;
     }

     var askRepeat = {
          type: 'html-button-response',
          stimulus: `${repeatMessage}<br><br>`,
          choices: repeatOptions,
          button_html: '<button class="jspsych-btn">%choice% </button>',
          data: trialInfo,
          prompt: ''
     };

      askRepeat.data.trialPart =  'askRepeat';
      askRepeat.data.options = repeatOptions;
      
      
      trialTimeline.push(askRepeat);
      
      lastElement = trialTimeline.length - 1; 
      // If first button is pressed, repeat trial
      const loopNode = {
        timeline: trialTimeline,
        loop_function: function(data) {
        
          if ('0' == data.values()[lastElement].button_pressed) {
            return true;
          } else {
            return false;
          }
        }
      }
      
      return loopNode;
  
  },
  
  playSound: function(pathSound,playMessage) {
  
    if(!playMessage){var playMessage = '';}
  
    playSoundfile = {
        type: 'audio-keyboard-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
          <em>${playMessage}</em><br>`
          return html;
        },
        stimulus: `${pathSound}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: {
          trialPart:  'Listen to soundFile'
        }
      }
      
      
      return playSoundfile;  
      
  },
 
  addTrial: function(session,trial,trialInfo,participant,randomNumbers,messages) {

    var stimul = [];
    var playSound = [];
    var lab = [];


    if (trial.listenRepeatRecord&&trial.listenRepeatRecord!='NA') {
      
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
     
      playSound =  {
        type: 'audio-button-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <br>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
          <br>
          ${trial.listenRepeatRecordMessage}
          `
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.listenRepeatRecord}`,
        choices: [messages.playAgain,messages.recordSound],
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: trialInfo
      }
      playSound.data.trialPart =  'ListenRepeatRecord';
      playSound.data.options = [messages.playAgain,messages.recordSound];
      
      const loop_node = {
        timeline: [playSound],
        loop_function: function(data) {
        
          if ('0' == data.values()[0].button_pressed) {
            return true;
          } else {
            return false;
          }
        }
      }
      
      
      session.push(loop_node);
      
      if (!trial.lab) {
        if (trial.text){
           lab = trial.text;
        } else {
           lab = "";
        }
      } else {
         lab = trial.lab;
      }
      
      soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`;
       
      session.push(...
         prosodylab.recordTillClick(html,trialInfo,soundFileName,lab,messages.doneRecording)
      );

    }
    
     // dialogue
    if (trial.dialogueContext&&trial.dialogueContext!='no') {
    
       
      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.dialogueResponse;
      }
            
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
      
      if (trial.dialogueImage){
        var image = `${study.path}/images/${trial.dialogueImage}`;
        if (!preload.images.includes(image)) {
          preload.images.push(image);
        }
      }
           
      htmlFunction = function(message) {
          var html =  `<br> <style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          ${trial.dialogueContext}<br>`

          if (trial.dialogueImage) {
             html = html + `<img src="${image}" 
             alt="image" width="800"><br>`
          }
          if (trial.dialogueResponse) {
             html = html + `<br><b>${trial.dialogueResponse}</b><br><br>`
          } 
          html = html + `<em>${message}</em><br>`
              
          return html;  
      };
        
      var readStimulus =  {
        type: 'html-button-response',
        stimulus: htmlFunction(prosodylab.md2html(trial.dialogueMessage)),
        choices: [messages.recordDialogue],
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: {...trialInfo,
               trialPart:  'dialogue',
               options: messages.recordDialogue
               }
      }

      session.push(readStimulus);
      
      
      soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`


      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.plannedProduction;
      }
      
      var recordSound = [];
      var loop_node = [];
      
      if (trial.dialogueContextFile&&trial.dialogueContextFile !='') {
      
      
        var listenToContext =  {
          type: 'audio-keyboard-response',
          prompt: htmlFunction(prosodylab.md2html(trial.dialogueRecordMessage)),
          stimulus: `${trial.path}/audio/${trial.dialogueContextFile}`,
          choices: jsPsych.NO_KEYS,
         trial_ends_after_audio: true,
          data: trialInfo
        }
      
        listenToContext.data.trialPart =  'Listen to Context';  
      
      session.push(listenToContext);
      
      }

     let html = '';
      
      if (!trial.dialogueMemorizeResponse){
      
        html = htmlFunction(prosodylab.md2html(trial.dialogueRecordMessage));
            
      } else {
         html = prosodylab.md2html(trial.dialogueRecordMessage); 
      }
      
     session.push(...prosodylab.recordTillClick(
         html,
         trialInfo,
         soundFileName,
         lab,
         messages.doneRecording,
         trial.recordOption,
         trial.contextFile
         )
      );
     
   }
    
   // simply play soundfile
    if (trial.soundFile) {
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
     
     playSound =  {
        type: 'audio-keyboard-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.soundFile}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: trialInfo
      }
      playSound.data.trialPart =  'Listen to soundFile';
      session.push(playSound);
    }
    
    
    // ContextRetrieval
    if (trial.contextRetrieval) {
    
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 

      // paths to contextFiles
      var contextFiles = [`${trial.path}/audio/${trial.contextFile1}`, `${trial.path}/audio/${trial.contextFile2}`];
      // shuffle soundfiles (if you want them shuffled, uncomment)
      // contextFiles = jsPsych.randomization.shuffle(contextFiles);
      // path to response file
      responseFile = `${trial.path}/audio/${trial.responseFile}`
    
      var contextRetrievalTrial = [];
      
      contextRetrievalTrial.push(prosodylab.playSound(contextFiles[0],'Dialogue 1'));
      contextRetrievalTrial.push(prosodylab.playSound(responseFile,'Dialogue 1'));
      // add 500ms pause here
      contextRetrievalTrial.push(prosodylab.fixation(trialInfo,1000));
      //
      contextRetrievalTrial.push(prosodylab.playSound(contextFiles[1],'Dialogue 2'));
      contextRetrievalTrial.push(prosodylab.playSound(responseFile,'Dialogue 2'));
    
      session.push(prosodylab.repeatTrial(contextRetrievalTrial,trialInfo,trial.contextRetrieval));
    
    }
    
    // play soundfile and ask whether participant wants to hear it again
    if (trial.soundFileRepeat) {
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 

      playSound =  {
        type: 'audio-button-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <br>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
          <br>
          ${trial.soundFileRepeatMessage}
          `
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.soundFileRepeat}`,
        choices: [messages.playAgain,messages.continueButton],
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: trialInfo
      }
      playSound.data.trialPart =  'ListenRepeatRecord';
      playSound.data.options = [messages.playAgain,messages.recordSound];
      
      const loop_node = {
        timeline: [playSound],
        loop_function: function(data) {
          if ('0' == data.values()[0].button_pressed) {
            return true;
          } else {
            return false;
          }
        }
      }
      
      
      session.push(loop_node);
    }
    
   // planned production
    if (trial.plannedProduction&&trial.plannedProduction!='NA') {
       
      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.plannedProduction;
      }
    
      var recordSound = [];
      var loop_node = [];
      
      stimulusDisplay = [];
      
      if (trial.images){
          
          var images = eval(trial.images);
          
          if (!trial.imageOrder) {trial.imageOrder = 'random'}
          
          // set image to default size if size is not specified
          // xx would be good to have default image size set in index?

          if (!trial.imageSizes) {
            imageSizes = Array(images.length).fill(150);
          } else {
            imageSizes = eval(trial.imageSizes);
          }
          
          topCoordinates = imageSizes.map(function(element){return 30-element/15;});
          
          
        if ((!trial.imageOrder)|(trial.imageOrder=='random')) {
           imageOrder = Array.from({length: images.length}, (_, i) => i)
           imageOrder = jsPsych.randomization.shuffle(imageOrder);
        } else if (trial.imageOrder=='Fixed') {
           imageOrder = Array.from({length: images.length}, (_, i) => i)
        } else if (trial.imageOrder=='random2x2'){
           imageOrder = [...jsPsych.randomization.shuffle([1,2]), ...jsPsych.randomization.shuffle([3,4])];
           console.log('2x2imageorder',imageOrder);
        } else{
           imageOrder = eval(trial.imageOrder);
        }
        
        // two-by-two arrangement by default:
          if (!trial.imageLocations){
            imageLocations = [
                 {top: 30,left: 10},
                 {top: 30,left: 30},
                 {top: 30,left: 60},
                 {top: 30,left: 80}
                 ]; 
          } else {
            imageLocations = eval(trial.imageLocations);
          }
        
        var image = []; 
        
        for (let i=0; i<images.length; i++){
        
         image = `${trialInfo.path}/images/${images[imageOrder[i]]}`;
        
         if (!preload.images.includes(image)) {
           preload.images.push(image);
         }
          
          stimulusDisplay = stimulusDisplay + `
            <img 
               src=${image} 
               style="
                 position:absolute;
                 left: ${imageLocations[i].left}%; 
                 top: ${topCoordinates[imageOrder[i]]}%; 
                 border:none;
                 width: ${imageSizes[imageOrder[i]]}px;
                 "
               alt="image" width="100"> 
               `
         }
        
        }
        
        stimulusDisplay = stimulusDisplay + `<br><br>`;
        
        if (trial.context){
        	stimulusDisplay = stimulusDisplay + `${trial.context}<br>`;
        }
        
        stimulusDisplay = stimulusDisplay + `<br><br> <b>${trial.plannedProduction}</b>`;
        

      var readStimulus =  {
        type: 'html-button-response',
        stimulus: stimulusDisplay + `
           <br><br>
           <em>${prosodylab.md2html(trial.plannedProductionMessage)}</em>
           <br><br>`,          
        choices: [messages.startRecording],
        //trial_ends_after_audio: true,
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: {...trialInfo,
               trialPart:  'plannedProduction',
               options: messages.startRecording
               }
      }

      recordSound.push(readStimulus);
      
      soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`;
     
     let html =  stimulusDisplay + `<br><br><br>
          <em>${messages.speakNow}</em>
          <br><br><br>`;
      
      
      recordSound.push(...
         prosodylab.recordTillClick(html, trialInfo, soundFileName,lab,messages.doneRecording)
      );    
       

      
      if (trial.recordOption=='rerecord'){
        
            const choiceOne = messages.recordAgain;
            const choiceTwo = messages.recordCheckOk;
            recordCheckObject = {
              type: 'html-button-response',
              stimulus: ``,//`prosodylab/soundcheck_da.mp3`, // 
              prompt: '<br><br>' +
                 `<style> .centered {position: fixed; top: 50%; left: 50%;
                 transform: translate(-50%, -50%);}</style>
                <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">
                <p><em>${messages.adjustMicAfter}</p></>`,
              choices: [choiceOne, choiceTwo],
              on_trial_start: function() {
               setTimeout(function() {
               setDisplay("jspsych-btn", "")
              }, 1000)
             },
            data: {
              component: 'RerecordPrompt',
              options: [choiceOne, choiceTwo]
            },
            button_html: '<button class="jspsych-btn">%choice% </button>'
          };
          
          recordSound.push(recordCheckObject);
          
          loop_node = {
             timeline: [...recordSound],
             loop_function: function(data) {
               if ('0' == data.values()[4].button_pressed) {
                 return true;
               } else { 
                 return false;
               } 
             }
          }
          
          session.push(loop_node);
          } else {
        session.push(...recordSound);  

     }
          
     }
      
 
    
    // incremental production
    if (trial.incrementalProduction&&trial.incrementalProduction!='NA') {
       
      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.incrementalProduction;
      }
      
            
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
    
      var readyScreen = {
        type: 'html-button-response',
        stimulus: `<em>${prosodylab.md2html(trial.incrementalProductionMessage)}</em>
            <br><br>`,
        choices: [messages.continueButton],
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: trialInfo
      }
      readyScreen.data.trialPart =  'Incremental Production ready-message';
     
     session.push(readyScreen);
     
      var firstScreen =  {
        type: 'html-keyboard-response',
        stimulus: function() {
        const html = `<br> <style> .centered {position: absolute; top: 80px; 
          left: 50%;}</style>
          ${trial.incrementalProduction}
          <style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <div style="position:relative; height:300px;"></div>
          <em>${messages.speakNow}</em><br>
          <br><br>`
          return html;
        },
        choices: jsPsych.NO_KEYS,
        //trial_ends_after_audio: true,
        trial_duration: trial.incrementLag,
        data: {...trialInfo,
               trialPart:  'Incremental production first screen',
               options: messages.startRecording
               }
      }
      
      soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`;
       
      session.push(prosodylab.startRecording(soundFileName,lab));
      
      session.push(firstScreen);
      
      var secondScreen = `<br> <style> .centered {position: absolute; top: 80px; 
          left: 50%;}</style>
          ${trial.incrementalProduction}<br><br>
          <div style="position:relative; height:300px;">`;
      
      // images have to be array
      if (trial.images){
      
        var images = eval(trial.images);
        var imageLocations = [];
        
        if (!trial.imageLocations) {
          if (images.length==1) {
            imageLocations = [{top: 40,left: 50}]; 
          } else if (images.length==2) {
            imageLocations = [{top: 40,left: 20},{top: 40,left: 80}];
          } else if (images.length==3) {
            imageLocations = [{top: 20,left: 20},{top: 20,left: 80},{top: 40,left: 50}];
          } else if (images.length==4) {
            imageLocations = [{top: 20,left: 20},{top: 20,left: 80},{top: 40,left: 20},{top: 40,left: 80}];
          }
        } else {
          imageLocations = eval(trial.imageLocations);
        }
        
        if (!trial.imageOrder) {trial.imageOrder = 'random'}
        
        if (trial.imageOrder=='random') {
           images = jsPsych.randomization.shuffle(images);
        }
                
        for (let i=0; i<images.length; i++){
          secondScreen = secondScreen + `
            <img 
               src=${trialInfo.path}/images/${images[i]} 
               style="
                 position:absolute;
                 left: ${imageLocations[i].left}%; 
                 top: ${imageLocations[i].top}%; 
                 border:none;
                 "
               alt="image" width="100"> `
         } 
         
       }
     

       secondScreen  = 
          prosodylab.recordScreen(secondScreen,trialInfo, soundFileName,lab,study.recordingTimeOut,messages.doneRecording);
    
       secondScreen.data = {...secondScreen.Data,trialPart: 'incrementalSecondScreen'};
       if (trial.imageOrder) {
         secondScreen.data = {...secondScreen.Data,imageOrder: trial.imageOrder};
       }
       session.push(secondScreen);
       
       session.push(prosodylab.stopRecording());
    }
    
  
    
    if (trial.contextFile&&trial.contextFile!='NA'&&trial.contextFile!='') {
      
      playSound =  {
        type: 'audio-keyboard-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.contextFile}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: trialInfo
      }
      playSound.data.trialPart =  'Listen to contextFile';
      session.push(playSound);
    }
    
    if (trial.answerFile&&trial.answerFile!='NA'&&trial.answerFile!='') {
      
      playSound =  {
        type: 'audio-keyboard-response',
        prompt: function() {
        const html = `<style> .centered {position: fixed; top: 50%; 
          left: 50%; transform: translate(-50%, -50%);}</style>
          <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
          return html;
        },
        stimulus: `${trial.path}/audio/${trial.answerFile}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: trialInfo
      }
      playSound.data.trialPart =  'Listen to sound';
      session.push(playSound);
    }
    
    
    //
    // add questions
    //
    
    
    let questionN = 1;

    while (trial[`question${questionN}`]) {
      
      if (trial[`question${questionN}`]) { //  build question 1
      let question = [];
      
      if (!trial[`question${questionN}Type`]) {
        // Likert Scale with number key as responses as default
        qType='LikertKey'
      } else {
        qType = trial[`question${questionN}Type`]
      }
      
      // default question type
      question.type = "html-keyboard-response";
      // convert question text from markdown into html:
      question.data = {...trialInfo, 
        text: this.md2html(trial[`question${questionN}`]),
        trialPart: `question${questionN}`
        };
      
      
      // question stimulus
      question.stimulus = `<br><em>${question.data.text}<em/><br>`;
    
      // add text if applicable
      if (trial[`question${questionN}Stimulus`]) {
          question.stimulus = '<b>' + eval(`trial.question${questionN}Stimulus`) +'<br></b>' + 
          question.stimulus;
      } 
      
      // add context if applicable
      if (trial[`question${questionN}Context`]) {
          question.stimulus = eval(`trial.question${questionN}Context`) + '<br>' +
          question.stimulus;
      } 
        
      // add image to stimulus if one is specified in spreadsheet
      if (trial[`question${questionN}Image`]) {
          var image = eval(`trial.question${questionN}Image`);
          if (image !='') {
          question.stimulus = `<img src="${study.path}/images/${image}" alt="headphones" width="90">` + question.stimulus;
          }
      } 
        
      
      if (qType=='ButtonOptionsFixed'||qType=='ButtonOptionsRandomBetween'||qType == 'ButtonOptions'){
            
        question.type = 'html-button-response';
        question.choices = eval(trial[`question${questionN}Options`]);
        question.button_html = '<button class="jspsych-btn"><b>%choice%</b></button>'
        question.data.options = question.choices;

        
        if (qType == 'ButtonOptionsRandomBetween') {
          question.choices = this.shuffle(question.choices,randomNumbers[questionN-1]);
        }  else if (qType=='ButtonOptions'){
          question.choices = jsPsych.randomization.shuffle(question.choices);
        }
        
        question.data.options = question.choices;
        
        question.on_finish = function(data) {
              data.chosenOption = data.options[data.button_pressed];
            }
     
        
       if (trial[`question${questionN}Repeat`]) {
        
          let repeatOption  = trial[`question${questionN}Repeat`];
          
          if (repeatOption == 'UntilCorrect'){
          
             let questionLoop = [];
          
             let correctAnswer = trial[`question${questionN}Correct`];
             let choices = question.choices;
             
               questionLoop = {
                  timeline: [question],
                  loop_function: function(data){
                      previousResponse = choices[data.values()[0].button_pressed];
                      
                     if(previousResponse != correctAnswer){                                        
                       return true;
                     } else {
                       return false;
                    }
                 }
              }
              question = questionLoop;
          }
        }
            

        
        
      } else if (qType=='ConditionalSlider'){
          // sentence to be rated depends on prior question
                                
          question.type = 'html-slider-response';

          if (!trial[`question${questionN}EndPoints`]){ 
             question.labels = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.labels = eval(trial[`question${questionN}EndPoints`]);
          }

          question.button_label = messages.continueButton;
          question.require_movement = true;
          
          question.stimulus  = function(){
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            
            
            let conditionalStimulus = `<b>${lastTrial.chosenOption} </b><br>  <em>${question.data.text}</em>`
            
            if (trial.stimulus) {
              conditionalStimulus = trial.stimulus + 
              `<br><br> ${conditionalStimulus}<br><br>`;
            }   
            return conditionalStimulus;
          }
      } else if (qType=='ConditionalSliderUnchosen'){
          // sentence to be rated depends on prior question
                                
          question.type = 'html-slider-response';

          if (!trial[`question${questionN}EndPoints`]){ 
             question.labels = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.labels = eval(trial[`question${questionN}EndPoints`]);
          }

          question.button_label = messages.continueButton;
          question.require_movement = true;
          
          question.stimulus  = function(){
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(2).values()[0];
            
            let originalOptions = eval(trial[`question1Options`]);
            
            let conditionalStimulus =  `<b>${originalOptions.filter(option => option != lastTrial.chosenOption)}</b> <br>  <em>${question.data.text}</em>`;
                        
            if (trial.stimulus) {
              conditionalStimulus = trial.stimulus + 
              `<br><br> ${conditionalStimulus}<br><br>`;
            }   
            return conditionalStimulus;
          }
       }  else if (qType=='ConditionalButtonOptions'||qType=='ConditionalButtonOptionsRandomBetween'){
          // question options dependent on prior question, fixed option order or random between participants
            
          question.data.conditionalOptions = eval(trial[`question${questionN}Options`]);
          
          question.type = 'html-button-response';
          question.button_html = '<button class="jspsych-btn"><b>%choice%</b></button>';
          question.stimulus  =  `<br><em>${question.data.text}<em/><br>`;
          
          question.choices  = function(){
            let  choices = [];
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            
            // determine and set choices
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                choices = question.data.conditionalOptions[choice*2+1];
                if (qType == 'ConditionalButtonOptionsRandomBetween') {
                   choices = prosodylab.shuffle(choices,randomNumbers[questionN-1]);
                }
                return choices
              }            
            }
           }
          
          question.data.options  = function(){
            // store selected options
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                let options = question.data.conditionalOptions[choice*2+1];
                if (qType == 'ConditionalButtonOptionsRandomBetween') {
                   options = prosodylab.shuffle(options,randomNumbers[questionN-1]);
                }
                return options
              }
            }
          }
      } else if (qType=='OptionsFixed'||qType=='OptionsRandomBetween'){
          // choice between n options, using number keys
          question.data.options = eval(trial[`question${questionN}Options`]);
          if (qType == 'OptionsRandomBetween') {
            question.data.options = this.shuffle(question.data.options,randomNumbers[questionN-1]);
          }
          question = this.questionKeyOptions(question);
          
      } else if (qType=='Options'){
          // same as fixed choices, but order randomized
          question.data.options = jsPsych.randomization.shuffle( eval(trial[`question${questionN}Options`]));
          question = this.questionKeyOptions(question);
          
      } else if (qType=='ConditionalOptionsFixed'||qType=='ConditionalOptionsRandomBetween'){
          // question options dependent on prior question, fixed option  order
            
          question.data.conditionalOptions = eval(trial[`question${questionN}Options`]);          
          
          question.choices  = function(){
            let  choices = [];
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                choices = question.data.conditionalOptions[choice*2+1];
                if (qType == 'ConditionalOptionsRandomBetween') {
                  choices = this.shuffle(choices,randomNumbers[questionN-1]);
                }
                choices = this.generateKeyChoices(choices.length);
                return choices
              }
            
            }
           }     
                
          question.stimulus  = function(){
            let  stimulus = [];
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                const options = question.data.conditionalOptions[choice*2+1];
                if (qType == 'ConditionalOptionsRandomBetween') {
                  options = this.shuffle(options,randomNumbers);
                }
                
                if (options.length<=2){
                   const separator = '&nbsp&nbsp;'
                } else{
                   const separator = '<br><br>'
                }
                
                for (let i=0; i<options.length; i++){
                  stimulus = `${stimulus}${i+1} = ${options[i]}${separator}`;
                }
                
                stimulus = `${question.data.text} <br/> ${stimulus}`;
                
                return stimulus
              }
            }
           }
           
          question.data.options  = function(){
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                const options = question.data.conditionalOptions[choice*2+1];
                if (qType == 'ConditionalOptionsRandomBetween') {
                  options = this.shuffle(options,randomNumbers[questionN-1]);
                }
                return options
              }
            }
          }
      } else if (qType=='ConditionalOptions'){
          // question options dependent on prior question, random option  order
          // xx 'question.data.chosen'  will not  be computed  for  this yet
            
          question.data.conditionalOptions = eval(trial[`question${questionN}ConditionalOptions`]);          
          
          question.choices  = function(){
            let  choices = [];
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2+1]) {
                choices = question.data.conditionalOptions[(choice+1)*2];
                choices = this.generateKeyChoices(choices.length);
                return choices
              }
            
            }
           }     
                
          question.stimulus  = function(){
            let  stimulus = [];
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(1).values()[0];
            // cycle through array of conditonal options
            for (let choice=0;choice<(question.data.conditionalOptions.length/2);choice++){
              
              if (lastTrial.chosenOption == question.data.conditionalOptions[choice*2]) {
                let options = question.data.conditionalOptions[choice*2+1];
                options = jsPsych.randomization.shuffle(options);
                
                if (options.length<=2){
                   const separator = '&nbsp&nbsp;'
                } else{
                   const separator = '<br><br>'
                }
                
                for (let i=0; i<options.length; i++){
                   stimulus = `${stimulus}${i+1} = ${options[i]}${separator}`;
                }
                
                stimulus = `${question.data.text} <br/> ${stimulus}`;
                
                return stimulus
              }
            }
           }
           
           
      } else if (qType=='Slider'){
      
          question.type = 'html-slider-response';
          
          if (!trial[`question${questionN}EndPoints`]){ 
             question.labels = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.labels = eval(trial[`question${questionN}EndPoints`]);
          }
          
          question.button_label = messages.continueButton;
          question.require_movement = true;
        
      } else if (qType=='Likert'){
          if (!trial[`question${questionN}LikertScale`]){
             question.data.options=this.generateKeyChoices(6)
          } else {
             question.data.options = eval(trial[`question${questionN}LikertScale`])
          }
          
          if (!trial[`question${questionN}EndPoints`]){ 
             question.data.endPoints = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.data.endPoints = eval(trial[`question${questionN}EndPoints`])
          }

          question.data.options[0] = `${question.data.options[0]} = ${question.data.endPoints[0]}`;
          question.data.options[question.data.options.length-1] = 
            `${question.data.options[question.data.options.length-1]} = ${question.data.endPoints[1]}`;
            
          question.type = 'survey-likert';
          question.button_label = messages.continueButton;
          question.questions  = [{ 
            prompt: question.stimulus, 
            labels: question.data.options,
            required: true
          }]
         
      } else if (qType=='textResponse'){
          var dimensions = [];
          
          if (!trial[`question${questionN}TextBoxDimensions`]){ 
             dimensions = {rows: 5, columns: 100};
          } else { // or else use dimensions specified in spreadsheet
             dimensions = trial[`question${questionN}TextBoxDimensions`];
          }
      
          question.type = 'survey-text';
          question.questions = [{
            prompt: question.data.text, 
            name: 'textQuestion', 
            rows: dimensions.rows, 
            columns: dimensions.columns
          }];
        } else {// LikertKey with number key response as default
         // use naturalness scale  as default endpoint labels
         if (!trial[`question${questionN}EndPoints`]){ 
             question.data.endPoints = messages.naturalnessOptions;
         } else { // or else use endpoint labels given in experiment spreadsheet
             question.data.endPoints = eval(trial[`question${questionN}EndPoints`]);
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
            <em>${messages.rateScale} <br><br> 
            ${question.choices[0]} = <b>${question.data.endPoints[0]}</b> and 
            ${question.choices[question.choices.length-1]} = <b>${question.data.endPoints[1]}</b></em>`;
       }



      
       if (question.type == 'html-keyboard-response' && !(qType == 'ConditionalOptions')) {
         question.on_finish = function(data) {
            const keyPressed = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
            data.chosenOption = data.options[parseInt(keyPressed)-1];
         }
        } else if (question.type == 'html-button-response') {
            question.on_finish = function(data) {
              data.chosenOption = data.options[data.button_pressed];
            }
        }

       session.push(question);
         
    }
    
    // planned production after question 1
    if (trial.recordAfter&&trial.recordAfter!='NA'&&questionN==1) {
       
      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.recordAfter;
      }
                
      var readStimulus =  {
        type: 'html-button-response',
        stimulus: function() {
        const html = `
          <div style="position:relative; height400px;">
          <b>${trial.recordAfter}</b><br>
           <em>${prosodylab.md2html(trial.recordAfterMessage)}</em><br>
           </div>`
          return html;
        },
        choices: [messages.startRecording],
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: {...trialInfo,
               trialPart:  'recordAfter',
               options: messages.startRecording
               }
      }

        //  <style> .centered {position: fixed; top: 50%; 
       //   left: 50%; transform: translate(-50%, -50%);}</style>

      session.push(readStimulus);
      
     soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`;
       
      session.push(prosodylab.startRecording(soundFileName,lab));
      
      session.push(prosodylab.recordScreen(
         `<div style="position:relative; height400px;">
          <b>${trial.recordAfter}</b><br><br>
          <em>${messages.speakNow}</em><br><br><br>
          </div>`,trialInfo,soundFileName,lab,study.recordingTimeOut,messages.doneRecording));
     
      session.push(prosodylab.stopRecording());
      
      
    }
    
    questionN++;
    
    } // end while for questions
      
    return session;

  },
  
  createSessions: function(stimuli,study,participantCode,messages,selectSession) {
  
    let allSessions = []; // trials will be stored in this variable;
    
    // load study log if there is one
    // otherwise an empty log will be written to data folder]
    let studyLog = prosodylab.loadLog(study.logFile);
  
    // save column names of study spreadsheet
    let variables = Object.keys(stimuli[0]);
  
    // --- start new audio recorder if experiment records ---
    
    // these columns imply recording:
    recordVariables = ['record','listenRepeatRecord','plannedProduction','incrementalProduction','recordAfter','dialogueContext'];
    
    // if any columns imply recording, get audio permission and start media player
    if (recordVariables.some(r=> variables.includes(r))) {
    
      var play = false;
      
      if (variables.includes('recordOption')) {
        if (stimuli[0].recordOption=='play'||stimuli[0].recordOption=='rerecord'){
          console.log('replay activated')
          play = true;
        }
      }
    
      const startMediaRecorder = {
        type: "call-function",
        func: function() {
            var blob;
            var chunks;
            var recorder = [];
            var soundFileName;
          prosodylab.audioRecorder(study.testRun,play);          
        },
        data: {
          component: 'experiment',
          trialPart: 'startMediaRecorder'
        }
      }
    allSessions.push(startMediaRecorder);
    }
    
    let session = []; // will store trials of of one particular session
    let experimentSessions = []; // will store ordered session names
    let experimentN = [];
    let sessionStimuli = [];
    let sessionExperiments = [];
    let maxLength = 0;
    let playList = [];
    let instructions = [];
    let instructionsFile = [];
    let trial = [];
    let trialInfo = [];
    let pList = [];
    let sessionTrial = [];
    let newStudyLogEntries = [];
    let conditions  = [];

    // Set session to 1 for all experiments if no session is specified
    if (!stimuli[0].session) {
      stimuli = stimuli.map(obj=> ({ ...obj, session: '1'}))
    }
    
    
    // Set session order scheme to 'Fixed' if no ordering scheme is specified
    // if spreadsheet as sessionOrder column with 'Random' it will be random
    if (!stimuli[0].sessionOrder) {
      stimuli =  stimuli.map(obj=> ({ ...obj, sessionOrder: 'Fixed' }))
    }
    
    if (selectSession != 'all') {
      // only keep selected session
      stimuli = stimuli.filter(obj => obj.session == selectSession);
      // avoid order error by setting session order to fixed
      stimuli =  stimuli.map(obj=> ({ ...obj, sessionOrder: 'Fixed' }));
    }

    // get session names from spreadsheet
    sessionNames = new Set([...stimuli.map(value => value.session)]);
    
    // Order sessions
  
    if (stimuli[0].sessionOrder=='Fixed') {
      experimentSessions = [...sessionNames];
    } else if (stimuli[0].sessionOrder=='Random') {
        // exclude 'Practice' from randomization and order it first
        if (sessionNames.has('Practice')) {
           experimentSessions.push('Practice');
           sessionNames.delete('Practice');
        }
        // exclude 'Final' from randomization and order it last
        if (sessionNames.has('Final')) {
           var finalSession = 'Final';
           sessionNames.delete('Final');
        }
      experimentSessions.push(...jsPsych.randomization.shuffle(Array.from(sessionNames)));
      
      if (finalSession){
        experimentSessions.push('Final');
      }

    } else {
        throw new Error(`sessionOrder value not known: ${stimuli[1].sessionOrder}`);
    }
 
    console.log(`There are ${experimentSessions.length} Sessions:`,experimentSessions);
  
    for (let iSession=0; iSession < experimentSessions.length;iSession++) {
    
      // reset variables for session
      session = [];
      experimentN = [];
      sessionStimuli = [];
      sessionExperiments = [];
      maxLength = 0;
      playList = [];
      pList = [];
      instructions = [];
      instructionsFile = [];
      sessionTrial = 0;
    
      // Subset of stimuli for the current session
      sessionStimuli = stimuli.filter(obj => obj.session == (experimentSessions[iSession]));
    
      // Names of all experiments in current session
      sessionExperiments = [...new Set(sessionStimuli.map(value => value.experiment))];
      experimentN = sessionExperiments.length;
      
      // Names of all objects:
      variables = Object.keys(sessionStimuli[0]);

      // load and display session instructions
      if (!variables.includes('instructions')){
        sessionStimuli = sessionStimuli.map(obj=> ({ ...obj, instructions: 'instructions.md'}))
      } 
      
      instructionsFile = [...new Set(sessionStimuli.map(value => value.instructions))]; 
      
      
      // display instructions unless there is  no instruction file specified
      // (which means empty cells in all rows of session in instruction colummn)
      if (instructionsFile[0]!=''){ 
        if (instructionsFile.length==1&instructionsFile[0]!='NA') {
          session.push(this.screenFromMD(`${study.path}/${instructionsFile}`,'Instructions','left'));
        } else if (instructionsFile.length>1) {
          instructions = `There has to be a unique instructions file per session. 
             Session: ${experimentSessions[iSession]} has instructions: ${instructionsFile.toString()}`
          console.error(instructionsFile);
        } // it's fine if there are no instructions
      }

      let experimentStimuli=[];
      //let conditions = [];
        
      // separate out stimuli for each experiment in the current session
      for (let j=0;j<experimentN;j++) {
    
         // subset of all stimuli of this experiment
         playList[j] = sessionStimuli.filter(obj => obj.experiment == sessionExperiments[j]);
       
         // select conditions and generate ordered playlist of stimuli for this experiment
         // condition selection/ordering will depend on pList for certain designs
         // pList will either be assigned based on log or randomly or is hardcoded 
         // (set in study.pListMethod)

         playList[j] = prosodylab.generatePlaylist(playList[j],studyLog,study.pListMethod);

       
         // keep track of how long longest experiment is
         maxLength = Math.max(maxLength,playList[j].length);
           
         newStudyLogEntries.push({
           experiment: sessionExperiments[j], 
           pList: [...new Set(playList[j].map(value => value.pList))][0]
         }); 
      }
    
      // add participant information to newStudyLogEntries
       newStudyLogEntries.map(v => ({...v, participant: participantCode}));
      // add completionStatus to newStudyLogEntries (currently not done)
      //newStudyLogEntries.map(v => ({...v, completionStatus: 'incomplete'}));
      // save to studyLog (currently just saving at end)
      //prosodylab.appendJsonCallFunction(newStudyLogEntries,study.logFile);
    
      // these numbers are used to randomize options in questions
      // when their order is supposed to vary randomly between subjects
      let randomNumbers = [[]];
      for (let rI = 0;rI<experimentN;rI++) {
         randomNumbers[rI]=[];
         for (let rJ = 0;rJ<5;rJ++) { // assuming there'll at most 5 questions
           randomNumbers[rI][rJ] = Math.random(); 
         }
      }   
    
      // add trials for experiment, interspersing them
      sessionTrial = 0;
      for (let j=0;j<maxLength;j++){
          for (let k=0;k<experimentN;k++){
            // if end of experiment has not been reached, add trial
                    
            if ((j+1)<=playList[k].length) {
              sessionTrial++;
              trial = playList[k][j];
            
              trialInfo = {
                component: 'Experiment',
                path: study.path,
                session: iSession+1,
                experiment: sessionExperiments[k],
                item: trial.item,
                condition: trial.condition,
                sessionTrial: sessionTrial,
                experimentTrial: j+1
              };
              // add playlist assignment for designs  where it matters
              if (trial.pList!=0) {
                trialInfo.pList = trial.pList;
              }
              
              if (trial.lab) {
                trialInfo.lab = trial.lab;
              }
            
              if (trial.text) {
                trialInfo.lab = trial.text;
              }
              
            
              trial.path = study.path;
                            
              session = prosodylab.addTrial(session,playList[k][j],trialInfo,participantCode,randomNumbers[k],messages);
            }
          }
          
      }
    
     // Output session information
     console.log(`Session ${iSession+1}: "${experimentSessions[iSession]}" has ${sessionExperiments.length} experiments:`,
 sessionExperiments,'instructionsFile:',
 instructionsFile,'nTrials:',sessionTrial);
    
    allSessions.push(...session);
      
  }
  
  return { 
     timeline: allSessions,
     newStudyLogEntries: newStudyLogEntries
  };
  
  }


} // end of  object prosodylab
