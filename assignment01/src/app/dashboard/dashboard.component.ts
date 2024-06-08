import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fromData: any;
  constructor(private sharedService: SharedService) { }


  ngOnInit(): void {
    this.fromData = this.sharedService.formDataArray;
    this.entryCountChart();
    this.genderRatioChart();
    this.ageGroupChart();
    this.countryWiseChart();
    this.cityWiseChart();
  }

  entryCountChart() {
    const entryCount = this.fromData.length;
    console.log("count=>",entryCount);
    new Chart("entryCountChart", {
      type: 'bar',
      data: {
        labels: [`Entries ${entryCount}`],
        datasets: [{
          label: `Members ${entryCount}`,
          data: [entryCount],
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],

          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
  genderRatioChart() {
    const male = this.fromData.filter(data => data.gender === 'Male').length;
    const female = this.fromData.filter(data => data.gender === 'Female').length;
    console.log("male>>",male,"female",female);
    new Chart("genderRatioChart", {
      type: 'pie',
      data: {
        labels: [`Male ${male}`, `Female ${female}`],
        datasets: [{
          label: 'Gender',
          data: [male, female],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],

          borderWidth: 1
        }]
      },

    });
  }

  ageGroupChart() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log("year>>>", currentYear);

    const age0To18 = this.fromData.filter(data => currentYear - new Date(data.dob).getFullYear() > 0 && currentYear - new Date(data.dob).getFullYear() <= 18).length
    const age18To30 = this.fromData.filter(data => currentYear - new Date(data.dob).getFullYear() > 18 && currentYear - new Date(data.dob).getFullYear() <= 30).length
    const age30To60 = this.fromData.filter(data => currentYear - new Date(data.dob).getFullYear() > 30 && currentYear - new Date(data.dob).getFullYear() <= 60).length
    const age60ToUp = this.fromData.filter(data => currentYear - new Date(data.dob).getFullYear() > 60).length
console.log("ages>>",age18To30);
console.log("ages>>>>",age0To18);
    new Chart("ageGroupChart", {
      type: 'bar',
      data: {
        labels: ['0-18', '18-30', '30-60', '60+'],
        datasets: [{
          label: `Ages`,
          data: [age0To18, age18To30, age30To60, age60ToUp],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],

          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  countryWiseChart() {
    const countryWiseData = {};
    this.fromData.forEach(data => {
      countryWiseData[data.country] = countryWiseData[data.country] ? countryWiseData[data.country] + 1 : 1;
    });
    console.log("countryWiseData==>",countryWiseData);
    new Chart("countryWiseChart", {
      type: 'doughnut',
      data: {
        labels: Object.keys(countryWiseData),
        datasets: [{
          label: `Contry`,
          data: Object.values(countryWiseData),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],

          borderWidth: 1
        }]
      },

    });
  }


  cityWiseChart() {
    const cityWiseData = {};
    this.fromData.forEach(data => {
      cityWiseData[data.city] = cityWiseData[data.city] ? cityWiseData[data.city] + 1 : 1;
    });
    console.log("cityWiseData===",cityWiseData);
    new Chart("cityWiseChart", {
      type: 'bar',
      data: {
        labels: Object.keys(cityWiseData),
        datasets: [{
          label: `City `,
          data: Object.values(cityWiseData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],

          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
