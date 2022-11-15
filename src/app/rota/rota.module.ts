import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotaPageRoutingModule } from './rota-routing.module';

import { RotaPage } from './rota.page';
import { ComponentsModule } from '../components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotaPageRoutingModule,
    ComponentsModule
  ],
  providers: [Geolocation],
  declarations: [RotaPage]
})
export class RotaPageModule {}
