<?php
include "header.php";
echo "<div class=\"eingabenr\">" . WW_Eingabe . $katze->Katzennummer . WW_Von . $katze->maxKatzen . '</div><br><br><br>';
// echo WW_Eingabe. $katze->Katzennummer .WW_Von . $katze->maxKatzen . '<br><br><br><br>';
?>

<?php echo $katze->$fields['QText'] ?>
<br>
<?php // echo $katze->$fields['QsoundLink'] ?>

<?php
/*
 * $soundplayer=<<<EOD
 * <br>
 * <object type="application/x-shockwave-flash" data="player_mp3_maxi.swf" width="200" height="20">
 * <param name="movie" value="player_mp3_maxi.swf" />
 * <param name="bgcolor" value="#ffffff" />
 * <param name="FlashVars" value="mp3=
 * EOD;
 * $soundplayer.= WW_MP3DIRURL . $katze->$fields['QsoundLink'] . '&amp;showvolume=1&amp;showstop=1\" />' ."\n". '</object><br>';
 */

$audiotype = substr($katze->$fields['QsoundLink'], - 3) == "wav" ? "audio/wav" : "audio/mpeg";

$soundplayer = '<audio controls>  <source src="' . WW_MP3DIRURL . $katze->$fields['QsoundLink'] . '" type="' . $audiotype . '"> Your browser does not support the audio tag. </audio> ';
if ($katze->$fields['QsoundLink'] != '')
    echo $soundplayer;
if ($katze->$fields['Qinfo'] != '')
    echo '<br>' . $katze->$fields['Qinfo'] . '<br><br>';
if ($katze->$fields['QsoundText'] != '')
    echo '<br>' . $katze->$fields['QsoundText'] . '<br>';
?>
<form enctype="multipart/form-data" name="katzeaenderung" method="post"
	action="<?php echo $_SERVER['PHP_SELF']; ?>">
	<input type="hidden" name="ID" value="<?php echo $katze->GetId() ?>"> <input
		type="hidden" name="nextKatze" value="<?php echo $katze->nextKatze ?>">
	<input type="hidden" name="maxKatzen"
		value="<?php echo $katze->maxKatzen ?>"> <input type="hidden"
		name="Katzennummer" value="<?php echo $katze->Katzennummer ?>"> <input
		type="hidden" name="buttonaction"
		value="<?php echo $katze->Buttonaction ?>">
<?php if (isset($errormsg['fileupload'])) echo "<br>".$errormsg['fileupload']."<br>";?>

<!-- MAX_FILE_SIZE muss vor dem Dateiupload Input Feld stehen -->
	<input type="hidden" name="MAX_FILE_SIZE" value="10000000" />
	<!-- Der Name des Input Felds bestimmt den Namen im $_FILES Array -->
<?php echo WW_upload_info; ?>
Soundfile: <input name="userfile" type="file" /> <input type="submit"
		value="<?php echo WW_BUTTON_Senden; ?>" />

</form>
<?php
include_once "footer.php";
?>