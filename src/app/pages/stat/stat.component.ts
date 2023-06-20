import { Component, OnInit } from '@angular/core';

import { ChartType, Color } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Statusers } from 'src/app/model/stat/Statusers';
import { Statfacturation } from 'src/app/model/stat/Statfacturation';
import { Statvegicules } from 'src/app/model/stat/Statvegicules';
import { Statplanification } from 'src/app/model/stat/Statplanification';
import { statesticservice } from 'src/app/services/Statestic.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
})
export class StatComponent implements OnInit {

  totaluser!:number ;
  totallastMonth!:number ;
  /****************************** */
  highestVehicleCount:number=0
  agencename!:string
  totalagence!:number ;
  totalaglastMonth!:number ;
  /************ */
  totalbus!:number ;
  totalbuslastMonth!:number ;
  public barChartLegend = true;
    /*********************users**************************** */
  public barChartLabels :any[] = [];
  public mydata :any[] = [];
  public barChartData = [{ data: this.mydata, label: '' },];
  /*********************facturation**************************** */
  public fbarChartLabels :any[] = [];
  public fmydata :any[] = [];
  public fbarChartData = [{ data: this.fmydata, label: '' },];
  /*********************vehicule**************************** */
  public vbarChartLabels :any[] = [];
  public vmydata :any[] = [];
  public vbarChartData = [{ data: this.vmydata, label: '' },];
  /*********************planification**************************** */
  public pbarChartLabels :any[] = [];
  public pmydata :any[] = [];
  public pbarChartData = [{ data: this.pmydata, label: '' },];

  public barChartType1: ChartType = 'doughnut';
  public barChartType2: ChartType = 'doughnut';
  public barChartType3: ChartType = 'bar';
  public barChartType4: ChartType = 'bar';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
    
  };




  constructor(
    private  stat:statesticservice,
  
    private toastr: ToastrService,
    private router: Router
    
  ) { }
  ngOnInit(): void {

 this.getuserstat()
  this.getfactstat()
  this.getpalnistat()
  this.getbusstat()
  }
getuserstat()
{
  this.stat.statusers().subscribe(data=>{
    if ( data.length >0)
    {
      this.totaluser=data[0].total
      this.totallastMonth=  data[0].totallastMonth /data[0].total
      data.forEach(element => {
       
        this. barChartLabels.push(element.planificationName);
  
        this.mydata.push(element.userCount)
      });
    }
 
  
  });

 
}

getbusstat()
{
  this.stat.statvegicules().subscribe(data=>{
    this.totalagence=data.totalAgencies;
     this.totalaglastMonth=  data.agenciesFromLastMonth /data.totalAgencies
     this.totalbus=data.totalVehicules;
    data.vehicleCountByAgency.forEach(element => {
      this. vbarChartLabels.push(element.name);
    
     this.vmydata.push(element.vehicleCount)
  
    if ( element.vehicleCount > this.highestVehicleCount) {
 
      this.highestVehicleCount=element.vehicleCount
      console.log(element.name )
      this.agencename = element.name;
    
    }
  });   
  })
  
}
result !:Statfacturation;
getfactstat(){
 let tot=0;
  this.stat.statfacturation().subscribe(data=>{
    data.forEach(element => {
    
      this. fbarChartLabels.push(element.agencyName);
      this.fmydata.push(element.totalBillingAmount)
      if ( element.totalBillingAmount > tot) {
 
        this.result = element;
      
      }
    });
 
  })
}

getpalnistat()
{
  this.stat.statplanification().subscribe(data=>{
    data.forEach(element => {
      this. pbarChartLabels.push(element.agencyName);
      this.pmydata.push(element.count)

      
    });
  })
}



 
}