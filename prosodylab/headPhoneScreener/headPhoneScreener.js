// implements headphone screener task from McDermott et al. 
// with option of shorter sounds (shorter sounds are published on prosodylab github)
// optionally can be repeated if participant fails
// optionally leads to end of experiment if participant fails

function headphoneScreener(options) {

  // timelines
  let headPhoneScreenerTrial = [];
  let headPhoneLoop = [];
  let playSound = [];
  let question = [];
  let currentHeadPhoneLoop = 1;

  let failMessage = [];
  if (options.failMessage!=""){
    failMessage = options.failMessage;
  } else {
    failMessage = messages.headPhoneFailMessage;
  }

  // set up correct choices and randomization of order
  let correctButton = [];
  // S=Soft is the correct choice, e.g. for file IOS it's 3
  const correctChoice = [3, 2, 3, 2, 1, 1];
  let randomOrder = [0, 1, 2, 3, 4, 5];
  randomOrder = jsPsych.randomization.shuffle(randomOrder);

  // set up stimuli to be used
  let path = `prosodylab/headphoneScreener/sequences/original`
  let sounds = [];
  sounds =
    ['antiphase_HC_IOS.wav',
      'antiphase_HC_ISO.wav',
      'antiphase_HC_OIS.wav',
      'antiphase_HC_OSI.wav',
      'antiphase_HC_SIO.wav',
      'antiphase_HC_SOI.wav'
    ];

  // choose different set if desired
  if (options.stimuli == 'short') {
    path = `prosodylab/headphoneScreener/sequences/short`
    sounds = [
      `inPhaseShort_outOfPhaseShort_inPhaseSoftShort.wav`,
      `inPhaseShort_inPhaseSoftShort_outOfPhaseShort.wav`,
      `outOfPhaseShort_inPhaseShort_inPhaseSoftShort.wav`,
      `outOfPhaseShort_inPhaseSoftShort_inPhaseShort.wav`,
      `inPhaseSoftShort_inPhaseShort_outOfPhaseShort.wav`,
      `inPhaseSoftShort_outOfPhaseShort_inPhaseShort.wav`,
    ];
  } else if (options.stimuli == 'regularLengthGenerated') {
    path = `prosodylab/headphoneScreener/sequences/regular`
    sounds = [
      `inPhase_outOfPhase_inPhaseSoft.wav`,
      `inPhase_inPhaseSoft_outOfPhase.wav`,
      `outOfPhase_inPhase_inPhaseSoft.wav`,
      `outOfPhase_inPhaseSoft_inPhase.wav`,
      `inPhaseSoft_inPhase_outOfPhase.wav`,
      `inPhaseSoft_outOfPhase_inPhase.wav`,
    ];
  } else if (options.stimuli == 'original') {
    // using default original stimuli;
  } else { console.log('No value headphone screener stimuli selected--using original ones!', 'options.stimuli: ', options.stimuli) };

  const instructionsHeadPhoneScreener = {
    type: 'html-button-response',
    stimulus: messages.instructionsHeadphoneCheck,
    choices: [messages.startHeadphoneTest],
    on_trial_start: function () {
      setTimeout(function () {
        setDisplay("jspsych-btn", "")
      }, 1000)
    },
    data: {
      component: 'Headphone screener',
      trialPart: 'Headphone screener instructions',
      choices: messages.startHeadphoneTest
    },
  }
  headPhoneScreenerTrial.push(instructionsHeadPhoneScreener);

  // add 6 randomized perception trials for head phone screener to loop

  let correct = 0;

  for (let i = 0; i < 6; i++) {

    // save correct choice, correcting for fact that count button count starts with 0
    correctButton = correctChoice[randomOrder[i]]-1;

    playSound = {
      type: 'audio-keyboard-response',
      prompt: function () {
        const html = `<style> .centered {position: fixed; top: 50%; 
            left: 50%; transform: translate(-50%, -50%);}</style>
            <img src="prosodylab/headphones_frieda.jpg" alt="headphones" width="90">`
        return html;
      },
      stimulus: `${path}/${sounds[randomOrder[i]]}`,
      choices: jsPsych.NO_KEYS,
      trial_ends_after_audio: true,
      post_trial_gap: 500,
      data: {
        component: 'Headphone screener',
        trialPart: `Listen to head phone screener sound ${i}`,
        sound: `${sounds[randomOrder[i]]}`,
        setUsed: 'original',
        correctButton: correctButton
      }
    }
    headPhoneLoop.push(playSound);

    question = {
      type: 'html-button-response',
      stimulus: messages.questionHeadphoneTest,
      choices: messages.optionsHeadphoneTest,
      button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
      data: {
        options: messages.optionsHeadphoneTest,
        component: 'Headphone screener',
        trialPart: 'Head phone screener question',
        setUsed: 'original',
        correctButton: correctButton
      },
      on_finish: function (data) {

        if (data.button_pressed == data.correctButton) {
          data.correct = 1;
        } else {
          data.correct = 0;
        }
        console.log(sounds[randomOrder[i]],' resp: ',data.button_pressed,'data.correctButton: ',data.correctButton,' correct:', data.correct);
      }
    }
    headPhoneLoop.push(question);
  };

  var computeScore = {
    type: "call-function",
    func: function () {
      // get results from headphone screener questions

      let hpResponses = jsPsych.data.get().filter({ stimulus: "Which sound was quietest?" }).last(6).values();

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
      component: 'Headphone screener',
      trialPart: 'Compute Score',
      currentHeadPhoneLoop: function () {
        return currentHeadPhoneLoop;  
      }
    }
  };
  headPhoneLoop.push(computeScore);

  var headPhoneScreenerAgain = {
    type: 'html-button-response',
    stimulus: messages.headPhoneScreenerAgain,
    choices: messages.headPhoneScreenerAgainOptions,
    button_html: '<button class="jspsych-btn"><b>%choice%</b></button>',
    on_trial_start: function () {
      setTimeout(function () {
        setDisplay("jspsych-btn", "")
      }, 1000)
    },
    data: {
      component: 'Headphone screener',
      trialPart: 'Ask whether to do it again',
      choices: messages.headPhoneScreenerAgainOptions
    },
  };

  var if_node = {
    timeline: [headPhoneScreenerAgain],
    conditional_function: function () {
      // get the hpScore and check whether participant passed
      var data = jsPsych.data.get().last(1).values()[0];

      if (data.value < options.threshold && data.currentHeadPhoneLoop < options.numberChances) {
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
    loop_function: function (data) {
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
    func: function () {
      // get hpScore
      let hpScore = jsPsych.data.get().filter({trialPart: 'Compute Score'}).last(1).values()[0].value;
      let belowThreshold = hpScore < options.threshold;
      let abortExperiment = belowThreshold && options.excludeOnFail;

      return {
        hpScore: hpScore,
        belowThreshold: belowThreshold,
        abortExperiment: abortExperiment
      };
    },
    data: {
      component: 'headPhoneScreener',
      trialPart: 'computeResult'
    }
  };

  headPhoneScreenerTrial.push(resultHPLoop)

  var abortExperiment = {
    type: 'html-keyboard-response',
    stimulus: `<div style="font-size:20px;color:red">
    <em><br><br><br> ${failMessage}</em></div>`,
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000, // text will be displayed 2 seconds
    data: {component: 'headPhoneScreener', trialPart: 'abortExperiment' },
    post_trial_gap: 2000, // to prevent next screen to be shown before redirect
    on_finish: function () {
      if (options.completionFailLink.length > 0) {
        location.href = options.completionFailLink;
      } else { // if no redirect link, just show message
        jsPsych.endExperiment(['<br><br><em> No redirection link set!</em>'])
      };
    }
  };

  var if_node = {
    timeline: [abortExperiment],
    conditional_function: function () {
      // check whether participant passed
      if (jsPsych.data.get().last(1).values()[0].value.abortExperiment == true) {
        return true;
      } else {
        return false;
      }
    }
  }

  headPhoneScreenerTrial.push(if_node)

  return headPhoneScreenerTrial;
}
