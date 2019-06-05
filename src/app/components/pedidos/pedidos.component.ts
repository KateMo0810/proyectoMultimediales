import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoModel, EmpaqueModel } from '../../models/models.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

  pedidos:PedidoModel[];
  empaques:EmpaqueModel[];
  estan:number=-1;
  inst:string;
  constructor(private pedSer: PedidosService) {
     this.pedidos=[];
     this.empaques=[];
   }

  ngOnInit() {
    this.pedSer.getAll().subscribe(a=>{
      this.pedidos=a;
      this.pedidos.sort((a,b)=>a.fecha.localeCompare(b.fecha));
    });
  }

  verInfo(pedido:PedidoModel,i:number){
     this.empaques= pedido.pedidos;
     this.inst=pedido.instrucciones;
     console.log(pedido);
     this.estan=i;
  }

  ocultar(){
    this.empaques=[];
    this.estan=-1;
  }

  actualizar(pedido:PedidoModel){
    swal.fire({
      title: 'Está seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        pedido.estado="Enviado";
    this.pedSer.update(pedido);
      }
  });
  }

}
