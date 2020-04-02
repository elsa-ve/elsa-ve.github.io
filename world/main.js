let startLayer = L.tileLayer.provider("OpenTopoMap");

let map = L.map("map", {
    center: [50,0],
    zoom: 5,
    layers: [
        L.tileLayer.provider("OpenTopoMap")
    ]
});

L.control.layers({
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "CyclOSM": L.tileLayer.provider("CyclOSM"),
    "OpenMapSurfer.Roads": L.tileLayer.provider("OpenMapSurfer.Roads"),
    "OpenStreetMap.HOT": L.tileLayer.provider("OpenStreetMap.HOT"),
    "Esri.WorldPhysical": L.tileLayer.provider("Esri.WorldPhysical"),

    //add 3-4 more layers!

}).addTo(map);

//L.marker([50,5]).addTo(map);

console.log(CONFIRMED)

for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
    //console.log(row[2],row[3]);
    let reg = `${row[0]} ${row[1]}`;
    let lat = row[2];
    let lng = row[3];
    let val = row[row.length-1];
   // let mrk = L.marker([lat,lng]).addTo(map);
   // mrk.bindPopup(`${reg}: ${val}`)

    //A=r²*pi
    //r²=A/pi
    //r= wurzel(A/pi)
    //let rad =
    let s = 0.25;
    let r =Math.sqrt(val/Math.PI);
    let circle = L.circleMarker([lat,lng],{
        radius: (val/2)*0.001
    }).addTo(map);
    circle.bindPopup(`${reg} : ${val}`);
};

/*console.log(CONFIRMED);
for-Schleife über alle Arrays der CONFIRMED Einträge:
for (let i = 1; i < CONFIRMED.length; i++) {    
    let row = CONFIRMED[i];    // console.log(row[2],row[3]);    let val = row[row.length-1];    
    let mrk = L.marker([row[2],row[3]]).addTo(map);    
    mrk.bindPopup(`${row[0]} ${row[1]}: ${val}`);}
*/

