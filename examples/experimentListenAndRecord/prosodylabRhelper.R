


convertVariables <- function(df) {
  # columns that are usually read as factors but should be numeric:
  numericColMatlab = c("trialDuration")
  
  numericColPraatscript = c("duration", "silence", "duraSil", "phoneLength", "meanPitch", "maxPitch", "maxPitTime", "minPitch", "minPitTime", "pitch1", "pitch1_time", "pitch2", "pitch2_time", "pitch3", "pitch3_time", "pitch4", "pitch4_time", "pitch5", "pitch5_time", "pitch6", "pitch6_time", "pitch7", "pitch7_time", "pitch8", "pitch8_time", "pitch9", "pitch9_time", "pitch10", "pitch10_time", "meanIntensity", "maxIntensity", "maxIntTime", "intensity1", "intensity1_time", "intensity2", "intensity2_time", "intensity3", "intensity3_time", "intensity4", "intensity4_time", "intensity5", "intensity5_time", "intensity6", "intensity6_time", "intensity7", "intensity7_time", "intensity8", "intensity8_time", "intensity9", "intensity9_time", "intensity10", "intensity10_time", "zstart", "zend", "zDuration", "zPhonelength", "zmeanPitch", "zmaxPitch", "zmaxPitTime", "zminPitch", "zminPitTime", "zmeanIntensity", "zmaxIntensity", "zmaxIntTime", "response", "duration", "silence", "durasil", "meanpitch", "maxpitch", "maxPitTime", "minPitch", "minPitTime", "firstpitch", "secondpitch", "thirdpitch", "fourthpitch", "meanIntensity", "maxIntensity", "zduration", "zbeginzone", "zendzone", "zphonelength", "zmeanpitch", "zmaxpitch", "zmaxPitTime", "zminPitch", "zminPitTime", "zfirstpitch", "zsecondpitch", "zthirdpitch", "zfourthpitch", "zmeanIntensity", "zmaxIntensity", "durasil", "meanpit", "maxpitch", "maxPitTime", "minpitch", "minPitTime", "firstpitch", "secondpitch", "thirdpitch", "fourthpitch", "meanIntensity", "maxIntensity", "firstF1", "firstF2", "firstdif", "secondF1", "secondF2", "seconddif", "thirdF1", "thirdF2", "thirddif", "fourthF1", "fourthF2", "fourthdif", "fifthF1", "fifthF2", "fifthdif")
  
  numericColJspsychExperimenter = c("trial_index","time_elapsed","rt","correct","headPhoneScreenerScore") 
  
  numericCols = c(numericColMatlab,numericColPraatscript,numericColJspsychExperimenter)
  
  nColumns = ncol(df)
  # convert to numeric column, otherwise treat as factor:
  for (i in 1:nColumns) {
    if (colnames(df)[i] %in% numericCols) {
      df[, i] <- as.numeric(as.character(df[, i]))
    } else {
      df[, i] <- as.factor(as.character(df[, i]))
    }
  }
  return(df)
}