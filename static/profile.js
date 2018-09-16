// View and/or update profile
// Determine the latitude and longitude of the user
var latitude, longitude;
function geoFindMe() {
	var output = document.getElementById("out");

	if (!navigator.geolocation) {
		output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		latitude = position.coords.latitude;
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
function updateInfo() {
	var username = document.getElementById("username").value;
	var status = document.getElementById("status").value;
	var phone = document.getElementById("phone").value;
	profile = {
		"name": username,
		"latitude": latitude,
		"longitude": longitude,
		"status": status,
		"phone_number": phone
	}
	let profile_id = localStorage.getItem('profile_id');
	let token = localStorage.getItem('profile_token');
	return fetch("/api/profiles/" + profile_id, {
		method: "POST",
		body: JSON.stringify({
			"profile": profile,
			"token": token
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(resp => {
		});
}

document.addEventListener("DOMContentLoaded", function(event) {
 	return fetch("/api/profiles", {
 		headers: {
			'Accept': 'application/json'
		}
 	})
 		.then(response => response.json())
 		.then(profiles => {
 			let profile_id = parseInt(localStorage.getItem('profile_id'));
 			for(var i = 0; i < profiles.length; i++){
 				if (profile_id === profiles[i].id){
 					document.getElementById("username").value = profiles[i].name;
 					document.getElementById("status").value = profiles[i].status;
 					document.getElementById("phone").value = profiles[i].phone_number;
 					break;
 				}
 			}
		});
  });
