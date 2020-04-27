let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.3, 11.5],
    zoom: 8,
    layers: [
        startLayer,
    ]
});

//let awsLayer = L.featureGroup().addTo(map);

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup(),
    wind: L.featureGroup(),
    humidity: L.featureGroup(),
    snow: L.featureGroup()
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
    "Temperatur (°C)": overlay.temperature,
    "Windgeschwindigkeit (m/s)": overlay.wind,
    "Relative Luftfeuchte (%)": overlay.humidity,
    "Gesamtschneehöhe (cm)": overlay.snow
}).addTo(map);

L.control.rainviewer({ 
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Play/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Hour:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
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

let getColor = function (val, ramp) {
    //console.log(val, ramp);
    let col = "red";

    for (let i = 0; i < ramp.length; i++) {
        const pair = ramp[i];
        if (val >= pair[0]) {
            break;
        } else {
            col = pair[1];
        }
        console.log(val, pair);
    }
    return col;
};
let color = getColor(34, COLORS.temperature);
//console.log(color)

let drawTemperature = function (jsonData) {
    //console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.LT;
        },
        pointToLayer: function (feature, latlng) {
            let color = getColor(feature.properties.LT, COLORS.temperature);
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="label-temperature" style="background-color: ${color}">${feature.properties.LT.toFixed(1)}</div>`,
                    className: "ignore-me" // dirty hack
                })
            })
        }
    }).addTo(overlay.temperature);
};

//1. neues overlay definieren, zu L.controllayers hinzufügen und default anzeigen
//2. die funktion drawWind als 1:1 kopie von draw temperature mit anpassungen übernehmen
//3. neuer Stil .label-wind im css von main.css
//4. funktion drawWind in data:loaded aufrufen

let drawWind = function (jsonData) {
    //console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.WG;
        },
        pointToLayer: function (feature, latlng) {
            let kmh = Math.round(feature.properties.WG / 1000 * 3600);
            let color = getColor(kmh, COLORS.wind);
            let rotation = feature.properties.WR;
            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m) - ${kmh} km/h`, //tooltip
                icon: L.divIcon({
                    html: `<div class="label-wind" ><i class="fas fa-arrow-circle-up" style="color: ${color}; transform: rotate(${rotation}deg)"></i></div>`,
                    className: "ignore-me" // dirty hack
                })
            })
        }
    }).addTo(overlay.wind);
};

let drawHumidity = function (jsonData) {
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.RH;
        },
        pointToLayer: function (feature, latlng) {
            let humidity = feature.properties.RH;
            let color = getColor(humidity, COLORS.humidity);
            if (feature.properties.RH < 100) {
                return L.marker(latlng, {
                    title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`, //tooltip
                    icon: L.divIcon({
                        html: `<div class="label-humidity" style="background-color: ${color}">${feature.properties.RH}</div>`,
                        className: "ignore-me" // dirty hack
                    })
                });
            } else {
                return false;
            }
        }
    }).addTo(overlay.humidity);
};

let drawSnow = function (jsonData) {
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.HS;
        },
        pointToLayer: function (feature, latlng) {
            let snow = feature.properties.HS;
            let color = getColor(snow, COLORS.snow);
            if (feature.properties.HS > 0) {
                return L.marker(latlng, {
                    title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`, //tooltip
                    icon: L.divIcon({
                        html: `<div class="label-snow" style="background-color: ${color}">${feature.properties.HS}</div>`,
                        className: "ignore-me" // dirty hack
                    })
                });
            } else {
                return false;
            }
        }
    }).addTo(overlay.snow);
};

aws.on("data:loaded", function () {
    //console.log(aws.toGeoJSON());
    drawTemperature(aws.toGeoJSON());
    drawWind(aws.toGeoJSON());
    drawHumidity(aws.toGeoJSON());
    drawSnow(aws.toGeoJSON());
    map.fitBounds(overlay.stations.getBounds());

    overlay.snow.addTo(map);

    //console.log(COLORS);
});