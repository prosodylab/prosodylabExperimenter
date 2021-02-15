/* prosodylab-experimenter helper scripts Michael Wagner chael@mcgill.ca */

prosodylab = {

  getMessages: function(language){
  
    const messages = {
    
    // English
    en: {
      fullScreen: `<p><br><br> <em>Please click the button below
        to enter full screen mode and start with the experiment</em></p>`,
      continueButton:  'Continue',
      connectHeadphones: 'Please connect your headphones and adjust the volume please!',
      playSound: 'Play a sound',
      playAgain: 'Play sound again',
      adjustVolume: 'Adjust volume if necessary',
      soundCheckOk: 'I can hear the sound at a comfortable volume',
      recordSound: 'Start audio recording now',
      startRecording: 'Click here to start recording',
      recordDialogue:'Click here to record dialogue!',
      saySentence: 'When you\'re ready, click and say the following sentence:',
      doneRecording: 'Click here when you\'re done recording',     
      speakNow: 'Please speak now!',
      recordAgain: 'Redo recording',
      recordCheckOk: 'The recording sounds good',
      adjustMic: 'Adjust mic settings if necessary',
      adjustMicAfter: 'Did you hear your voice? Adjust mic settings and retry if necessary',
      productionTestSentence: `The cat followed the squirrel stealthily to its nest.`, 

      recordCheckNotOk: 'I cannot get it to work',
      instructionsHeadphoneCheck: `<br> <em>The following is a headphone test--you will not 
        be able to do this without headphones!</em>  <p><br><br> You will hear three 
        sounds in a row, and you will be asked which one was the quietest of them.
        <br><br> This task will be repeated 6 times(this should take only 2 minutes).
        <br><br></p>`,
      startHeadphoneTest: 'Play the first set of three sounds!',
      questionHeadphoneTest: 'Which sound was quietest?',
      optionsHeadphoneTest: [
        'The first sound was the softest.',
        'The second sound was the softest.',
        'The third sound was the softest.'
      ],
      naturalnessQuestion: 'How natural did you find this sentence?',
      naturalnessQuestionContext: 'How natural did you find the response given the context?',
      naturalnessOptions: ['completely unnatural','completely natural'],
      //
      // Music questionnaire 
      mqTrainingTheory: 'How many years of formal music training (theory) have you had?',
      mqKnowTheory: 'How much do you know about music structure and theory?',
      mqTrainingPractice: 'How many years of formal music training (practice) have you had?',
      mqMakeProfessional: `How often do you engage in professional music making 
        (e.g., singing, playing an instrument, composing)?`,
      mqMakePractice: 'How often did or do you practice or rehearse with an instrument or singing?',
      mqMakeHobby: 'How often do you engage in music making as a hobby or as an amateur?',
      //
      scaleYears:  [
        'None',
        '1 year',
        '2 years',
        '3 years',
        '4 years',
        '5 years',
        '6 years', 
        '7 years',
        '8 years',
        'more than 8 years'
      ],
      scaleHowMuch: [
         'Nothing',
         'A little',
         'A fair amount',
         'A moderate amount',
         'A great deal'
      ], 
      scaleHowOften: [
        'Never',
        'Rarely',
        'Sometimes',
        'Often',
        'All the time'
      ] 
    },
    
    // French
    fr: {
      fullScreen: `<p> <br> <br> <em> Veuillez cliquer sur le bouton ci-dessous
        pour passer en mode plein écran et débuter l'expérience </em> </p> `,
      continueButton: 'Cliquer içi pour continuer',
      connectHeadphones: 'Veuillez connecter vos écouteurs et régler le volume s\'il vous plaît!',
      playSound: 'Écouter le son',
      playAgain: 'Rejouer le son',
      speakNow: 'Veuillez parler maintenant!',
      soundCheckOk: 'Je peux entendre le son à un volume confortable',
      adjustVolume: 'Ajustez le volume si nécessaire',
      recordSound: 'Démarrer l\'enregistrement audio maintenant',
      startRecording: 'Cliquez ici pour commencer l\'enregistrement?',
      doneRecording: 'Cliquez ici lorsque vous avez terminé l\'enregistrement',
      speakNow: 'Parlez maintenant!',
      recordAgain: 'Refaire l\'enregistrement',
      recordCheckOk: 'L\'enregistrement sonne bien',
      adjustMic: 'Ajustez les paramètres du micro si nécessaire',
      adjustMicAfter: 'Avez-vous entendu votre voix? Ajustez les paramètres du micro et réessayez si nécessaire ',
      saySentence: 'Lorsque vous êtes prêt pour l\'enregistrement, cliquez et dites la phrase suivante:',
      productionTestSentence: 'Le chat a suivi l\'écureuil furtivement jusqu\'à son nid.',
      recordCheckNotOk: 'Je ne peux pas le faire fonctionner',
      instructionsHeadphoneCheck: `<br> <em> Ce qui suit est un test test sonore. Des
        écouteurs sont nécessaires pour effectuer le test. </ em>
        <p> <br> <br> Écoutez les trois notes, puis choisissez celle qui était la plus silencieuse.
        <br> <br> Cette tâche sera répétée 6 fois. (La durée du test est d'environ 2 minutes.)
        <br> <br> </ p> `,
      startHeadphoneTest: 'Jouez le premier ensemble de trois sons!',
      questionHeadphoneTest: 'Quel son était le plus silencieux?',
      optionsHeadphoneTest: [
        "Le premier son était le plus doux.",
        "Le deuxième son était le plus doux.",
        "Le troisième son était le plus doux."
      ],
      naturalnessQuestion: 'Cette phrase semblait-elle naturelle?',
      naturalnessQuestionContext: 'Comment jugez-vous la réponse en fonction du contexte?',
      naturalnessOptions: ['complètement pas naturel', 'complètement naturel'],
     
      // Questionnaire musical
      mqTrainingTheory: 'Combien d\'années de formation musicale formelle (théorie) avez-vous eues?',
      mqKnowTheory: 'Que connaissez-vous de la structure et de la théorie musicale?',
      mqTrainingPractice: 'Combien d\'années de formation (pratique) musicale formelle avez-vous eues?',
      mqMakeProfessional: `À quelle fréquence vous engagez-vous dans la création musicale professionnelle
        (par exemple, chanter, jouer d'un instrument, composer)?`,
      mqMakePractice: 'À quelle fréquence est-ce que vous pratiquez avec un instrument ou chantez?',
      mqMakeHobby: 'À quelle fréquence vous engagez-vous dans la création musicale comme passe-temps ou comme amateur?',
      //
      scaleYears: [
        'Aucun',
        '1 année',
        '2 années',
        '3 années',
        '4 années',
        '5 années',
        '6 années',
        '7 années',
        '8 années',
        'plus de 8 ans'
      ],
      scaleHowMuch: [
         'Rien',
         'Un peu',
         'Une quantité modérée',
         'Assez beaucoup',
         'Énormément'
      ],
      scaleHowOften: [
        'Jamais',
        'Rarement',
        'Parfois',
        'Souvent',
        'Tout le temps'
      ]
    },
    
    // Japanese
    ja: {
      fullScreen: `<p> <br> <br> <em>フルスクリーン表示を可能し、実験を開始するために、以下のボタンを押してください。
      </ em> </ p> `,
      continueButton:  '次へ', //'次へ進むために、ここをクリックしてください。',
      connectHeadphones: 'ヘッドホンを接続して、音量を調節してください。',
      playSound: '音を再生する。',
      playAgain: 'もう一度音をきく。',
      soundCheckOk: 'ちょうどいい音量で音がきこえます。',
      adjustVolume: '必要であれば音量を調節してください。',
      instructionsHeadphoneCheck: `<br> <em>これから、サウンドテストを行います。テストを行うためには、ヘッドホンが必要です。</em>
        <p><br><br> 3つの音を続けてきき、その後、どの音が一番小さかったか答えてもらいます。
        <br><br> このテストは６回行われます。（テストの所要時間は、およそ３分です。）
        <br><br></p>`,
      startHeadphoneTest: '１セット目の3つの音をきく。',
      questionHeadphoneTest: 'どの音が一番小さかったですか。',
      optionsHeadphoneTest: [
        '1つ目の音が一番小さかったです。', 
        '２つ目の音が一番小さかったです。', 
        '３つ目の音が一番小さかったです。'
      ],
      naturalnessQuestion: 'この文はどのくらい自然ですか。',
      naturalnessQuestionContext: '与えられた文脈を踏まえると、この返答はどのくらい自然ですか。',
      naturalnessOptions: ['完全に不自然','完全に自然'],
      
      //
      // Music questionnaire 
      mqTrainingTheory: 'あなたは何年間音楽の理論を正式に勉強しましたか。',
      mqKnowTheory: 'あなたはどのくらい音楽の構造と理論を理解していますか。',
      mqTrainingPractice: 'あなたは何年間音楽の演奏技術を正式に訓練していますか。',
      mqMakeProfessional: `あなたが仕事として音楽を作成する頻度を教えてください。(例:作曲、演奏、声楽)`,
      mqMakePractice: 'あなたが楽器の演奏や声楽を練習する、もしくは練習した頻度を教えてください。',
      mqMakeHobby: 'あたながプロとしてではなく、趣味で音楽を作成する頻度を教えてください。',
      //
      scaleYears: [ '全くない',
                                    '１年',
                                    '２年',
                                    '３年',
                                    '４年',
                                    '５年',
                                    '６年', 
                                    '７年',
                                    '８年',
                                    '9年以上'
                                    ],
      scaleHowMuch: ['全く理解してない',
                                     '少し理解している',
                                     'ある程度理解している',
                                     'だいたい理解している',
                                     'とてもよく理解している'
                                     ], 
      scaleHowOften:['全くしません',
                                     'ごくたまにします',
                                     '時々します',
                                     'よくします',
                                     'いつもします'
                                     ]
    },
    
    // Spanish (careful, mostly just google translate!)
    es: {
      fullScreen: `<p> <br> <br> <em> Haga clic en el botón abajo
        para ingresar al modo de pantalla completa y empezar con el experimento </em> </p> `,
      continueButton: 'Continuar',
      connectHeadphones: '¡Conecte sus audífonos y ajuste el volumen, por favor!',
      playSound: 'Reproducir sonido',
      playAgain: 'Reproducir sonido de nuevo',
      soundCheckOk: 'Puedo escuchar el sonido a un volumen cómodo',
      adjustVolume: 'Ajuste el volumen si es necesario',
      instructionsHeadphoneCheck: `<br> <em> Vamos hacer una prueba de sonido. Se requiere 
        audífonos para realizar la prueba. </ em>
        <p> <br> <br> Siga los tres sonidos y luego decida cuál fue el más suave.
        <br> <br> Esta prueba se ejecutará 6 veces. (El tiempo total es de aproximadamente 2 minutos).
        <br> <br> </ p>`,
      startHeadphoneTest: '¡Reproducir el primer conjunto de tres sonidos!',
      questionHeadphoneTest: '¿Qué sonido fue el más suave?',
      optionsHeadphoneTest: [
        'El primer sonido fue el más suave',
        'El segundo sonido fue el más suave',
        'El tercer sonido fue el más suave'
      ],
      naturalnessQuestion: '¿Qué tan natural le pareció la oración?',
      naturalnessQuestionContext: '¿Qué tan natural le pareció la respuesta dado el contexto?',
      naturalnessOptions: ['para nada natural', 'completamente natural'],
     
      // cuestionario de música
      mqTrainingTheory: '¿Cuántos años de entrenamiento formal (teoría) en música ha recibido?',
      mqKnowTheory: '¿Cuánto sabe sobre la estructura y la teoría de la música?',
      mqTrainingPractice: '¿Cuántos años de entrenamiento formal (práctica) en música ha recibido?',
      mqMakeProfessional: `¿Con qué frecuencia se involucra en la realización de música como profesional?
        (p. ej., cantar, tocar un instrumento, componer)?`,
      mqMakePractice: '¿Con qué frecuencia practica instrumentos musicales o canta?',
      mqMakeHobby: '¿Con qué frecuencia se involucra en la música como pasatiempo o como aficionado?',
     
      //
      scaleYears: [
        'Ninguno',
        '1 año',
        '2 años',
        '3 años',
        '4 años',
        '5 años',
        '6 años',
        '7 años',
        '8 años',
        'más de 8 años'
      ],
      scaleHowMuch: [
         'Nada',
         'Un poco',
         'Una cantidad moderada',
         'Bastante',
         'Mucho'
      ],
      scaleHowOften: [
        'Nunca',
        'Raramente',
        'Algunas veces',
        'A menudo',
        'Todo el tiempo'
      ]
    },
    
    // German
    de: {
      fullScreen: `<p> <br> <br> <em> Bitte klicken um in den Vollbildmodus zu wechseln 
        und mit dem Experiment zu beginnen! </ em> </ p> `,
      continueButton: 'Weiter',
      connectHeadphones: 'Bitte Kopfhörer benutzen und Lautstärke einstellen!',
      playSound: 'Aufnahme abspielen',
      playAgain: 'Aufnahme noch mal abspielen',
      soundCheckOk: 'Die Lautstärke ist angenehm',
      adjustVolume: 'Lautstärke bei Bedarf bitte anpassen',
      recordSound: 'Audioaufnahme jetzt starten',
      startRecording: 'Klicken Sie hier, um die Aufnahme zu starten',
      recordDialogue: 'Klicken Sie hier, um den Dialog aufzuzeichnen!',
      saySentence: 'Wenn Sie fertig sind, klicken Sie und sagen Sie den folgenden Satz:',
      doneRecording: 'Klicken Sie hier, wenn Sie mit der Aufnahme fertig sind',
      speakNow: 'Bitte sprechen Sie jetzt!',
      recordAgain: 'Aufnahme wiederholen',
      recordCheckOk: 'Die Aufnahme klingt gut',
      adjustMic: 'Gegebenenfalls Mikrofoneinstellungen anpassen',
      adjustMicAfter: 'Haben Sie Ihre Stimme gehört? Wenn nicht, überprüfen Sie die Mikrofoneinstellungen und versuchen Sie es erneut!',
      productionTestSentence: `Die Katze folgte dem Eichhörnchen heimlich zu seinem Nest.`,
      recordCheckNotOk: 'Es klappt nicht',
      instructionsHeadphoneCheck: `<br> <em> Es folgt ein Kopfhörertest -- Kopfhörer sind
         dazu absolut notwendig! </ em> <p> <br> <br> Du wirst drei Töne hören, und 
         musst dann beantworteen, welcher der leiseste von ihnen war.
        <br> <br> Dies wird 6 Mal wiederholt (und dauert insgesamt etwa 2 Minuten).
        <br> <br> </ p> `,
      startHeadphoneTest: 'Die ersten drei Töne abspielen',
      questionHeadphoneTest: 'Welcher Ton war am leisesten?',
      optionsHeadphoneTest: [
        'Der erste Ton war der leiseste.',
        'Der zweite Ton war das leiseste.',
        'Der dritte Ton war das leiseste.'
      ],
      naturalnessQuestion: 'Wie natürlich fandest Du diesen Satz?',
      naturalnessQuestionContext: 'Wie natürlich fandest Du die Antwort in diesem Kontext?',
      naturalnessOptions: ['völlig unnatürlich', 'völlig natürlich'],
      
      // Musikfragebogen
      mqTrainingTheory: 'Wie viele Jahre formale Musikausbildung (Theorie) hattest Du?',
      mqKnowTheory: 'Wie viel weißt du über Musikstruktur und -theorie?',
      mqTrainingPractice: 'Wie viele Jahre formale Musikausbildung (Praxis) hattest Du?',
      mqMakeProfessional: `Wie oft machst du professionell Musik
        (z. B. singen, ein Instrument spielen, komponieren)? `,
      mqMakePractice: 'Wie oft übst Du heute oder hast du früher geübt (ob singen oder mit Instrument)?',
      mqMakeHobby: 'Wie oft machst Du Hobby-mäßig Musik?',
      //
      scaleYears: [
        'Gar nicht oder weniger als 1 Jahr',
        '1 Jahr',
        '2 Jahre',
        '3 Jahre',
        '4 Jahre',
        '5 Jahre',
        '6 Jahre',
        '7 Jahre',
        '8 Jahre',
        "mehr als 8 Jahre"
      ],
      scaleHowMuch: [
         'Nichts',
         'Ein wenig',
         "Einigermaßen viel",
         "Relativ viel",
         'Sehr viel'
      ],
      scaleHowOften: [
        'Noch nie',
        'Selten',
        'Manchmal',
        'Häufig',
        'Ständig'
      ]
    },
    
    // Dutch  
    nl: {
      fullScreen: `<p><br><br> <em>Klik op de onderstaande knop om volledig scherm te openen and het experiment te beginnen</em></p>`,
      continueButton:  'Volgende',
      connectHeadphones: 'Steek de koptelefoon in and pas het volume aan!',
      playSound: 'Geluid afspelen',
      recordSound: 'Begin opname',
      playAgain: 'Geluid opnieuw afspelen',
      startRecording: 'Klik hier om de opname te beginnen',
      recordDialogue: 'Klik hier om het dialoog op te nemen!',
      saySentence: 'Als u zover bent, klik hier en spreek de volgende zin in:',
      doneRecording: 'Klik hier als u klaar bent met de opname.',
      speakNow: 'Begin met spreken',
      recordAgain: 'Opnieuw opnemen',
      soundCheckOk: 'Ik hoor het geluid op een comfortabel volume',
      recordCheckOk: 'De opname klinkt goed',
      recordCheckNotOk: 'Ik krijg het niet aan de praat',
      adjustVolume: 'Pas het volume aan indien nodig',
      adjustMic: 'Pas de microfoon configuratie aan indien nodig',
      adjustMicAfter: 'Heeft u uw stem gehoord? Zo niet, controleer dan de microfooninstellingen en probeer het opnieuw',
      productionTestSentence: `Een andere naam voor Den Haag is 's-Gravenhage.`,
      instructionsHeadphoneCheck: `<br> <em>Nu komt een koptelefoon test -- hiervoor heb je een koptelefoon nodig!</em>  <p><br><br> Je krijgt drie geluiden 
      in een reeks te horen, aan jou de taak om te bepalen welke het zachtste is.         
      <br><br> Deze taak wordt 6 keer herhaald (dit duurt slechts 2 minuten).
        <br><br></p>`,
      startHeadphoneTest: 'Speel de eerste reeks met drie geluiden af!',
      questionHeadphoneTest: 'Welk geluid was het zachtst?',
      optionsHeadphoneTest: [
        'Het eerste geluid was het zachtst.',
        'Het tweede geluid was het zachtst.',
        'Het derde geluid was het zachtst.'
      ],
      naturalnessQuestion: 'Hoe natuurlijk klonk deze zin?',
      naturalnessQuestionContext: 'Hoe natuurlijk klonk het antwoord met de gegeven context?',
      naturalnessOptions: ['volledig onnatuurlijk','volledig natuurlijk'],
      //
      // Music questionnaire 
      mqTrainingTheory: 'Hoeveel jaar formele muzikale training heb jij gehad?',
      mqKnowTheory: 'Hoeveel weet jij over muzikale structuren and muziektheorie?',
      mqTrainingPractice: 'Hoeveel jaar heb jij een muziekinstrument bespeelt op hoog niveau?',
      mqMakeProfessional: `Hoe vaak houd jij je bezig met muziek op hoog niveau 
      (bijv. zang, instrument bespelen, componeren)?`,
      mqMakePractice: 'Hoe vaak speel/speelde je een muziekinstrument of zing/zong jij?',
      mqMakeHobby: 'Hoe vaak houd jij je bezig met muziek als een hobby of als amateur?',
      //
      scaleYears:  [
        'nooit',
        '1 jaar',
        '2 jaar',
        '3 jaar',
        '4 jaar',
        '5 jaar',
        '6 jaar', 
        '7 jaar',
        '8 jaar',
        'meer dan 8 jaar'
      ],
      scaleHowMuch: [
         'Niks',
         'Een beetje',
         'Best wel veel',
         'Veel',
         'Heel veel'
      ], 
      scaleHowOften: [
        'Nooit',
        'Zelden',
        'Soms',
        'Vaak',
        'Altijd'
      ] 
    },
    
    // Mandarin
    'zh-cn':{
      fullScreen:`<p> <br> <br> <em>请点击下面的按钮
        进入全屏模式并开始实验</ em> </ p>`,
      continueButton:'继续',
      connectHeadphones:'请连接耳机并调节音量！',
      playSound: '播放声音',
      playAgain: '再次播放声音',
      soundCheckOk: '我可以听到声音且音量适中',
      adjustVolume: '如需要请调节音量',
      recordSound:'立即开始录音',
      startRecording:'单击此处开始录音',
      recordDialogue:'单击此处录对话',
      saySentence:'准备就绪后,单击并说以下句子:',
      doneRecording:'录完后,请单击此处',
      speakNow:'请现在发音！',
      recordAgain:'重新录音',
      recordCheckOk:'录音听起来不错',
      adjustMic:'必要时调整麦克风设置',
      adjustMicAfter:'听到你的声音了吗？如果需要,再次调整麦克风音量',
      productionTestSentence:'北风承认还是太阳的本事大',
      recordCheckNotOk:'我无法使它正常工作',
      instructionsHeadphoneCheck: `<br> <em>以下是耳机测试---您需要戴上耳机
才能开始测试！</ em> <p> <br> <br>您将连续听到三个声音
      ,请回答哪个声音最小。
        <br> <br>此任务将重复6次（此过程仅需2分钟）。
        <br> <br> </ p>`,
      startHeadphoneTest: '播放第一组的三个声音！',
      questionHeadphoneTest: '哪个声音最小？',
      optionsHeadphoneTest:[
        '第一声最小。',
        '第二声最小。',
        '第三声最小。'
      ],
      naturalnessQuestion: '您觉得这句话有多自然？',
      naturalnessQuestionContext: '联系上下文, 您认为该回答有多自然？',
      naturalnessOptions: ['完全不自然','完全自然'],
     
      completionCode: '完成码',
            // Music questionnaire
      mqTrainingTheory: '您接受了多少年的正规音乐培训（理论) ?',
      mqKnowTheory: '您对音乐的结构和理论了解多少?',
      mqTrainingPractice: '您接受了多少年的正规音乐培训（练习) ?',
      mqMakeProfessional: `您多长时间从事一次专业音乐制作
        （例如:唱歌, 弹奏乐器, 作曲) ?`,
      mqMakePractice: '您多久进行一次乐器或歌唱练习/排练？',
      mqMakeHobby: '您多久从事一次业余音乐制作?',
      //
      scaleYears:  [
        '无',
        '1  年',
        '2 年',
        '3 年',
        '4 年',
        '5 年',
        '6 年',
        '7 年',
        '8 年',
        '超过8年'
      ],
      scaleHowMuch: [
         '无',
         '一点',
         '相当数量',
         '适量',
         '很多'
      ],
      scaleHowOften: [
        '从不',
        '很少',
        '有时',
        '经常',
        '每时每刻'
      ]
    },
    
    // Korean (careful, just google translate!)
    ko: {
      fullScreen:`<p> <br> <br> <em> 아래 버튼을 클릭하십시오
        전체 화면 모드로 들어가서 실험으로 시작 </ em> </ p>`,
      continueButton: '계속',
      connectHeadphones: '헤드폰을 연결하고 볼륨을 조정하십시오!',
      playAgain: '다시 소리 재생',
      soundCheckOk: '편안한 볼륨으로 소리를들을 수 있습니다',
      adjustVolume : '필요한 경우 볼륨 조정',
      instructionsHeadphoneCheck:`<br> <em> 다음은 헤드폰 테스트입니다.
        헤드폰없이이 작업을 수행 할 수 있습니다! </ em> <p> <br> <br>
        연속해서 들리면 어느 것이 가장 조용한 지 묻습니다.
        <br> <br>이 작업은 6 번 반복됩니다 (2 분 소요).
        <br> <br> </ p>`,
      startHeadphoneTest: '첫 번째 세 세트의 사운드를 연주하십시오!',
      questionHeadphoneTest: '어떤 소리가 가장 조용한가?',
      optionsHeadphoneTest: [
        '첫 번째 소리가 가장 부드럽습니다.',
        '두 번째 소리가 가장 부드럽습니다.',
        '세번째 소리가 가장 부드럽습니다.'
      ],
      naturalnessQuestion: '이 문장을 얼마나 자연스럽게 찾았습니까?',
      naturalnessQuestionContext: '컨텍스트가 주어진 응답을 얼마나 자연스럽게 찾았습니까?',
      naturalnessOptions: [ '완전히 부자연 스러움', '완전히 자연 스러움'],
      
      // Music questionnaire 
      mqTrainingTheory: '몇 년 동안 공식 음악 교육 (이론)을 받았습니까',
      mqKnowTheory: '음악 구조와 이론에 대해 얼마나 알고 있습니까',
      mqTrainingPractice: '몇 년 동안 공식 음악 훈련 (연습)을 했습니까',
      mqMakeProfessional: `전문 음악 제작에 얼마나 자주 참여하십니까 (예 : 노래, 악기 연주, 작곡)`,
      mqMakePractice: '악기 나 노래로 얼마나 자주 연습하거나 연습합니까',
      mqMakeHobby: '취미 나 아마추어로서 음악 제작에 얼마나 자주 참여하십니까',
      //
      scaleYears:  [
        '없음',
        '일년',
        '2 년',
        '3 년',
        '4 년',
        '5 년',
        '6 년',
        '7 년',
        '8 년',
        '8 년 이상'
      ],
      scaleHowMuch: [
         '아무것도',
         '조금',
         '공정한 금액',
         '중간 정도',
         '아주 더'
      ], 
      scaleHowOften: [
        '못',
        '드물게',
        '때때로',
        '자주',
        '항상'
      ] 
      
      
    }
    }
    
    return messages[language];
  },
  
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

  // render screen with button to press
  screen: function(text, name, choice, align, participantCode) {
    if (!align) {
      let align = 'left';
    }
    if (!choice) { // default button text
      choice = 'Continue'
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
      text = `${text} <b>Completion Code: ${completionCode}</b> <br><br><br>`
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
    soundFileName = `${study.path}/data/recordedFiles/${soundFileName}`


    recordLoop.push(prosodylab.startRecording(soundFileName,lab));
      
    recordLoop.push(prosodylab.recordClickMessage(
      `<em>${messages.speakNow}</em>
      <br><br> <b>${lab}</b> <br><br>`,
      {component: `micCheckRecording`}, 
      soundFileName,recordingTimeOut));
     
    recordLoop.push(prosodylab.stopRecording());

  
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
    const result = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: duration, //duration in msec
      data: {...trialInfo, component: 'experiment',trialPart:'Fixation' } 
    };
    return result;
  },
  
  noDataRecordedFlag: function(){
    const result = {
      type: 'html-keyboard-response',
      stimulus: `<div style="font-size:50px;color:red">
      <em>Test run <br><br><br> No data will be saved!</em></div>`,
      choices: jsPsych.NO_KEYS,
      trial_duration: 2000, //duration in msec
      data: {component:'NoDataRecordedFlag' } 
    };
    return result;
  },
  
  recordClickMessage: function(html,trialInfo,soundFileName,recordingTimeOut,message,contextFile) {
  
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
             recordedFile: soundFileName
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
             recordedFile: soundFileName
        }
       };    
       
    }
           
    return result;
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
  startRecording: function (filename,labtext) {
   return {
    type: "call-function", 
    func: function() {
      chunks = []; // clears  prior recordings
      soundFileName = filename; 
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
       
      session.push(prosodylab.startRecording(
          `${study.path}/data/recordedFiles/${soundFileName}`));
      
      session.push(prosodylab.recordClickMessage(
         `<br><br><em>${messages.speakNow}</em><br><br>`,
         trialInfo,soundFileName,study.recordingTimeOut));
     
      session.push(prosodylab.stopRecording());

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
             html = html + `<br>${trial.dialogueResponse}<br><br>`
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
      soundFileName = `${study.path}/data/recordedFiles/${soundFileName}`


      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.plannedProduction;
      }
      
      var recordSound = [];
      var loop_node = [];
      
      
      var listenToContext =  {
        type: 'audio-keyboard-response',
        prompt: htmlFunction(prosodylab.md2html(trial.dialogueRecordMessage)),
        stimulus: `${trial.path}/audio/${trial.contextFile}`,
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        data: trialInfo
      }
      listenToContext.data.trialPart =  'Listen to Context';
      
      recordSound.push(listenToContext);

      recordSound.push(prosodylab.startRecording(soundFileName,lab));
      
      if (!trial.dialogueMemorizeResponse){
        recordSound.push(prosodylab.recordClickMessage(
            htmlFunction(prosodylab.md2html(trial.dialogueRecordMessage)),
           trialInfo,soundFileName,study.recordingTimeOut,messages.doneRecording
           ));
            
      } else {
         recordSound.push(prosodylab.recordClickMessage(messages.speakNow,trialInfo,soundFileName,study.recordingTimeOut,messages.doneRecording,trial.contextFile));
      }
      
      recordSound.push(prosodylab.stopRecording());
      
      if (trial.rerecord=='Yes'){
        
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
              component: 'DialogueRerecordPrompt',
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
        session = [...session,...recordSound];  

     }
     
   }
    
    
   // planned production
    if (trial.plannedProduction&&trial.plannedProduction!='NA') {
       
      // set text for .lab file that will be saved with soundfile 
      if (trial.lab) {
          lab = trial.lab;
      } else {
         lab = trial.plannedProduction;
      }
            
      const fixationDuration = 1000 // show fixation cross for 1000 msec
      session.push(this.fixation(trialInfo,fixationDuration)); 
     
      var readStimulus =  {
        type: 'html-button-response',
        stimulus: function() {
        const html = `${trial.plannedProduction}
           <br><br>
           <em>${prosodylab.md2html(trial.plannedProductionMessage)}</em>
           <br><br>`
          return html;
        },
        //stimulus: `<style> .centered {position: fixed; top: 50%; 
        //  left: 50%; transform: translate(-50%, -50%);}</style>
        //   <em>${trial.plannedProduction}</em>`,
        choices: [messages.startRecording],
        //trial_ends_after_audio: true,
        button_html: '<button class="jspsych-btn">%choice% </button>',
        data: {...trialInfo,
               trialPart:  'plannedProduction',
               options: messages.startRecording
               }
      }

      session.push(readStimulus);
      
     soundFileName = `${trialInfo.experiment}_${participant}_${trialInfo.item}_${trialInfo.condition}`;
       
      session.push(prosodylab.startRecording(
          `${study.path}/data/recordedFiles/${soundFileName}`));
      
      session.push(prosodylab.recordClickMessage(
      `${trial.plannedProduction}
         <br><br><br>
          <em>${messages.speakNow}</em>
          <br><br><br><br>`,trialInfo,soundFileName));
     
      session.push(prosodylab.stopRecording());
      
      
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
       
      session.push(prosodylab.startRecording(
          `${study.path}/data/recordedFiles/${soundFileName}`));
      
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
          prosodylab.recordClickMessage(secondScreen,trialInfo, soundFileName,study.recordingTimeOut,messages.doneRecording);
    
       secondScreen.data = {...secondScreen.Data,trialPart: 'incrementalSecondScreen'};
       if (trial.imageOrder) {
         secondScreen.data = {...secondScreen.Data,imageOrder: trial.imageOrder};
       }
       session.push(secondScreen);
     
       session.push(prosodylab.stopRecording());
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
    
    if (trial.contextFile) {
      
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
      stimul.push(playSound);
    }
    
    if (trial.answerFile) {
      
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
      stimul.push(playSound);
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
      question.data = {...trialInfo, 
        text: this.md2html(trial[`question${questionN}`]),
        trialPart: `question${questionN}`
        };
      

      
      if (qType=='ButtonOptionsFixed'||qType=='ButtonOptionsRandomBetween'||qType == 'ButtonOptions'){
            
        question.type = 'html-button-response';
        question.choices = eval(trial[`question${questionN}Options`]);
        question.button_html = '<button class="jspsych-btn"><b>%choice%</b></button>'
        question.data.options = question.choices;

        question.stimulus = `<br><em>${question.data.text}<em/><br>`;
        
        if (trial[`question${questionN}Stimulus`]) {
          question.stimulus = eval(`trial.question${questionN}Stimulus`) + 
          question.stimulus;
        } 
        
        if (qType == 'ButtonOptionsRandomBetween') {
          question.choices = this.shuffle(question.choices,randomNumbers[questionN-1]);
        }  else if (qType=='ButtonOptions'){
          question.choices = jsPsych.randomization.shuffle(question.choices);
        }
        
        question.data.options = question.choices;
        
      }  else if (qType=='ConditionalSlider'){
          // sentence to be rated depends on prior question
                                
          question.type = 'html-slider-response';

          if (!trial[`question${questionN}EndPoints`]){ 
             question.labels = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.labels = eval(trial[`question${questionN}EndPoints`]);
          }

          question.button_label = `${messages.continueButton}`;
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

          question.button_label = `${messages.continueButton}`;
          question.require_movement = true;
          
          question.stimulus  = function(){
            // get data from last trial
            const lastTrial = jsPsych.data.get().last(2).values()[0];
            
            let originalOptions = eval(trial[`question1Options`]);
            console.log('originalOptions',originalOptions,'lastTrial.chosenOption',lastTrial.chosenOption)
            
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
             question.data.endPoints = messages.naturalnessOptions;
          } else { // or else use endpoint labels given in experiment spreadsheet
             question.data.endPoints = eval(trial[`question${questionN}EndPoints`])
          }

          question.data.options[0] = `${question.data.options[0]} = ${question.data.endPoints[0]}`;
          question.data.options[question.data.options.length-1] = 
            `${question.data.options[question.data.options.length-1]} = ${question.data.endPoints[1]}`;
            
          question.type = 'survey-likert';
          question.questions  = [{ 
            prompt: question.data.text, 
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
       
      session.push(prosodylab.startRecording(
          `${study.path}/data/recordedFiles/${soundFileName}`));
      
      
      session.push(prosodylab.recordClickMessage(
         `<div style="position:relative; height400px;">
          <b>${trial.recordAfter}</b><br><br>
          <em>${messages.speakNow}</em><br><br><br>
          </div>`,trialInfo,soundFileName));
     
      session.push(prosodylab.stopRecording());
      
      
    }
    
    questionN++;
    
    } // end while for questions
      
    return session;

  },
  
  createSessions: function(stimuli,study,participantCode,messages) {
  
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
      
      if (variables.includes('rerecord')||variables.includes('play')) {
        console.log('replay activated')
        play = true;
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

    // get session names from spreadsheet
    sessionNames = new Set([...stimuli.map(value => value.session)]);
    
    // Set session order scheme to 'Fixed' if no ordering scheme is specified
    // if spreadsheet as sessionOrder column with 'Random' it will be random
    if (!stimuli[0].sessionOrder) {
      stimuli =  stimuli.map(obj=> ({ ...obj, sessionOrder: 'Fixed' }))
    }

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
 
    console.log('There are ${experimentSessions.length} Sessions:',experimentSessions);
  
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

      // load and display session instructions
      if (!sessionStimuli[0].instructions){
        sessionStimuli = sessionStimuli.map(obj=> ({ ...obj, instructions: 'instructions.md'}))
      } 
      
      instructionsFile = [...new Set(sessionStimuli.map(value => value.instructions))]; 
      
      // display instructioions there is  no instruction file specified
      // (which means empty cells in all rows of session in instruction colummn)
      if (instructionsFile[0]){ 
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
