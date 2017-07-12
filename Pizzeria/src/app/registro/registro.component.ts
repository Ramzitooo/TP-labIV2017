import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';
import { WsService }  from '../services/ws/ws.service';
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';

//const URL = "http://localhost/api/index.php/api";
const URL = "http://www.osmar.hol.es/index.php/api";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
usuario = new Usuario();
  foto= "assets/img/usuarios/defecto.png";
  imagen="defecto.png";
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
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
  errorFoto = false;
  Mensaje = "";
  loading2 : boolean = false;
  constructor(private ws: WsService,private parentRouter : Router) 
  {
      this.usuario.sexo = "Masculino";
      this.uploader.onBeforeUploadItem=(item)=>{console.info("item",item);item.withCredentials=false;this.loading2=true;}
      this.uploader.onSuccessItem=(response,status)=>{this.errorFoto = false;
        let json = JSON.parse(status);
        if(json.Exito)
        {
            this.loading2=false;
              this.imagen = json.foto;
              //this.foto = "http://localhost/api/tmp/"+this.imagen;
              this.foto = "http://www.osmar.hol.es/tmp/"+this.imagen;
        }
        else
        {
            this.loading2=false;
              this.errorFoto = true;
              alert(this.Mensaje);
              this.Mensaje = json.Mensaje;
              this.imagen = "defecto.png";
              this.foto = "../assets/img/usuarios/defecto.png";
        }}
  }
  Imagen()
  {
    this.uploader.uploadAll();
    if((<HTMLInputElement>document.getElementById('file')).value == "")
    {
      this.foto = "assets/img/usuarios/defecto.png";
      this.imagen="defecto.png";
    }
  }
  ngOnInit() {
  }

  Sexo(sex)
  {
    this.usuario.sexo = sex;
  }
  Cancelar()
  {
    this.foto="assets/img/usuarios/defecto.png";
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


  Keyup(num)
  {
      this.Verificar(num);
  }


  Register()
  { 
    var bo:boolean = true;
        if(bo)//SI NO EXISTE EMAIL
        {
            if(this.imagen=="defecto.png")
            {
            alert("Debe seleccionar una imagen!");
            return;
            }
            this.usuario.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
            this.usuario.apellido = (<HTMLInputElement>document.getElementById('apellido')).value;
            this.usuario.dni = (<HTMLInputElement>document.getElementById('dni')).value;
            //SEXO YA ESTA
            this.usuario.email = (<HTMLInputElement>document.getElementById('email')).value;
            this.usuario.password = (<HTMLInputElement>document.getElementById('password')).value;
            //this.usuario.img =
            this.usuario.tipo = "Cliente";
            this.usuario.img = this.imagen; 
            console.log(this.usuario);
            //REGISTRAR EN BS
            this.ws.AgregarUsuario(this.usuario).then(data => {console.log(data)});//SUBO UN CLIENTE!
            this.ws.MoverFoto(this.usuario.img).then(data => {console.log(data)});//MUEVO LA FOTO!
            alert("Has sido agregado correctamente!");
            this.parentRouter.navigateByUrl('/inicio');
            
        }
        else
        {
            this.alertStylesEmail = {'border-color': 'red'};
            this.condicion4 = true;
            this.emailRepetido = true;
        }
  }

}
