let startLayer = L.tileLayer.provider("OpenTopoMap");

let map = L.map("map", {
    center: [30, 0],
    zoom: 3,
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

let drawCircles = function () {
    //console.log(CONFIRMED)
    let data = CONFIRMED;
    let header = CONFIRMED[0];
    let index = document.querySelector("#slider").value; //indizes von arrays immer -1!
    let options = document.querySelector("#pulldown").options;
    let value = options[options.selectedIndex].value;
    let label = options[options.selectedIndex].text;
    let color;
    //console.log(value,label,options);

    if (value === "confirmed") {
        data = CONFIRMED;
        color = "blue";
    } else if (value === "deaths") {
        data = DEATHS;
        color = "purple";
    } else {
        data = RECOVERED;
        color = "green";
    };


    //Datum hinzufügen und Thema anzeigen
    document.querySelector("#datum").innerHTML = `am ${header[index]} - ${label}`;

    circleGroup.clearLayers();

    data.sort(function compareNumbers(row1, row2) {
        return row2[index] - row1[index];
    })

    for (let i = 1; i < data.length; i++) {
        let row = data[i];
        //console.log(row[2],row[3]);
        let reg = `${row[0]} ${row[1]}`;
        let lat = row[2];
        let lng = row[3];
        let val = row[index];
        // let mrk = L.marker([lat,lng]).addTo(map);
        // mrk.bindPopup(`${reg}: ${val}`)

        if (val === "0") {
            continue;
        };

        //A=r²*pi
        //r²=A/pi
        //r= wurzel(A/pi)
        //let rad =
        let s = 0.25;
        let r = Math.sqrt(val / Math.PI);
        let circle = L.circleMarker([lat, lng], {
            radius: (val / 2) * 0.002,
            color: color,
        }).addTo(circleGroup);
        circle.bindPopup(`${reg} : ${val}`);
    };

};

document.querySelector("#pulldown").onchange = function () {
    drawCircles();
};


let slider = document.querySelector('#slider');
slider.min = 4;
slider.max = CONFIRMED[0].length - 1;
slider.step = 1;
slider.value = slider.max;

slider.onchange = function () {
    drawCircles();
};

drawCircles();

let playButton = document.querySelector("#play");
let runningAnimation = null;

playButton.onclick = function () {
    let value = slider.min;
    if (slider.value == slider.max) {
        value = slider.min;
    } else {
        value = slider.value;
    }

    playButton.value = "⏸";

    if (runningAnimation) {
        window.clearInterval(runningAnimation);
        playButton.value = "▶";
        runningAnimation = null;
    } else {
        runningAnimation = window.setInterval(function () {

            //console.log(value,"nach 250ms")
            slider.value = value;
            drawCircles();
            value++;

            if (value > slider.max) {
                window.clearInterval(runningAnimation);
                playButton.value = "▶";
                runningAnimation = null;
            }
        }, 250) //Millisekunden
    }

}

//drawCircles(RECOVERED);

//drawCircles(DEATHS);


/*console.log(CONFIRMED);
for-Schleife über alle Arrays der CONFIRMED Einträge:
for (let i = 1; i < CONFIRMED.length; i++) {    
    let row = CONFIRMED[i];    // console.log(row[2],row[3]);    let val = row[row.length-1];    
    let mrk = L.marker([row[2],row[3]]).addTo(map);    
    mrk.bindPopup(`${row[0]} ${row[1]}: ${val}`);}
*/