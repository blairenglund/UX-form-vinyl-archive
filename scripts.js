window.addEventListener("load", function() {

	//CLICKABLE ELEMENTS -------------------------------------------------------------

	//button to open up form
	var addAlbum = document.getElementById("addAlbum");

	//close form button
	var close = document.getElementById("close");

	//next page button
	var next = document.getElementById("nextbutton");

	//last page button
	var last = document.getElementById("lastbutton");

	//the button to add a band ber
	var addmember = document.getElementById("addmemberbutton");

	//the button to go to previous or next member;
	var forwardmember = document.getElementById("formemberbutton");
	var backmember = document.getElementById("backmemberbutton");

	//the button to add an album image
	var addimage = document.getElementById("addimagebutton")

	//the button to go to previous or next image;
	var forwardimage = document.getElementById("forwardimagebutton");
	var backimage = document.getElementById("backimagebutton");

	//the button to add another track
	var addtrack = document.getElementById("addtrackbutton");

	//the button to go to the previous or next track
	var backtrack = document.getElementById("backtrackbutton");
	var forwardtrack = document.getElementById("fortrackbutton");

	//display of the track number
	var trackNumDisplay = document.getElementById("tracknumber");


	//CHANGING ELEMENTS --------------------------------------------------------------

	//header (expands when "Add an Album is clicked)
	var headerform = document.getElementById("headerform");

	//music form (appears when "Add an Album" is clicked)
	var musicform = document.getElementById("musicform");

	//first part of the form - album title and artist
	var musicformP1 = document.getElementById("musicform-part1");
	//second part - artist info if needed
	var musicformP2_1 = document.getElementById("musicform-part2_1");
	//second part - artist info if needed
	var musicformP2_2 = document.getElementById("musicform-part2_2");
	//third part - album images
	var musicformP3 = document.getElementById("musicform-part3");
	//fourth part - genre, date, format
	var musicformP4 = document.getElementById("musicform-part4");
	//fifth part - tracklisting
	var musicformP5 = document.getElementById("musicform-part5");

	//success screen
	var successView = document.getElementById("success");
	var successMessage = document.getElementById("success-message");


	//keep track of current part of form 
	var currentP = "";



	//ARTIST INFO ELEMENTS -----------------------------------------------------------

	//the ul containing all band members
	var memberlist = document.getElementById("members");

	//the members
	var allmembers = document.querySelectorAll("ul li.member");

	//blank member that get duplicated
	var member0 = document.querySelector("li.member");

	//current member being viewed
	var currentMember = "";

	//keep track of whether or not the album artist is in the records
	var artistIsRecorded = "";

	//album and artist being entered
	var albumName = "";
	var artistName = "";


	//ALBUM IMAGE ELEMENTS -----------------------------------------------------------

	//the ul containing all images
	var imagelist = document.getElementById("images");

	//the images
	var allimages = document.querySelectorAll("ul li.image");

	//blank image that gets cloned
	var image0 = document.querySelector("li.image")

	//current image being viewed
	var currentImage = "";



	//TRACKLISTING ELEMENTS ----------------------------------------------------------

	//the ul containing tracks
	var tracklist = document.getElementById("tracks");

	//the tracks
	var alltracks = document.querySelectorAll("ul li.track");

	//the blank track form that gets duplicated
	var track0 = document.querySelector("li.track");

	//current track being added
	var currentTrack = "";




	//DOM ----------------------------------------------------------------------------


	//Expand header and open form if its closed
	addAlbum.addEventListener("click", function() {
		if (currentP == ""){
			headerform.style.height = "600px";
			musicform.style.display = "block";
			musicformP1.style.display = "flex";
			close.style.display = "block";
			next.style.display = "block";
			currentP = musicformP1;
			currentTrack = alltracks.length;
			currentMember = allmembers.length;
			currentImage = allimages.length;
			allmembers = document.querySelectorAll("ul li.member");
			allimages = document.querySelectorAll("ul li.image")
			alltracks = document.querySelectorAll("ul li.track");
			track0 = document.querySelector("li.track");
			member0 = document.querySelector("li.member");

			if (allmembers.length == 0) {addmember.click();};

			if (allimages.length == 0) {addimage.click();};

			if (alltracks.length == 0) {addtrack.click();};

		}
		else if (currentP == musicformP5) {
			
			//submit and record form data

			currentP = successView;
			successView.style.display = "block";
			musicformP5.style.display = "none";
			next.style.display = "none";
			last.style.display = "none";
			successMessage.innerHTML = `Thank you for uploading<br>"${albumName}" by ${artistName}!`;
			addAlbum.innerHTML = "ADD ANOTHER ALBUM";
			musicform.reset();
		}
		else if (currentP == successView) {
			close.click();
			addAlbum.click();
		}
	});

	//Close form and shrink header
	close.addEventListener("click", function() {
		headerform.style.height = "90px";
		musicform.style.display = "none";
		musicformP1.style.display = "none";
		musicformP2_1.style.display = "none";
		musicformP2_2.style.display = "none";
		musicformP3.style.display = "none";
		musicformP4.style.display = "none";
		musicformP5.style.display = "none";
		successView.style.display = "none";
		successMessage.innerHTML = "";
		addAlbum.innerHTML = "ADD AN ALBUM";
		next.style.display = "none";
		last.style.display = "none";
		close.style.display = "none";
		currentP = "";
		currentMember = "";
		currentTrack = "";
		currentImage = "";
		while (tracklist.firstChild){
			tracklist.removeChild(tracklist.firstChild);
		}
		while (memberlist.firstChild){
			memberlist.removeChild(memberlist.firstChild);
		}
		while (imagelist.firstChild){
			imagelist.removeChild(imagelist.firstChild);
		}
		musicform.reset();
	});


	//NEXT BUTTON EVENT LISTENER -------------------------------------------------------------------------
	//When next is clicked on first part, see if the album already exists
	
	next.addEventListener("click", function() {
		if (currentP == musicformP1) {

			albumName = musicform[0].value;
			artistName = musicform[1].value;

			if (artistName != "" && albumName !="") {

				var request = new XMLHttpRequest();

				//open the album info to check that the album doesn"t already exist
				request.open("GET", "album_info.json");
				request.send();

				//When file loads, check  to see if the album name exists
				//if it exists then check if it"s by the same artist
				//if it"s the same album and artist, return a message that says "album exists"
				request.addEventListener("load", function(e){

					var allalbums = JSON.parse(e.target.response);

					//CHECKS IF ALBUM AND ARTIST ARE IN DB
					//returns 0 if the album and artist exist
					//returns 1 if the album doesn"t exist but the artist does
					function checkAlbumExists() {
						for (var i = 0; i < allalbums.length; i++) {
							if (allalbums[i].album == albumName && allalbums[i].artist == artistName){
								return 0;
							}
							else if (allalbums[i].album != albumName && allalbums[i].artist == artistName) {
								return 1;
							}
						}
					}

					if (checkAlbumExists() == 0) {
						alert("Album already exists.")
						artistIsRecorded = true;
					}
					else if (checkAlbumExists() == 1 ) {
						musicformP1.style.display = "none";
						last.style.display = "block"
						currentP = musicformP3;
						musicformP3.style.display = "flex";
						artistIsRecorded = true;
					}
					else {
						musicformP1.style.display = "none";
						musicformP2_1.style.display = "flex";
						currentP = musicformP2_1;
						last.style.display = "block"
						artistIsRecorded = false;
					}
				});
			}
			else {alert("Please enter an album and artist.")}
		}

		else if (currentP == musicformP2_1) {
			musicformP2_1.style.display = "none";
			musicformP2_2.style.display = "flex";
			currentP = musicformP2_2;
		}

		else if (currentP == musicformP2_2) {
			musicformP2_2.style.display = "none";
			musicformP3.style.display = "flex";
			currentP = musicformP3;
		}

		else if (currentP == musicformP3) {
			musicformP3.style.display = "none";
			musicformP4.style.display = "flex";
			currentP = musicformP4;
		}

		else if (currentP == musicformP4) {
			musicformP4.style.display = "none";
			musicformP5.style.display = "flex";
			currentP = musicformP5;
			next.style.display = "none";
			addAlbum.innerHTML = "SAVE ALBUM";
		}
	});


	//LAST BUTTON LISTENER ---------------------------------------------------------------------------------

	//changes depending on whether the artist info is necessary

	last.addEventListener("click", function(){
		if (artistIsRecorded == false) {
			if (currentP == musicformP2_1) {
				currentP = musicformP1;
				musicformP2_1.style.display = "none";
				musicformP1.style.display = "flex";
				last.style.display = "none";
			}
			else if (currentP == musicformP2_2) {
				currentP = musicformP2_1;
				musicformP2_2.style.display = "none";
				musicformP2_1.style.display = "flex";
			}
			else if (currentP == musicformP3) {
				currentP = musicformP2_2;
				musicformP3.style.display = "none";
				musicformP2_2.style.display = "flex";
			}
			else if (currentP == musicformP4) {
				currentP = musicformP3;
				musicformP4.style.display = "none";
				musicformP3.style.display = "flex";
			}
			else if (currentP == musicformP5) {
				currentP = musicformP4;
				musicformP5.style.display = "none";
				musicformP4.style.display = "flex";
				next.style.display = "block";
				addAlbum.innerHTML = "ADD AN ALBUM";
			}
		}
		else {
			if (currentP == musicformP3) {
				currentP = musicformP1;
				musicformP3.style.display = "none";
				musicformP1.style.display = "flex";
				last.style.display = "none";
			}
			else if (currentP == musicformP4) {
				currentP = musicformP3;
				musicformP4.style.display = "none";
				musicformP3.style.display = "flex";
			}
			else if (currentP == musicformP5) {
				currentP = musicformP4;
				musicformP5.style.display = "none";
				musicformP4.style.display = "flex";
				next.style.display = "block";
				addAlbum.innerHTML = "ADD AN ALBUM";
			}			
		}
	});


	//DOM MANIPULATION FOR ADDING ARTIST INFO --------------------------------------------------------------

	//ADD MEMBERS -------------------------------------------------

	addmember.addEventListener("click", function(){
		var newmember = member0.cloneNode(true);
		memberlist.appendChild(newmember);

		allmembers = document.querySelectorAll("ul li.member");

		if (allmembers.length > 1) {backmember.style.display = "flex";}
		
		currentMember = allmembers.length;

		for (var i = 0; i < allmembers.length; i++) {
			allmembers[i].style.display = "none";
		}

		memberlist.lastChild.style.display = "block";
	});



	//MOVE BACKWARD --------------------------------------------

	backmember.addEventListener("click", function(){
		currentMember -= 1;

		allmembers = document.querySelectorAll("ul li.member");
	
		for (var i = 0; i < allmembers.length; i++) {
			allmembers[i].style.display = "none";
		}

		allmembers[currentMember-1].style.display = "block";

		if (currentMember == allmembers.length-1){
			addmember.style.display = "none";
			forwardmember.style.display = "flex";
		};
		if (currentMember <= 1) {
			backmember.style.display = "none";
		};
	});

	//MOVE FORWARD ------------------------------------------

	forwardmember.addEventListener("click", function(){
		currentMember += 1;

		allmembers = document.querySelectorAll("ul li.member");

		for (var i = 0; i < allmembers.length; i++) {
			allmembers[i].style.display = "none";
		}

		allmembers[currentMember-1].style.display = "block";

		if (currentMember == allmembers.length){
			addmember.style.display = "flex";
			forwardmember.style.display = "none";
		};
		if (currentMember == 2) {
			backmember.style.display = "flex";
		};
	});	


	//DOM MANIPULATION FOR ALBUM IMAGES ----------------------------------------------------------------------------------

	//ADD IMAGES ---------------------------------

	addimage.addEventListener("click", function(){
		var newimage = image0.cloneNode(true);
		imagelist.appendChild(newimage);

		allimages = document.querySelectorAll("ul li.image");

		if (allimages.length > 1) {backimage.style.display = "flex";}
		
		currentImage = allimages.length;

		for (var i = 0; i < allimages.length; i++) {
			allimages[i].style.display = "none";
		};

		imagelist.lastChild.style.display = "block";
	});



	//MOVE BACKWARD --------------------------------------------

	backimage.addEventListener("click", function(){
		currentImage -= 1;

		allimages = document.querySelectorAll("ul li.image");
	
		for (var i = 0; i < allimages.length; i++) {
			allimages[i].style.display = "none";
		};

		allimages[currentImage-1].style.display = "block";

		if (currentImage == allimages.length-1){
			addimage.style.display = "none";
			forwardimage.style.display = "flex";
		};
		if (currentImage <= 1) {
			backimage.style.display = "none";
		};
	});

	//MOVE FORWARD ------------------------------------------

	forwardimage.addEventListener("click", function(){
		currentImage += 1;

		allimages = document.querySelectorAll("ul li.image");

		for (var i = 0; i < allimages.length; i++) {
			allimages[i].style.display = "none";
		}

		allimages[currentImage-1].style.display = "block";

		if (currentImage == allimages.length){
			addimage.style.display = "flex";
			forwardimage.style.display = "none";
		};
		if (currentImage == 2) {
			backimage.style.display = "flex";
		};
	});



	//DOM MANIPULATION FOR TRACKLISTING ----------------------------------------------------------------------------------

	//ADD TRACKS ---------------------------------

	addtrack.addEventListener("click", function(){
		var newtrack = track0.cloneNode(true);
		tracklist.appendChild(newtrack);

		alltracks = document.querySelectorAll("ul li.track")

		if (alltracks.length > 1) {backtrack.style.display = "flex";}
		
		currentTrack = alltracks.length;

		trackNumDisplay.innerHTML = `Track ${currentTrack}`;

		for (var i = 0; i < alltracks.length; i++) {
			alltracks[i].style.display = "none";
		}

		tracklist.lastChild.style.display = "block";
	});


	//MOVE BACKWARD --------------------------------------------

	backtrack.addEventListener("click", function(){
		currentTrack -= 1;
		trackNumDisplay.innerHTML = `Track ${currentTrack}`;

		alltracks = document.querySelectorAll("ul li.track")
	
		for (var i = 0; i < alltracks.length; i++) {
			alltracks[i].style.display = "none";
		}

		alltracks[currentTrack-1].style.display = "block";

		if (currentTrack == alltracks.length-1){
			addtrack.style.display = "none";
			forwardtrack.style.display = "flex";
		}
		if (currentTrack <= 1) {
			backtrack.style.display = "none";
		}
	});

	//MOVE FORWARD ----------------------------------------------

	forwardtrack.addEventListener("click", function(){
		currentTrack += 1;
		trackNumDisplay.innerHTML = `Track ${currentTrack}`;

		alltracks = document.querySelectorAll("ul li.track")

		for (var i = 0; i < alltracks.length; i++) {
			alltracks[i].style.display = "none";
		}

		alltracks[currentTrack-1].style.display = "block";

		if (currentTrack == alltracks.length){
			addtrack.style.display = "flex";
			forwardtrack.style.display = "none";
		}
		if (currentTrack == 2) {
			backtrack.style.display = "flex";
		}
	});


});