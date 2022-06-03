<?php

$filename = "../" . $_REQUEST["path"] . $_REQUEST["filename"];


// write audio to .webm
$webmFilename = $filename . ".webm";

if (is_readable($webmFilename)){
      exec("echo 'overwriting $webmFilename, there was a previous version!' >> ../" .  $_REQUEST["path"] . "_convert.log", $output, $resultCode);
}

copy($_FILES['filedata']['tmp_name'],$webmFilename);

// write transcription to .lab text file
$labFilename = $filename . ".lab";
file_put_contents($labFilename, $_REQUEST["lab"]);

// ways to call shell commands:
// all three ways to write 'hello world' below work:
//echo shell_exec("echo 'Hello world!' > testtest.txt");
//system("echo 'Hello world!' > testtest.txt", $resultCode);
//exec("echo 'Hello world!' > ../" .  $_REQUEST["path"] . "testtest.txt", $output, $resultCode);

// command to convert .webm to .wav:
$wavFilename = $filename . ".wav";
$ffmpegCommand = "ffmpeg -y -i $webmFilename -ac 1 -f wav $wavFilename";
//exec($ffmpegCommand, $output, $resultCode);

if (`which ffmpeg`) {
  if (is_readable($wavFilename)){
      exec("echo 'overwriting $wavFilename, there was a previous version!' >> ../" .  $_REQUEST["path"] . "_convert.log", $output, $resultCode);
  }
    exec($ffmpegCommand, $output, $resultCode);
    if (is_readable($wavFilename)){
      exec( "rm " . $webmFilename, $output, $resultCode);
    }
    else {
      exec("echo 'tried to convert $webmFilename to .wav, but no file written' >> ../" .  $_REQUEST["path"] . "_convert.log", $output, $resultCode);
    }
}
else { 
    exec("echo 'ffmpeg not installed, cannot convert to .wav' >> ../" .  $_REQUEST["path"] . "_convert.log", $output, $resultCode);

}


?>