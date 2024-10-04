import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../_models/student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Training } from '../_models/training';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  training: string = "List of all students";

  displayedColumns: string[] = ['id', 'name', 'neptunCode','yearOfAdministration','dateOfBirth','placeOfBirth', 'address','mothersName','absolved', 'update','delete'];

  dataSource: Student[] = [];

  trainingId: number;
  userRole: string | null

  public routerLinkToEdit: string = '/student-edit/';
  selectedFile: File | null = null;
  constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, private apiservice: ApiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  ngOnInit(){
    this.userRole = localStorage.getItem('userRole');


    this.route.params.subscribe(param => {
      let students: Student[] = [];
      this.trainingId = param['trainingId'];
      console.log(this.trainingId)
      let url = 'https://localhost:5057/api/Student/';

      if(this.trainingId){
        this.routerLinkToEdit += this.trainingId;
        this.training = "";
        url += 'listStudents/' + this.trainingId;
        this.http.get<any>('https://localhost:5057/api/Training/' + this.trainingId)
        .subscribe(resp =>{
          this.training = resp.name;
        });
      }

      this.http.get<any[]>(url)
        .subscribe(resp => {
          console.log(resp)
          resp.map(x => {
            let t = new Student();
            t.id = x.id;
            t.name = x.name;
            t.neptunCode = x.neptunCode;
            t.yearOfAdministration = x.yearOfAdministration;
            t.dateOfBirth = x.dateOfBirth;
            t.placeOfBirth = x.placeOfBirth;
            t.address = x.address;
            t.nationality = x.nationality;
            t.mothersName = x.mothersName;
            t.absolved = x.absolved;
            t.trainingId = x.trainingId;
            t.role = x.role;
            students.push(t);
          })
          this.dataSource = students;
          console.log(this.dataSource);
        });
    });

  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  deleteStudent(id: number, event: Event,){
    event.stopPropagation();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    })
    this.http
    .delete('https://localhost:5057/api/Student/' + id, { headers: headers })
    .subscribe(
      (success) => {
        this.snackBar.open("Delete was successful!", "Close", { duration: 5000 });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          if (this.trainingId) {
            this.router.navigate(['/students/', this.trainingId]);
          } else {
            this.router.navigate(['/students']);
          }
        });
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    )
  }

}
