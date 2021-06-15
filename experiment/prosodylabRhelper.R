
convertVariables <- function(df) {
  # columns that are usually read as factors but should be numeric:
  numericColMatlab = c("trialDuration")
  
  numericColPraatscript = c("rIntensity","rPitch","rDuration","duration", "silence", "duraSil", "phoneLength", "meanPitch", "maxPitch", "maxPitTime", "minPitch", "minPitTime", "pitch1", "pitch1_time", "pitch2", "pitch2_time", "pitch3", "pitch3_time", "pitch4", "pitch4_time", "pitch5", "pitch5_time", "pitch6", "pitch6_time", "pitch7", "pitch7_time", "pitch8", "pitch8_time", "pitch9", "pitch9_time", "pitch10", "pitch10_time", "meanIntensity", "maxIntensity", "maxIntTime", "intensity1", "intensity1_time", "intensity2", "intensity2_time", "intensity3", "intensity3_time", "intensity4", "intensity4_time", "intensity5", "intensity5_time", "intensity6", "intensity6_time", "intensity7", "intensity7_time", "intensity8", "intensity8_time", "intensity9", "intensity9_time", "intensity10", "intensity10_time", "zstart", "zend", "zDuration", "zPhonelength", "zmeanPitch", "zmaxPitch", "zmaxPitTime", "zminPitch", "zminPitTime", "zmeanIntensity", "zmaxIntensity", "zmaxIntTime", "response", "duration", "silence", "durasil", "meanpitch", "maxpitch", "maxPitTime", "minPitch", "minPitTime", "firstpitch", "secondpitch", "thirdpitch", "fourthpitch", "meanIntensity", "maxIntensity", "zduration", "zbeginzone", "zendzone", "zphonelength", "zmeanpitch", "zmaxpitch", "zmaxPitTime", "zminPitch", "zminPitTime", "zfirstpitch", "zsecondpitch", "zthirdpitch", "zfourthpitch", "zmeanIntensity", "zmaxIntensity", "durasil", "meanpit", "maxpitch", "maxPitTime", "minpitch", "minPitTime", "firstpitch", "secondpitch", "thirdpitch", "fourthpitch", "meanIntensity", "maxIntensity", "firstF1", "firstF2", "firstdif", "secondF1", "secondF2", "seconddif", "thirdF1", "thirdF2", "thirddif", "fourthF1", "fourthF2", "fourthdif", "fifthF1", "fifthF2", "fifthdif")
  
  numericColJspsychExperimenter = c("trial_index","time_elapsed","rt","correct","headPhoneScreenerScore") 
  
  numeriColOther = c("F1","F2")
  
  numericCols = c(numericColMatlab,numericColPraatscript, numericColJspsychExperimenter)
  
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


importData <- function(pathData,pathStudyFile) {
  
  require(jsonlite)
  require(tidyverse)
  
  studyFile = read.csv(pathStudyFile,
                       sep="\t", header=TRUE) %>% convertVariables()
  
  # create a list of the "data*"  files from your target directory
  fileList <- list.files(path=pathData,pattern="data*")
  # keep only .json files
  fileList  = Filter(function(x) grepl(".json", x), fileList)
  
  d <- data.frame()
  
  # load in  data files  from all participants
  for (i in 1:length(fileList)){
    #print(fileList[i])
    paste0('data/',fileList[i])
    tempData = fromJSON(paste0(pathData,'/',fileList[i]), flatten=TRUE)
    
    # this line replaces NA for experiments where due to a bug components other than the test trials didn't have participant number added ot them
    tempData$participant = unique(tempData$participant[!is.na(tempData$participant)])
    tempData$pList = as.character(tempData$pList)
    d <- bind_rows(d,tempData)
  }
  
  # tempData = fromJSON(paste0(pathData,'/','data_5f87791cf3c64e1a1f313d66.json'), flatten=TRUE)
  
  # initiate data frame  with participant information
  participants <- data.frame(participant = unique(d$participant))
  
  # questionnaire data:
  # how to convert json cell into  columns (there might be an easier way using  jsonlite more directly?): https://stackoverflow.com/questions/41988928/how-to-parse-json-in-a-dataframe-column-using-r
  
  
  #  study parameters:
  if (nrow(filter(d,component=='experimentSettings'))!=0){
    experimentSettings <- d %>% 
      filter(component=='experimentSettings') %>% 
      dplyr::select(c(c("path", "stimulusFile", "testRun", "language", "logFile", "soundCheckFile", 
                        "recordingTimeOut", "completionLink", "completionCode", "pListMethod", 
                        "participantCodeMethod", "displayDataAfterFinish", "showProgressBar", 
                        "fullScreen", "hello", "consent", "languageQuestionnaire", "soundCheck", 
                        "micCheck", "headphoneScreener", "experimentSessions", "postExQuestionnaire", 
                        "musicQuestionnaire", "goodbye", "experimentOnly"))) 
    d = d %>%  dplyr::select(-c("path", "stimulusFile", "testRun", "language", "logFile", "soundCheckFile", 
                                "recordingTimeOut", "completionLink", "completionCode", "pListMethod", 
                                "participantCodeMethod", "displayDataAfterFinish", "showProgressBar", 
                                "fullScreen", "hello", "consent", "languageQuestionnaire", "soundCheck", 
                                "micCheck", "headphoneScreener", "experimentSessions", "postExQuestionnaire", 
                                "musicQuestionnaire", "goodbye", "experimentOnly"))
  }
  
  #  post-experiment questionnaire data:
  if (nrow(filter(d,component=='Post-experiment Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Post-experiment Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  #  music  questionnaire data:
  if (nrow(filter(d,component=='Music Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Music Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  if (nrow(filter(d,component=='Language Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Language Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  if (nrow(filter(d,component=='Headphone screener'))!=0){
    participants = d %>% 
      filter(component=='Headphone screener'&grepl("Headphone screener question",trialPart)) %>%
      mutate(correct = as.numeric(as.character(correct))) %>%
      group_by(participant) %>%
      summarise(headPhoneScreenerScore=mean(correct)) %>%
      as.data.frame %>%
      right_join(participants, by = c("participant"))
  }
  
  
  # organize experimental results
  
  # some parts were missing component specification:
  d$component[d$trialPart=='question1']='experiment'
  
  # goal: get all information for a trial on a single line
  
  experimentTrials = d %>% 
    filter(trialPart%in%c("question1"))
  
  
  # both.wide=stats::reshape(both,
  #                          idvar=idvariable,
  #                          timevar=timevariable,
  #                          v.names=whichColumnsVary(both,idvariable,timevariable),
  #                          direction="wide")
  
  experimentTrials <- experimentTrials %>%
    # combine  with participant information
    right_join(participants,by = c("participant")) %>%
    # turn empty strings (e.g., "",  '',  "  ") into NA
    apply(2, function(x) gsub("^$|^ $", NA, x))  %>%
    as.data.frame %>% convertVariables()
  
  experimentTrials = left_join(experimentTrials,studyFile,by=c("experiment","item","condition")) ## %>%
  #filter(!is.na(chosenOption))
  
  
  returnList = list("settings" = experimentSettings, "data" =  experimentTrials)
  return(returnList)
  
}
