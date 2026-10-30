# This files appends pause to selected file and extends corresponding TextGrid if there is one
# Michael Wagner 


form equalize

	comment Specify soundfile containing pause--otherwise pure silence will be used

	sentence pauseDirectory originalStimuli
    sentence pauseFile

	comment Specify pause duration to be added
	real targetPause 0.1

	boolean leaveOldFilesOpen yes
	boolean saveNewFiles no
	
	sentence outputDirectory equalizedStimuli

endform


mySound = selected("Sound",1)
soundName$ = selected$("Sound",1)

nChannels = Get number of channels

if numberOfSelected ("TextGrid") > 0
	tGrid = 1
	myGrid = selected("TextGrid",1)
else 
	tGrid = 0
endif


if pauseFile$ <> ""
    Read from file... 'pauseDirectory$'/'pauseFile$'
    pauseFile = selected("Sound")
else
	pauseFile = Create Sound from formula... pause Mono 0.0 'targetPause' 22050 0
endif  

nChannelsPause = Get number of channels


if nChannels = 2 & nChannelsPause = 1
	Convert to stereo
    pauseFile2 = selected("Sound")
    select pauseFile
    Remove
    select pauseFile2
    pauseFile = selected("Sound")
endif



# add pause at the end of file

if targetPause > 0

	# cut pause from pauseFile
	select pauseFile
	Extract part... 0 targetPause rectangular 1.0 no
	pause = selected("Sound")

	plus mySound
	Concatenate
	Rename... 'soundName$'
	newSound = selected("Sound")

	select pause
	Remove

	# adjust textgrid
	if tGrid = 1
		select myGrid
		Copy... 'soundName$'
		Extend time... targetPause end
		newGrid = selected("TextGrid")
	endif

endif	  



#### Save file with pause

# Save files to directory if requested
if saveNewFiles

	select newSound
    Save as WAV file... 'outputDirectory$'/'soundName$'.wav

    if tGrid
	   select newGrid
       Save as text file... 'outputDirectory$'/'soundName$'.TextGrid
    endif

endif

# close old files if desired
if leaveOldFilesOpen = 0
	select mySound
	Remove
	select myGrid
	Remove
endif

# Remove pause file
select pauseFile
Remove

# select new files
select newSound
if tGrid
  plus newGrid
endif




