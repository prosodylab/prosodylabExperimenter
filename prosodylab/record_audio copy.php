<?php
copy($_FILES['filedata']['tmp_name'],"../" . $_REQUEST["path"] . $_REQUEST["filename"] . ".webm");
file_put_contents("../" . $_REQUEST["path"] . $_REQUEST["filename"] . ".lab", $_REQUEST["lab"]);

// all three ways to write 'hello world' below work:
//echo shell_exec("echo 'Hello world!' > testtest.txt");
//system("echo 'Hello world!' > testtest.txt", $resultCode);
//exec("echo 'Hello world!' > ../" .  $_REQUEST["path"] . "testtest.txt", $output, $resultCode);

// command to convert .webm to .wav:
$ffmpegCommand = "ffmpeg -i ../" . $_REQUEST["path"] . $_REQUEST["filename"] . ".webm -ac 1 -f wav " . "../" . $_REQUEST["path"] . $_REQUEST["filename"] . ".wav";


if (`which ffmpeg`) {
    exec($ffmpegCommand, $output, $resultCode);
    if file_exists(string $wavFilename) {
    
    }
    
    }
else { 
    exec("echo 'ffmpeg not installed, cannot convert to .wav' > ../" .  $_REQUEST["path"] . "_convert.log", $output, $resultCode);

}


?>