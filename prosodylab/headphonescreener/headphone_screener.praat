# Generates tones following:
# Woods, K. J., Siegel, M. H., Traer, J., and McDermott, J. H. (2017). Headphone screen- ing to facilitate web-based auditory experiments. Attention, Perception, & Psychophysics, 79(7):2064– 2072.

# Script written by Michael Wagner, April  2020

# One differences to original stimuli is that Woods  et al.  used 
# first  half of a Hann window to fade in and out,
# while this script uses a half-cosine function

# These soundfiles need to be double-checked still!

monoPos = Create Sound from formula... monoSin 1 0 1 22050 sin(2*pi*200*x)
Fade in: 0, 0, 0.09, "yes"
Fade out: 0, 0.91, 0.09, "yes"
monoNeg = Create Sound from formula... monoCos 1 0 1 22050 -sin(2*pi*200*x)
Fade in: 0, 0, 0.09, "yes"
Fade out: 0, 0.91, 0.09, "yes"

selectObject: monoPos,monoNeg
stereoOutOfPhase = Combine to stereo
Rename... stereoOutOfPhase

selectObject: monoPos
monoPos2 = Copy... monoPos2
selectObject: monoPos,monoPos2
stereoInPhase = Combine to stereo
Rename... stereoInPhase

stereoInPhaseQuiet = Copy... stereoInPhaseQuiet

removeObject: monoPos2

selectObject: monoPos,monoNeg,stereoInPhase,stereoOutOfPhase
Scale intensity... 77.0

selectObject: stereoInPhaseQuiet
Scale intensity... 71.0

Save as WAV file... stereoInPhaseQuiet.wav

selectObject: stereoInPhase
Save as WAV file... stereoInPhase.wav

selectObject: stereoOutOfPhase
Save as WAV file... stereoOutOfPhase.wav

select monoPos 
Remove

select monoNeg
Remove














