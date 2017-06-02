import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario(1,'Osmar','Flores','39333971','Administrador','osmar@gmail.com','123','Masculino','suiryu.png');
  
  mostrar:boolean=false;

  constructor() 
  { 

  }

  ngOnInit() 
  {
  }
  Aceptar()
  {
    //localStorage.setItem("Usuario","Osmar Flores!");
    //localStorage.removeItem("token");
    console.log("Implementar!");
  }
  Ver()
  {
    console.log(localStorage.getItem("Usuario"));
    console.log(this.usuario);
  }
  Login()
  {
    console.log(this.usuario);
  }
  Registrar()
  {
    this.mostrar=true;
  }
  Sexo(sexo)
  {
    console.log(sexo);
  }
}
