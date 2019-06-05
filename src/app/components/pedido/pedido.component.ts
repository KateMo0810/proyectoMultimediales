import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpaqueModel, GalletaModel } from '../../models/models.model';
import swal from 'sweetalert2';
import { EmpaquesService } from '../../services/empaques.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  empaque= new EmpaqueModel();
  parametro:string;
  noEmpaque=false;
  galleta1= new GalletaModel();
  galleta2= new GalletaModel();
  galleta3= new GalletaModel();
  galletasM:number[]=[
    1,2,3,4,5,6,7,8,9,10,11,12
  ]
  galletasG:number[]=[
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
  ]
  mapaE= new Map<string,string>();
  mapaT= new Map<string,string>();
  mapaC= new Map<string,string>();
  mapaPrecios= new Map<string,number>();

   
  constructor(private router:Router, private empServ: EmpaquesService, private rout:ActivatedRoute) { 

  this.mapaE.set("LUNA DE MIEL","bolsa");
  this.mapaE.set("VIDA MÍA","bolsa1");
  this.mapaE.set("ALGUIEN COMO TÚ","bolsa2");
  this.mapaE.set("CLAVE DE AMOR","caja");

  this.mapaT.set("GRANDE","G");
  this.mapaT.set("PEQUEÑO","M");

  this.mapaC.set("ROSADO","Ro");
  this.mapaC.set("VERDE","Ve");
  this.mapaC.set("AZUL","Az");
  this.mapaC.set("MORADO","Mo");

  this.mapaPrecios.set("LUNA DE MIEL GRANDE",5000);
  this.mapaPrecios.set("VIDA MÍA GRANDE",6000);
  this.mapaPrecios.set("ALGUIEN COMO TÚ GRANDE",7000);
  this.mapaPrecios.set("CLAVE DE AMOR GRANDE",9500);
  this.mapaPrecios.set("LUNA DE MIEL PEQUEÑO",3500);
  this.mapaPrecios.set("VIDA MÍA PEQUEÑO",4500);
  this.mapaPrecios.set("ALGUIEN COMO TÚ PEQUEÑO",6500);
  this.mapaPrecios.set("CLAVE DE AMOR PEQUEÑO",8000);
  this.mapaPrecios.set("Gotas de lluvia",1200);
  this.mapaPrecios.set("Idilio de amor",1000);
  this.mapaPrecios.set("Quiereme siempre",1500);


    
  }

  ngOnInit() {
    this.rout.params.subscribe(params=>{
      if(params['id']=="nuevo"){
        this.pedidoInicial();
      }else{
        this.empaque= this.empServ.verEmpaque(params['id']);
        this.noEmpaque=true;
        
      }
      this.parametro=params['id'];
    });
    
  }

  cambioTarjeta(tipo){
    this.empaque.tarjeta=tipo;
    if(tipo=="CUMPLEAÑOS"){
      this.empaque.tarjetaSrc="assets/img/Cump@2x.png";
      this.empaque.tarjetaClase="Cump";
    }
    if(tipo=="NAVIDAD"){
      this.empaque.tarjetaSrc="assets/img/Nav@2x.png";
      this.empaque.tarjetaClase="Nav";
    }
    if(tipo=="SAN VALENTÍN"){
      this.empaque.tarjetaSrc="assets/img/San@2x.png";
      this.empaque.tarjetaClase="San";
    }
  }
  cambioEmpaque(tipo){
    this.empaque.tipo=tipo;
    this.verEmpaque();
  }

  cambioTamano(tipo){
    this.empaque.tamano=tipo;
    this.verEmpaque();
    console.log(tipo);
  }

  cambioColor(tipo){
    this.empaque.color=tipo;
    this.verEmpaque();
  }

  cambioDecoracion(tipo){
    this.empaque.decoracion_=tipo;
    this.verEmpaque();
  }
  cambioGalletas1(cant){
    this.empaque.galletas[0].cantidad=cant;
  }
  
  cambioGalletas2(cant){
    this.empaque.galletas[1].cantidad=cant;
  }
  cambioGalletas3(cant){
    this.empaque.galletas[2].cantidad=cant;
  }

  validarGalletas():boolean{
    if(this.empaque.tamano=="PEQUEÑO"){
      if(Number(this.empaque.galletas[0].cantidad)+Number(this.empaque.galletas[1].cantidad)+Number(this.empaque.galletas[2].cantidad)>12){
        swal.fire({
          type: 'error',
          title: 'Error...',
          text: 'Superaste el límite de 12 galletas para el empaque pequeño',
        });
        return false;
      }else{
        return true;
      }
      
    }else{
      if(Number(this.empaque.galletas[0].cantidad)+Number(this.empaque.galletas[1].cantidad)+Number(this.empaque.galletas[2].cantidad)>25){
        swal.fire({
          type: 'error',
          title: 'Error...',
          text: 'Superaste el límite de 25 galletas para el empaque grande',
        });
        return false;
      }else{
        return true;
      }
    }
  }
  verEmpaque(){
      if(this.empaque.tipo=="CLAVE DE AMOR"){
         if(this.empaque.tamano=="PEQUEÑO"){
           this.empaque.clase=this.mapaE.get(this.empaque.tipo)+this.mapaT.get(this.empaque.tamano);
           if(this.empaque.decoracion_){
             this.empaque.src="assets/img/"+this.mapaE.get(this.empaque.tipo)+"/"+this.mapaE.get(this.empaque.tipo)+this.mapaT.get(this.empaque.tamano)+this.mapaC.get(this.empaque.color)+this.empaque.decoracion_+".png";
             this.noEmpaque=true;
           }
         }else{
          this.empaque.clase=this.mapaE.get(this.empaque.tipo);
          this.empaque.src="assets/img/"+this.mapaE.get(this.empaque.tipo)+"/"+this.mapaE.get(this.empaque.tipo)+this.mapaC.get(this.empaque.color)+".jpg";
          this.noEmpaque=true;
         }
      }else if(this.empaque.tipo=="ALGUIEN COMO TÚ"){
        if(this.empaque.tamano=="PEQUEÑO"){
          this.empaque.clase=this.mapaE.get(this.empaque.tipo)+this.mapaT.get(this.empaque.tamano);
          if(this.empaque.decoracion_){
            this.empaque.src="assets/img/"+this.mapaE.get(this.empaque.tipo)+"/"+this.mapaE.get(this.empaque.tipo)+this.mapaT.get(this.empaque.tamano)+this.mapaC.get(this.empaque.color)+this.empaque.decoracion_+".png";
            this.noEmpaque=true;
          }
        }else{
          this.empaque.clase=this.mapaE.get(this.empaque.tipo);
          if(this.empaque.decoracion_){
            this.empaque.src="assets/img/"+this.mapaE.get(this.empaque.tipo)+"/"+this.mapaE.get(this.empaque.tipo)+this.mapaC.get(this.empaque.color)+this.empaque.decoracion_+".png";
            this.noEmpaque=true;
          }
        }

    }else{
        this.empaque.clase=this.mapaE.get(this.empaque.tipo);
        this.empaque.src="assets/img/"+this.mapaE.get(this.empaque.tipo)+"/"+this.mapaE.get(this.empaque.tipo)+this.mapaC.get(this.empaque.color)+".png";
            this.noEmpaque=true;
      }
  }
  hacerPedido(){
    if(this.validarGalletas()){
      this.precioEmpaque();
      this.empServ.guardarEmpaque(this.empaque,this.parametro);
      swal.fire({
        type: 'success',
        title: 'Empaque guardado en compras',
        text: 'Para terminar el envío llena los datos en mis compras o agrega otro empaque',
      });
      this.pedidoInicial();
    }
  }

  precioEmpaque(){
     this.empaque.precio= this.mapaPrecios.get(this.empaque.tipo+" "+this.empaque.tamano);
     for(let i=0; i<3;i++){
       this.empaque.precio+= this.mapaPrecios.get(this.empaque.galletas[i].tipo)*this.empaque.galletas[i].cantidad;
     }
  }

  pedidoInicial(){
    this.empaque.tarjetaSrc="assets/img/Cump@2x.png";
    this.empaque.tarjetaClase="Cump";
    this.empaque.tarjeta="CUMPLEAÑOS";
    this.empaque.tipo="ALGUIEN COMO TÚ";
    this.empaque.tamano="PEQUEÑO";
    this.empaque.color="ROSADO";
    this.empaque.decoracion_="Bl";
    this.galleta1.tipo="Gotas de lluvia";
    this.galleta1.cantidad=1;
    this.empaque.galletas=[this.galleta1];
    this.galleta2.tipo="Idilio de amor";
    this.galleta2.cantidad=1;
    this.empaque.galletas.push(this.galleta2);
    this.galleta3.tipo="Quiereme siempre";
    this.galleta3.cantidad=1;
    this.empaque.galletas.push(this.galleta3);
    this.empaque.mensaje="";
    this.verEmpaque();
  }
}
