import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';
import { WsService } from '../services/ws/ws.service';//AGREGO SERVICIO.
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';

//const URL = "http://localhost/api/index.php/api";
const URL = "http://www.osmar.hol.es/index.php/api";
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuario> = new Array<Usuario>();

  usuario = new Usuario();
  tipo="Cliente";
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
  usuario2:Usuario= new Usuario();
  formulario:boolean=false;
  fotomodificar="";
  btnModificar:boolean = false;
  loading2 : boolean = false;

  loadingP :boolean = true;
  btnReiniciar :boolean = false;

  usuarioLogeado:Usuario = new Usuario();

  constructor(private ws:WsService,private parentRouter : Router) 
  { 
    this.usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));
    this.ws.TraerUsuarios()
    .then(data => 
    {
      console.log(data);
      this.usuarios=data;
      this.loadingP=false;
    })
    .catch(e => 
    {
      console.log(e);
      this.btnReiniciar=true;
    });

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
              this.errorFoto = true;
              this.Mensaje = json.Mensaje;
              alert(this.Mensaje);
              this.imagen = "defecto.png";
              this.foto = "../assets/img/usuarios/defecto.png";
        }}

  }

  ngOnInit() 
  {

  }
  Recargar()
  {
    window.location.reload();
  }
  Editar()
  {
            this.usuario.id=this.usuario2.id;
            this.usuario.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
            this.usuario.apellido = (<HTMLInputElement>document.getElementById('apellido')).value;
            this.usuario.dni = (<HTMLInputElement>document.getElementById('dni')).value;
            //SEXO YA ESTA
            this.usuario.email = (<HTMLInputElement>document.getElementById('email')).value;
            this.usuario.password = (<HTMLInputElement>document.getElementById('password')).value;
            //this.usuario.img =
            this.usuario.tipo=this.tipo;
            //this.usuario.img=this.imagen;
            if(this.imagen == this.fotomodificar)
            {
              console.log("entro if");
              this.usuario.img=this.fotomodificar;
              this.ws.ModificarUsuario(this.usuario).then(data =>{window.location.reload(); });
              
            }
            else
            {
              console.log("entro else");
              this.usuario.img=this.imagen;
              this.ws.ModificarUsuario(this.usuario);
              this.ws.EliminarFoto(this.fotomodificar);
              this.ws.MoverFoto(this.usuario.img).then(data =>{window.location.reload(); });;
              
            }
            //window.location.reload(); 
  }
  Modificar(item)
  {
    console.log(item);
    this.usuario2=item;
    //this.foto="http://localhost/api/img/usuarios/"+item.img;
    this.foto="http://www.osmar.hol.es/img/usuarios/"+item.img;
    this.fotomodificar=item.img;
    this.imagen=item.img;
    this.formulario=true;
    this.btnModificar=true;
  }
  Eliminar(id,foto)
  {
    var respuesta=confirm("Esta seguro de eliminar este usuario?");
    if (respuesta==true) 
    {
      this.ws.EliminarUsuario(id);//ELIMINO EL USUARIO DE LA BASE DE DATOS.  
      this.ws.EliminarFoto(foto).then(data => {window.location.reload();});//ELIMINO LA FOTO DEL USUARIO DE MI SERVIDOR.
      alert("Usuario Eliminado Correctamente!"); 
    } 
    else 
    {
      console.log("No se elimino al usuario");
    }
  
  }
  
  VerFormulario()
  {
    this.formulario=true;
  }
  Tipo(tipo)
  {
    this.tipo=tipo;
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


  Confirmar()
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
            this.usuario.tipo = this.tipo;
            this.usuario.img = this.imagen; 
            console.log(this.usuario);
            this.ws.AgregarUsuario(this.usuario);//SUBO UN CLIENTE!
            this.ws.MoverFoto(this.usuario.img);//MUEVO LA FOTO!
            this.ws.TraerUsuarios().then(data => {this.usuarios=data;});//RECARGO LA PAGINA.
            alert("Usuario agregado correctamente!");
            window.location.reload();
  }



}
