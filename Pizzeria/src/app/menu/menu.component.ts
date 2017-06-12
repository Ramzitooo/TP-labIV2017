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

  usuario:Usuario= new Usuario();
  token:any;
  constructor(private router:Router,private aut:AutService,private ws : WsService) 
  { 

  }

  ngOnInit() 
  {

    try 
    {
        this.token=this.aut.getToken();
        this.usuario=this.token.usuario;
    } 
    catch (error) 
    {
      console.log("No hay token!")
    }

  }
  Salir()
  {
 
    localStorage.setItem('token', null);
    this.aut.logOut();
    window.alert('Chauuu!!!');
    this.router.navigate(['/login']);
  
  }
    Comprobar()
  {
      /*this.token=this.aut.getToken();
      this.usuario=this.token.usuario;
      return this.aut.isLogued();*/
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
