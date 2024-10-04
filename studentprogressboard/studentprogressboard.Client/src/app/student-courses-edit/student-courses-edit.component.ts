import { Component } from '@angular/core';
import { StudentCourse } from '../_models/student-course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseStatuses, getCourseStatus } from '../_enums/enum_arrays';
import { Course } from '../_models/course';

@Component({
  selector: 'app-student-courses-edit',
  templateUrl: './student-courses-edit.component.html',
  styleUrls: ['./student-courses-edit.component.scss']
})
export class StudentCoursesEditComponent {
  CourseStatuses = CourseStatuses;

  semesterId: number;
  studentCourse: StudentCourse = new StudentCourse();
  courseName: string;

  courses: Course[] = [];
  
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute,) {
    
  }
  ngOnInit(){
    this.route.params.subscribe(param => {
      this.semesterId = param['semesterId'];
      let studentCourseId = param['studentCourseId'];

      this.http
            .get<any[]>('https://localhost:5057/api/Course')
            .subscribe(resp=>{
              
              resp.map(x=>{
                let t = new Course();
                t.id = x.id;
                t.name = x.name;
                // t.englishName = x.englishName;
                // t.trainingCode = x.trainingCode;
                // t.numberOfSemesters = x.numberOfSemesters;
                // t.language = x.language;
                // t.trainingType = x.trainingType;
                // t.trainingMode = x.trainingMode;
                this.courses.push(t);
              }
            ) 
          }
        );

      //Todo: logged in student
      if(this.semesterId){
        this.studentCourse.semesterId = this.semesterId;
      }

      if(studentCourseId){
        this.http.get<any>('https://localhost:5057/api/StudentCourse/'+ studentCourseId)
        .subscribe(resp =>{
          if(resp.course){
            this.courseName = resp.course.name;
            this.studentCourse.id = resp.id;
            this.studentCourse.grade = resp.grade;
            this.studentCourse.courseStatus = resp.courseStatus;
            this.studentCourse.courseId = resp.course.id;
          }
        });
      }
      console.log(this.studentCourse)

    });
  }


  onSubmit(){
    console.log(this.studentCourse)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    console.log(headers)
    this.http
      .post('https://localhost:5057/api/StudentCourse', this.studentCourse,  { headers: headers })
      .subscribe(
        (success) =>{
          console.log("SUCCESS");
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 });
          this.router.navigate(['/student-courses/', this.semesterId]);
        },
        (error)=>{
          console.log("FAILURE");
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        }
      );
  }
}
