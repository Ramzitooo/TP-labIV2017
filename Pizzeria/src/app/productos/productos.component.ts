import { Component, OnInit } from '@angular/core';
import { Producto } from '../clases/clases.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Array<Producto> = new Array<Producto>();
  num = 1;
  item1 = "item";
  item2 = "item";
  item3 = "item";

  active1 = "";
  active2 = "";
  active3 = "";
  constructor() 
  { 
    this.productos.push(new Producto(1,"Pizza con Jamon","100","jamon1.jpg"));
    this.productos.push(new Producto(2,"Pizza de Muzarela","70","jamon1.jpg"));
    this.productos.push(new Producto(3,"Empanada de Carne","20","jamon1.jpg"));
    this.productos.push(new Producto(1,"Pizza con Jamon","100","jamon1.jpg"));
    this.productos.push(new Producto(2,"Pizza de Muzarela","70","jamon1.jpg"));
    this.productos.push(new Producto(3,"Empanada de Carne","20","jamon1.jpg"));
    this.productos.push(new Producto(1,"Pizza con Jamon","100","jamon1.jpg"));
    this.productos.push(new Producto(2,"Pizza de Muzarela","70","jamon1.jpg"));
    this.productos.push(new Producto(3,"Empanada de Carne","20","jamon1.jpg"));
    console.log(this.productos);
    this.slider();
  }

  ngOnInit() {
  }
  Pedir(producto)
  {
    console.log(producto);
  }
  cambiar(func)
    {
        switch(func)
        {
            case 1:
              this.item1 = "item active";
              this.active1 = "active";
              this.item2 = "item";
              this.active2 = "";
              this.item3 = "item";
              this.active3 = "";
              this.num = 1;
              break;
            case 2:
              this.item1 = "item";
              this.active1 = "";
              this.item2 = "item active";
              this.active2 = "active";
              this.item3 = "item";
              this.active3 = "";
              this.num = 2;
              break;
            case 3:
              this.item1 = "item";
              this.active1 = "";
              this.item2 = "item";
              this.active2 = "";
              this.item3 = "item active";
              this.active3 = "active";
              this.num = 3;
              break;
        }
    }

  slider()
  {
      switch(this.num)
      {
          case 1:
            this.item2 = "item";
            this.active2 = "";
            this.item3 = "item";
            this.active3 = "";
            this.item1 = "item active";
            this.active1 = "active";
            this.num = 2;
            break;
          case 2:
            this.item1 = "item";
            this.active1 = "";
            this.item3 = "item";
            this.active3 = "";
            this.item2 = "item active";
            this.active2 = "active";
            this.num = 3;
            break;
          case 3:
            this.item1 = "item";
            this.active1 = "";
            this.item2 = "item";
            this.active2 = "";
            this.item3 = "item active";
            this.active3 = "active";
            this.num = 1;
            break;
      }
        setTimeout(() =>
        {
             this.slider();
        },
        1000);
  }
}
