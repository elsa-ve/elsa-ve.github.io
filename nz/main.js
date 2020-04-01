//alert("Hallo Welt!")

let map = document.querySelector("#map"); //Connection zur Karte
let lat = map.dataset.lat;
let lng = map.dataset.lng;

let mymap = L.map(map).setView([lat,lng], 13);

let title=map.dataset.title;
console.log(title)


L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

let marker = L.marker([lat,lng]).addTo(mymap);

marker.bindPopup("<b>Dunedin City!</b><br>Bekannt für Irgendwas!").openPopup();

var popup = L.popup()
    .setLatLng([lat, lng])
    .setContent("How did I get here?")
    .openOn(mymap);