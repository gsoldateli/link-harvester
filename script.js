(function(window){
	function harvestLinks (input) {
		//Checking string passed
		if(!input) throw "harvestLinks have not received the input parameter.";

		//a href and text matching pattern
		var pattern = /<a.*?href="([^>"]*)"[\s\S]*?>([\s\S]*?)<\/a>/gm;
		var isEmailPattern = /^mailto:/;
		var harvest = {
		    links: [],
		    emailAddresses: []
		}; 
		var link = null;
		var linkText = null;

		while ( (match = pattern.exec(input)) != null)
		{
	      link = match[1];
	      linkText = match[2];
		    
	      if(link.search(isEmailPattern) > -1) {
	        harvest.emailAddresses.push(link.replace(isEmailPattern,''));
	        continue;
	      }
	    
	      harvest.links.push({linkText: linkText, url:link});

		}  

		return harvest;
	};

	function handleFileSelect(evt) {
		console.log('fileSelect');
	    var files = evt.target.files; // FileList object
	    console.log(files);
	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {

	      var reader = new FileReader();

	      // Closure to capture the file information.
	      reader.onload = (function(theFile) {
	        return function(e) {
	          document.getElementById('text').value = reader.result;
	        };
	      })(f);

	      // Read in the image file as a data URL.
	      reader.readAsText(f);

	    }
  	}

  	document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);

  	function _renderLinks(harvest) {
  		var links = harvest.links;
  		var linkList = document.querySelector('.result-list--link');
  		var content = '';
  		if(!links.length) {
  			linkList.innerHTML = '<li>No links found!</li>';
  			return false;
  		}

  		for (var i = 0; i < links.length; i++) {
  			content += '<li>'+links[i].linkText+' --> '+links[i].url+'</li>';
  		}

  		linkList.innerHTML = content;
  	}

  	function _renderEmails(harvest) {
  		var emails = harvest.emailAddresses;
  		var emailList = document.querySelector('.result-list--email');
  		var content = '';

  		if(!emails.length) {
  			emailList.innerHTML = '<li>No emails found!</li>';
  			return false;
  		}

  		for (var i = 0; i < emails.length; i++) {
  			content += '<li>'+emails[i]+'</li>';
  		}

  		emailList.innerHTML = content;
  	}  	

  	function parseContent(evt) {
  		evt.stopImmediatePropagation();

  		var content = document.getElementById('text').value;

  		if( !content.length ) {
  			alert('Please insert some text to the input above!');
  		}

  		var harvest = harvestLinks(document.getElementById('text').value);

  		_renderLinks(harvest);
  		_renderEmails(harvest);
  	}



  	document.getElementById('submitHarvest').addEventListener('click', parseContent);

})(window);