import { Component } from '@angular/core';
import { Semester } from '../_models/semester';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { getFinancialStatus } from '../_enums/enum_arrays';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss']
})
export class SemesterListComponent {
  getFinancialStatus = getFinancialStatus;

  studentName: string;

  studentId: number;

  displayedColumns: string[] = ['id', 'semesterYear','active', 'financialStatus', 'update','delete'];

  dataSource: Semester[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router,) {
    
    
  }

  ngOnInit(){
    this.route.params.subscribe(param => {
      let semesters: Semester[] = [];
      this.studentId = param['studentId'];

      console.log(this.studentId)

      this.http.get<any>('https://localhost:5057/api/Student/' + this.studentId)
      .subscribe(resp =>{
        this.studentName = resp.name;
      });

      this.http.get<any[]>('https://localhost:5057/api/Semester/listSemesters/' + this.studentId)
        .subscribe(resp => {
          resp.map(x => {
            let t = new Semester();
            t.id = x.id;
            t.year = x.year;
            t.semesterNumber = x.semesterNumber;
            t.active = x.active;
            t.financialStatus = x.financialStatus;
            t.studentId = x.studentId;
            semesters.push(t);

          this.dataSource = semesters;
          console.log(this.dataSource);
        });
    });
  }
  )}

  deleteStudent(id: number, event: Event,){
    event.stopPropagation();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    })
    this.http
    .delete('https://localhost:5057/api/Semester/' + id, { headers: headers })
    .subscribe(
      (success) => {
        this.snackBar.open("Delete was successful!", "Close", { duration: 5000 });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/semesters/', this.studentId]);
        });
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    )
  }
}
