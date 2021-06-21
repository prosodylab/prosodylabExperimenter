---
layout: index
title: Home
---

## Spreadsheet-in, spreadsheet-out


The idea of the prosodylab experimenter is to generate prosody (and other) experiments based on a simple spreadsheet, and a Experiments are generated based on simple spreadsheet, together with some markdown files with consent form, and instructions, etc. It makes use of  Josh de Leeuw's brilliant [jspsych](https://www.jspsych.org/). 

## Motivation and intended use case

One motivation for creating this tool was to facilitate a class on laboratory linguistics taught at McGill. In this class, all students run experiments in groups. This tool makes the process of turning the idea into an experiment maximally easy, so the class can focus on designing experiments, and not spend too much time on implementation, and without people having to learn how to code. 

This tool is also useful in a situation where there are lots of students with the training to design an experment but only few have coding expertise, which is a common situation in a lab in a linguistics department. 

So the use case this was designed for is where there is one or a few people who can and want to delve into the code itself, and lots of people who just want to run experiments. 

So be warned: This will be user-friendly at best for the people in your lab who use it, but not so much for whoever has to set it up and get it to run, and trouble shoot if something doesn't work as expected. Javascript and html experience is recommended.

## Limitations

* There is only fragments of a documentation yet
* The tool is still very beta, and if you're not comfortable editing javascript and fix bugs at this stage this may not be the best idea
* The output right now is in json format, and there is an .Rmd file that is used to read the data into a spreadsheet in R (so the 'spreadsheet-out' part is not really implemented yet).


Some examples are posted [here](https://prosodylab.org/experimenter/examples).
