let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    layers: [
        startLayer
    ]
});

//let awsLayer = L.featureGroup().addTo(map);

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup()
};

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
    "Wetterstationen Tirol": overlay.stations,
    "Temperatur (°C)": overlay.temperature
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

let drawTemperature = function(jsonData) {
    //console.log(jsonData)
    L.geoJson(jsonData, {
        filter: function(feature) {
            return feature.properties.LT;
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                title: `${feature.properties.name} (${point.geometry.coordinates[2]} m)`,
                icon: L.divIcon({
                    html: `<div class="label-temperature">${feature.properties.LT.toFixed(1)}</div>`,
                    className: "ignore-me" //dirty hack
                })
            })
        }
    }).addTo(overlay.temperature);
};

//1. neues overlay definieren, zu L.controllayers hinzufügen und default anzeigen
//2. die funktion drawWind als 1:1 kopie von draw temperature mit anpassungen übernehmen
//3. neuer Stil .label-wind im css von main.css
//4. funktion drawWind in data:loaded aufrufen
let drawWind = function(jsonData) {

};

aws.on("data:loaded", function () {
    //console.log(aws.toGeoJSON());
    drawTemperature(aws.toGeoJSON());
    map.fitBounds(overlay.stations.getBounds());

    overlay.temperature.addTo(map);
});