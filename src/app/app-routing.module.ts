import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ComprasComponent } from './components/compras/compras.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'pedido/:id', component: PedidoComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'pedidos', component: PedidosComponent,
      canActivate:[
          AuthGuard
      ]},
    { path: '**', pathMatch:'full', redirectTo:'home'},
];

@NgModule({
    imports:[RouterModule.forRoot(ROUTES)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
