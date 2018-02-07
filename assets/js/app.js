// para obtener la posicion del usuario se usa el metodo get current position que recibe dos parametros.
// que son dos funciones (una funcion y error);

var map; // mapa
var infowindow; // pin
var mapita = document.getElementById('map');
function initMap() {
  // se crea mapa con las coordenadas actuales.
  function error() {
    mapita.innerHTML = 'no se puede ver';
  }
  navigator.geolocation.getCurrentPosition(function(position) {
 	var lat = position.coords.latitude;
 	var lon = position.coords.longitude;
 	var myLatLng = new google.maps.LatLng(lat, lon);
 	// se crea el mapa de google que toma dos parametros, el div donde esta contenido el mapa y sus opciones que son un
 	// objeto.
 	map = new google.maps.Map(mapita, {  
          	zoom: 16,
          	center: myLatLng,
    });
 	
 	// se crea el marcador que indica donde estas y este aparece automaticamente en el mapa.
 	var createMarker = new google.maps.Marker({
 		position: myLatLng,
 		map: map,
 		center: myLatLng,
 	});

  }, error);
}