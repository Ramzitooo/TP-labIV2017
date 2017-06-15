import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CsvService } from "angular2-json2csv";
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers:[CsvService]
})
export class InformacionComponent implements OnInit {
    // 1- RADAR
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';
   // 2- PIE
  public pieChartLabels:string[] = ['Clientes', 'Empleados', 'Encargado'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
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
  
  constructor(private firebase: AngularFireDatabase) 
  {         
    this.pedidos=firebase.list("/Reservas");
    this.pedidos.subscribe(data => {console.log(data);this.Generar(data);});
  }
  
  ngOnInit() {
  }
  Generar(data)
  {
    this.down.download(data,"Datos");

  }
    //EVENTOS
  public chartClicked(e:any):void {console.log(e);} //SOLO MUESTRA EVENTO!
 
  public chartHovered(e:any):void {console.log(e);}//SOLO MUESTRA EVENTO!

}
