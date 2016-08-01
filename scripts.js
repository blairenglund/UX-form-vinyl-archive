window.addEventListener('load', function() {

	//button to open up form
	var addAlbum = document.getElementById('addAlbum');

	//header which expands when clicked
	var headerform = document.getElementById('headerform');

	//form that appears
	var musicform = document.getElementById('musicform');

	//close form button
	var close = document.getElementById('close');

	addAlbum.addEventListener("click", function() {
		headerform.style.height = "600px";
		musicform.style.display = "flex";
		close.style.display = "block";
	});

	close.addEventListener("click", function() {
		headerform.style.height = "90px";
		musicform.style.display = "none";
		close.style.display = "none";
	})




})