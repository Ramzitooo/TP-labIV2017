import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  mostrar : boolean = false;
  alertStylesNombre = {'border-color': ''};
  alertStylesApellido = {'border-color': ''};
  alertStylesDni = {'border-color': ''};
  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
  condicion3 = true;
  condicion4 = true;
  condicion5 = true;
  emailRepetido = false;
  numero = 4;


  constructor() {
        this.usuario.sexo = "Hombre";
  }

  ngOnInit() {
  }


  Sexo(sex)
  {
    this.usuario.sexo = sex;
  }
  Verificar(num)
  {
    switch(num)
    {
      case 1:
        if((<HTMLInputElement>document.getElementById('nombre')).value == "")
        {
            this.alertStylesNombre = {'border-color': 'red'};
            this.condicion1 = true;
        }
        else
        {
            this.alertStylesNombre = {'border-color': 'green'};
            this.condicion1 = false;
        }
        break;
      case 2:
        if((<HTMLInputElement>document.getElementById('apellido')).value == "")
        {
            this.alertStylesApellido = {'border-color': 'red'};
            this.condicion2 = true;
        }
        else
        {
            this.alertStylesApellido = {'border-color': 'green'};
            this.condicion2 = false;
        }
        break;
      case 3:
        if((<HTMLInputElement>document.getElementById('dni')).value == "")
        {
            this.alertStylesDni = {'border-color': 'red'};
            this.condicion3 = true;
        }
        else
        {
            this.alertStylesDni = {'border-color': 'green'};
            this.condicion3 = false;
        }
        break;
      case 4:
        this.emailRepetido = false;
        if((<HTMLInputElement>document.getElementById('email')).value == "")
        {
            this.alertStylesEmail = {'border-color': 'red'};
            this.condicion4 = true;
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'green'};
            this.condicion4 = false;
        }
        break;
      case 5:
        if((<HTMLInputElement>document.getElementById('password')).value == "")
        {
            this.alertStylesPass = {'border-color': 'red'};
            this.condicion5 = true;
        }
        else
        {
            this.alertStylesPass = {'border-color': 'green'};
            this.condicion5 = false;
        }
        break;
    }
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
  Keyup(num)
  {
      this.Verificar(num);
  }


  Register()
  {
        if(3 == this.numero)//SI NO EXISTE EMAIL
        {
            this.usuario.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
            this.usuario.apellido = (<HTMLInputElement>document.getElementById('apellido')).value;
            this.usuario.dni = (<HTMLInputElement>document.getElementById('dni')).value;
            //SEXO YA ESTA
            this.usuario.email = (<HTMLInputElement>document.getElementById('email')).value;
            this.usuario.password = (<HTMLInputElement>document.getElementById('password')).value;
            //this.usuario.img =
            this.usuario.tipo = "cliente";
            console.log(this.usuario);
            //REGISTRAR EN BS
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'red'};
            this.condicion4 = true;
            this.emailRepetido = true;
        }
  }
  
}
