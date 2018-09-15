$(document).ready(function(){
    
//Inicia o mapa
var map = L.map('mapid').setView([0, 0], 13);
//Indica a posicao atual
map.locate({
    setView: true,
    maxZoom: 16
});
    
var icone = L.icon({
    iconUrl: 'logo-sigev.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

//Atribuuição obrigatoria do OSM
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
            lat : position.coords.latitude,
            lng : position.coords.longitude
            
        };

        L.marker([pos.lat, pos.lng]).addTo(map)
        .bindPopup("Você está aqui").openPopup();
    })
    
}

function onLocationError(e) {
    alert(e.message);
}

$.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'resultado.php',
    async: true,
    success: function(response) {
        for(i = 0; i < response["0"].length; i++){
            var localizacao = L.latLng(response["0"][i].lat, response["0"][i].lng);
            
            
            L.marker(localizacao).addTo(map).bindPopup(response["0"][i].descricao).openPopup();;
            //console.log(response[i]);
        }
    }
})    
    
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

L.control.locate().addTo(map);
});


