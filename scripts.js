window.addEventListener('load', function() {

	//CLICKABLE ELEMENTS -------------------------------------------------------------

	//button to open up form
	var addAlbum = document.getElementById('addAlbum');

	//close form button
	var close = document.getElementById('close');

	//next page button
	var next = document.getElementById('nextbutton')


	//CHANGING ELEMENTS --------------------------------------------------------------

	//header (expands when "Add an Album is clicked)
	var headerform = document.getElementById('headerform');

	//music form (appears when "Add an Album" is clicked)
	var musicform = document.getElementById('musicform');



	//DOM ----------------------------------------------------------------------------

	//Expand header and open form
	addAlbum.addEventListener("click", function() {
		headerform.style.height = "600px";
		musicform.style.display = "block";
		close.style.display = "block";
	});

	//Close form and shrink header
	close.addEventListener("click", function() {
		headerform.style.height = "90px";
		musicform.style.display = "none";
		close.style.display = "none";
		musicform.reset();
	})



	//FORM INPUT AND SUBMISSION ----------------------------------------------------

	//When next is clicked on first part, see if the album already exists
	next.addEventListener('click', function() {

		var albumName = musicform[0].value;
		var artistName = musicform[1].value;

		var request = new XMLHttpRequest();

		//open the album info to check that the album doesn't already exist
		request.open('GET', 'album_info.json');
		request.send()

		//When file loads, check  to see if the album name exists
		//if it exists then check if it's by the same artist
		//if it's the same album and artist, return a message that says "album exists"
		request.addEventListener('load', function(e){

			var allalbums = JSON.parse(e.target.response);

			var allAlbumTitles = [];

			for (var i = 0; i < allalbums.length; i++) {
				if (allalbums[i].album == albumName && allalbums[i].artist == artistName){
					alert("This album already exists.")
				}
				else {
					alert("This album doesn't exist.")
				}
			};


		})


	})






})