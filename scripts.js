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
		var request = new XMLHttpRequest();

		var musicformdata = new DataForm(musicform);

		request.open


	})






})