import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { ClienteService } from 'src/services/domain/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { EntregaService } from 'src/services/domain/entrega.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RotaService } from 'src/services/domain/rota.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, 
    ClienteService,
    EntregaService,
    RotaService,
    Geolocation
],
  bootstrap: [AppComponent],
})
export class AppModule {}
