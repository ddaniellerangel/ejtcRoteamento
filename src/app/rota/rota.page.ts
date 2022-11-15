import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map : any;
  originPosition: string;
  destinationPosition: string;

  constructor(private geolocation: Geolocation) { }
  carregaMapa(){

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const myPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: myPosition
        }
  
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
        const marker = new google.maps.Marker({
          position: myPosition,
          map: this.map
        });

      }).catch((error) => {
        //console.log('Erro ao recuperar sua posição', error);
        const myPosition = new google.maps.LatLng(-20.8410106,-41.1169916);

        const mapOptions = {
          zoom: 18,
          center: myPosition
        }
  
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.directionsDisplay.setMap(this.map);
  
        const marker = new google.maps.Marker({
          position: myPosition,
          map: this.map
        });
      });
    
  }

  calculateRoute() {
    console.log("dentro do calculateRoute");
    this.destinationPosition = new google.maps.LatLng(-20.8576753,-41.1171207);
    this.originPosition = new google.maps.LatLng(-20.8410106,-41.1169916);
    console.log(this.originPosition);
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  ngOnInit() {
    this.carregaMapa();
  }

}
