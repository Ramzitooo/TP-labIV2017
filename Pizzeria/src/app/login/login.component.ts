import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';
import { WsService }  from '../services/ws/ws.service';
import { AutService } from '../services/auth/aut.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  usuario = new Usuario();
  loading : boolean = false;
  alertStylesEmail = {'border-color': ''};
  alertStylesPass = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;
  emailRepetido = false;


  constructor(private ws: WsService,private parentRouter : Router,private aut:AutService) 
  {
        var usu:Usuario = new Usuario(0,"Sin Usuario","asdasd","asdasd","","","","","defecto.png");
        localStorage.setItem('usuario', JSON.stringify(usu));
  }

  ngOnInit() 
  {
    
  }

  Cargar(num)
  {
      switch(num)
    {
      case '1':
        this.usuario.email = 'romina@gmail.com';
        this.usuario.password = '123';
        break;
      case '2':
        this.usuario.email = 'gabriel@gmail.com';
        this.usuario.password = '123';
        break;
    case '3':
        this.usuario.email = 'nicolas@gmail.com';
        this.usuario.password = '123'
        break;
      case '4':
        this.usuario.email = 'osmar@gmail.com';
        this.usuario.password = '123'
        break;
    }
  }
  Verificar(num)//VERIFICO QUE LOS CAMPOS DE LOS TEXT NO ESTEN VACIO EN CASO CONTRARIO LOS REMARCO Y DESACTIVO EL BOTON LOGIN.
  {
    switch(num)
    {
      case 1:
        if((<HTMLInputElement>document.getElementById('email')).value == "")
        {
            this.alertStylesEmail= {'border-color': 'red'};
            this.condicion1 = true;
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'green'};
            this.condicion1 = false;
        }
        break;
      case 2:
        if((<HTMLInputElement>document.getElementById('password')).value == "")
        {
            this.alertStylesPass = {'border-color': 'red'};
            this.condicion2 = true;
        }
        else
        {
            this.alertStylesPass = {'border-color': 'green'};
            this.condicion2 = false;
        }
        break;
    }
  }
  Keyup(num)//PARA VALIDACION DEL TECLEADO DE LETRAS DE LOS INPUT.
  {
      this.Verificar(num);
  }
  Fuc1(){setTimeout(() => {console.log("hola");},2000);}//VER FUNCION DEL TIEMPO DANIEL!
  Login()
  {
    console.log(this.usuario);
    this.loading = true;
    this.aut.logOut();
    this.ws.CrearToken(this.usuario)//LLAMO AL METODO DE MI SERVICIO CREARTOKEN
    .then(data => 
    {
        console.log(data);//EN EL DATA DEVUELVE TRUE SI EL MAIL Y EL PASS COINCIDEN EN LA BASE DE DATOS
        if (data.exito==true) 
        {
            localStorage.setItem('token', data.token);
            this.loading=false;
            this.ws.GetJwt().then(data => {console.log(data.rta.usuario);localStorage.setItem("usuario",JSON.stringify(data.rta.usuario));});
            console.log(this.aut.getToken());
            this.parentRouter.navigateByUrl("/inicio");
        }
        else
        {
            this.loading=false;
            alert("Datos Incorrectos... Reingrese!");
            this.usuario=new Usuario();
        }
                
    })
    .catch(error => 
    {
      console.log(error);
      this.loading=false;
      alert("Error del servidor!");
    });
  }

  Registro()
  {
    this.parentRouter.navigateByUrl('/registro');
  }
  
}
