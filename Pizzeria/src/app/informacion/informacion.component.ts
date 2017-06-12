import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
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
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  // 3- AREA POLAR
  public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend:boolean = true;
  public polarAreaChartType:string = 'polarArea';
  // 4- ROSQUILLA
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  //EVENTOS
  public chartClicked(e:any):void {console.log(e);} //SOLO MUESTRA EVENTO!
 
  public chartHovered(e:any):void {console.log(e);}//SOLO MUESTRA EVENTO!

  constructor() 
  {         

  }
  
  ngOnInit() {
  }

}
