import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/models/cliente';
import { ClienteService } from 'src/services/domain/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  listClientes: Cliente[];

  constructor(public clienteService: ClienteService, public router : Router) { }

  ngOnInit() {
    this.clienteService.findAll().subscribe(response => {
      this.listClientes = response;
    },
    error => {});
  }

  // public editarCategoria(catSelecionada : Categoria){
  //   this.categoriaService.setCategoria(catSelecionada);
  //   this.router.navigateByUrl('\categoria-edit');
  // }

}
