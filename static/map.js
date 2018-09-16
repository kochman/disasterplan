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
        for(i = 0; i < profiles.length; i++){
            marker = new google.maps.Marker({
        position: new google.maps.LatLng(profiles[i].latitude, profiles[i].longitude),
        map: map
      });
             google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(profiles[i].name, profiles[i].phone, profiles[i].status);
          infowindow.open(map, marker);
        }
         })(marker, i));
        }
    });
};
