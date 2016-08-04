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

	//the button to add a band member
	var addmember = document.getElementById("addmemberbutton");

	//the button to go to previous or next member;
	var forwardmember = document.getElementById("formemberbutton");
	var backmember = document.getElementById("backmemberbutton");

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


	//ARTIST INFO ELEMENTS -----------------------------------------------------------

	//the ul containing all band members
	var memberlist = document.getElementById("members");

	//the members
	var allmembers = document.querySelectorAll("ul li.member");

	//blank member that get duplicated
	var member0 = document.querySelector("li.member");

	//current member being added
	var currentMember = "";

	//keep track of whether or not the album artist is in the records
	var artistIsRecorded = "";

	//album and artist being entered
	var albumName = "";
	var artistName = "";


	//TRACKLISTING ELEMENTS ----------------------------------------------------------

	//the ul containing tracks
	var tracklist = document.getElementById("tracks");

	//the tracks
	var alltracks = document.querySelectorAll("ul li.track");

	//the blank track form that gets duplicated
	var track0 = document.querySelector("li.track");

	//current track being added
	var currentTrack = "";


	//keep track of current part of form ----------------------------------------------
	var currentP = "";



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
			allmembers = document.querySelectorAll("ul li.member");
			alltracks = document.querySelectorAll("ul li.track");
			track0 = document.querySelector("li.track");
			member0 = document.querySelector("li.member");
		}
		else if (currentP == musicformP5) {
			alert("album saved");

			//RECORD THE FORM DATA//

			close.click();
		}
	});

	//Close form and shrink header
	close.addEventListener("click", function() {
		headerform.style.height = "90px";
		musicform.style.display = "none";
		musicformP1.style.display = "none";
		musicformP2.style.display = "none";
		musicformP3.style.display = "none";
		musicformP4.style.display = "none";
		musicformP5.style.display = "none";
		addAlbum.innerHTML = "ADD AN ALBUM";
		next.style.display = "none";
		last.style.display = "none";
		close.style.display = "none";
		currentP = "";
		currentMember = "";
		currentTrack = "";
		while (tracklist.firstChild){
			tracklist.removeChild(tracklist.firstChild);
		}
		while (memberlist.firstChild){
			memberlist.removeChild(memberlist.firstChild);
		}
		musicform.reset();
	});


	//NEXT BUTTON EVENT LISTENER -------------------------------------------------------------------------
	//When next is clicked on first part, see if the album already exists
	
	next.addEventListener("click", function() {
		if (currentP == musicformP1) {

			var albumName = musicform[0].value;
			var artistName = musicform[1].value;

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

		else if (currentP == musicformP2_1) {
			musicformP2_1.style.display = "none";
			musicformP2_2.style.display = "flex";
			currentP = musicformP3;
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

		if (allmembers.length > 1) {backmember.style.display = "block";}
		
		currentMember = allmembers.length;

		for (var i = 0; i < allmembers.length; i++) {
			allmembers[i].style.display = "none";
		}

		memberlist.lastChild.style.display = "block";
	});

	if (allmembers.length == 0) {addmember.click();}


	//MOVE BACKWARD --------------------------------------------

	backmember.addEventListener("click", function(){
		currentMember -= 1;

		allmembers = document.querySelectorAll("ul li.member");
	
		for (var i = 0; i < allmembers.length; i++) {
			allmembers[i].style.display = "none";
		}

		allmembers[currentMember-1].style.display = "block";

		if (currentMember == allmembers.length){
			addmember.style.display = "none";
			forwardmember.style.display = "block";
		}
		else if (currentMember == 1) {
			backmember.style.display = "none";
		}
		else if (currentMember < allmembers.length && currentMember > 1) {
			addmember.style.display = "none";
			forwardmember.style.display = "block";
			backmember.style.display = "block";
		}
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
			addmember.style.display = "block";
			forwardmember.style.display = "none";
		}
		else if (currentMember == 1) {
			backmember.style.display = "block";
		}
		else if (currentMember < allmembers.length && currentMember > 1){
			addmember.style.display = "none";
			forwardmember.style.display = "block";
			backmember.style.display = "block";
		}
	});		

	//DOM MANIPULATION FOR TRACKLISTING ----------------------------------------------------------------------------------

	//ADD TRACKS ---------------------------------

	addtrack.addEventListener("click", function(){
		var newtrack = track0.cloneNode(true);
		tracklist.appendChild(newtrack);

		alltracks = document.querySelectorAll("ul li.track")

		if (alltracks.length > 1) {backtrack.style.display = "block";}
		
		currentTrack = alltracks.length;

		trackNumDisplay.innerHTML = `Track ${currentTrack}`;

		for (var i = 0; i < alltracks.length; i++) {
			alltracks[i].style.display = "none";
		}

		tracklist.lastChild.style.display = "block";
	});

	if (alltracks.length == 0) {addtrack.click();}

	//MOVE BACKWARD --------------------------------------------

	backtrack.addEventListener("click", function(){
		currentTrack -= 1;
		trackNumDisplay.innerHTML = `Track ${currentTrack}`;

		alltracks = document.querySelectorAll("ul li.track")
	
		for (var i = 0; i < alltracks.length; i++) {
			alltracks[i].style.display = "none";
		}

		alltracks[currentTrack].style.display = "block";

		if (currentTrack == alltracks.length-1){
			addtrack.style.display = "none";
			forwardtrack.style.display = "block";
		}
		else if (currentTrack == 1) {
			backtrack.style.display = "none";
		}
		else {
			addtrack.style.display = "none";
			forwardtrack.style.display = "block";
			backtrack.style.display = "block"
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

		alltracks[currentTrack].style.display = "block";

		if (currentTrack == alltracks.length-1){
			addtrack.style.display = "block";
			forwardtrack.style.display = "none";
		}
		else if (currentTrack == 2) {
			backtrack.style.display = "block";
		}
	});


});