window.addEventListener('load', function() {

	//CLICKABLE ELEMENTS -------------------------------------------------------------

	//button to open up form
	var addAlbum = document.getElementById('addAlbum');

	//close form button
	var close = document.getElementById('close');

	//next page button
	var next = document.getElementById('nextbutton')

	//last page button
	var last = document.getElementById('lastbutton')


	//CHANGING ELEMENTS --------------------------------------------------------------

	//header (expands when "Add an Album is clicked)
	var headerform = document.getElementById('headerform');

	//music form (appears when "Add an Album" is clicked)
	var musicform = document.getElementById('musicform');

	//first part of the form - album title and artist
	var musicformP1 = document.getElementById('musicform-part1');
	//second part - artist info if needed
	var musicformP2 = document.getElementById('musicform-part2');
	//third part - album images
	var musicformP3 = document.getElementById('musicform-part3');
	//fourth part - genre, date, format
	var musicformP4 = document.getElementById('musicform-part4');



	//DOM ----------------------------------------------------------------------------

	//Expand header and open form
	addAlbum.addEventListener("click", function() {
		headerform.style.height = "600px";
		musicform.style.display = "block";
		close.style.display = "block";
		next.style.display = 'block';
	});

	//Close form and shrink header
	close.addEventListener("click", function() {
		headerform.style.height = "90px";
		musicform.style.display = "none";
		next.style.display = "none";
		last.style.display = "none"
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
				alert("album exists")
			}
			else if (checkAlbumExists() == 1 ) {
				musicformP1.style.display = 'none';
				musicformP3.style.display = 'block';
			}
			else {
				musicformP1.style.display = 'none';
				musicformP2.style.display = 'block';
			}
		});
	})






})