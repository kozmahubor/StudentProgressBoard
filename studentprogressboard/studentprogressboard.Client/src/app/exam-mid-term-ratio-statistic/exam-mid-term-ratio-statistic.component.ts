import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Chart from "chart.js/auto";
import {Student} from "../_models/student";
import {Course} from "../_models/course";
import {Semester} from "../_models/semester";

class StudentCourse{
  grade: number;
  course: Course;
  courseId: number;
  id: number;
  semester: Semester;
  semesterYearString: string;
}

@Component({
  selector: 'app-exam-mid-term-ratio-statistic',
  templateUrl: './exam-mid-term-ratio-statistic.component.html',
  styleUrls: ['./exam-mid-term-ratio-statistic.component.scss']
})

export class ExamMidTermRatioStatisticComponent {
  respFromStudCourse: any[] = [];
  uniqueSemesters: string[] = [];
  selectedSemester: string = "";

  chart: any;
  studentCourses: StudentCourse[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(){

      this.http.get<any[]>("https://localhost:5057/api/StudentCourse").subscribe(
        coursesResp => {
          this.respFromStudCourse.push(coursesResp);
          this.studentCourses = this.respFromStudCourse[0];

          const combinedArray: string[] = this.studentCourses.map(item => item.semester.semesterYearString);

          this.uniqueSemesters = Array.from(new Set(combinedArray));
          console.log(this.uniqueSemesters);

          let midTermCount: number = 0;
          let examCount: number = 0;

          this.studentCourses.forEach(studCourse => {
            if (this.selectedSemester !== "") {
              if (studCourse.semester.semesterYearString === this.selectedSemester) {
                if (studCourse.course.requirementType === 0) {
                  examCount++;
                } else {
                  midTermCount++;
                }
              }
            }
          });

          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: ['Exam','Midterm'],
              datasets: [{
                label: 'Number of course',
                data: [examCount, midTermCount],
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(75, 192, 192, 0.2)'

                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(75, 192, 192, 1)'

                ],
                borderWidth: 1,
                hoverOffset: 4
              }]
            },
            options: {
              radius: "100%",
              responsive: true,
            maintainAspectRatio: false,
              scales: {
              }
            }
          });
        });
  }

  onSelectionChange(event: any) {
    console.log(event.value);
    this.selectedSemester = event.value;
    this.chart.destroy();
    this.ngOnInit()
  }
}
