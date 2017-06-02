import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/clases.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario:Usuario= new Usuario();
  constructor() 
  { 
    this.usuario.nombre="Usuario";
    this.usuario.img="defecto.png"
    
  }

  ngOnInit() {
  }
  Salir()
  {
    alert("Chau!");
  }

}
