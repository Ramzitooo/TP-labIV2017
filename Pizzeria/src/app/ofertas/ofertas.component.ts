import { Component, OnInit } from '@angular/core';
import { Oferta } from '../clases/clases.component';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  ofertas :Array<Oferta> = new Array<Oferta>();
  constructor() 
  { 
     this.ofertas.push(new Oferta(1,"Pizza con Jamon","100","o1.jpg"));
    this.ofertas.push(new Oferta(2,"Pizza de Muzarela","70","o1.jpg"));
    this.ofertas.push(new Oferta(3,"Empanada de Carne","20","o1.jpg"));
    this.ofertas.push(new Oferta(1,"Pizza con Jamon","100","o1.jpg"));
    this.ofertas.push(new Oferta(2,"Pizza de Muzarela","70","o1.jpg"));
    this.ofertas.push(new Oferta(3,"Empanada de Carne","20","o1.jpg"));
    console.log(this.ofertas);
  }

  ngOnInit() {
  }
  
}
