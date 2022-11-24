import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DistanceMatrix } from 'src/models/distanceMatrix';
import { DistanceMatrixService } from 'src/services/distanceMatrix.service';

declare var google;

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {

  distanceMatrixService = new google.maps.DistanceMatrixService();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
  map : any;
  startPosition: any;
  originPosition: any;
  destinationPosition: string;

  constructor(private geolocation: Geolocation) { }
  carregaMapa(){

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: this.startPosition
        }
  
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.directionsDisplay.setMap(this.map);
  
        const marker = new google.maps.Marker({
          position: this.startPosition,
          map: this.map
        });

      }).catch((error) => {
        //console.log('Erro ao recuperar sua posição', error);
        const ejtc = new google.maps.LatLng(-20.8410106,-41.1169916);

        const mapOptions = {
          zoom: 18,
          center: ejtc
        }
  
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.directionsDisplay.setMap(this.map);
  
        const marker = new google.maps.Marker({
          position: ejtc,
          map: this.map
        });
      });
    
  }

  calculateRoute() {
    this.destinationPosition = new google.maps.LatLng(-20.8410106,-41.1169916);
    this.originPosition = new google.maps.LatLng(-20.8410106,-41.1169916);
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING',
        waypoints: [
          {
            location: '-20.8410383,-41.1147429',
            stopover: true
          },
          {
            location: '-20.8364831,-41.1137687',
            stopover: true
          },
          {
            location: '20.8355766,-41.1138249',
            stopover: true
          },
          {
            location: '-20.8383636,-41.1170321',
            stopover: true
          }
        ],
        provideRouteAlternatives: true
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        console.log(result.routes);
        display.setDirections(result);
      }
    });
  }

  buscaMatrixDistancia(){

    let dtMatrix0 : DistanceMatrix = {
      infoBusca : "",
      foiOrigem : false,
      foiDestino : false,
      isEscritorio : false,
      id_DistanceMatrix : null,
      verticeOrigem : null,
      verticeDestino : null,
    };

    let dtMatrix1 : DistanceMatrix = {
      infoBusca : "",
      foiOrigem : false,
      foiDestino : false,
      isEscritorio : false,
      id_DistanceMatrix : null,
      verticeOrigem : null,
      verticeDestino : null,
    };

    let dtMatrix2 : DistanceMatrix = {
      infoBusca : "",
      foiOrigem : false,
      foiDestino : false,
      isEscritorio : false,
      id_DistanceMatrix : null,
      verticeOrigem : null,
      verticeDestino : null,
    };

    let dtMatrix3 : DistanceMatrix = {
      infoBusca : "",
      foiOrigem : false,
      foiDestino : false,
      isEscritorio : false,
      id_DistanceMatrix : null,
      verticeOrigem : null,
      verticeDestino : null,
    };

    let dtMatrix4 : DistanceMatrix = {
      infoBusca : "",
      foiOrigem : false,
      foiDestino : false,
      isEscritorio : false,
      id_DistanceMatrix : null,
      verticeOrigem : null,
      verticeDestino : null,
    };

    let listDados: Array<DistanceMatrix> = [];

    //setando manualmente as informações do escritorio
    dtMatrix0.infoBusca = "-20.8266281,-41.1188745";
    dtMatrix0.foiDestino = false;
    dtMatrix0.foiOrigem = false;
    dtMatrix0.isEscritorio = true;
    dtMatrix0.id_DistanceMatrix = 0;
    dtMatrix0.verticeOrigem = null;
    dtMatrix0.verticeDestino = null;

    //console.log(dtMatrix0);
    listDados.push(dtMatrix0);
    //console.log(listDados);

    dtMatrix1.infoBusca = "-20.8271812,-41.1194278";
    dtMatrix1.foiDestino = false;
    dtMatrix1.foiOrigem = false;
    dtMatrix1.isEscritorio = false;
    dtMatrix1.id_DistanceMatrix = 1;
    dtMatrix1.verticeOrigem = null;
    dtMatrix1.verticeDestino = null;

    listDados.push(dtMatrix1);
    //console.log(listDados);

    dtMatrix2.infoBusca = "-20.8356804,-41.113823";
    dtMatrix2.foiDestino = false;
    dtMatrix2.foiOrigem = false;
    dtMatrix2.isEscritorio = false;
    dtMatrix2.id_DistanceMatrix = 2;
    dtMatrix2.verticeOrigem = null;
    dtMatrix2.verticeDestino = null;

    listDados.push(dtMatrix2);

    dtMatrix3.infoBusca = "-20.8319439,-41.1144188";
    dtMatrix3.foiDestino = false;
    dtMatrix3.foiOrigem = false;
    dtMatrix3.isEscritorio = false;
    dtMatrix3.id_DistanceMatrix = 3;
    dtMatrix3.verticeOrigem = null;
    dtMatrix3.verticeDestino = null;

    listDados.push(dtMatrix3);

    dtMatrix4.infoBusca = "-20.8295166,-41.1168467";
    dtMatrix4.foiDestino = false;
    dtMatrix4.foiOrigem = false;
    dtMatrix4.isEscritorio = false;
    dtMatrix4.id_DistanceMatrix = 4;
    dtMatrix4.verticeOrigem = null;
    dtMatrix4.verticeDestino = null;

    listDados.push(dtMatrix4);

    //console.log(this.listDados.length);

    let cont = 0;
    let primeiroLoop = true;
    //let listDadosAux = this.listDados;
    //while(cont < this.listDados.length){

      // let origens: String = "";
      // let destinos: String = "";
      // if(primeiroLoop){
      //   origens = this.listDados[0].infoBusca;
      //   destinos = this.listDados[1].infoBusca + ", " + this.listDados[2].infoBusca + ", " + this.listDados[3].infoBusca + ", " + this.listDados[4].infoBusca;
      //   //console.log("primeiroLoop");
      //   //console.log(origens);
      //   //console.log(destinos);
      //   primeiroLoop = false;
      // }
      const distanceMatrixOptions = {
        origins: [ 
          listDados[0].infoBusca
        ],
        destinations: [ 
          listDados[1].infoBusca,
          listDados[2].infoBusca,
          listDados[3].infoBusca,
          listDados[4].infoBusca
        ],
        travelMode: 'DRIVING'
      };

      this.distanceMatrixService.getDistanceMatrix(distanceMatrixOptions, function (result, status) {
      if (status == 'OK') {
        //console.log(result);
        var menor = result.rows[0].elements[0].distance.value;
        //console.log(result.rows[0].elements.length);
        for(var i = 0; i < result.rows[0].elements.length; i++){
          //console.log(result.rows[0].elements[i].distance.value);
          if(menor > result.rows[0].elements[0].distance.value){
            menor = result.rows[0].elements[0].distance.value;
          }
        }
       //console.log(menor);
       
        
      }
    })



      //cont++;
    //}

    
    // const distanceMatrixOptions = {

    //   origins: [
    //     "-20.8266281,-41.1188745"
    //   ],
    //   destinations: [
    //     ,
    //     ,
    //     ,
    //     ,

    //   ],
    //   travelMode: 'DRIVING'
    // };

    // this.distanceMatrixService.getDistanceMatrix(distanceMatrixOptions, function (result, status) {
    //   if (status == 'OK') {
    //     var menor = result.rows[0].elements[0].distance.value;
    //     //console.log(result.rows[0].elements.length);
    //     for(var i = 0; i < result.rows[0].elements.length; i++){
    //       //console.log(result.rows[0].elements[i].distance.value);
    //       if(menor > result.rows[0].elements[0].distance.value){
    //         menor = result.rows[0].elements[0].distance.value
    //       }
    //     }
    //     //console.log(menor);
    //   }
    // })
  }

  ngOnInit() {
    this.carregaMapa();
  }

}
