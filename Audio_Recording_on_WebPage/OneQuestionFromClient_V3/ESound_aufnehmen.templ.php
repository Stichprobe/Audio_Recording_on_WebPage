<?php
<!-- HEADER START -->
include "header.php";
<!-- HEADER END -->


<!--  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!--  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!--  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!--  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- HEADER END -->

<!--  EINGABE  START -->
echo "<div class=\"eingabenr\">" . WW_Eingabe . $katze->Katzennummer . WW_Von . $katze->maxKatzen . '</div><br><br><br>';
// echo WW_Eingabe. $katze->Katzennummer .WW_Von . $katze->maxKatzen . '<br><br><br><br>';
<!--  EINGABE  END -->
?>



<!--  QUESTION TEXT START  -->
<?php echo $katze->$fields['QText'] ?>
<!--  QUESTION TEXT END -->

<br>
<?php // echo $katze->$fields['QsoundLink'] ?>



<!--  NEW AUDIO INIT START   -->
$audiotype = substr($katze->$fields['QsoundLink'], - 3) == "wav" ? "audio/wav" : "audio/mpeg";

$soundplayer = '<audio controls>  <source src="' . WW_MP3DIRURL . $katze->$fields['QsoundLink'] . '" type="' . $audiotype . '"> Your browser does not support the audio tag. </audio> ';
<!--  NEW AUDIO INIT END   -->
<!--  SOUNDPLAYER START -->
if ($katze->$fields['QsoundLink'] != '')
    echo $soundplayer;
<!--  SOUNDPLAYER END -->
	
<!--  QUESTIONINFO START  -->
if ($katze->$fields['Qinfo'] != '')
    echo '<br>' . $katze->$fields['Qinfo'] . '<br><br>';
<!--  QUESTIONINFO END  -->
	
<!--  QUESTIONSOUNDTEXT START  -->
if ($katze->$fields['QsoundText'] != '')
    echo '<br>' . $katze->$fields['QsoundText'] . '<br>';
?>
<!--  QUESTIONSOUNDTEXT END  -->
<!-- FORM -->
<form 
	enctype="multipart/form-data" 
	name="katzeaenderung" 
	method="post"
	action="<?php echo $_SERVER['PHP_SELF']; ?>">
	
	<input 
		type="hidden" 
		name="ID" 
		value="<?php echo $katze->GetId() ?>"> 
	
	<input
		type="hidden" 
		name="nextKatze" 
		value="<?php echo $katze->nextKatze ?>">
	<input 
		type="hidden" 
		name="maxKatzen"
		value="<?php echo $katze->maxKatzen ?>"> 
		
	<input 
		type="hidden"
		name="Katzennummer" 
		value="<?php echo $katze->Katzennummer ?>">
		
	<input
		type="hidden" 
		name="buttonaction"
		value="<?php echo $katze->Buttonaction ?>">
		
		
<!-- ERROR MSG START -->		
<?php if (isset($errormsg['fileupload'])) echo "<br>".$errormsg['fileupload']."<br>";?>
<!-- ERROR MSG STOP -->

<!-- MAX_FILE_SIZE muss vor dem Dateiupload Input Feld stehen -->
	<input type="hidden" name="MAX_FILE_SIZE" value="10000000" />
	<!-- Der Name des Input Felds bestimmt den Namen im $_FILES Array -->

<!-- UPLOAD INFO START -->
<?php echo WW_upload_info; ?>
<!-- UPLOAD INFO END -->

<!-- UPLOAD CTRL START -->
Soundfile: <input name="userfile" type="file" /> 
<!-- UPLOAD CTRL END -->

<!-- SUBMIT BUTTON START -->           
<input type="submit" value="<?php echo WW_BUTTON_Senden; ?>" />
<!-- SUBMIT BUTTON END --> 

</form>

<!-- FOOTER START -->

<?php
include_once "footer.php";
?>
<!-- FOOTER END -->