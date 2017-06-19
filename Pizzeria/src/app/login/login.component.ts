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

  Login()
  {
    console.log(this.usuario);
    this.aut.logOut();
    this.ws.CrearToken(this.usuario)//LLAMO AL METODO DE MI SERVICIO CREARTOKEN
    .then(data => 
    {
        console.log(data);//EN EL DATA DEVUELVE TRUE SI EL MAIL Y EL PASS COINCIDEN EN LA BASE DE DATOS
        if (data.exito==true) 
        {
            localStorage.setItem('token', data.token);
            this.ws.GetJwt().then(data => {console.log(data.rta.usuario);localStorage.setItem("usuario",JSON.stringify(data.rta.usuario));});
            console.log(this.aut.getToken());
            this.parentRouter.navigateByUrl("/inicio");
        }
        else
        {
            alert("Datos Incorrectos... Reingrese!");
            this.usuario=new Usuario();
        }
                
    })
    .catch(error => 
    {
      console.log(error);
    });
  }

  Registro()
  {
    this.parentRouter.navigateByUrl('/registro');
  }
  
}
