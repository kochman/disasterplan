// Determine the latitude and longitude of the user
var latitude, longitude;
function geoFindMe() {
	var output = document.getElementById("out");
	
	if (!navigator.geolocation){
		output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		latitude  = position.coords.latitude;
		longitude = position.coords.longitude;

		output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + '</p>';
	}

	function error() {
		output.innerHTML = "Unable to retrieve your location";
	}

	output.innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);
}

// Determine user's name from input field
function setUsername(){
	var username = document.getElementById("username").value;
	profile = {
        "name": username,
        "latitude": latitude,
        "longitude": longitude,
        "status": ""
    }
    return fetch("/api/profile", {
    	method: "POST",
    	body: JSON.stringify(profile),
    })
    .then(response => response.json());
}

