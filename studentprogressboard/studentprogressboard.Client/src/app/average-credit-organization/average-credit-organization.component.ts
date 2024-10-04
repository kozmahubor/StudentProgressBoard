import { Component } from '@angular/core';
import {Course} from "../_models/course";
import {HttpClient} from "@angular/common/http";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-average-credit-organization',
  templateUrl: './average-credit-organization.component.html',
  styleUrls: ['./average-credit-organization.component.scss']
})
export class AverageCreditOrganizationComponent {
  chart: any;
  courses: string[] = [];
  courseList: Course[] = [];
  organizations: string[] = [];
  avgCred: number[] = [];

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.http.get<any[]>("https://localhost:5057/api/StudentCourse").subscribe(resp => {
      resp.forEach(x => {
        this.courseList.push(x.course);
      });

      //Array of organizations name but it's distinct
      const uniqueElements = new Set<any>();
      this.courseList.forEach(item => {
        if (item.organization !== null){
          uniqueElements.add(item.organization)
        }
      });
      this.organizations = Array.from(uniqueElements);
      console.log(this.organizations);

      this.organizations.forEach(x => {
        let db: number = 0;
        let sum: number = 0;
        this.courseList.forEach(t => {
          if (x === t.organization) {
            sum += t.credits;
            db++;
          }
        });
        this.avgCred.push((sum / db));
        console.log(this.avgCred);
      });


      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.organizations,
          datasets: [{
            label: 'Average credits per organizations',
            data: this.avgCred,
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
              'rgba(75, 192, 192, 0.2)'

            ],
            borderColor: [
              'rgba(153, 102, 255, 1)',
              'rgba(75, 192, 192, 1)'

            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
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
