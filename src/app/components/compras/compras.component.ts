import { Component, OnInit } from "@angular/core";
import {
  EmpaqueModel,
  PedidoModel,
  PedidoModelI
} from "../../models/models.model";
import { Router } from "@angular/router";
import { EmpaquesService } from "../../services/empaques.service";
import { PedidosService } from "../../services/pedidos.service";
import swal from "sweetalert2";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class ComprasComponent implements OnInit {
  select1: string = "activo";
  select2: string = "activo";
  direccion:string;
  siU: boolean = false;
  siD: boolean = false;
  bolsas: EmpaqueModel[] = [];
  pedido: PedidoModelI = {
    nombre: "",
    direccion: "",
    fecha: "",
    numero: "",
    instrucciones: "",
    pedidos: [],
    precioTotal: 0,
    estado: "pendiente"
  };

  ngOnInit() {
    this.cargarPedidos();
  }

  constructor(
    private router: Router,
    private empS: EmpaquesService,
    private ped: PedidosService
  ) {}
  select(i: string) {
    if (i == "1") {
      this.select1 = "activo";
      this.select2 = "pasivo";
      this.siU = true;
      this.siD = false;
    } else {
      this.select1 = "pasivo";
      this.select2 = "activos";
      this.siD = true;
      this.siU = false;
    }
  }

  hacerPedido() {
    if (
      this.pedido.nombre == "" ||
      this.pedido.direccion == "" ||
      this.pedido.fecha == "" ||
      this.pedido.numero == ""
    ) {
      swal.fire({
        type: "error",
        title: "Datos incompletos",
        text: "Nombre, dirección, fecha y número son campos obligatorios "
      });
    } else {
      if(this.pedido.pedidos.length==0){
        swal.fire({
          type: "error",
          title: "Datos incompletos",
          text: "Debe tener un empaque mínimo"
        });
      }else{
        this.ped.add(this.pedido);
        swal.fire({
          type: "success",
          title: "Envío exitoso",
          text: "Gracias por escogernos"
        });
        this.empS.eliminarLocal();
        this.vaciarDatos();
        ;
      }
      
    }
    console.log(this.pedido);
  }

  precioFinal() {
    this.pedido.precioTotal = 0;
    for (let i = 0; i < this.pedido.pedidos.length; i++) {
      this.pedido.precioTotal += this.pedido.pedidos[i].precio;
    }
  }

  modificarPedido(i: number) {
    this.router.navigateByUrl("/pedido/" + i);
  }

  eliminarPedido(i: number) {

    swal.fire({
      title: 'Está seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.empS.eliminarEmpaque(i);
    this.cargarPedidos();
        swal.fire(
          'Eliminado!',
          'Se eliminó el empaque correctamente',
          'success'
        )
      }
  });
}

  cargarPedidos() {
    this.pedido.pedidos = [];
    if (this.empS.verEmpaquesC()) {
      console.log("Bolsas: " + (this.bolsas = this.empS.verEmpaquesC()));
      this.pedido.pedidos = this.bolsas;
    }
    this.precioFinal();
  }

  cambioDireccion(tipo){
    this.pedido.direccion=tipo;
  }

  vaciarDatos(){
    this.pedido.direccion="";
    this.pedido.fecha="";
    this.pedido.instrucciones="";
    this.pedido.nombre="";
    this.pedido.numero="";
    this.pedido.pedidos=[];
    this.pedido.precioTotal=0;
  }
}
