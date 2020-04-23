let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.3, 11.5],
    zoom: 8,
    layers: [
        startLayer
    ]
});

let awsLayer = L.featureGroup().addTo(map);
let overlay = {
    stations: L.featureGroup()
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Wetterstationen Tirol": overlay.stations
}).addTo(map);


let awsUrl = "https://aws.openweb.cc/stations";

let aws = L.geoJson.ajax(awsUrl, {

    /* filter: function(feature) {
      console.log("Feature in filter: ", feature);
      if (feature.properties.LT < 5) {
        return true;
     } else {
     return true;}
     return feature.properties.LT < 5;},*/

    filter: function (feature) {
        return feature.properties.LT;
        },


    pointToLayer: function (point, latlng) {
        //console.log("point: ", point);
        let marker = L.marker(latlng).bindPopup(`<h3>${point.properties.name}, ${point.geometry.coordinates[2]} m </h3>
        <ul>
        <li>Position (lat/lng): ${point.geometry.coordinates[0].toFixed(5)}, ${point.geometry.coordinates[0].toFixed(5)} </li>
        <li>Datum: ${point.properties.date}</li>
        <li>Lufttemperatur (°C): ${point.properties.LT ||"-"} </li>
        <li>Windgeschwindigkeit (m/s): ${point.properties.WG ||"-"} </li>
        <li>Relative Luftfeuchte (in %): ${point.properties.RH ||"-"} </li>
        <li>Schneehöhe (cm): ${point.properties.HS || "-"} </li>     
        <li><a target="name" href="https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/${point.properties.plot}.png">Grafische Darstellung Wetterdaten</a></li>
        </ul>`);
        return marker;

    }
}).addTo(overlay.stations);