import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{
 

  usuario:UsuarioModel;
  registro1:boolean=false;
  estaA:boolean=false;
  usuarioNuevo:UsuarioModel={
    email:"laurakm@gmail.com",
    password:"123456"
  }

  constructor(private auth:AuthService, private router:Router) { 
    if(this.auth.estaAutenticado()){
      this.estaA=true;
    }else{
      this.estaA=false;
    }
    this.auth.registrarUsuario(this.usuarioNuevo).subscribe(resp=>{
      console.log(resp);
    });
  }

  ngOnInit() {
    this.usuario= new UsuarioModel();
    
  }

  login(){
    if(this.usuario.email == undefined || this.usuario.password == undefined){
      swal.fire({
        type: 'error',
        title: 'Datos vacíos',
        text: 'Debe ingresar correo y contraseña',
      });
    }else{
      if(this.usuario.email.includes("@gmail.com")||this.usuario.email.includes("@hotmail.com")||this.usuario.email.includes("@outlook.com")||this.usuario.email.includes("@yahoo.com")){
        this.auth.login(this.usuario).subscribe(resp=>{
         this.router.navigateByUrl('/home');
         this.registro1=false;
         this.estaA=this.auth.estaAutenticado();
        },(err)=>{
          swal.fire({
            type: 'error',
            title: 'Datos Erróneos',
            text: 'El usuario que ingresó no es válido',
          });
        });
      }else{
        swal.fire({
          type: 'error',
          title: 'Dato Erróneo',
          text: 'El correo que ingresó no es válido',
        });
      }

    }
  }

  salir(){

    swal.fire({
      title: 'Está seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.auth.logOut();
        this.estaA=false;
        this.router.navigateByUrl('/home');
      }
  });

   
  }

  registro(){
    this.registro1=true;
  }
  cancelar(){
   this.registro1=false;
  }
}
