window.onload = function() {
	var data = atob(window.location.href.split("=")[1]);
	document.getElementById("main").innerHTML = data;
}