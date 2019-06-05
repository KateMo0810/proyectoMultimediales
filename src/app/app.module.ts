import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {  HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ComprasComponent } from './components/compras/compras.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PedidoComponent,
    PedidosComponent,
    ComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
