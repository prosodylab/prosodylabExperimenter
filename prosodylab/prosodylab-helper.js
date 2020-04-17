/* prosodylab-jspsych-helper Michael Wagner chael@mcgill.ca */

prosodylab = {

  // render screen with button to press
  screen: function(name, text, buttonText, align, participantCode) {
    if (!align) {
      var align = 'left';
    }
    if (!buttonText) { // default button text
      buttonText = 'Click here to continue!'
    }
    text = `<div style="text-align: ${align}"> ${text} 
       </div><br>`;
    if (participantCode) { // completion code for final screen
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
        buttonResponseText: buttonText
      }
    };
    return screenObject;
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
        let studyLog = prosodylab.loadLog(experiment.studyLogFile);
        console.log ('studyLog',studyLog,'data',data);
        if (Object.keys(studyLog).length) {// if studyLog not empty, append
          data = [...studyLog, ...data];
        }
        console.log('fulllog',data);
        data=JSON.stringify(data);
        
        saveData = {
          type: 'call-function',
          async: true,
          func: async function(done) {
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
        console.error(`Created new participant log since there was none!`);
        prosodylab.saveJson(JSON.stringify({}),fileName);
      },
      success: function(txt) {
        file = txt
      }
    });
    return file;
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
  loadCSV: function(fileName) {
    let txt = this.loadTxt(fileName);
    txt = Papa.parse(txt, {
      header: true,
      delimiter: '\t'
    });;
    return txt.data;
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


  // uses XMLHhttprequest() inistead of fetch(), it might  work on more browsers
  saveDataOld: function(fileName,format){
    // save  as json by default
    if (!format){ format = 'json';}
    // add extension
    fileName = `${fileName}.${format}`
    // create saveData object
    let saveData = [];
    if (format == 'json') {
        saveData = {
          type: 'call-function',
          async: true,
          func: function(done){
            const data = jsPsych.data.get().json();
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  const response_data = xhr.responseText;
                  done(response_data);
              }
            }
            xhr.open('POST', 'prosodylab/write_data.php');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({filename: fileName, filedata: data}));
          }
        }
      } else {
        saveData = {
          type: 'call-function',
          async: true,
          func: function(done){
          const data = jsPsych.data.get().csv();
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response_data = xhr.responseText;
                done(response_data);
            }
          }
          xhr.open('POST', 'prosodylab/write_data.php');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({filename: fileName, filedata: data}));
         }
        }
      }
    return saveData;
  },
  
  saveStudyLog: function(studyLog,fileName){
      return 'ok';
  },
  
  consent: function(consentText) {
    let buttonText = consentText.substring(consentText.lastIndexOf('<p>')+3,consentText.lastIndexOf("</p>"))
    consentText = consentText.substring(0,consentText.lastIndexOf('<p>'))
    consentText =  `<div style="text-align: justify">${consentText}<br><br>`
    buttonText = `<button class="jspsych-btn" 
     style="white-space:normal; text-align: justify; font-size: 18px;width:95%;"> 
     <b>${buttonText}</b></button><br><br><br><br><br>`
    
    const screenObject = {
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
        buttonResponseText: buttonText
      }
    };
    return screenObject;
  
  },
  
  
  // Debriefing questions
  debriefing: function() {
    let debriefing = [];
    debriefing.html = prosodylab.loadTxt('prosodylab/debriefing.html');
    debriefing.type = 'survey-html-form';
    debriefing.data = {
        component: 'Debriefing'
    };
    
    return debriefing;
  },


  languageQuestionnaire: function() {

    const lq = prosodylab.loadTxt('prosodylab/languageQuestionnaire.html');
    const languageQuestionnaire = {
      type: 'survey-html-form',
      html: lq,
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
                 
                 const scaleYears = [ 'None',
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
                                    
                 const scaleHowMuch = ['Nothing',
                                     'A little',
                                     'A fair amount',
                                     'A moderate amount',
                                     'A great deal'
                                     ]; 
                                     
                 const scaleHowOften = ['Never',
                                     'Rarely',
                                     'Sometimes',
                                     'Often',
                                     'All the time'
                                     ]; 
                                     
                 const moduleMusicianship = {
                         type: 'survey-likert',
                         questions: [
                           {prompt: "How many years of formal music training (theory) have you had?", name: 'M1Q1-YearsTrainingTheory', labels: scaleYears, required: 1},
                           {prompt: "How much do you know about music structure and theory?", name: 'M1Q2-KnowledgeTheory', labels: scaleHowMuch, required: 1},
                           {prompt: "How many years of formal music training (practice) have you had?", name: 'M1Q3-YearsTrainingPractice', labels: scaleYears, required: 1},
                           {prompt: "How often do you engage in professional music making (e.g., singing, playing an instrument, composing)?", name: 'M1Q4-HowOftenProfessionalMusicMaking', labels: scaleHowOften, required: 1},
                           {prompt: "How often did or do you practice or rehearse with an instrument or singing?", name: 'M1Q5-HowOftenMusicPractice', labels: scaleHowOften, required: 1},
                           {prompt: "How often do you engage in music making as a hobby or as an amateur?", name: 'M1Q6-HowOftenAmateurMusicMaking', labels: scaleHowOften, required: 1}
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
        choices: buttonText
      },
    }
    soundCheck.push(soundCheckObject);

    const choiceOne = 'Play sound again';
    const choiceTwo = 'I can hear the sound at a comfortable volume';
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
        choices: [choiceOne, choiceTwo]
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
    soundCheck.push(loop_node);

    return soundCheck;
  },


  headPhoneScreener: function() {
    const path = 'prosodylab/headphonescreener'
    const sounds = [`stereoInPhaseQuiet.mp3`,`stereoInPhase.mp3`,`stereoOutOfPhase.mp3`];
    let headPhoneScreenerTrial= [];
    let headPhoneScreenerSounds = ['sound1.mp3','adf'];
    let playSound = [];
    let question = [];
    
    const buttonText = ['Play the first set of three sounds!'];
    const instructionsHeadPhoneScreener = {
      type: 'html-button-response',
      stimulus: `<b> Sound Check</b> +
        <br> <em>The following is a headphone test--you will not be able to do this without headphones!</em>
        <p><br><br> You will hear three sounds in a row, and you will be asked which one was the quietest of them.
        <br><br> This task will be repeated 6 times(this should take only 3 minutes).
        <br><br></p>`,
      choices: buttonText,
      on_trial_start: function() {
        setTimeout(function() {
          setDisplay("jspsych-btn", "")
        }, 1000)
      },
      data: {
        component: 'Headphone screener',
        choices: buttonText
      },
    }
    headPhoneScreenerTrial.push(instructionsHeadPhoneScreener);
    
    let randomOrder = [0,1,2];
    let correct  = 0;
    
    const choices = ['The FIRST was softest', 
        'The SECOND was softest', 'The THIRD was softest'];
    
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
            trialPart: `Listen to head phone screener sound ${j}`,
            sound: `${sounds[randomOrder[j]]}`,
            correctButton: correctButton
          }
        }
        headPhoneScreenerTrial.push(playSound);
        
      }
      
      question = {
        type: 'html-button-response',
        stimulus: 'Which sound was quietest?',
        choices: choices,
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        data:  {
          options: choices,
          component: 'Headphone screener question',
        },   
        on_finish: function(data){
          if(data.button_pressed==correctButton){
              data.correct = 1;
          } else {
              data.correct = 0;
          }
        }   
      }      
      headPhoneScreenerTrial.push(question);
      
    }
    console.log(headPhoneScreenerTrial);
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

  generatePlaylist: function(stimuli,studyLog) {
  
    const conditions = Math.max(...stimuli.map(value => value.condition));
    const items = Math.max(...stimuli.map(value => value.item));
    const design = [...new Set(stimuli.map(value => value.design))];
    const experiment = [...new Set(stimuli.map(value => value.experiment))];
    
    /* determine pList were applicable
    For some designs, a participant only sees a subset of the stimuli
    For  example, they might only see condition 1, if they get pList in design 'Between'
    for others, the order will depend on pList, for example condition 1 comes  as 
    the first block for  pList 1 with design 'Blocked' */
    
    // assign playList # for this experiment
    let pList = 0;
    
    // playlist assignment not necessary for Fixed and Random designs:
    if (!(design=='Fixed'||design=='Random')) {
    
      // Assign a pList number between 1 and the number of conditions
      
      if (studyLog){ // use studyLog to determine pList
      
             let logExperiment = studyLog.filter(obj => obj.experiment == experiment);
             let priorAssignments = logExperiment.map(function (el) { return el.pList; });
             console.log('Experiment: ',experiment,'priorAssignments',priorAssignments);
             // count how often each pList has been assigned
             let counts = Array(conditions).fill(0);
             for (let i = 0; i < priorAssignments.length; i++) {
               counts[priorAssignments[i]-1]++;
             }
             minCount = Math.min(...counts);
             
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
             console.log('pList counts: ',counts,'pList assigned: ',pList); 
        } else  { //random pList
            pList = Math.floor((Math.random() * conditions) + 1);
        }
    }
    
    // add playList info to all trials by passing it to stimuli object
    stimuli = stimuli.map(v => ({...v, pList: pList}));
    
    let playList = [];
    let conditionSelection = [];

    if (design == 'Between') {

      // same condition from each item
      for (let i = 1; i <= items; i++) {
        playList[i] = stimuli.find(obj => {
          return obj.item == i && obj.condition == pList
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

    return playList;
  }, //  end of this.generatePlaylist

  fixation: function(trialInfo,duration) {
    const result = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: duration, //duration in msec
      data: {...trialInfo, trialPart:'Fixation' } 
    };
    return result;
  },


  generateKeyChoices: function(nChoices){
    let result = [];
    for (let i=1;i<=nChoices;i++){
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
    for (let i=0; i<question.data.options.length; i++){
      question.stimulus = `${question.stimulus}${question.choices[i]} = ${question.data.options[i]}${seperator}`;
    } 
    question.stimulus = `${question.data.text} <br/> ${question.stimulus}`;
    
    return question
  },
  
 
  addTrial: function(session, trial,trialInfo) {

    if (trial.contextFile) {
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
     
      const playSound =  {
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
        data: trialInfo,
        trialPart: 'Listen to sound'
      }
      //session.push(playSound);
    }

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
      question.data = {text: this.md2html(trial[`question${questionN}`])};
      question.data.trialPart =  `question${questionN}`;
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
                const options = question.data.conditionalOptions[choice*2+1];
                
                if (options.length<=2){
                   const seperator = '&nbsp&nbsp;'
                } else{
                   const seperator = '<br><br>'
                }
                
                for (let i=0; i<options.length; i++){
                  stimulus = `${stimulus}${i+1} = ${options[i]}${seperator}`;
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
                   const seperator = '&nbsp&nbsp;'
                } else{
                   const seperator = '<br><br>'
                }
                
                for (let i=0; i<options.length; i++){
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
    
    questionN++;
    
    }

    return session;

  }


} // end of  object prosodylab
