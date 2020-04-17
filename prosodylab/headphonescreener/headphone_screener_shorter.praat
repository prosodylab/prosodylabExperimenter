# Generates tones following:

# Woods, K. J., Siegel, M. H., Traer, J., and McDermott, J. H. (2017). Headphone screen- ing to facilitate web-based auditory experiments. Attention, Perception, & Psychophysics, 79(7):2064– 2072.

# Except that they're only half the length

# Script written by Michael Wagner, April  2020

# One differences to original stimuli is that Woods  et al.  used 
# first  half of a Hann window to fade in and out,
# while this script uses a half-cosine function

# These soundfiles need to be double-checked still!

monoPos = Create Sound from formula... monoSin 1 0 0.5 22050 sin(2*pi*200*x)
Fade in: 0, 0, 0.08, "yes"
Fade out: 0, 0.42, 0.08, "yes"
monoNeg = Create Sound from formula... monoCos 1 0 0.5 22050 -sin(2*pi*200*x)
Fade in: 0, 0, 0.08, "yes"
Fade out: 0, 0.42, 0.08, "yes"

selectObject: monoPos,monoNeg
stereoOutOfPhaseShort = Combine to stereo
Rename... stereoOutOfPhaseShort

selectObject: monoPos
monoPos2 = Copy... monoPos2
selectObject: monoPos,monoPos2
stereoInPhaseShort = Combine to stereo
Rename... stereoInPhaseShort

stereoInPhaseQuietShort = Copy... stereoInPhaseQuietShort

removeObject: monoPos2

selectObject: monoPos,monoNeg,stereoInPhaseShort,stereoOutOfPhaseShort
Scale intensity... 77.0

selectObject: stereoInPhaseQuietShort
Scale intensity... 71.0

Save as WAV file... stereoInPhaseQuietShort.wav

selectObject: stereoInPhaseShort
Save as WAV file... stereoInPhaseShort.wav

selectObject: stereoOutOfPhaseShort
Save as WAV file... stereoOutOfPhaseShort.wav

select monoPos 
Remove

select monoNeg
Remove







