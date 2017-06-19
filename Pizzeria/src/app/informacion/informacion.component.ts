import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CsvService } from "angular2-json2csv";
import { WsService } from '../services/ws/ws.service';
import { Usuario } from '../clases/clases.component';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers:[CsvService]
})
export class InformacionComponent implements OnInit 
{
  cantClientes:number=0;
  cantEmpleados:number=0;
  cantEncargados:number=0;
  cantAdministrador:number=0;
  
    // 1- RADAR
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';
   // 2- PIE

  // 3- AREA POLAR
  public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData:number[] = [10, 11, 14, 13, 12];
  public polarAreaLegend:boolean = true;
  public polarAreaChartType:string = 'polarArea';
  // 4- ROSQUILLA
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  pedidos : FirebaseListObservable<any[]>;
  down : CsvService = new CsvService();
  usuarios: Array<Usuario> = new Array<Usuario>();

  constructor(private firebase: AngularFireDatabase, private ws:WsService) 
  {         
    this.pedidos=firebase.list("/Reservas");
    this.ws.TraerUsuarios()
    .then(data => 
    {
      console.log(data);
      this.usuarios=data;
      for (let usu of data) 
      {
      if(usu.tipo=="Cliente")
      {
        this.cantClientes=this.cantClientes+1;
      }
            if(usu.tipo=="Empleado")
      {
        this.cantEmpleados=this.cantEmpleados+1;
      }
            if(usu.tipo=="Encargado")
      {
        this.cantEncargados=this.cantEncargados+1;
      }
            if(usu.tipo=="Administrador")
      {
        this.cantAdministrador=this.cantAdministrador+1;
      }
      console.log(this.cantAdministrador);
      this.pieChartData = [this.cantClientes, this.cantEmpleados, this.cantEncargados,this.cantAdministrador];
    }
    })
    .catch(e => {console.log(e);});

    console.log(this.cantAdministrador);
    this.pedidos.subscribe(data => {console.log(data);});
  }
    public pieChartLabels:string[] = ['Clientes', 'Empleados', 'Encargado',"Administrador"];
  public pieChartData:number[] = [this.cantClientes, this.cantEmpleados, this.cantEncargados,this.cantAdministrador];
  public pieChartType:string = 'pie';
  
  ngOnInit() {
  }
  Descargar()
  {
    this.down.download(this.usuarios,"Lista de Usuarios");
  }
  Generar(data)
  {
    this.down.download(data,"Datos");

  }
    //EVENTOS
  public chartClicked(e:any):void {console.log(e);} //SOLO MUESTRA EVENTO!
 
  public chartHovered(e:any):void {console.log(e);}//SOLO MUESTRA EVENTO!

}
