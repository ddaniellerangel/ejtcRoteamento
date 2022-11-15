import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entrega } from 'src/models/entrega';
import { EntregaService } from 'src/services/domain/entrega.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {

  listEntregas: Entrega[];

  constructor(public entregasService: EntregaService, public router : Router) { }

  ngOnInit() {
    this.entregasService.findAll().subscribe(response => {
      this.listEntregas = response;
    },
    error => {});
  }

}
