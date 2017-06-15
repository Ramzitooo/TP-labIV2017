import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WsService } from '../services/ws/ws.service';
declare var google;

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  constructor(private ws:WsService) 
  { 
    this.ws.getlatlng("Burzaco").then(data => {console.log(data.results["0"].geometry.location);})
  }

  directionsService;
  directionsDisplay;

//MARCADOR 1
lat = -34.8081469;
lng = -58.4029402;
latlng = new google.maps.LatLng(this.lat, this.lng);
m1 = new google.maps.Marker({position: this.latlng, animation: google.maps.Animation.DROP, title: "Usuario"});


//MARCADOR 2
/*lat2 = -34.6654543;
lng2 = -58.3679265;
latlng2 = new google.maps.LatLng(this.lat2, this.lng2);
m2 = new google.maps.Marker({position: this.latlng2, animation: google.maps.Animation.DROP, title: "Usuario"});*/

marcadorUsuario : any = null;
direccion="";
obj={lat:"",lng:""};

  @ViewChild('map') mapElement: ElementRef;


  
  map: any;
  ngOnInit() 
  {
    
    this.CargarMapa()//Cargo el mapa!

    this.m1.setMap(this.map);

    //this.m2.setMap(this.map);
    //this.DibujarRuta();

    this.MarcarUsuario();

    //this.m1.setMap(this.map);
    
  }
  LeerDireccion()
  {
    console.log(this.direccion);

    this.ws.getlatlng(this.direccion)
    .then(data => 
    {

      var lng = data.results["0"].geometry.location.lng;
      var lng2:string  = data.results["0"].geometry.location.lng;
      var lat= data.results["0"].geometry.location.lat;
      this.obj.lat=lat;
      this.obj.lng=lng;
      var latlng = new google.maps.LatLng(lat,lng);
      var mapatext = new google.maps.Marker({position: latlng, animation: google.maps.Animation.DROP, title: "Escribiste"});
      mapatext.setMap(this.map);
    })
    .catch(error =>
    {
      console.log(error);
    });
    
  }
  Chequear()
  {
    console.log(this.obj);   
  }
  MarcarUsuario()
  {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => 
      {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        this.marcadorUsuario = new google.maps.Marker({position: latlng, animation: google.maps.Animation.DROP , title: "Usuario"});
        this.marcadorUsuario.setMap(this.map);
        this.DibujarRuta(this.marcadorUsuario.position,this.m1.position);

      }, 
      (error) => { console.log(error); }, 
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    };
  }

  CargarMapa()
  {
    let latLng = new google.maps.LatLng(-34.8201154,-58.3714717);
 
    let mapOptions = {
      center: latLng,
      zoom: 4,
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
      travelMode: google.maps.TravelMode.WALKING
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
