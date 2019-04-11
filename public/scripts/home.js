!function (){
'use strict';

   window.addEventListener('DOMContentLoaded', () => {
     console.log('Home JS is Connected');
//const map = document.createElement('img');
const mapsDiv = document.getElementById('map');
const loadingDiv = document.getElementsByClassName('loading_div')[0];

// grab elements to set up the Modal
const closeMapModal = document.getElementsByClassName('close')[0];
const mapModal = document.getElementsByClassName('maps_modal')[0];

// create click events to close the Modal
closeMapModal.addEventListener('click', (e) => {
  mapModal.style.display = 'none';
})

// if the click event is not on the modal content close window
window.onclick = function(event) {
  if (event.target == mapModal) {
    mapModal.style.display = "none";
  }
}

// connect to the socket
const socket = io.connect('http://localhost:3000/');

/// socket connections
socket.on('connect', () => {
  console.log('The home page is connected');
});// end of socket connected

socket.on('message1', (data) => {
  console.log(data);
});


const key = '1yiIoZOaG82AAjpUTmt4JR9ZzbzEqJOh';
L.mapquest.key = key;
// set up the map api
  // get the geolocation of the user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude,
          long = position.coords.longitude;

      let location = [lat,long];
      socket.emit('geocode', location);


      let baseLayer = L.mapquest.tileLayer('map');

        let map = L.mapquest.map('map', {
          center: L.latLng(location),
          layers: baseLayer,
          zoom: 9
        });

        // add markers after you get the events

socket.on('events', (data1) => {
       let results = data1.results
//        for(let i=0; i < results.length; i++){
//        let mark = results[i].location
//        let title = results[i].title
//        console.log(mark);
//        L.marker(mark, {
//        icon: L.mapquest.icons.marker(),
//        draggable: false
//     }).bindPopup(title).addTo(mapsDiv);
// }

  console.log(results);
  const markers = L.markerClusterGroup();

       for (let i = 0; i < results.length; i++) {
         const addressPoint = results[i].location;
         const title = results[i].title;
         let category = results[i].category
         console.log(results[i].category);
         console.log(addressPoint, title);

         let marker = L.marker(new L.LatLng(addressPoint[1], addressPoint[0]), {
           title: title,
           icon: L.mapquest.icons.marker()
         });

         marker.bindPopup(title);

      // add click event listener to the popups
         marker.on('click', (e) => {
           console.log(category);
         })
         markers.addLayer(marker);
       }
       map.addLayer(markers);
      })

}); // end get location
        }else{
            console.log("Can't get location");
          }

// need to give the console.log time to get the zip code
setTimeout(() => {

}, 5000)// end of zip log



















   });// end of window Loaded listener

 }(); // end of iffy of IIFE
