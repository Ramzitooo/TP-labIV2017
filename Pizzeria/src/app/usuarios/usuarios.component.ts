import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/clases.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuario> = new Array<Usuario>();
  constructor() 
  { 
    this.usuarios.push(new Usuario(1,'Osmar','Flores','39333971','administrador','osmar@gmail.com','123','Masculino','suiryu.png'));
    this.usuarios.push(new Usuario(1,'Daniel','Gueler','39222171','encargado','osmar@gmail.com','123','Masculino','suiryu.png'));
    this.usuarios.push(new Usuario(1,'Federico','Romero','39888971','empleado','osmar@gmail.com','123','Masculino','suiryu.png'));
    this.usuarios.push(new Usuario(1,'Octavio','Flores','39397571','cliente','osmar@gmail.com','123','Masculino','suiryu.png'));
  }

  ngOnInit() {
  }

}
