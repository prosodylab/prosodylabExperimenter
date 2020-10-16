<?php
copy($_FILES['filedata']['tmp_name'],"../" . $_REQUEST["filename"] . ".webm");
file_put_contents("../" . $_REQUEST["filename"] . ".lab", $_REQUEST["lab"]);
?>