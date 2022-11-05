# This files concatenates up to four soundfiles, optionally in every possible order

# Michael Wagner chael@mcgill.ca September 2019; modified April 2020




form concatenate

	boolean UseSelectedFiles no

	comment Otherwise, specify files names:
   	sentence baseFile1 inPhase.wav
   	sentence baseFile2 inPhaseSoft.wav
   	sentence baseFile3 outOfPhase.wav
   	sentence baseFile4
    sentence inputDirectory ../individual
	boolean leaveBaseFilesOpen yes

	comment Do you want to concatenate the selected files in every possible order?
    boolean allCombinations yes
	positive numberOfIterations 1

    comment add pause by position or by preceding file? 
    boolean addPauseByPosition yes

	comment How much pause do you want add after each file (up to 4 files)?

	real targetPause1 0.52
	real targetPause2 0.52
	real targetPause3 0
	real targetPause4 0

	comment Specify soundfile containing pause--otherwise pure silence will be used
    sentence pauseFile

    comment Do you want files to be saved?
	boolean saveConcatenatedFiles no
    sentence outputDirectory ../sequences/regular

	comment Do you want to add suffix to filename?
	sentence fileNameSuffix

    comment Do you want leave the concatenated files open?
	boolean leaveNewFilesOpen yes

	boolean verbose yes

endform

# if files aren't loaded from disk leave open

if useSelectedFiles
	leaveBaseFilesOpen = 1
endif


################### 
#

procedure factorial: nCombine
   combinations = 1
   for .i to nCombine
     combinations = combinations * .i
   endfor
endproc


########### procedure to add pause
##

procedure addPause .sound, .grid, .pauseDuration

		select .sound

		if .grid <> 0
			plus .grid
		endif

		runScript: "appendPause.praat", inputDirectory$, pauseFile$, .pauseDuration, leaveBaseFilesOpen, "no", ""

		.sound = selected("Sound")

		if nGrids <> 0
			.grid = selected("TextGrid")
		endif
	
endproc



###################
##
##   main method


# start output

if verbose
	echo Concatenates selected files
	printline
	printline
endif


if useSelectedFiles


	# save selected files into variables

	nFiles = numberOfSelected ("Sound")
	nGrids = numberOfSelected ("TextGrid")

	for i to nFiles
		baseSound'i' = selected("Sound",'i')
		baseName'i'$ = selected$("Sound",'i')
	endfor

	if nGrids <> nFiles
		grids = 0
		printline Selected number of TextGrids doesn't match number of sounds, will ignore all TextGrids!
		printline
	else
		grids = 1
		for i to nGrids
			baseGrid'i' = selected("TextGrid",'i')
		endfor
	endif

else

	# open sounds and grids
	grids = 0
    nFiles = 0
    nGrids = 0

	for i from 1 to 4

		if baseFile'i'$ <> ""
			readFile$ = baseFile'i'$
	        Read from file... 'inputDirectory$'/'readFile$'
 	 		baseSound'i'=selected("Sound")
			baseName'i'$=selected$("Sound")
			nFiles = nFiles + 1

 	       gridName$ = baseName'i'$ + ".TextGrid"
 	       if fileReadable("'inputDirectory$'/'gridName$'")
 	          nGrids += 1
 	          Read from file... 'inputDirectory$'/'gridName$'
			  baseGrid'i' = selected("TextGrid")
        	endif
    	endif
	endfor

	if nGrids <> nFiles
		printline
		printline Found some but not all TextGrids, will ignore all TextGrids!
		printline

		nGrids = 0
	endif

endif



## create directory if files are to be saved unless it already exists
# 
if saveConcatenatedFiles
	createDirectory: "'outputDirectory$'"
endif



#### Concatenate files


if allCombinations
	# set combinations to factorial of combinations
	@factorial: nFiles
else
    combinations = 1
endif

printline nFiles 'nFiles'

Create Permutation... concat nFiles yes
myPermutation = selected("Permutation")


