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
		document.getElementById('messages').innerHTML += "<div class='popup'><div class='popuptitle'><span>Build Project...</span><span class='close' onclick='this.parentElement.parentElement.outerHTML = " + '""' + "'>X</span></div><span>stuff</span></div>";
		document.getElementsByClassName('popup')[0].style.width = "500px";
		document.getElementsByClassName('popup')[0].style.height = "250px";
	} else {
		document.getElementById('messages').innerHTML += "<div class='popup'><div class='popuptitle'><span>" + title + "</span><span class='close' onclick='this.parentElement.parentElement.outerHTML = " + '""' + "'>X</span></div><span>" + text + "</span></div>";
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

//
function exportapp() {
	// Have everything in base64, then decode it.
	var html = atob("PEhUQTpBUFBMSUNBVElPTiANCiAgICAgSUQ9IndlYmFwQXBwIg0KICAgICBBUFBMSUNBVElPTk5BTUU9IldJTkRPV1RJVExFIg0KICAgICBTQ1JPTEw9Im5vbmUiDQogICAgIFNJTkdMRUlOU1RBTkNFPSJ5ZXMiDQogICAgIENBUFRJT049InllcyINCj4NCjxodG1sPg0KPGhlYWQ+DQoJPHRpdGxlPldJTkRPV1RJVExFPC90aXRsZT4NCgk8c3R5bGU+DQoJCVdJTkRPV1NUWUxFDQoJPC9zdHlsZT4NCjwvaGVhZD4NCjxib2R5Pg0KPGRpdiBpZD0ibWFpbiI+DQoJV0lORE9XRUxFTUVOVFMNCjwvZGl2Pg0KPC9ib2R5Pg0KPHNjcmlwdD4NCglXSU5ET1dTQ1JJUFQNCjwvc2NyaXB0Pg0KPC9odG1sPg==");
	var css = atob("LmJ1dHRvbiB7DQoJcGFkZGluZzogMXB4IDFweDsNCglib3JkZXI6IDFweCBzb2xpZCBibGFjazsNCgljb2xvcjogYmxhY2s7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KCWJhY2tncm91bmQ6IGxpZ2h0Z3JleTsNCgljdXJzb3I6IHBvaW50ZXI7DQoJdXNlci1zZWxlY3Q6IG5vbmU7DQoJcG9zaXRpb246IHJlbGF0aXZlOw0KCWxlZnQ6IDBweDsNCgl0b3A6IDJweDsNCn0NCi5sYWJlbCB7DQoJdXNlci1zZWxlY3Q6IG5vbmU7DQoJZm9udC1mYW1pbHk6IGFyaWFsOw0KfQ0KLnBvcHVwIHsNCgl3aWR0aDogMzAwcHg7DQoJaGVpZ2h0OiAxNTBweDsNCglib3JkZXI6IDFweCBzb2xpZCBibGFjazsNCgliYWNrZ3JvdW5kOiB3aGl0ZTsNCglyZXNpemU6IGJvdGg7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXRvcDogY2FsYyg1MCUgLSA3NXB4KTsNCglsZWZ0OiBjYWxjKDUwJSAtIDE1MHB4KTsNCgl6LWluZGV4OiAxMDsNCglhbmltYXRpb24tbmFtZTogZmFkZWluOw0KCWFuaW1hdGlvbi1kdXJhdGlvbjogLjVzOw0KfQ0KLnBvcHVwIC5wb3B1cHRpdGxlIHsNCgl3aWR0aDogMTAwJTsNCgl1c2VyLXNlbGVjdDogbm9uZTsNCgljdXJzb3I6IG1vdmU7DQoJaGVpZ2h0OiAxOXB4Ow0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjazsNCn0NCmJvZHksaHRtbCB7DQoJd2lkdGg6IDEwMCU7DQoJaGVpZ2h0OiAxMDAlOw0KCW1hcmdpbjogMDsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI21haW4gew0KCW92ZXJmbG93OiBoaWRkZW47DQp9DQojbWFpbiB7DQoJd2lkdGg6IDEwMCU7DQoJaGVpZ2h0OiAxMDAlOw0KfQ0KDQpAa2V5ZnJhbWVzIGZhZGVpbiB7DQogICAgZnJvbSB7b3BhY2l0eTogMDt9DQogICAgdG8ge29wYWNpdHk6IDE7fQ0KfQ==");
	var js = atob("ZnVuY3Rpb24gbG9hZFByb3BlcnRpZXMoZGF0YSkgew0KCS8vIEp1c3QgdG8gcHJldmVudCBlcnJvcnMNCn0NCmZ1bmN0aW9uIHdoZW5jbGlja2VkKGVsZW1lbnQsY29kZXMpIHsNCglkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShlbGVtZW50KVswXS5vbmNsaWNrID0gY29kZXM7DQp9DQpmdW5jdGlvbiBtc2codGl0bGUsdGV4dCkgew0KCWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuaW5uZXJIVE1MICs9ICI8ZGl2IGNsYXNzPSdwb3B1cCc+PGRpdiBjbGFzcz0ncG9wdXB0aXRsZSc+PHNwYW4+IiArIHRpdGxlICsgIjwvc3Bhbj48L2Rpdj48c3Bhbj4iICsgdGV4dCArICI8L3NwYW4+PGJyPjxicj48Y2VudGVyPjxhIGNsYXNzPSdidXR0b24nIG9uY2xpY2s9J3RoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lm91dGVySFRNTCA9ICIgKyAnIiInICsgIic+Q2xvc2U8L2E+PC9jZW50ZXI+PC9kaXY+IjsNCn0NCmZ1bmN0aW9uIGNsb3NlKCkgew0KCXdpbmRvdy5jbG9zZSgpOw0KfQ0K") + "window.resizeTo(" + document.getElementById("window").style.width.substring(0, document.getElementById("window").style.width.length - 2) + "," + document.getElementById("window").style.height.substring(0, document.getElementById("window").style.height.length - 2) + ");";;
	var app = html.replace(/WINDOWTITLE/g,document.getElementById('windowtitletext').innerHTML);
	app = app.replace(/WINDOWSCRIPT/g,js + document.getElementById('codearea').value);
	app = app.replace(/WINDOWSTYLE/g,css);
	app = app.replace(/WINDOWELEMENTS/g,document.getElementById('windowcontent').innerHTML);
	download("myNewApp.hta",app);
}

// Download function from ourcodeworld.com
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}