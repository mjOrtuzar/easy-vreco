// para obtener la posicion del usuario se usa el metodo get current position que recibe dos parametros.
// que son dos funciones (una funcion y error)
var map; // mapa
var infowindow; // pin
var mapita = document.getElementById('map');

google.maps.event.addDomListener(window, "load", function() {
  // se crea mapa con las coordenadas actuales.
  function error() {
    mapita.innerHTML = 'navegador no soporta geolocalizacion';
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
 	var myPosMarker = new google.maps.Marker({
 		position: myLatLng,
 		map: map,
 		center: myLatLng,
 	});

 	// se crea variables y funciones para autocompletado

 	var autocomplete = document.getElementById('autocomplete');
 	var autocompleteTwo = document.getElementById('autocompleteTwo');
 	const search = new google.maps.places.Autocomplete(autocomplete);
 	const scndSearch = new google.maps.places.Autocomplete(autocompleteTwo);
 	search.bindTo('bounds', map);
 	scndSearch.bindTo('bounds', map);

 	// se crea trazado de ambos puntos

 	// con directionsService calculamos las indicaciones.
 	var directionsService = new google.maps.DirectionsService();
 	// con directionsRenderer representamos los resultados.
 	var directionsDisplay = new google.maps.DirectionsRenderer();
 	//se calcula y muestra la ruta.
 	var calculateAndDisplayRoute = function(directionsService,directionsDisplay){
 		directionsService.route({
 			origin:autocomplete.value,
 			destination: autocompleteTwo.value,
 			travelMode:'WALKING' //DRIVING BICYCLING
 		}, function(response,status){
 			//si status es ok, entonces se trazara la ruta. Si no, se envia un mensaje de error.
 			if( status === 'OK') {
 				directionsDisplay.setDirections(response);
 			} else {
 				window.alert('no encontramos una ruta para ti :(');
 			}

 		});
 	};
 	// se indica al mapa para que traze la ruta
   directionsDisplay.setMap(map);

   var route = function() {
	// declaramos la f(x) 'route' que tendra la f(x) calculareAndDisplayRoute
	calculateAndDisplayRoute(directionsService, directionsDisplay);
   };
   // al boton Trazar ruta le asigamos el evento click para que ejecute la funcion route
   document.getElementById('route').addEventListener('click', route);
  } , error);
});
