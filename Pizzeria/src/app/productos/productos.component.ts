import { Component, OnInit } from '@angular/core';
import { Producto } from '../clases/clases.component';
import { Usuario } from '../clases/clases.component';
import { WsService } from '../services/ws/ws.service';
import { FileUploader } from "ng2-file-upload";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//const URL = "http://localhost/api/index.php/api";
const URL = "http://www.osmar.hol.es/index.php/api";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  producto:Producto = new Producto();
  productos:Array<Producto> = new Array<Producto>();
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  alertStylesDescripcion = {'border-color': ''};
  alertStylesPrecio = {'border-color': ''};
  condicion1 = true;
  condicion2 = true;

  foto= "assets/img/productos/defecto.png";
  imagen="defecto.png";
  errorFoto = false;
  Mensaje = "";
  formulario:boolean=false;
  
  hoy:Date = new Date(); 
  usuario : Usuario = new Usuario();
  pedidos : FirebaseListObservable<any[]>;
  constructor(public ws:WsService,private firebase: AngularFireDatabase) 
  { 
    this.pedidos=firebase.list("/Pedidos");
    this.ws.TraerProductos().then(data => {this.productos=data;console.log(data);});
    this.uploader.onBeforeUploadItem=(item)=>{console.info("item",item);item.withCredentials=false;}
    this.uploader.onSuccessItem=(response,status)=>{this.errorFoto = false;
    let json = JSON.parse(status);
        if(json.Exito)
        {
              this.imagen = json.foto;
              //this.foto = "http://localhost/api/tmp/"+this.imagen;
              this.foto = "http://www.osmar.hol.es/tmp/"+this.imagen;
        }
        else
        {
              this.errorFoto = true;
              this.Mensaje = json.Mensaje;
              this.imagen = "defecto.png";
              this.foto = "../assets/img/productos/defecto.png";
        }}
    //console.log(this.productos);
  }

  ngOnInit() 
  {

  }
  Verificar(num)
  {
    switch(num)
    {
      case 1:
        if((<HTMLInputElement>document.getElementById('descripcion')).value == "")
        {
            this.alertStylesDescripcion = {'border-color': 'red'};
            this.condicion1 = true;
        }
        else
        {
            this.alertStylesDescripcion = {'border-color': 'green'};
            this.condicion1 = false;
        }
        break;
      case 2:
        if((<HTMLInputElement>document.getElementById('precio')).value == "")
        {
            this.alertStylesPrecio = {'border-color': 'red'};
            this.condicion2 = true;
        }
        else
        {
            this.alertStylesPrecio = {'border-color': 'green'};
            this.condicion2 = false;
        }
        break;
    }
  }


  Keyup(num)
  {
      this.Verificar(num);
  }
  
  VerFormulario()
  {
    this.formulario=true;
  }
  Pedir(producto)
  {
    console.log(producto);
    this.usuario= JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario);
    console.log(this.ObtenerFecha(this.hoy));
    var obj = {fecha:this.ObtenerFecha(this.hoy),local:"Burzaco",usuario:this.usuario.nombre,producto:producto.descripcion,estado:"Inpago",precio:producto.precio,idUsuario:this.usuario.id};
    console.log(obj);
    this.pedidos.push(obj);
    console.log("Se cargo un pedido a firebase!");
    //console.log(this.pedidos);
    //this.pedidos.subscribe(data => {console.log(data);});
    this.pedidos.forEach( pedidos => 
    {
                  for(let pedido of pedidos)
                  {
                    if(pedido.idUsuario==this.usuario.id)
                    {
                        console.log(pedido);
                       
                    }
                  }
                });
  }
  ObtenerFecha(date : Date)
  {
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
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
  BorrarProducto(producto)
  { 
    console.log(producto);
    var respuesta=confirm("Esta seguro de eliminar este producto?");
    if (respuesta==true) 
    {
      this.ws.EliminarProducto(producto.id);//ELIMINO EL USUARIO DE LA BASE DE DATOS.  
      this.ws.EliminarFotoProducto(producto.img);//ELIMINO LA FOTO DEL USUARIO DE MI SERVIDOR.
      this.productos=null;
      this.ws.TraerProductos().then(data => {this.productos=data;});//RECARGO LA PAGINA.
      alert("Usuario Eliminado Correctamente!");  
    } 
    else 
    {
      console.log("No se elimino al usuario");
    }

  }
  AgregarProducto()
  {
    this.producto.img=this.imagen;
    console.log(this.producto);
    this.ws.AgregarProducto(this.producto);//SUBO UN CLIENTE!
    this.ws.MoverFotoProducto(this.producto.img);//MUEVO LA FOTO!
    alert("Producto agregado correctamente!");
    this.formulario=false;
    this.productos=null;
    this.ActualizarLista();
    
  }
  ActualizarLista()
  {
    return this.ws.TraerProductos().then(data => {this.productos=data;});
  }
  
}
