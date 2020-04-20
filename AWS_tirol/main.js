let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.3, 11.5],
    zoom: 8,
    layers: [
        startLayer
    ]
});

let awsLayer = L.featureGroup().addTo(map);

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
    "Wetterstationen Tirol": awsLayer
}).addTo(map);


let awsUrl = "https://aws.openweb.cc/stations";

let aws = L.geoJson.ajax(awsUrl, {

    // filter: function(feature) {
    //  console.log("Feature in filter: ", feature);
    //  if (feature.properties.LT < 5) {
    //    return true;
    // } else {
    // return true;}
    //  return feature.properties.LT < 5;},

    filter: function (feature) {
        //console.log("Feature in filter: ", feature);
        if (feature.properties.LT) {
            return feature.properties.LT !== undefined
        }
        return false;
    },


    pointToLayer: function (point, latlng) {
        console.log("point: ", point);
        let marker = L.marker(latlng).bindPopup(`<h3>${point.properties.name}, ${point.geometry.coordinates[2]} m </h3>
        <ul>
        <li>Position (lat/lng): ${point.geometry.coordinates[0]}, ${point.geometry.coordinates[0]} </li>
        <li>Datum: ${point.properties.name}</li>
        <li>Lufttemperatur: ${point.properties.LT} °C</li>
        <li>Windgeschwindigkeit: ${point.properties.WG} m/s</li>
        <li>Relative Luftfeuchte: ${point.properties.RH} in %</li>
        <li>Schneehöhe: ${point.properties.HS} in cm</li>
        </ul>`);
        //<p><a target="name" href="https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/seegrube.png">Grafische Darstellung</a></p>
        return marker;

    }
}).addTo(awsLayer);