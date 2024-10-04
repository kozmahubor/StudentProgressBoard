import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Semester } from '../_models/semester';
import { FinancialStatuses } from '../_enums/enum_arrays';

@Component({
  selector: 'app-semester-edit',
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.scss']
})
export class SemesterEditComponent {
  FinancialStatuses = FinancialStatuses;

  studentId: number;

  semester: Semester = new Semester();

  
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute,) {
    
  }

  ngOnInit(){
    this.route.params.subscribe(param => {
      this.studentId = param['studentId'];
      let semesterId = param['semesterId'];

      if(this.studentId){
        this.semester.studentId = this.studentId;
      }

      if(semesterId){
        this.http.get<any>('https://localhost:5057/api/Semester/'+ semesterId)
        .subscribe(resp => {
          this.semester.id = resp.id;
          this.semester.year = resp.year;
          this.semester.semesterNumber = resp.semesterNumber;
          this.semester.active = resp.active;
          this.semester.financialStatus = resp.financialStatus;
        });
      }
      console.log(this.semester)
      }
    );
  }

  onSubmit(){
    console.log(this.semester)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    console.log(headers)
    this.http
      .post('https://localhost:5057/api/Semester', this.semester,  { headers: headers })
      .subscribe(
        (success) =>{
          console.log("SUCCESS");
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 });
          this.router.navigate(['/semesters/', this.studentId]);
        },
        (error)=>{
          console.log("FAILURE");
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        }
      );
  }
}
