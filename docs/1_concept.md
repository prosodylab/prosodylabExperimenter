---
layout: page
title: concept
sidebar_link: true
sidebar_sort_order: 1
---




## Sessions

* A session consists of one or more experiments
* If there is more than one experiment, then trials form the experiments will be interspersed. The order of which trials from the experiment are shown is random, but remains constant for a given participant. 
    * Trial 1: first trial exp2
    * Trial2:  first trial exp1
    * Trial3: second trial exp2
    * Trial4: third trial exp1
    * ...
* Each session has exactly one instruction screen preceding it, and by default it will be instruction.md
* To use a different filename for the instructions file, add a column 'instructions', and specify the filename for that session in reach row that belongs to an experiment in that session. There must be one unique instructions filename for that session
* To show no instructions before a session, add a column 'instructions', and leave the cells for all trials in that session empty 
* There can be more than one session (e.g. a practice session and a test session). To add more than one that, there must be a `session` column, and every row from each session has to have the session name in it (e.g. 'Practice' or '1')
* Per default, the instructions from instructions.md will be shown
* To specify the instructions file, add a column 'instructions' to the spreadsheet (usually necessary if there are multiple sessions)
* Sessions by default presented in the order in which they are listed in the spreadsheet
* SessionOrder can specify that the order should be random
* If session order is set to random, if there is a session called 'Practice' it is always shown first, and if there is a session called 'Test' it is always shown last


## Screens

* The hello-page, consent-page,  instructions-page, and goodbye page are all simple .md files, and need to be provided in the `experiment` folder
* The last paragraph of these pages will be used as button text for the button that will lead to the next page
* The text of the button will be saved to the experiment results (so the last paragraph could contain the relevant consent information, so that that information will be saved along with the data)


## Folder structure

* **experiment**    
This folder contains all the experiment-specific files
    * spreadsheet
    * hello.md  (file that the participants is shown first; filename can be specficied in spreadsheet in column 'hello')
    * instructions.md (file with instructiosn for the experiment session, when there are multiple sessions filename should be specified in column 'instructions')