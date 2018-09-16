var maps;
function getMapPoints() {
    return fetch("/api/profiles", {
        method: "GET",
        headers:{
            'Accept': 'application/json'
        }
}) 
    .then(response => response.json())
    .then(profiles => {
        /*console.log("marker"); 
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(42, -73),
        map: map*/
       var personList = "<ul>";
        for(i = 0; i < profiles.length; i++){
            personList += "<li>" + profiles[i].name + "\n";
           if (profiles[i].phone_number != null) {
              personList += profiles[i].phone_number + "\n";
           } else if (profiles[i].status != null) {
              personList += profiles[i].status;
           }
            personList += "</li>";
           
           
           marker = new google.maps.Marker({
              position: new google.maps.LatLng(profiles[i].latitude, profiles[i].longitude),
              map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                  infowindow.setContent(profiles[i].name, profiles[i].phone_number, profiles[i].status);
                infowindow.open(map, marker);
              }
            })(marker, i));
        }
       personList += "</ul>"
       document.getElementById("nearbyList").innerHTML = personList;
    });
};
