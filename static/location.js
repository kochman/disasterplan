// Determine the latitude and longitude of the user
var latitude, longitude;
function geoFindMe() {
	// var output = document.getElementById("out");

	if (!navigator.geolocation) {
		// output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		var username = document.getElementById("username").value;
		profile = {
			"name": username,
			"latitude": latitude,
			"longitude": longitude,
			"status": ""
		}
		return fetch("/api/profiles", {
			method: "POST",
			body: JSON.stringify(profile),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(resp => {
				localStorage.setItem('profile_token', resp.token);
				localStorage.setItem('profile_id', resp.profile.id);

				window.location = "/map";
			});

		// output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + '</p>';
	}

	function error() {
		// output.innerHTML = "Unable to retrieve your location";
	}

	// output.innerHTML = "<p>Locating…</p>";

	navigator.geolocation.getCurrentPosition(success, error);
}

// Determine user's name from input field
function setUsername() {
	geoFindMe();
}

