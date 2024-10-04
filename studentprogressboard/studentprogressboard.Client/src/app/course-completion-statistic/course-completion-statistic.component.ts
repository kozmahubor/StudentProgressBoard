import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "../_models/course";
import {Student} from "../_models/student";
import Chart from "chart.js/auto";
import {Semester} from "../_models/semester";

class StudentCourse{
  grade: number;
  course: Course;
  courseId: number;
  id: number;
  semester: Semester;
}

@Component({
  selector: 'app-course-completion-statistic',
  templateUrl: './course-completion-statistic.component.html',
  styleUrls: ['./course-completion-statistic.component.scss']
})
export class CourseCompletionStatisticComponent {
  courses: string[] = [];
  students: Student[] = [];
  courseList: number[] = [];
  respFromStudCourse: any[] = [];

  chart: any;
  /*dummyData: StudentCourse[] = [
    {grade: 5,  courseId: 1, id: 1, course:{id: 1, name: 'Haladó fejlesztési technikák',courseCode: "HFT", requirementType: 1, courseType: 1, credits: 6}, semester:{id: 1, studentId: 1, year: 2021, semesterNumber: 1, active: true, financialStatus: 0, semesterYearString: "2021/2022/1" }},
    {grade: 1,  courseId: 1, id: 3, course:{id: 1, name: 'Haladó fejlesztési technikák',courseCode: "HFT", requirementType: 1, courseType: 1, credits: 6}, semester:{id: 1, studentId: 2, year: 2021, semesterNumber: 1, active: true, financialStatus: 0, semesterYearString: "2021/2022/1" }},
    {grade: 4, courseId: 2, id: 2, course:{id: 2, name: 'Frontend fejlesztés',courseCode: "FRFE1", requirementType: 1, courseType: 1,  credits: 4}, semester:{id: 2, studentId: 1, year: 2021, semesterNumber: 2, active: true, financialStatus: 0, semesterYearString: "2021/2022/1"}}
  ];*/
  studentCourses: StudentCourse[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.http.get<any[]>("https://localhost:5057/api/Course").subscribe(resp => {
      resp.forEach(x => {
        this.courses.push(x.name);
      })

      this.http.get<any[]>("https://localhost:5057/api/StudentCourse").subscribe(
          coursesResp => {
            this.respFromStudCourse.push(coursesResp);
            this.studentCourses = this.respFromStudCourse[0];

            this.courses.forEach(c=> {
              let counter: number = 0;
              let counterFail: number = 0;
              this.studentCourses.forEach(x => {
                if (x.course.name === c){
                  if (x.grade > 1){
                    counter++;
                  }
                  else if(x.grade === 1){
                    counterFail++;
                  }
                }
              });
              if (counterFail > 0){
                this.courseList.push( (counter / (counterFail + counter)) * 100);
              }
              else if(counter > 0){
                this.courseList.push(100);
              }
            });

            this.chart = new Chart('canvas', {
              type: 'bar',
              data: {
                labels: this.courses,
                datasets: [{
                  label: 'Successful completions per courses',
                  data: this.courseList,
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
    });

  }
}

