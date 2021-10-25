# prosodylabExperimenter

Scripts to run prosody (and other) experiments, which makes use of Josh de Leeuw's [jspsych](https://www.jspsych.org/) to assemble online experiment from a simple spreadsheet. The javascript code will read in a tab-delimited spreadsheet with the stimuli and design information and generate and run the experiment. 

You can find the beginnings of a documentation [here](https://prosodylab.github.io/prosodylabExperimenter/)

# Motivation and intended use case

One motivation for creating this tool was to facilitate a class on laboratory linguistics taught at McGill. In this class, all students run experiments in groups. The goal of this tool is to make the process of turning the idea into an experiment maximally easy, so the class can focus on designing experiments, and not spend too much time on implementation, and without people having to learn how to code. 

The tool is also useful in a situation where there are lots of students with the training to design an experment but only few have coding expertise, which is a common situation in a lab in a linguistics department. 

So the use case this was designed for is where there is one or a few people who can and want to delve into the code itself, and lots of people who just want to run experiments. So be warned: This will be user-friendly for the people in your lab who use it, but not so much for whoever has to set it up and get it to run, and trouble shoot if something doesn't work as expected.

# Limitations

* There is no documentation yet
* This is very beta, and if you're not comfortable editing javascript and fix bugs at this stage this may not be the best idea
* The output right now is in json format, and there is an .Rmd file that is used to read the data into a spreadsheet in R (so the 'spreadsheet-out' part is not really implemented yet).


The live examples that is part of this template is posted [here](https://prosodylab.org/experimenter/template).

## Prerequsites

Using these scripts minimally requires:

* knowing some basic javascript to trouble shoot issues and adapt the scripts where needed
* knowing how to handle file permissions on a server
* If you want to do audio recording, you also need a server capabable of serving pages securely using `https://` (as opposed to `http://`).


## Relation to older prosodylabexperimenter based on matlab

This tool provides a superset of the the functionality of the earlier [prosodylab-offline-experimenter](https://github.com/prosodylab/prosodylab-experimenter), which used the Psychtoolbox in matlab, but is now defunct. We had used that for a decade in our lab for our research, and to teach the laboratory linguistics class. 


## Switches with urlparams

* ?mode=test: Has the effect that no data will be saved
* ?mode=experiment: Has the effect that only experiment (with instructions) will be shown, but not other elements (e.g. consent form, etc.); full screen deactivated
* ?session=2: Has the effect that only session with name '2' will be run; full screen deactivated
* ?recordOption=play: play recorded files after recording
* ?recordOption=rerecord: prompt participant whether they want to rerecord




## To run experiment locally

* go to the command line window (terminal on mac), and navigate to experiment folder
* enter: `php -S localhost:8000`
* the go to browser and open: http://localhost:8000


