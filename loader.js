window.onload = function() {
	var data = atob(window.location.href.split("=")[1]); // HTML
	var code = data.split('<script>').pop().split('</script>').shift();// JS
	data = data.replace("<script>" + code + "</script>","");
	document.getElementById("main").innerHTML = data;
	eval(code);
}