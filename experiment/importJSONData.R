
convertColumnsExperimenter <- function(df) {
 
  # these columns will be coded as numeric, all others as factors:
  numericColumnsExperimenter = c("trial_index","time_elapsed","rt","correct","headPhoneScreenerScore",
                                 "birth.year",
                                 "firstStartage","firstSpeaking","firstUnderstanding",
                                 "secondStartage","secondSpeaking","secondUnderstanding",
                                 "thirdStartage","thirdSpeaking","thirdUnderstanding",
                                 "fourthStartage","fourthSpeaking","fourthUnderstanding"
                                 ) 
  
  # convert to numeric column, otherwise treat as factor:
  for (i in 1:ncol(df)) {
    if (colnames(df)[i] %in% numericColumnsExperimenter) {
      df[, i] <- as.numeric(as.character(df[, i]))
    } else {
      df[, i] <- as.factor(as.character(df[, i]))
    }
  }
  return(df)
}


# imports json files and process them, returning to data frames, one with the particiants information
# one with the participant information
importData <- function(partsToKeep='question1',pathStimulusFile,pathData='data') {
  
  # determine name of stimulusFile based on index.html file
  if (missing(pathStimulusFile)) {
    #
    # load index.html file
    pathStimulusFile = readLines('../index.html')
    # keep only the line with the text we're looking for
    pathStimulusFile <- pathStimulusFile[grepl(pattern = "  stimulusFile: ", x = pathStimulusFile, fixed = TRUE)]
    # extract stimulusFile name:
    pathStimulusFile  = paste0(regmatches(pathStimulusFile, gregexpr("(?<=\')(.*?)(?=\')", pathStimulusFile, perl = TRUE)))
    # doesn't work:
    #gsub(".*\'|\'.*", "", stimulusFile)
    #str_extract(stimulusFile, "\'.*?\'")
  }
  
  require(jsonlite)
  require(tidyverse)
  
  # import experiment spreadsheet and turn columns into factors
  studyFile = read.csv(pathStimulusFile,
                       sep="\t", header=TRUE) %>% convertColumnsExperimenter()
  
  # create a list of the "data*"  files from your target directory
  fileList <- list.files(path=pathData,pattern="data*")
  # keep only .json files
  fileList  = Filter(function(x) grepl(".json", x), fileList)
  
  d <- data.frame()
  
  # load in  data files  from all participants
  for (i in 1:length(fileList)){
    #print(fileList[i])
    #paste0('data/',fileList[i])
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
  
  
  #  extract study parameters into variable:
  if (nrow(filter(d,component=='experimentSettings'))!=0){
    experimentSettings <- d %>% 
      filter(component=='experimentSettings') %>% 
      dplyr::select(c(c("path", "stimulusFile", "testRun", "language", "logFile", "soundCheckFile", 
                        "recordingTimeOut", "completionLink", "completionCode", "pListMethod", 
                        "participantCodeMethod", "displayDataAfterFinish", "showProgressBar", 
                        "fullScreen", "hello", "consent", "languageQuestionnaire", "soundCheck", 
                        "micCheck", "headphoneScreener.includeHeadphoneScreener", 
                        "headphoneScreener.stimuli", "headphoneScreener.numberChances", 
                        "headphoneScreener.threshold", "headphoneScreener.excludeOnFail", 
                        "headphoneScreener.completionFailLink", "headphoneScreener.failMessage", "experimentSessions", "postExperimentQuestionnaire", 
                        "musicQuestionnaire", "goodbye", "experimentOnly"))) 
    d = d %>%  dplyr::select(-c("path", "stimulusFile", "testRun", "language", "logFile", "soundCheckFile", 
                                "recordingTimeOut", "completionLink", "completionCode", "pListMethod", 
                                "participantCodeMethod", "displayDataAfterFinish", "showProgressBar", 
                                "fullScreen", "hello", "consent", "languageQuestionnaire", "soundCheck", 
                                "micCheck", "headphoneScreener.includeHeadphoneScreener", 
                                "headphoneScreener.stimuli", "headphoneScreener.numberChances", 
                                "headphoneScreener.threshold", "headphoneScreener.excludeOnFail", 
                                "headphoneScreener.completionFailLink", "headphoneScreener.failMessage", "experimentSessions", "postExperimentQuestionnaire", 
                                "musicQuestionnaire", "goodbye", "experimentOnly"))
  }
  
  #  add post-experiment questionnaire data to participant data frame:
  if (nrow(filter(d,component=='Post-experiment Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Post-experiment Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  #  add music  questionnaire data to participant data frame:
  if (nrow(filter(d,component=='Music Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Music Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  # add language questionnaire to participant data frame
  if (nrow(filter(d,component=='Language Questionnaire'))!=0){
    participants <- d %>% 
      filter(component=='Language Questionnaire') %>% 
      dplyr::select(c(participant,responses)) %>%
      mutate(responses = map(responses, ~ fromJSON(.) %>% 
                               as.data.frame())) %>% 
      unnest(responses) %>% 
      right_join(participants, by = c("participant"))
  }
  
  # head headphone screener to participant data frame
  if (nrow(filter(d,component=='Headphone screener'))!=0){
    participants = d %>% 
      filter(component=='Headphone screener'&grepl("Headphone screener question",trialPart)) %>%
      mutate(correct = as.numeric(as.character(correct))) %>%
      group_by(participant) %>%
      summarise(headPhoneScreenerScore=mean(correct)) %>%
      as.data.frame %>%
      right_join(participants, by = c("participant"))
  }
  
  
  # process experimental results, keeping only specified trialparts:
  
  # questions were missing component specification in early experiments:
  d$component[d$trialPart=='question1'&is.na(d$component)]='experiment'
  
  # goal: get all information for a trial on a single line
  
  experimentTrials = d %>% 
    filter(trialPart%in%partsToKeep)
  
  experimentTrials <- experimentTrials %>%
    # combine  with participant information
    right_join(participants,by = c("participant")) %>%
    # turn empty strings (e.g., "",  '',  "  ") into NA
    apply(2, function(x) gsub("^$|^ $", NA, x))  %>%
    as.data.frame %>% convertColumnsExperimenter()
  
  experimentTrials = left_join(experimentTrials,studyFile,by=c("experiment","item","condition")) ## %>%
  #filter(!is.na(chosenOption))
  
  returnList = list("settings" = experimentSettings, "data" =  experimentTrials)
  return(returnList)
  
}

