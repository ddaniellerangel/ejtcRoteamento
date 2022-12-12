import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DistanceMatrix } from 'src/models/distanceMatrix';
import { DistanciaDados } from 'src/models/distanciaDados';
import { Entrega } from 'src/models/entrega';
import { Rota } from 'src/models/rota';
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
  originPosition: String;
  destinationPosition: String;

  listRotas: Rota[];
  listEntregas: Entrega[];

  listMatrix: Array<DistanceMatrix> = [];

  listDistanciaDados: Array<DistanciaDados> = [];

  listDadosAux: Array<DistanceMatrix> = [];

  cont: number = 0;

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

  // calculateRoute() {
  //   this.destinationPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
  //   this.originPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
  //   if (this.destinationPosition && this.originPosition) {
  //     const request = {
  //       // Pode ser uma coordenada (LatLng), uma string ou um lugar
  //       origin: this.originPosition,
  //       destination: this.destinationPosition,
  //       travelMode: 'DRIVING',
  //       waypoints: [
  //         {
  //           location: '-20.845679,-41.1152898',
  //           stopover: true
  //         },
  //         {
  //           location: '-20.8494766,-41.1116471',
  //           stopover: true
  //         },
  //         {
  //           location: '-20.8473118,-41.1390176',
  //           stopover: true
  //         },
  //         {
  //           location: '-20.839695,-41.1224022',
  //           stopover: true
  //         }
  //       ],
  //       provideRouteAlternatives: true
  //     };
  //     this.traceRoute(this.directionsService, this.directionsDisplay, request);
  //   }
  // }

  traceRoute(service: any, display: any, request: any) {
    display.setMap(this.map);
    service.route(request, function (result, status) {
      if (status == 'OK') {
        //console.log(result.routes);
        display.setDirections(result);
      }
    });
  }

  async calculoDaRota() {

    this.entregaService.findByRota(this.listRotas[0].codRota).subscribe(async response => {
      this.listEntregas = response;

      await this.buscaMatrixDistancia(this.listEntregas);

      //console.log(this.listDadosAux);

      // if (this.listEntregas.length > 1) {
      //   for (let i = 0; i <= this.listEntregas.length; i++) {
      //     if (i == 0) {
      //       this.originPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
      //       this.destinationPosition = this.listEntregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero;
      //     }
      //     else if (i > 0 && i < (this.listEntregas.length)) {
      //       this.originPosition = this.listEntregas[i - 1].endereco.cep + this.listEntregas[i - 1].endereco.rua + this.listEntregas[i - 1].endereco.numero;
      //       this.destinationPosition = this.listEntregas[i].endereco.cep + this.listEntregas[i].endereco.rua + this.listEntregas[i].endereco.numero;
      //     }
      //     else if (i == (this.listEntregas.length)) {
      //       this.originPosition = this.listEntregas[i - 1].endereco.cep + this.listEntregas[i - 1].endereco.rua + this.listEntregas[i - 1].endereco.numero;
      //       this.destinationPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
      //     }

      //     if (this.destinationPosition && this.originPosition) {
      //       const request = {
      //         // Pode ser uma coordenada (LatLng), uma string ou um lugar
      //         origin: this.originPosition,
      //         destination: this.destinationPosition,
      //         travelMode: 'DRIVING',
      //         provideRouteAlternatives: false
      //       };
      //       this.traceRoute(this.directionsService, new google.maps.DirectionsRenderer({ draggable: false }), request);
      //     }

      //   }
      // }

      if (this.listDadosAux.length > 1) {
        for (let i = 0; i <= this.listDadosAux.length; i++) {
          if (i == 0) {
            this.originPosition = new google.maps.LatLng(-20.8410106, -41.1169916);
            this.destinationPosition = this.listDadosAux[i].infoBusca;
          }
          else if (i > 0 && i < (this.listDadosAux.length)) {
            this.originPosition = this.listDadosAux[i - 1].infoBusca;
            this.destinationPosition = this.listDadosAux[i].infoBusca;
          }
          else if (i == (this.listDadosAux.length)) {
            this.originPosition = this.listDadosAux[i-1].infoBusca;
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
    },
      error => { });
  }


  async buscaMatrixDistancia(entregas: Entrega[]) {

    for (let i = 0; i < entregas.length; i++) {

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

    let listDistanciaDadosAux: Array<DistanciaDados> = [];
    //let cont: number = 0;
    let primeiroLoop = true;
    let tamanhoListMatrix = this.listMatrix.length;
    while (this.cont < tamanhoListMatrix) {

      let origem: String = "";
      if (primeiroLoop) {
        origem = "-20.8410106,-41.1169916";
        primeiroLoop = false;
        let distanceMatrixOptions;

        for (let i = 0; i < this.listMatrix.length; i++) {
          distanceMatrixOptions = {
            origins: [
              origem
            ],
            destinations: [
              this.listMatrix[i].infoBusca
            ],
            travelMode: 'DRIVING'
          };

          await this.calculaMatriz(distanceMatrixOptions, this.listMatrix[i].id_DistanceMatrix, listDistanciaDadosAux);
        }

        this.calcularMenor(listDistanciaDadosAux);

      } else {
        origem = this.listDadosAux[this.cont-1].infoBusca;

        let distanceMatrixOptions;

        for (let i = 0; i < this.listMatrix.length; i++) {
          distanceMatrixOptions = {
            origins: [
              origem
            ],
            destinations: [
              this.listMatrix[i].infoBusca
            ],
            travelMode: 'DRIVING'
          };

          await this.calculaMatriz(distanceMatrixOptions, this.listMatrix[i].id_DistanceMatrix, listDistanciaDadosAux);
        }

        this.calcularMenor(listDistanciaDadosAux);
      }
      //this.cont++;
    }
    //console.log(this.listDadosAux);
  }

  async calculaMatriz(distanceMatrixOptions, id_DistanceMatrix, listDistanciaDadosAux: Array<DistanciaDados> = []) {
    await this.distanceMatrixService.getDistanceMatrix(distanceMatrixOptions, function (result, status) {
      if (status == 'OK') {
        let distanciaDados: DistanciaDados = {
          id: null,
          distancia: null
        };
        distanciaDados.id = id_DistanceMatrix;
        distanciaDados.distancia = result.rows[0].elements[0].distance.value;
        listDistanciaDadosAux.push(distanciaDados);
      }
    })

  }

  calcularMenor(listDistanciaDadosAux) {
    let menor: DistanciaDados = {
      id: listDistanciaDadosAux[0].id,
      distancia: listDistanciaDadosAux[0].distancia
    };
    for (let i = 0; i < listDistanciaDadosAux.length; i++) {
      if (menor.distancia > listDistanciaDadosAux[i].distancia) {
        menor.id = listDistanciaDadosAux[i].id;
        menor.distancia = listDistanciaDadosAux[i].distancia;
      }
    }

    listDistanciaDadosAux.length = 0;
    // console.log(listDistanciaDadosAux);
    // console.log(menor.distancia);

    let dadoMatrixOrdem = this.listMatrix.find(function(distanceMatrix) {
      return distanceMatrix.id_DistanceMatrix === menor.id;
    });

    // console.log(dadoMatrixOrdem);

    this.listDadosAux.push(dadoMatrixOrdem);

    //console.log(this.listDadosAux);

    // console.log(this.listMatrix);
    this.listMatrix = this.listMatrix.filter(item => item.id_DistanceMatrix != menor.id);
    // console.log(this.listMatrix);
    this.cont++;
  }

  ngOnInit() {
    this.carregaMapa();

    this.rotaService.findAll().subscribe(response => {
      this.listRotas = response;
    },
      error => { });
  }

}
