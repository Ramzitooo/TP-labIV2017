import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export class Usuario
{
  public id : number;
  public nombre : string;
  public apellido : string;
  public dni : string;
  public tipo: string;
  public email : string;
  public password : string;
  public sexo : string;
  public img : string;

  /**
  * Usuario del sistema.
  */
  constructor(id : number = 0,
              nombre : string = "",
              apellido : string = "",
              dni : string = "",
              tipo : string = "",
              email : string = "",
              password : string = "",
              sexo : string = "",
              img : string = "") 
  {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.tipo = tipo;
    this.email = email;
    this.password = password;
    this.sexo = sexo;
    this.img = img;
  }
}
export class Producto
{
  public id : number;
  public descripcion : string;
  public precio: string;
  public img :string;

  /**
  * Usuario del sistema.
  */
  constructor(id : number = 0,
              descripcion : string = "",
              precio : string = "",
              img : string = "") 
  {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.img = img;
  }
}
export class Local
{
  public id : number;
  public ubicacion : string;
  public lat:number;
  public lng:number;

  /**
  * Usuario del sistema.
  */
  constructor(id : number = 0,
              ubicacion : string = "",
              lat : number=0,
              lng:number=0) 
  {
    this.id = id;
    this.ubicacion = ubicacion;
    this.lat = lat;
    this.lng=lng;
  }
}