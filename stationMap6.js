

var mymap = L.map('mapid').setView([ 43.761539, -79.411079], 10);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);

L.control.navbar().addTo(mymap);

function getColor(line) {
    return line == 'Lakeshore East' ? '#ED2318' : 
           line == 'Richmond Hill' ? '#009AC9' : 
           line == 'Stouffville' ? '#733C00' : 
           line == 'Kitchener' ? '#00833B' : 
           line == 'Barrie' ? '#002D61' : 
           line == 'Milton' ? '#F57E23' : 
           line == 'Lakeshore West' ? '#97012B' : 
           line == 'Niagara Falls' ? '#97012B' : 
           line == 'ALL' ? 'black' : '#616161'
                
}



 function style(feature){
 	return{
 	radius: 6.5,
    fillColor: getColor(feature.properties.line),
    color:"lightgray",
    weight: 3,
    opacity: "",
    fillOpacity: 0.8
};
 }


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        radius:9,
        weight: 6,
        color: 'grey',
        fillColor:'lightgray',
        dashArray: '',
        fillOpacity: ''
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
   
}


var points;
var layer;
var popupContent;

function resetHighlight(e) {
    points.resetStyle(e.target);
}
function zoomToFeature(e) {
        mymap.fitBounds(e.target.getBounds());
    }
function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
                click: zoomToFeature
			});
			
           var popupContent = feature.properties.name_long;
           layer.bindLabel(popupContent).addTo(mymap);
		}


points = L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
        
    },
    
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);


  
           