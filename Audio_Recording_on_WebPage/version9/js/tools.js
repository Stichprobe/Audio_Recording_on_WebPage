
function encode_parameters_from_object (params) {
	//let params = { width:1680, height:1050 };
	// convert object to list -- to enable .map
	let data = Object.entries(params);
	// encode every parameter (unpack list into 2 variables)
	data = data.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
	// combine into string
	let query = data.join('&');
	
	return query;
}

function afterInit (adoc) {
	var doc = adoc;
	var done = false;
	var element = doc.getElementById('myform');
	var theFunction = function() {
			if (!done) {
				setup_form (doc, formdef);
				done = true;
			};
	};
	
	element.addEventListener
		('DOMSubtreeModified'
		, theFunction
		);
};


function abc() {
	alert ("test");
};

function getTimeStamp () {
	return new Date().toISOString().replace(/T/, ' ')
	 .replace(/\..+/, '')
	 .split(' ').join('')
	 .split(':').join('')
	 .split('-').join('');
}

function includeHTML() {
	  var z, i, elmnt, file, xhttp;
	  /* Loop through a collection of all HTML elements: */
	  z = document.getElementsByTagName("*");
	  for (i = 0; i < z.length; i++) {
	    elmnt = z[i];
	    /*search for elements with a certain atrribute:*/
	    file = elmnt.getAttribute("w3-include-html");
	    if (file) {
	      /* Make an HTTP request using the attribute value as the file name: */
	      xhttp = new XMLHttpRequest();
	      xhttp.onreadystatechange = function() {
	        if (this.readyState == 4) {
	          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
	          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
	          /* Remove the attribute, and call this function once more: */
	          elmnt.removeAttribute("w3-include-html");
	          includeHTML();
	        }
	      }
	      xhttp.open("GET", file, true);
	      xhttp.send();
	      /* Exit the function: */
	      return;
	    }
	  }
}


function getParamValue(paramName)
	{
	    var url = window.location.search.substring(1); //get rid of "?" in querystring
	    var qArray = url.split('&'); //get key-value pairs
	    for (var i = 0; i < qArray.length; i++) 
	    {
	        var pArr = qArray[i].split('='); //split key and value
	        if (pArr[0] == paramName) 
	            return pArr[1]; //return value
	    }
	}