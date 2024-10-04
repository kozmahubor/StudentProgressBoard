import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getCourseType, getRequirementType } from '../_enums/enum_arrays';
import {AdminGuard} from "../AdminGuard";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  getCourseType = getCourseType;
  getRequirementType = getRequirementType;

  displayedColumns: string[] = ['id', 'name','courseCode', 'credits','organization','responsibleTeacher','courseType','requirementType','update','delete'];

  dataSource: Course[] = [];


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar,  private adminGuard: AdminGuard) {

  }

  ngOnInit(){
    let courses: Course[] = [];
    this.http
            .get<any[]>('https://localhost:5057/api/Course')
            .subscribe(resp=>{
              resp.map(x=>{
                let t = new Course();
                t.id = x.id;
                t.name = x.name;
                t.courseCode = x.courseCode;
                t.credits = x.credits;
                t.organization = x.organization;
                t.responsibleTeacher = x.responsibleTeacher;
                t.courseType = x.courseType;
                t.requirementType = x.requirementType;
                courses.push(t);

            })
            this.dataSource = courses;
            console.log(this.dataSource)
      });
  }

  deleteCourse(id: number, event: Event,){
    event.stopPropagation();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    })
    this.http
    .delete('https://localhost:5057/api/Course/' + id, { headers: headers })
    .subscribe(
      (success) => {
        this.snackBar.open("Delete was successful!", "Close", { duration: 5000 });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/courses']);
        });
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    )
  }
  isAdmin(): boolean {
    return this.adminGuard.isAdmin();
  }
}
