<pre>
<?php
var_dump($_POST);
var_dump($_FILES);
move_uploaded_file($_FILES['datei']['tmp_name'], WW_MP3DIR.$_FILES['datei']['name']);
?>
