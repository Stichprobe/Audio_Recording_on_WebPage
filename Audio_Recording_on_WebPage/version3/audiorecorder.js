/**
 * 
 */

	class AudioRecorder {
		
		constructor () {
			
			this.sampletimespan    = 1000
			
			// INIT
			this.shouldStop        = false;
			this.stopped           = false;	
			this.recordedChunks    = [];

			//MediaDevice Stream Init
			this.stream            = null;
			this.media_constraints = { video: false, audio: true };		
			
			//Init the Media Recorder
			this.media_options   = {mimeType : 'audio/webm'};		
			this.mediaRecorder   = null;
			
			//Handler
			this.onEndCalc = null;
			this.onStatus  = null;
			
			this.ondataavailable 	= null;
		    this.onerror      		= null;   
		    this.onstart         	= null;
			this.onstop  			= null;
			
			this.initMediaStream ();
			
			
			//Just For TEST
			this.status = 'NEW';
		}
		
		initMediaStream () {
			//=====================================================
			// If thestream is available, the next lines should not be called
			if (this.stream == null) {
				navigator.mediaDevices.getUserMedia(this.media_constraints)
					.then(this.handleMediaSuccess.bind(this))
					.catch(e => console.error(e));
			}
		}
		
		handleMediaSuccess (stream) {
			this.stream = stream;
		}
		
		
		//--------------------------------------------

		stopRecording () {
			this.shouldStop = true;
			this.statuslog  ("STOP triggered");
		}
		
		startRecording () {
			this.statuslog ('waiting for start');
			//status("waiting....");
			//log (document.featurePolicy.allowedFeatures());		
			
			//##############
			//TODO: eventuell hier auch data available ausloesen
			
			this.recordedChunks = [];
			this.shouldStop     = false;
			this.stopped        = false;
			
			this.reinitMediaRecorder();
		}

		reinitMediaRecorder () {
			//=====================================================
			// should be seperated
			this.initMediaRecorder (this.stream);
			
			// Event handler
			let mediaRecorder = this.mediaRecorder;
			
			mediaRecorder.ondataavailable = this.mrdataavailable.bind(this);
		    mediaRecorder.onerror         = this.mrerror.bind(this);
		    mediaRecorder.onstart         = this.mrstart.bind(this);
			mediaRecorder.onstop          = this.mrstop.bind(this);

			
			//console.log ("media recorder started...");
			this.log ("media recorder started...");
		}
		
		initMediaRecorder (thestream) {
			this.log("media device success...");
			let media_options = this.mediaoptions;
			//const mediaRecorder = new MediaRecorder(stream, media_options);
			this.mediaRecorder = new MediaRecorder(thestream, media_options);
			this.mediaRecorder.start(this.sampletimespan); // maximale sample time
			
			this.log("media recorder init/start done ...");
		}
		//----------------------------------------------
		//Internal Handlers for Mediarecorder
		mrdataavailable (e) {
			this.send_datavailable ();
			this.statuslog("Handling on data available");
			if (e.data.size > 0) {
				this.recordedChunks.push(e.data);
				this.statuslog(e.data);
			}

			if (this.shouldStop === true && this.stopped === false) {
				this.mediaRecorder.stop();
				this.stopped = true;
				this.statuslog ("clicked... and ... stopped");
			}
		};
		
		mrerror (e) {
			this.send_error (e);
	        this.statuslog('Error: ' + e);
	    };
	    
	    mrstart () {
	    	this.send_start ();
	    	this.statuslog('Started, state = ' + this.mediaRecorder.state);
	    };
	    
	    mrstop (e) {
	    	
	    	let blob = new Blob(this.recordedChunks);
	    	let href = URL.createObjectURL(blob);
	    	
			//downloadLink.href = href;
			//downloadLink.download = 'acetest.wav';
		
			this.statuslog('media recorder stopped');
			this.send_stop(e, blob);
			//statusText.innerHTML = "stopped";
		};

		//----------------------------------------------
		log (message) {
			console.log (message);
		}

		send_status (html_message) {
			this.status = html_message;
			if (this.onStatus != null) {
				this.onStatus (html_message);
			}
		}
		
		statuslog (message) {
			this.log (message)
			let html_message = message //encode???
			this.send_status (html_message)
		}
		
		send_datavailable () {
			if (this.ondataavailable 	!= null){
				this.ondataavailable ();
			}
		}
		
		send_error (e) {	
			if (this.onerror      		!= null) {
				this.onerror (e);
			}; 
		}
		
		send_start () {
			if (this.onstart         	!= null) {
				this.onstart ();
			};
		}
	
		send_stop (e, blob) {
			if (this.onstop  			!= null) {
				this.onstop (e, blob);
			};
		}
		
	}