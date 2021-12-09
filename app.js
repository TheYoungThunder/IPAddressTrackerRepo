console.log("app.js is running");

// code coming from leafletjs api
// https://leafletjs.com/examples/quick-start/

var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidGhleW91bmd0aHVuZGVyIiwiYSI6ImNrd3kyYmprajBpaW8yb3VyYTljeWhqbGkifQ.bcjvaBRzm-f2wp1RMwAZCw",
  }
).addTo(map);
