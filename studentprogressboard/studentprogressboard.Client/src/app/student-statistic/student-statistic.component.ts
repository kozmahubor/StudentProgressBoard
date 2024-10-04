import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-student-statistic',
  templateUrl: './student-statistic.component.html',
  styleUrls: ['./student-statistic.component.scss']
})
export class StudentStatisticComponent {
  chart: any;
  GenderArray: any[] = [];
  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {
    this.http.get<any[]>("https://localhost:5057/api/Student").subscribe(resp => {
      resp.forEach(student => {
        if (student.sex !== null) {
          this.GenderArray.push(student.sex);
        }
      });
      let countZero = 0;
      let countOne = 0;
      this.GenderArray.forEach(element => {
        if (element === 0) {
          countOne++;
        } else if (element === 1) {
            countZero++;
        }
    });
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['Female', 'Male'],
          datasets: [{
            label: 'Gender distribution',
            data: [countZero, countOne],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
              
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
    
    });
  }
}
