import { Component } from '@angular/core';
import { StudentCourse } from '../_models/student-course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { getCourseStatus, getCourseType, getRequirementType } from '../_enums/enum_arrays';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../_models/course';
import {Student} from "../_models/student";

@Component({
  selector: 'app-student-courses-list',
  templateUrl: './student-courses-list.component.html',
  styleUrls: ['./student-courses-list.component.scss']
})
export class StudentCoursesListComponent {
  getCourseStatus = getCourseStatus;
  getCourseType = getCourseType;
  getRequirementType = getRequirementType;

  semesterId: number;
  semester: string;
  studentName: string;
  totalCredits: number;
  avarageGrade: string;
  student: any | null = null;
  courses: Course[] = [];
  profile: any

  displayedColumns: string[] = ['id', 'name', 'credits', 'grade', 'requirementType', 'courseStatus', 'courseType','update', 'delete'];
  //displayedColumns: string[] = ['id', 'name', 'neptunCode','yearOfAdministration','dateOfBirth','placeOfBirth', 'address','mothersName','absolved'];

  dataSource: StudentCourse[] = [
  ];

  selectedYear: string = '1';
  years = [
    {value: '1', viewValue: '2023/2024/2'},
    {value: '2', viewValue: '2024/2025/1'},
    {value: '3', viewValue: '2024/2025/2'},
  ];


  constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router,) {


  }

  ngOnInit(){
    this.route.params.subscribe(param => {
      let studentcourses: StudentCourse[] = [];
      this.semesterId = param['semesterId'];

      if(!this.semesterId){
        //TODO: configure this for logged in student
        return;
      }
      if(this.semesterId){
        this.http.get<any>('https://localhost:5057/api/Semester/' + this.semesterId)
        .subscribe(resp =>{
          this.studentName = resp.student.name;
          this.semester = resp.semesterYearString;
        });
      }

      this.http.get<any[]>('https://localhost:5057/api/StudentCourse/listStudentCourses/' + this.semesterId)
        .subscribe(resp => {
          console.log(resp)
          resp.map(x => {
            if(x.course){
              let t = new StudentCourse();
              t.id = x.id;
              t.name = x.course.name;
              t.grade = x.grade;
              t.credits = x.course.credits;
              t.courseStatus = x.courseStatus;
              t.courseType = x.course.courseType;
              t.requirementType = x.course.requirementType;
              t.semesterId = x.semester.id;
              studentcourses.push(t);
            }
          })
          this.dataSource = studentcourses;
          console.log(this.dataSource);
          this.totalCredits = this.dataSource.reduce((total, course) => total + course.credits, 0);
          this.avarageGrade = (this.dataSource.reduce((total, course) => total + course.grade, 0) / this.dataSource.length).toFixed(2);

        });

    });


    const token = localStorage.getItem('spmd-token') || "";
    const userInfo = this.getUserInfo(token);

    if (userInfo) {
      const name = userInfo.name;
      this.getStudentByName(name);
      console.log("Email : ", name)
    } else {
      console.log('Failed to decode token');
    }

  }

  private getUserInfo(token: string) {
    try {
      console.log('getUserinfo token:', token)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      const name = payload['name'];
      console.log('getUserinfo upn:', name)
      return { name };
    } catch (error) {
      return null;
    }
  }

  private getStudentByName(name: string): void {
    console.log('getStudentByName name:', name)
    const apiUrl = 'https://localhost:5057/api/Student/student';
    this.http.get(`${apiUrl}/${name}`).subscribe(
      (data) => {
        this.profile = data;
        console.log('Student Data:', this.profile);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteStudentCourse(id: number, event: Event,){
    event.stopPropagation();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    })
    this.http
    .delete('https://localhost:5057/api/StudentCourse/' + id, { headers: headers })
    .subscribe(
      (success) => {
        this.snackBar.open("Delete was successful!", "Close", { duration: 5000 });

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          if (this.semesterId) {
            this.router.navigate(['/student-courses/', this.semesterId]);
          } else {
            this.router.navigate(['/student-courses']);
          }
        });
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    )

  }

}
