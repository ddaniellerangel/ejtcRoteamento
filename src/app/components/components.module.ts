import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderVoltarComponent } from './header-voltar/header-voltar.component';
import { IonicModule } from '@ionic/angular';
import { ButtonAddComponent } from './button-add/button-add.component';
import { ButtonUpdateComponent } from './button-update/button-update.component';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';

@NgModule({
  declarations: [
    HeaderVoltarComponent,
    ButtonAddComponent,
    ButtonUpdateComponent,
    ButtonDeleteComponent
  ],
  exports: [
    HeaderVoltarComponent,
    ButtonAddComponent,
    ButtonUpdateComponent,
    ButtonDeleteComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