for i from 1 to combinations

    select myPermutation
    file1 = Get value... 1

	# choose file that will be first in concatenation

    select baseSound'file1'
	concatName$ = selected$("Sound")

    Copy... concat
	concat = selected("Sound")

    if nGrids <> 0 
	  select baseGrid'file1'
	  Copy... concatgrid
	  concatGrid = selected("TextGrid")
  
      # add textgrid interval with file name
      Insert interval tier... 2 File
	  Set interval text... 2 1 'concatName$'
    else
      concatGrid = 0
    endif

	# add pause after first file if desired

    if addPauseByPosition = 1 and targetPause1 <> 0
       @addPause: concat, concatGrid, targetPause1
	   select concat
       if nGrids <> 0
	       plus concatGrid
	   endif
	   Remove
	   concat = addPause.sound
       if nGrids <> 0
	      concatGrid = addPause.grid
       endif

    elsif addPauseByPosition = 0 and targetPause'file1' <> 0
       @addPause: concat, concatGrid, targetPause'file1'
	   select concat
       if nGrids <> 0
	       plus concatGrid
	   endif
	   Remove
	   concat = addPause.sound
       if nGrids <> 0
	      concatGrid = addPause.grid
       endif

    endif

	if nFiles > 1

	loop = 1

	# add other files
    repeat

	   # concatenate next sound
       loop = loop + 1

       select myPermutation   
       nextSound = Get value... loop
       
       select baseSound'nextSound'
       soundName$ = selected$("Sound")

	   # praat always concatenates in the order in which files appear in object window, this is why copying is essential
       Copy... 'soundName$'
       newSound = selected("Sound")

       if nGrids <> 0

	      # set up textgrid
	      select baseGrid'nextSound'
	      Copy... concatgridnext
	      newGrid = selected("TextGrid")

	      Insert interval tier... 2 File
	      Set interval text... 2 1 'soundName$'
       else
		   newGrid = 0
	   endif

       # add pause if desired

       if addPauseByPosition = 1 and targetPause'loop' <> 0

          @addPause: newSound, newGrid, targetPause'loop'
	      select newSound
       	  if nGrids <> 0
	        plus newGrid
	      endif
	      Remove
	      newSound = addPause.sound
          if nGrids <> 0
	         newGrid = addPause.grid
          endif

       elsif addPauseByPosition = 0 and targetPause'nextSound' <> 0
          @addPause: newSound, newGrid, targetPause'nextSound'
	      select newSound
       	  if nGrids <> 0
	        plus newGrid
	      endif
	      Remove
	      newSound = addPause.sound
          if nGrids <> 0
	         newGrid = addPause.grid
          endif

       endif 		
       
	   # append this sound to concatenation
       select concat
	   plus newSound
       Concatenate

	   newConcat=selected("Sound")

       select concat
	   plus newSound
	   Remove

	   concat = newConcat

	   # concatenate TextGrids
       if nGrids <> 0

	     select concatGrid
	     plus newGrid
	     Concatenate

	     select concatGrid
	     plus newGrid
         Remove

	     select TextGrid chain
	     concatGrid = selected("TextGrid")

       endif

	   # concatenate names
	   concatName$ = concatName$ + "_" +  soundName$ 

    until loop = nFiles

		# end if that checked whether there was more than 1 file
	endif

	if fileNameSuffix$ <> ""
		concatName$ = concatName$ + "_" + fileNameSuffix$
	endif

       if nGrids <> 0
	# rename concatenated textgrid
    Rename... 'concatName$'

	endif

	# rename concatenated sound
    select concat
    Rename... 'concatName$'



	###### iterate file multiple times if desired

	# if numberOfIterations > 1

		Copy... duplicate
		duplicate = selected("Sound")

      if nGrids <> 0
		select concatGrid
		Copy... duplicateGrid
		duplicateGrid = selected("TextGrid")
      endif

		for j from 2 to numberOfIterations
			
			select concat
	    	plus duplicate
	    	Concatenate
			iterated = selected("Sound")
		    select concat
        	Remove
	    	concat = iterated

            if nGrids <> 0

			select concatGrid
			plus duplicateGrid
			Concatenate
			iteratedGrid = selected("TextGrid")
			select concatGrid
			Remove
			concatGrid = iteratedGrid

            endif
			

		endfor

		select duplicate
       if nGrids <> 0
  		plus duplicateGrid
       endif
		Remove

	endif

	# save files

	if saveConcatenatedFiles
		select concat
		Save as WAV file... 'outputDirectory$'/'concatName$'.wav
        if nGrids <> 0
    		select concatGrid
	    	Save as text file... 'outputDirectory$'/'concatName$'.TextGrid
        endif
	endif

	if leaveNewFilesOpen = 0
		select concat 
        if nGrids <> 0
		  plus concatGrid
		  Remove
        endif
	endif

    select myPermutation

    if i <> combinations
      Next
    endif


endfor



if leaveBaseFilesOpen = 0

	for i to nFiles
		select baseSound'i'
      if nGrids <> 0
		plus baseGrid'i'
      endif
	  Remove
	endfor

endif


select myPermutation
Remove


select concat
Rename... 'concatName$'

if nGrids <> 0
  select concatGrid
  Rename... 'concatName$'
  plus concat
else
  select concat
endif 





