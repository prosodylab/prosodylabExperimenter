// implements headphone screener task from McDermott et al. 
// with option of shorter sounds (shorter sounds are published on prosodylab github)
// optionally can be repeated if participant fails
// optionally leads to end of experiment if participant fails

// todo: select soundfiles according to options
// implement mixed? 
// end on fail option: if return link exist, return to prolific but without payment


function headPhoneScreener(options) {

    const path = 'prosodylab/headphonescreener'

    var sounds = [];
    let headPhoneScreenerTrial= [];
    let headPhoneLoop = [];
    let playSound = [];
    let question = [];
    let currentHeadPhoneLoop = 1;

    if (options.stimuli == 'short'){
         sounds = [`stereoInPhaseQuietShort.mp3`,`stereoInPhaseShort.mp3`,`stereoOutOfPhaseShort.mp3`];
    } else if (options.stimuli =='original'){
        sounds = ['antiphase_HC_IOS.wav',
        'antiphase_HC_ISO.wav',
        'antiphase_HC_OIS.wav',
        'antiphase_HC_OSI.wav',
        'antiphase_HC_SIO.wav',
        'antiphase_HC_SOI.wav'
        ];
    };
    
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
    
    // add 6 randomized perception trials for head phone screener to loop

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
        //headPhoneLoop.push(playSound);
        
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
      headPhoneLoop.push(question);
      
    };

    var computeScore = {
        type: "call-function",
        func: function() {
            // get results from headphone screener questions
            
            let hpResponses = jsPsych.data.get().filter({stimulus: "Which sound was quietest?"}).last(6).values();

            //let hpResponses = jsPsych.data.get().last(21).values();
            // only take trials with responses (relevant trial information: [0,4,8,12,16,20])
            //hpResponses = [0,4,8,12,16,20].map(x=>hpResponses[x]);

            // calculate proportion of correct responses:
            let hpScore = hpResponses.map(({ correct }) => correct);
            // average function
            const average = array => array.reduce((a, b) => a + b) / array.length;
            hpScore = average(hpScore);

            return hpScore;
        },
        data: {
            currentHeadPhoneLoop: function() { 
            return currentHeadPhoneLoop; 
          }
        }
    };
    //secondScreen.data = {...secondScreen.Data,imageOrder: trial.imageOrder};

    headPhoneLoop.push(computeScore);

    var headPhoneScreenerAgain = {
        type: 'html-button-response',
        stimulus: messages.headPhoneScreenerAgain,
        choices: messages.headPhoneScreenerAgainOptions,
        button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
        on_trial_start: function() {
          setTimeout(function() {
            setDisplay("jspsych-btn", "")
          }, 1000)
        },
        data: {
          component: 'Headphone screener',
          trialPart:  'Headphone screener ask whether to do it again',
          choices: messages.headPhoneScreenerAgainOptions
        },
    };

    var if_node = {
        timeline: [headPhoneScreenerAgain],
        conditional_function: function(){
            // get the hpScore and check whether participant passed
            var data = jsPsych.data.get().last(1).values()[0];

            if(data.value < options.threshold && data.currentHeadPhoneLoop < options.numberChances){
                currentHeadPhoneLoop = currentHeadPhoneLoop + 1;
                return true;
            } else {
                return false;
            }
        }
    }

    headPhoneLoop.push(if_node);

    const loop_node = {
      timeline: [...headPhoneLoop],
      loop_function: function(data) {
        if ('0' == jsPsych.data.getLastTrialData().values()[0].button_pressed) {
          return true;
        } else {
          return false;
        }
      }
    };
    
    headPhoneScreenerTrial.push(loop_node);

    var resultHPLoop = {
        type: "call-function",
        func: function() {
            // get hpScore
            var hpScore = jsPsych.data.get().last(1).values()[0].value;
    
            let belowThreshold = hpScore < options.threshold;
            let abortExperiment = belowThreshold && options.excludeOnFail;

            return {
                hpScore: hpScore, 
                belowThreshold: belowThreshold, 
                abortExperiment: abortExperiment
            };
        },
        data: {
            component: 'headPhoneScreener' 
        },
        on_finish: function(data){
            console.log('study.completionFailLink.length>0&&participantCode',study.completionFailLink.length>0);

            if(data.value.abortExperiment){
              if (study.completionFailLink.length>0&&participantCode) {
                 var flagText = `<div style="font-size:50px;color:red">
                    <em><br><br><br> ${study.failMessage}</em></div>`;
                 prosodylab.showText({component:'failMessage' },5000,flagText);
                 location.href=study.completionFailLink
              } else {
                jsPsych.endExperiment(study.failMessage)
              };
            }
          }
        };

    // headPhoneScreenerTrial = [...headPhoneScreenerTrial, ...headPhoneLoop];

    headPhoneScreenerTrial.push(resultHPLoop)

    return headPhoneScreenerTrial;
  }
