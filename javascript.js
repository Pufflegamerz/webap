var content = document.getElementById('windowcontent');
var ec = 0; // Element counter
var current = ""; // Current selected element

// Function to add elements to the window
function addElement(type) {
	ec++
	if (type == "button") {
		content.innerHTML += '<a name="element' + ec + '" class="button" id="element' + ec + '" onclick="loadProperties(this)">Button</a>';
	} else if (type == "label") {
		content.innerHTML += '<span name="element' + ec + '" id="element' + ec + '" class="label" onclick="loadProperties(this)">My text</span>';
	}
	$(function() {
		$(".button").draggable({containment: '#windowcontent',  snap: "#windowcontent", grid: [ 10, 10 ] });
	});
	$(function() {
		$(".label").draggable({containment: '#windowcontent',  snap: "#windowcontent", grid: [ 10, 10 ] });
	});
}

// Happens when the user clicks the run button
function run() {
	if (preview.opener && !preview.opener.closed) {
		preview.close();
	}
	var fwindow = document.getElementById('window');
	preview = window.open("preview.html?c=" + btoa(content.innerHTML + "<script>" + document.getElementById('codearea').value + "</script>") + "", "window", "width=" + fwindow.style.width + ",height=" + fwindow.style.height + "");
}

// Function to load the properties and handle some buttons
function loadProperties(element) {
	current = element;
	document.getElementById("pselect").innerHTML = "Selected " + element.id;
	 if (element.id == "windowtitle") {
		togglep("name","h");
		togglep("text","s",document.getElementById('windowtitletext').innerHTML);
	} else if (element.className.startsWith("button")) {
		togglep("name","s",element.name);
		togglep("text","s",element.innerHTML);
	} else if (element.className.startsWith("label")) {
		togglep("name","s",element.name);
		togglep("text","s",element.innerHTML);
	}
}

// Function to show/hide property
function togglep(u,v,p) {
	if (v == "h") {
		document.getElementById("p" + u).style.display = "none";
	} else if (v == "s") {
		document.getElementById("p" + u).style.display = "table-row";
	}
	if (p!==undefined) {
		document.getElementById("pi" + u).value = p;
	}
}

// Function to handle property updates
function update() {
	if (current.className.startsWith("button")) {
		current.innerHTML = document.getElementById('pitext').value;
		current.name = document.getElementById('piname').value;
	} else if (current.className.startsWith("label")) {
		current.innerHTML = document.getElementById('pitext').value;
		current.name = document.getElementById('piname').value;
	} else if (current.id == "windowtitle") {
		document.getElementById('windowtitletext').innerHTML = document.getElementById('pitext').value;
	} else {
		alert("Error");
	}
}

// Delete function
function del() {
	current.outerHTML = "";
	loadProperties(windowtitle);
}

// Function to switch the view from design, code, and settings.
function view(type) {
	if (type == "d") {
		document.getElementById('codebox').style.display = "none";
		document.getElementById('settingsbox').style.display = "none";
	} else if (type == "s") {
		document.getElementById('codebox').style.display = "none";
		document.getElementById('settingsbox').style.display = "block";
	} else if (type == "c") {
		document.getElementById('codebox').style.display = "block";
		document.getElementById('settingsbox').style.display = "none";
	}
}
function msg(title,text) {
	if (title == "build" && text == undefined) {
		document.getElementById('messages').innerHTML += "<div class='popup'><div class='popuptitle'><span>Build Project...</span></div><span>stuff</span></div>";
		document.getElementsByClassName('popup')[0].style.width = "500px";
		document.getElementsByClassName('popup')[0].style.height = "250px";
	} else {
		document.getElementById('messages').innerHTML += "<div class='popup'><div class='popuptitle'><span>" + title + "</span></div><span>" + text + "</span></div>";
	}
	$(function() {
		$(".popup").draggable({containment: "window", handle: ".popuptitle"});
	});
}
function get(file) {
	var client = new XMLHttpRequest();
	client.open('GET', file);
	client.onreadystatechange = function() {
		return client.responseText;
	}
	client.send();
}