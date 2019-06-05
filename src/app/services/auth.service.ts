import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey= 'AIzaSyAM-zKSe2tttzhVkTOH_qR5x2VPcbxjHUI';
  userToken:string;
  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http:HttpClient) { 
    this.leerToken();
  }

  logOut(){
    localStorage.removeItem('token');
  }

  login(usuario:UsuarioModel){
    const authData={
      email:usuario.email,
      password:usuario.password,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}/verifyPassword?key=${this.apiKey}`,authData).pipe(
      map(resp=>{
          this.guardarToken(resp['idToken']);
          return resp;
      })
    );
  }

  registrarUsuario(usuario:UsuarioModel){
    const authData={
      email:usuario.email,
      password:usuario.password,
      returnSecureToken:true
    };
    
    return this.http.post(`${this.url}/signupNewUser?key=${this.apiKey}`,authData);

  }

  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);


  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.userToken.length>2;
  }
}
