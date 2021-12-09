console.log("app.js is running");

const ipForm = document.querySelector("form");
const ipFormFeild = document.querySelector(".ip-feild");
const ipText = document.querySelector(".ip-text");
const locationText = document.querySelector(".location-text");
const timezoneText = document.querySelector(".timezone-text");
const ispText = document.querySelector(".isp-text");

let lat = 0;
let lng = 0;

// customize pin icon look for the map, info here: https://leafletjs.com/reference.html#icon
var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  // iconSize: [38, 95],
  // iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

function updateTextFeilds(data) {
  ipText.textContent = data.ip;
  locationText.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezoneText.textContent = `GMT${data.location.timezone}`;
  ispText.textContent = `${data.isp}`;
}

// info on how to do this here: https://leafletjs.com/examples/quick-start/
function updateMapLocation(data) {
  lat = data.location.lat;
  lng = data.location.lng;
  map.setView([lat, lng], 13);
  L.marker([lat, lng], { icon: myIcon }).addTo(map);
}
// fetch device ip and location
function getIP(ip = "") {
  axios
    .get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_9XiPjFZdPrj6q1dOBStUH0wvFktvK&ipAddress=${ip}`
    )
    .then((res) => {
      updateTextFeilds(res.data);
      updateMapLocation(res.data);
      console.log("axios call success");
    })
    .catch((err) => {
      console.log(err);
    });
}

// this is for the first time the page is loaded
// getIP();

// get feild value from form
ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getIP((ip = ipFormFeild.value));
});

// code coming from leafletjs api
// https://leafletjs.com/examples/quick-start/

var map = L.map("map", {
  zoomControl: false,
}).setView([lat, lng], 13);
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
