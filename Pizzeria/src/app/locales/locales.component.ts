import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  constructor() 
  { 

  }

  directionsService;
  directionsDisplay;

//MARCADOR 1
lat = -34.6623101;
lng = -58.3668938;
latlng = new google.maps.LatLng(this.lat, this.lng);
m1 = new google.maps.Marker({position: this.latlng, animation: google.maps.Animation.DROP, title: "Usuario"});


//MARCADOR 2
lat2 = -34.6654543;
lng2 = -58.3679265;
latlng2 = new google.maps.LatLng(this.lat2, this.lng2);
m2 = new google.maps.Marker({position: this.latlng2, animation: google.maps.Animation.DROP, title: "Usuario"});


       

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  ngOnInit() 
  {
    
    this.CargarMapa()//Cargo el mapa!
    //this.DibujarRuta();
    this.m1.setMap(this.map);
    this.m2.setMap(this.map);
    this.DibujarRuta(this.m1.position,this.m2.position);
    
  }
 /* MarcarUsuario() //MARCAR EL USUARIO VER... permitir acceso
  {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => 
      {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        this.marcadorUsuario = new google.maps.Marker({position: latlng, animation: google.maps.Animation.DROP, title: "YO"});
        this.marcadorUsuario.setMap(this.map);
        this.ObtenerDireccion();

        if (this.local != null)
          this.DibujarRuta(this.local.marcador.position, this.marcadorUsuario.position);
      }, 
      (error) => { console.log(error); }, 
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    };
}*/
  CargarMapa()
  {
    let latLng = new google.maps.LatLng(-34.6623101, -58.36470509999999);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      minZoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    })

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    })
  }
  
  DibujarRuta(marcador1, marcador2)
  {
    
    console.log("Dibujo la ruta");
    this.directionsService.route({
      origin: marcador1,
      destination: marcador2,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
