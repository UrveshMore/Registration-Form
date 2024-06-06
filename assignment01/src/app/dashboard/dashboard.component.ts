import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import Chart, { ChartTypeRegistry, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formDataList: any[] = [];

  incomingData:any=[];
  constructor(private sharedService:SharedService) { }

  getdata() {
  
    console.log(this.formDataList);
  }
  ngOnInit(): void {
    this.incomingData=this.sharedService.formDataArray;
    // this.sharedService.registrationData.subscribe((data) => {
    //   console.log("data in dashboard====>>>>", data);
      
    //     this.incomingData = [...this.incomingData,data];
      
    //   console.log("incoming data", this.incomingData);
    //   this.refreshChart();
    // });

          this.refreshChart();
      console.log("incoming data", this.incomingData);
  }

  refreshChart(){
    const entryCountData = {
      labels: ['Entries'],
      values: [this.incomingData.length]
    };

    const male = this.incomingData.filter(data => data.gender === 'Male').length;
    console.log("male====>>",male);
    const female = this.incomingData.filter(data => data.gender === 'Female').length;
    console.log("female",female);
    console.log(female);
    const genderRatioData = {
      labels: ['Male', 'Female'],
      values: [male, female]
    };

    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log("year>>>",currentYear);
    const ageGroupData = {
      labels: ['0-18','18-30','30-60', '60+'],
      values: [
        this.incomingData.filter(data => currentYear - new Date(data.dob).getFullYear() > 0 && currentYear - new Date(data.dob).getFullYear() <=18 ).length,
        this.incomingData.filter(data => currentYear - new Date(data.dob).getFullYear() >= 18 && currentYear - new Date(data.dob).getFullYear() <= 30).length,
        this.incomingData.filter(data => currentYear - new Date(data.dob).getFullYear() >= 30 && currentYear - new Date(data.dob).getFullYear() <= 60).length,
        this.incomingData.filter(data => currentYear - new Date(data.dob).getFullYear() > 60).length
      ]
    };

    
    const countryWiseData = {};
    this.incomingData.forEach(data => {
      countryWiseData[data.country] = countryWiseData[data.country] ? countryWiseData[data.country] + 1 : 1;
    });


    const cityWiseData = {};
    this.incomingData.forEach(data => {
      cityWiseData[data.city] = cityWiseData[data.city] ? cityWiseData[data.city] + 1 : 1;
    });

  
    this.createChart('entryCountChart', 'bar' , entryCountData);
    this.createChart('genderRatioChart', 'pie', genderRatioData);
    this.createChart('ageGroupChart', 'bar', ageGroupData);
    this.createChart('countryWiseChart', 'bar', {
      labels: Object.keys(countryWiseData),
      values: Object.values(countryWiseData)
    } , 'y');
    this.createChart('cityWiseChart', 'bar', {
      labels: Object.keys(cityWiseData),
      values: Object.values(cityWiseData)
    });
  }
  createChart(id, type, data: { labels, values }, indexAxis?: 'x' | 'y') {
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    console.log("ctxxxx--", ctx);
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    Chart.register(...registerables);
    new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [{
          label: '',
          data: data.values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: indexAxis || 'x',
      }
    });
  }
  


}
