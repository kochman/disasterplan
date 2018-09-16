function getMapPoints() {
    return fetch("/api/profiles", {
        method: "GET",
        headers:{
            'Accept': 'application/json'
        }
}) 
    .then(response => response.json())
    .then(profiles => {
        
        /*marker = new google.maps.Marker({
        position: new google.maps.LatLng(42, -73),
        map: map*/
        for(i = 0; i < profiles.length; i++){
             console.log(profiles[i].latitude); 
            marker = new google.maps.Marker({
        position: new google.maps.LatLng(profiles[i].latitude, profiles[i].longitude),
        map: map
      });
             google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(profiles[i].name);
          infowindow.open(map, marker);
        }
         })(marker, i));
        }
    });
};
