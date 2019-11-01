/**
 * 
 */
//import 'jquery-countdown/dist/jquery.countdown.min.js';
//import "http://code.jquery.com/jquery-1.11.0.min.js";

class BlobUploader {
	
	
	constructor (dataType, url, filename, additionalFormData) {
        //this.dataType = "text";
        //this.url      = 'http://audio.stichprobe.eu/upload.php';     
		//this.filename = "test3.wav"
		
		this.dataType = dataType;
        this.url      = url;     
		this.filename = filename;
		
		this.additionalFormData = additionalFormData;
		
		//===============
		this.current_blob = null;
		
		
		//Handler 
		this.onsuccess 			= null;
	    this.onerror      		= null;   
	    this.onstart         	= null;
		this.onstop  			= null;
		
		this.onStatus			= null;
	}
	
	handle_filereader_onload (event)
	{
    	this.statuslog("this function is triggered once a call to readAsDataURL returns");
        var fd = new FormData();
        
        let filename  = this.filename;

        fd.append('name', filename);
        fd.append('datei', this.current_blob, filename);
        
        if (this.additionalFormData != null) {
        	for (var pair of additionalFormData.entries()) {
        		fd.append(pair[0], pair[1]);
        	}
        }
        
        
        this.statuslog(fd);
        
        $.ajax({
            type:        'POST',
            url:         this.url,
            data:        fd,
            dataType:    this.dataType,
            crossDomain: true,
            headers: {
                "Access-Control-Allow-Origin" 
                	: '*',
                "Access-Control-Allow-Methods" 
                	: "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers"
                	: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            },
            processData: false,
            contentType: false
        })
        .done  (this.request_done.bind(this)) 
        .fail  (this.request_fail.bind(this));
    };
    
    request_done (data) {
        // print the output from the upload.php script
    	this.statuslog(data);
    	this.send_stop (data)
    }
    
    request_fail (jqXHR, textStatus, errorThrown) {  
    	this.statuslog(textStatus);
    	this.send_error (textStatus);
    }

	// javascript function that uploads a blob to upload.php
	uploadBlob (blob) {
	    // create a blob here for testing
	    // var blob = new Blob(["i am a blob üüüüüääääääää"]);
		this.current_blob = blob;
		
		this.statuslog("create filereader...");
		this.send_start ();
	    // var blob = yourAudioBlobCapturedFromWebAudioAPI;// for example
	    var reader = new FileReader();
	    
	    // this function is triggered once a call to readAsDataURL returns
	    reader.onload = this.handle_filereader_onload.bind(this);
	    
	      // reader.onload = function() {
	      // console.log(reader.result);
	      // };

	    reader.onerror = function() {
	    	  this.statuslog (reader.error);
	    	  this.senderror (reader.error);
	    };
	    
	      this.statuslog("trigger the read from the reader...");
	    // trigger the read from the reader...
	    reader.readAsDataURL(blob);
	    // reader.readAsText (blob);
	    this.statuslog("... reader.readAsDataURL is triggered");
	    
	    
	}
	
	
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
	
	send_success () {
		if (this.onsuccess 	!= null){
			this.onsuccess ();
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

	send_stop (e) {
		if (this.onstop  			!= null) {
			this.onstop (e);
		};
	}
	
}
