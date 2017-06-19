import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/clases.component';
import { WsService }  from '../services/ws/ws.service';
import { AutService } from '../services/auth/aut.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario:Usuario= new Usuario(1,"nada","asdasd","asdasd","","","","","defecto.png");
  token:any;
  constructor(private router:Router,private aut:AutService,private ws : WsService) 
  { 
    //this.ws.GetJwt().then(data => {this.usuario=data.rta.usuario;});
  }

  ngOnInit() 
  {
    
   
    /*try 
    {
        this.token=this.ws.GetJwt().then(data => {console.log(data.rta.usuario.img);})
        //this.usuario=this.token.usuario;
    } 
    catch (error) 
    {
      console.log("No hay token!")
    }*/

  }
  Salir()
  {
    var usu:Usuario = new Usuario(0,"Sin Usuario","asdasd","asdasd","","","","","defecto.png");//HACER CUANDO COMIENZE UNA PAGINA! OCTAVIO PRUEVA!
    localStorage.setItem('token', null);
    localStorage.setItem('usuario', JSON.stringify(usu));
    this.aut.logOut();
    window.alert('Chauuu!!!');
    this.router.navigate(['/login']);
  
  }
  ObtenerUsuario()
  {
    //this.usuario= JSON.parse(localStorage.getItem("usuario"));
      //this.ws.GetJwt().then(data => {console.log(data.rta.usuario);});
    //return this.usuario;
    try 
    {
        this.usuario= JSON.parse(localStorage.getItem("usuario"));
        return this.usuario;
    } 
    catch (error) 
    {
      console.log("Cargando!");
    }
  }
    Comprobar()
  {

      if (this.aut.isLogued()==true) 
      {
        return true;
      }
      else
      {
        return false;
      }
    
    
  }

}
