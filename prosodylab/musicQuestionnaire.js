/* Musebaq Music questionnaire from:

Chin, T.-C., Coutinho, E., Scherer, K. R., and Rickard, N. S. (2018). Musebaq: A modular tool for music research to assess musicianship, musical capacity, music preferences, and motivations for music use. Music Perception: An Interdisciplinary Journal, 35(3):376–399.

Module 1: musicianship
*/


var musicQuestionnaire = function (modules) {

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
                         randomize_question_order: true,
                 };
                 timeline.push(moduleMusicianship);

}