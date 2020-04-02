//alert("Hallo Welt!")

//Feedback: 
//statt var bitte let verwenden ; DONE
//.dataset.title zwar definiert aber nicht verwendet; 
//das Popup mit .bindPopup direkt an den Marker binden

let map = document.querySelector("#map"); //Connection zur Karte
let lat = map.dataset.lat;
let lng = map.dataset.lng;


let mymap = L.map(map).setView([lat, lng], 13); //L.map(map) = HTML Element angesprochen - keine Anführungszeichen!

let map = L.map(map), {
    center: [
        map.dataset.lat,
        map.dataset.lng
    ],
    zoom: 13          // => 13 ca mittig; 0 = ganze welt, je höher dest näher gezoomt
    layers: [          // => eckige klammern verlangen einen array
        L.tileLayer.provider('OpenTopoMap') 
};
//reparieren!!

let title = map.dataset.title;
console.log(title)


L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);   // => attribution-objekt: string in dem normalerweise ein Copyright o.ä. eingefügt ist



/*let marker = L.marker([
    map.dataset.lat,
    map.dataset.lng
]).addTo(map);

marker.bindPopup(map.dataset.title).openPopup();   ==> noch einarbeiten!!

*/

let marker = L.marker([lat, lng]).addTo(mymap);

marker.bindPopup("<b>Dunedin City!</b><br>Bekannt für Irgendwas!").openPopup();

let popup = L.popup()
    .setLatLng([lat, lng])
    .setContent("How did I get here?")
    .openOn(mymap);

/* Unterschied zwischen let und var:
var eher für frühere versionen, aktueller ist es let zu nehmen*/

