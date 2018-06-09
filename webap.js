function loadProperties(data) {
	// Just to prevent errors
}
function whenclicked(element,code) {
	document.getElementById(element).onclick = code;
}
function msg(title,text) {
	// Some function to make a cool popup
}
whenclicked("button",function() {
	msg("Hello!");
});