function log (text) {
	console.log (text);
};

function setup_form (document, formdefinition) {
	
	
	log (">>>>>>>> setup form called!");
	
	const startButton   = document.getElementById('start');
	const stopButton    = document.getElementById('stop');
	const statusText    = document.getElementById('statusText');
	//const logAudioText  = document.getElementById('logAudioText');
	const downloadLink  = document.getElementById('download');
	const sendButton    = document.getElementById('send');
	
	const audioplayer   = document.getElementById('audioplayer');
	const audiosource   = document.getElementById('audiosource');
	
	const question_div  = document.getElementById('question_div');

	
	let last_blob  = null;
	let blob_count = 0;
	
	timeStamp = getTimeStamp ();

	const onstatus = function (html_message) {
		//####################################
		//# TODO: change to on status change (outside)
		statusText.innerHTML = html_message;
		log (">>>>>>>> "+html_message);
	};
	
	const logaudioCallbacks = function (text) {
		//logAudioText.innerHTML = logAudioText.innerHtml + '<p>' + text + '</p>';
	}

	var audiorecorder = new AudioRecorder ();
	
	audiorecorder.onEndCalc = function (status) {
		onstatus (status);
	}
	
	audiorecorder.onStatus = function (status) {
		//onstatus (status);
		onstatus ("Recorded: " + blob_count + "s");
		blob_count = blob_count +1;
	}	
	
	audiorecorder.onstart = function () {
		logaudioCallbacks ("START");
		console.log ("############# START")
		
		stopButton.disabled  = false;
		startButton.disabled = true;
	}
	
	getfilename = function () {
		if (formdefinition.addtimestamp) {
			return basefilename + "_" + timeStamp + ".wav"
		} else {
			return basefilename + ".wav"
		}
	}
	
	audiorecorder.onstop = function (e, blob) {
		logaudioCallbacks ("STOP");

		timeStamp = getTimeStamp ();
		filename  = getfilename ();
		blob_count = 0;
		
		stopButton.disabled  = true;
		startButton.disabled = false;
		
		let href = URL.createObjectURL(blob);
		downloadLink.href     = href;
		downloadLink.download = filename;
		
		sendButton.disabled = false;
		
		last_blob = blob;
		
		audiosource.src = href;
		audioplayer.load();
		//audioplayer.play();

	}
	
	startButton.onclick = function() {
		onstatus ("START recording triggered:"+audiorecorder.status);
		audiorecorder.startRecording();
	};
	
	stopButton.onclick = function() {
		onstatus ("STOP trigerred:"+audiorecorder.status);
		audiorecorder.stopRecording();
	};
	
	
	
	//===================================================
	sendButton.onclick = function() {
		onstatus ("SEND trigerred");
		

		
		blobUploader = new BlobUploader 
			( formdefinition.dataType
			, formdefinition.url
			, filename
			, formdefinition.additionalFormData
			);
		blobUploader.onstop = function (e) {
			onstatus ("Sample sent: " + e);
		}
		blobUploader.uploadBlob (last_blob);
	};
	
	//=========================================================
	
	//Warning this triggers a recursion -> see include thml
	//question_div.innerHTML = formdefinition.message;

}