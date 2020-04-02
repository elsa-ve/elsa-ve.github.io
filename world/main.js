let startLayer = L.tileLayer.provider("OpenTopoMap");

let map = L.map("map", {
    center: [50, 0],
    zoom: 5,
    layers: [
        L.tileLayer.provider("OpenTopoMap")
    ]
});

let circleGroup = L.featureGroup().addTo(map); //da passiert mal nichts

L.control.layers({
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "CyclOSM": L.tileLayer.provider("CyclOSM"),
    "OpenMapSurfer.Roads": L.tileLayer.provider("OpenMapSurfer.Roads"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
    "Esri.WorldPhysical": L.tileLayer.provider("Esri.WorldPhysical"),

    //add 3-4 more layers!
}, {
    "Thematische Darstellung": circleGroup //wird dann im let circle etc etc bei .addTo(circleGroup); geändert!
}).addTo(map);

//L.marker([50,5]).addTo(map); Marker in Belgien

let drawCircles = function (data) {
    //console.log(CONFIRMED)

    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        //console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[row.length - 1];
        // let mrk = L.marker([lat,lng]).addTo(map);
        // mrk.bindPopup(`${reg}: ${val}`)

        //A=r²*pi
        //r²=A/pi
        //r= wurzel(A/pi)
        //let rad =
        let s = 0.25;
        let r = Math.sqrt(val / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: (val / 2) * 0.0015
        }).addTo(circleGroup);
        circle.bindPopup(`${reg} : ${val}`);
    };

};

drawCircles(CONFIRMED);


/*console.log(CONFIRMED);
for-Schleife über alle Arrays der CONFIRMED Einträge:
for (let i = 1; i < CONFIRMED.length; i++) {    
    let row = CONFIRMED[i];    // console.log(row[2],row[3]);    let val = row[row.length-1];    
    let mrk = L.marker([row[2],row[3]]).addTo(map);    
    mrk.bindPopup(`${row[0]} ${row[1]}: ${val}`);}
*/