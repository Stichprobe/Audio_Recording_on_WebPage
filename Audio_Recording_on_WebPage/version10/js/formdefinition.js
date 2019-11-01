

	class FormDefinition {
		
		constructor (dataType, url, basefilename, filename, message, addtimestamp, additionalFormData) {
			this.dataType			= dataType;
			this.url				= url;
			this.basefilename		= basefilename;
			this.additionalFormData = additionalFormData;
			this.addtimestamp       = addtimestamp;
			this.message            = message;
		}
		
	}
	
	
	
	function getformdef (server_name) {
		
		
		if (server_name == 'zizibe') {
			additionalFormData = new FormData();
			additionalFormData.append('XXXXX', 'XXXXXX');
			return new FormDefinition (
				dataType     = "text",
			    url          = 'http://audio.stichprobe.eu/upload.php',
			    basefilename = "recording",
				filename     = "test4.wav",
				addtimestamp = true,
				additionalFormData = additionalFormData
			)
		};
		
		if (server_name == 'vienna1') {
			additionalFormData = new FormData();
			additionalFormData.append('ZZZZZZ', 'ZZZZZ');
			return new FormDefinition (			
				dataType     = "text",
			    //url          = 'https://eingabe.stichprobe.eu/audio/www/upload.php',
				url          = 'https://eingabe.stichprobe.eu/upload.php',
			    basefilename = "recording",
				filename     = "test4.wav",
				addtimestamp = false,
				additionalFormData = additionalFormData
			)
		};
		
	}		
