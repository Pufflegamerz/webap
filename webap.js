function loadProperties(data) {
	// Just to prevent errors
}
function whenclicked(element,codes) {
	document.getElementsByName(element)[0].onclick = codes;
}
function msg(title,text) {
	document.getElementById('main').innerHTML += "<div class='popup'><div class='popuptitle'><span>" + title + "</span></div><span>" + text + "</span><br><br><center><a class='button' onclick='this.parentElement.parentElement.outerHTML = " + '""' + "'>Close</a></center></div>";
}
function close() {
	window.close();
}
