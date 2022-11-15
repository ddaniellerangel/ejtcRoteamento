import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-voltar',
  templateUrl: './header-voltar.component.html',
  styleUrls: ['./header-voltar.component.scss'],
})
export class HeaderVoltarComponent implements OnInit {

  @Input() titulo : String;

  constructor() { }

  ngOnInit() {}

}
