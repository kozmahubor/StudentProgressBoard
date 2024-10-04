import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypes, getCourseType, getRequirementType, RequirementTypes } from '../_enums/enum_arrays';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent {
  courseTypes = CourseTypes;
  requirementTypes = RequirementTypes;

  course: Course = new Course();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    
  }

  ngOnInit(){
    this.route.params.subscribe(param => {
      let courseId = param['courseId'];
      if(courseId){
        this.http.get<any>('https://localhost:5057/api/Course/'+ courseId)
        .subscribe(resp => {
          console.log(resp)
          this.course.id = resp.id;
          this.course.name = resp.name;
          this.course.courseCode = resp.courseCode;
          this.course.credits = resp.credits;
          this.course.organization = resp.organization;
          this.course.responsibleTeacher = resp.responsibleTeacher;
          this.course.courseType = resp.courseType;
          this.course.requirementType = resp.requirementType;
        });
      }
    }
  )}

  onSubmit(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    this.http
    .post('https://localhost:5057/api/Course', this.course,  { headers: headers })
    .subscribe(
      (success) =>{
        this.snackBar.open("Create was successful!", "Close", { duration: 5000 });
        this.router.navigate(['/courses']);
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    );
  }
}
