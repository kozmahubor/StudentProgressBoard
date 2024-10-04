import { Component } from '@angular/core';
import Chart from "chart.js/auto";
import {HttpClient} from "@angular/common/http";
import {Course} from "../_models/course";

@Component({
  selector: 'app-ranks-of-teachers',
  templateUrl: './ranks-of-teachers.component.html',
  styleUrls: ['./ranks-of-teachers.component.scss']
})
export class RanksOfTeachersComponent {
  chart: any;
  courses: string[] = [];
  courseList: Course[] = [];
  teachers: string[] = [];
  numberOfStudents: number[] = [];

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.http.get<any[]>("https://localhost:5057/api/StudentCourse").subscribe(resp => {
      resp.forEach(x => {
        this.courseList.push(x.course);
      });

      //Array of teachers name but it's distinct
      const uniqueElements = new Set<any>();
      this.courseList.forEach(item => uniqueElements.add(item.responsibleTeacher));
      this.teachers = Array.from(uniqueElements);

      //Counting how many students have taken a course by a specific teacher
      this.teachers.forEach(x => {
        let db: number = 0;
        this.courseList.forEach(t => {
          if (x === t.responsibleTeacher) {
            db++;
          }
        });
        this.numberOfStudents.push(db);
      });

      //Slicing the top 3 numbers of the count
      const sortedArr = this.numberOfStudents.slice().sort((a, b) => b - a);
      const topThree = sortedArr.slice(0, 3);
      //Indexes of the top 3
      const indices: number[] = [];
      for (const num of topThree) {
        indices.push(this.numberOfStudents.indexOf(num));
      }
      let top3Teachers: any[] = [];
      let top3Numbers: any[] = [];
      for (const index of indices) {
        if (index >= 0 && index < this.teachers.length) {
          top3Teachers.push(this.teachers[index]);
        }
        if (index >= 0 && index < this.numberOfStudents.length) {
          top3Numbers.push(this.numberOfStudents[index]);
        }
      }

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: top3Teachers,
          datasets: [{
            label: 'Teacher courses taken by students',
            data: top3Numbers,
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
