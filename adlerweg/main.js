let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup(),
    etappen: L.featureGroup(),
    einkehr: L.featureGroup()
};

L.control.layers({
    "BasemapAT.grau": L.tileLayer.provider("BasemapAT.grau"),
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": startLayer,
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Adlerblicke": overlay.adlerblicke,
    "Adlerweg-Etappen": overlay.etappen,
    "Einkehrmöglichkeiten": overlay.einkehr
}).addTo(map);

//console.log(ETAPPEN);
//console.log(ADLERBLICKE);

for (const blick of ADLERBLICKE) {
    //console.log(blick)
    let mrk = L.marker([blick.lat, blick.lng], {
        icon: L.icon({ //https://mapicons.mapsmarker.com/markers/tourism/place-to-see/panoramic-view/
            iconSize: [32, 37], //sobald bei einem Icon Height und Size eingegeben werden, wird das Icon automatisch zentriert
            iconAnchor: [16, 37], //Zentrierung der Icons mit der Spitze an der richtigen Stelle (Mitte und untere kante vom Icon)
            popupAnchor: [0, -37], //Verschieben des Popups um 37 pixel nach oben
            iconUrl: "icons/panoramicview.png"
        })
    }).addTo(overlay.adlerblicke);
    // L.marker([blick.lat, blick.lng]).addTo(map); //=> Test marker zum Vergleich der Lage der Icons
    mrk.bindPopup(`Standort: ${blick.standort} (${blick.seehoehe} m)`);
}
overlay.adlerblicke.addTo(map);

let drawEtappe = function (nr) {
    overlay.etappen.clearLayers();

    //console.log(ETAPPEN[nr].track);
    let track = ETAPPEN[nr].track.replace("A", "");
    //console(track);

    let gpx = new L.GPX(`gpx/AdlerwegEtappe${track}.gpx`, {
        async: true,
        marker_options: {
            startIconUrl: `icons/number_${nr}.png`,
            endIconUrl: 'icons/finish.png',
            shadowUrl: null,
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37],
        },
        polyline_options: {
            dashArray: [10, 5],
            color: 'black',
            opacity: 0.75,
            weight: 3,
            lineCap: 'round'
        }
    });

    gpx.on("loaded", function (evt) {
        map.fitBounds(evt.target.getBounds());
        controlElevation.clear(); //löschen des vorhergehenden Profils, damit nur eines angezeigt wird
        controlElevation.load(`gpx/AdlerwegEtappe${track}.gpx`); //Hinzufügen des Höhenprofils
    }).addTo(overlay.etappen); //so wie data.loaded, bei gpx dateien nur "loaded"
    overlay.etappen.addTo(map);

    for (const key in ETAPPEN[nr]) {
        const val = ETAPPEN[nr][key];
        //console.log(et-${key});
        let elem = document.querySelector(`#et-${key}`);
        if (elem) {
            if (key == "track") {
                let outer = `<a id="et-track" href="gpx/AdlerwegEtappe${track}.gpx" download="">Etappen-GPX zum Download</a>`
                elem.outerHTML = outer;
            }
            elem.innerHTML = val;
            //console.log(val);
        }
    }
};
drawEtappe(1);

let pulldown = document.querySelector("#pulldown");
//console.log(pulldown);

for (let i = 0; i < ETAPPEN.length; i++) {
    const etappe = ETAPPEN[i];
    //console.log(etappe);
    pulldown.innerHTML += `<option value="${i}"> ${etappe.titel}</option>`;
}
pulldown.onchange = function (evt) {
    let nr = evt.target.options[evt.target.options.selectedIndex].value;
    //console.log(nr);
    drawEtappe(nr);
}

let drawEinkehr = function () { //FUnktionen müssen auch immer aufgerufen werden!
    for (let einkehr of EINKEHR) {
        //console.log(einkehr);    
        let mrk = L.marker([einkehr[2], einkehr[3]], { //Einkehr 2, 3 sind die Arrays aus dem einkehr.js = Koordinaten!
            icon: L.icon({
                iconSize: [32, 37], //sobald bei einem Icon Height und Size eingegeben werden, wird das Icon automatisch zentriert
                iconAnchor: [16, 37], //Zentrierung der Icons mit der Spitze an der richtigen Stelle (Mitte und untere kante vom Icon)
                popupAnchor: [0, -37], //Verschieben des Popups um 37 pixel nach oben
                iconUrl: "icons/restaurant.png"
            })
        }).addTo(overlay.einkehr);
        mrk.bindPopup(`${einkehr[1]} (Etappe ${einkehr[0]})`);
    }
}
drawEinkehr(); //Aufrufen der Funktion
overlay.einkehr.addTo(map); //Hinzufügen des Overlay zur Karte

let controlElevation = L.control.elevation({
    detached: true,
    elevationDiv: "#profile", //# als selector wie im css
    followMarker: false,
    theme: "adler-theme" //"eigenes Theme" - kann dann im CSS gestyled werden
    //Optionen folgen keiner bestimmten Reihenfolge, können geschrieben werden wie man will
}).addTo(map);

L.control.scale({
    imperial: false
}).addTo(map); //Maßstab hinzufügen

//http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=44.1&south=-9.9&east=-22.4&west=55.2&username=elsa_ve&style=full