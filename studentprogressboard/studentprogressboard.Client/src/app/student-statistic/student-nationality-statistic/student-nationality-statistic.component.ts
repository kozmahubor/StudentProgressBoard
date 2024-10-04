import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import {Student} from "../../_models/student";

@Component({
  selector: 'app-student-nationality-statistic',
  templateUrl: './student-nationality-statistic.component.html',
  styleUrls: ['./student-nationality-statistic.component.scss']
})
export class StudentNationalityStatisticComponent {
  chart: any;
  students: Student[];
  nationalityArray: any[] = [];
  uniqueNationalities: string[] = [];
  nationList: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.http.get<any[]>("https://localhost:5057/api/Student").subscribe(resp => {
      resp.forEach(student => {
        if (student.nationality !== null) {
          this.nationalityArray.push(student.nationality);
        }
      });
      this.uniqueNationalities = Array.from(new Set(this.nationalityArray));

      this.uniqueNationalities.forEach(nation=> {
        let counter: number = 0;
        this.nationalityArray.forEach(x => {
          if (x === nation)
            counter++;
        });
        this.nationList.push(counter);
      });
      console.log(this.nationList);

      console.log(this.uniqueNationalities);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.uniqueNationalities,
          datasets: [{
            label: 'Nationality distribution',
            data: this.nationList,
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
    //console.log(this.nationalityArray);
  }
}
