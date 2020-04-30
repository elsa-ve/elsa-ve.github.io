let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup()
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
    "Adlerblicke": overlay.adlerblicke 
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

let gpx = new L.GPX("gpx/AdlerwegEtappe01.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png'
      }
});

gpx.on("loaded", function(evt) { 
    map. fitBounds(evt.target.getBounds());
}).addTo(map); //so wie data.loaded, bei gpx dateien nur "loaded"