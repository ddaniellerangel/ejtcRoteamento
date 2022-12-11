import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DistanceMatrix } from 'src/models/distanceMatrix';
import { Entrega } from 'src/models/entrega';
import { Rota } from 'src/models/rota';
import { DistanceMatrixService } from 'src/services/distanceMatrix.service';
import { EntregaService } from 'src/services/domain/entrega.service';
import { RotaService } from 'src/services/domain/rota.service';

declare var google;

@Component({
  selector: 'app-rota',
  templateUrl: './rota.page.html',
  styleUrls: ['./rota.page.scss'],
})
export class RotaPage implements OnInit {

  distanceMatrixService = new google.maps.DistanceMatrixService();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
  map: any;
  startPosition: any;
  originPosition: any;
  destinationPosition: string;

  listRotas: Rota[];
  listEntregas: Entrega[];

  listMatrix: Array<DistanceMatrix> = [];

  constructor(private geolocation: Geolocation, public rotaService: RotaService, public entregaService: EntregaService) { }
  carregaMapa() {

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
        const ejtc = new google.maps.LatLng(-20.8410106, -41.1169916);

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
    this.destinationPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
    this.originPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING',
        waypoints: [
          {
            location: '-20.845679,-41.1152898',
            stopover: true
          },
          {
            location: '-20.8494766,-41.1116471',
            stopover: true
          },
          {
            location: '-20.8473118,-41.1390176',
            stopover: true
          },
          {
            location: '-20.839695,-41.1224022',
            stopover: true
          }
        ],
        provideRouteAlternatives: true
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    display.setMap(this.map);
    service.route(request, function (result, status) {
      if (status == 'OK') {
        //console.log(result.routes);
        display.setDirections(result);
      }
    });
  }

  calculoDaRota() {

    this.entregaService.findByRota(this.listRotas[0].codRota).subscribe(response => {
      this.listEntregas = response;

      this.buscaMatrixDistancia(this.listEntregas);

      if (this.listEntregas.length > 1) {
        for (let i = 0; i < this.listEntregas.length; i++) {
          if (i == 0) {
            this.originPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
            this.destinationPosition = this.listEntregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero;
          }
          else if (i > 0 && i < (this.listEntregas.length - 1)) {
            this.originPosition = this.listEntregas[i - 1].endereco.cep + this.listEntregas[i - 1].endereco.rua + this.listEntregas[i - 1].endereco.numero;
            this.destinationPosition = this.listEntregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero;
          }
          else if (i == (this.listEntregas.length - 1)) {
            this.originPosition = this.listEntregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero;
            this.destinationPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
          }

          if (this.destinationPosition && this.originPosition) {
            const request = {
              // Pode ser uma coordenada (LatLng), uma string ou um lugar
              origin: this.originPosition,
              destination: this.destinationPosition,
              travelMode: 'DRIVING',
              provideRouteAlternatives: false
            };
            this.traceRoute(this.directionsService, new google.maps.DirectionsRenderer({ draggable: false }), request);
          }

        }
      }
      else if (this.listEntregas.length == 1) {
        // codificar aqui
      }
    },
      error => { });
  }

  buscaMatrixDistancia(entregas: Entrega[]) {

    for (let i = 0; i < entregas.length; i++) {
      // if(i == 0){//verificar que é a primeira vez
      //   let dadosMatrix: DistanceMatrix = {
      //     infoBusca: "-20.8410106,-41.1169916",
      //     foiOrigem: false,
      //     foiDestino: false,
      //     isEscritorio: true,
      //     id_DistanceMatrix: null,
      //     id_verticeOrigem: null,
      //     id_verticeDestino: null,
      //   };
      //   this.listMatrix.push(dadosMatrix);
      // }

      let dadosMatrix: DistanceMatrix = {
        infoBusca: entregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero,
        foiOrigem: false,
        foiDestino: false,
        isEscritorio: false,
        id_DistanceMatrix: entregas[i].codEntrega,
        id_verticeOrigem: null,
        id_verticeDestino: null,
      };
      this.listMatrix.push(dadosMatrix);
    }

    console.log(this.listMatrix);


    let listDadosAux: Array<DistanceMatrix> = [];
    let cont: number = 0;
    let primeiroLoop = true;
    let distanciaDados = {id: Number, ditancia: Number};
    let vetDistancias = [];
    while (cont < this.listMatrix.length) {

      let origem: String = "";
      let destinos: String = "";
      if (primeiroLoop) {
        origem = "-20.8410106,-41.1169916";
        primeiroLoop = false;
        let distanceMatrixOptions;
        for(let i = 0; i < this.listMatrix.length; i++){
          distanceMatrixOptions = {
            origins: [
              origem
            ],
            destinations: [
              this.listMatrix[i].infoBusca
            ],
            travelMode: 'DRIVING'
          };
          this.distanceMatrixService.getDistanceMatrix(distanceMatrixOptions, function (result, status) {
            if (status == 'OK') {
              console.log(result);
              distanciaDados.id = this.listMatrix[i].id_DistanceMatrix;
              //como fazer estruturas par a colocar os valores de distancia para ordenar e pegar o menor e atribuir como destino e pegar ele como proxima origem
              // var menor = result.rows[0].elements[0].distance.value;
              // //console.log(result.rows[0].elements.length);
              // for (var i = 0; i < result.rows[0].elements.length; i++) {
              //   //console.log(result.rows[0].elements[i].distance.value);
              //   if (menor > result.rows[0].elements[0].distance.value) {
              //     menor = result.rows[0].elements[0].distance.value;
              //   }
              // }
              //console.log(menor);
            }
          })
        }

        
      }else{

      }

      

      cont++;
    }
  }

  ngOnInit() {
    this.carregaMapa();

    this.rotaService.findAll().subscribe(response => {
      this.listRotas = response;
    },
      error => { });
  }

}
