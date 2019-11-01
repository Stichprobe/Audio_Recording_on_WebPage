
 <audio id="Test_Audio" controls> 
  
        <source src= "http://audio.stichprobe.eu/doc/test/test.wav"
                type="audio/mpeg"> 
    </audio> 

<?php


define('WW_MP3DIRURL','http://audio.stichprobe.eu/doc/test/');

define('WW_MP3DIR','/var/www/eingabe_stichprobe/doc/');
define('WW_DOCDIRURL','http://hodis-eingabe.stichprobe.eu/doc/');
define('WW_DOCDIR','/var/www/eingabe_stichprobe/doc/');
define('WW_FAVICON','./favicon.ico');
define('WW_WEBSITE','hodis-eingabe.stichprobe.eu');


	$file="Chinese7_01.mp3";
	$file="test.wav";
	$audiotype= substr($file, -3) == "wav" ? "audio/wav" : "audio/mpeg";
//$audiotype="audio/wav";

$soundplayer= '<audio controls>  <source src="' . WW_MP3DIRURL . $file .'" type="' . $audiotype . '"> Your browser does not support the audio tag. </audio> ';
echo $soundplayer;
?>