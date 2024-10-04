import { Component } from '@angular/core';
import { MaleOrFemale } from '../_enums/enum_arrays';
import { RegisterModel, Student } from '../_models/student';
import { Training } from '../_models/training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sex } from '../_enums/sex';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  MaleOrFemale = MaleOrFemale;

  public trainingId: number;
  studentId: number;
  student: RegisterModel = new RegisterModel();

  trainings: Training[] = [];

  constructor(private http: HttpClient,
     private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute, private api: ApiService) {
    
    
  }

  ngOnInit(){
    this.http
            .get<any[]>('https://localhost:5057/api/Training')
            .subscribe(resp=>{
              resp.map(x=>{
                let t = new Training();
                t.id = x.id;
                t.name = x.name;
                t.englishName = x.englishName;
                t.trainingCode = x.trainingCode;
                t.numberOfSemesters = x.numberOfSemesters;
                t.language = x.language;
                t.trainingType = x.trainingType;
                t.trainingMode = x.trainingMode;
                this.trainings.push(t);
                console.log(this.trainings)
            }
          ) 
      });

      this.api.isLoggedIn();

  }

  onSubmit(){
    console.log(this.student)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    console.log(headers)
    this.http
      .put('https://localhost:5057/api/Auth', this.student,  { headers: headers })
      .subscribe(
        (success) =>{
          console.log("SUCCESS");
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 });
          
          this.router.navigate(['/login']);
        },
        (error)=>{
          console.log("FAILURE");
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        }
      );
  }

  isValidEntity() : boolean{
    console.log(this.student)
    if(this.student.name &&
      this.student.neptunCode &&
      this.student.yearOfAdministration &&
      this.student.dateOfBirth &&
      this.student.placeOfBirth &&
      this.student.address &&
      this.student.nationality &&
      this.student.mothersName &&
      (this.student.sex === Sex.Female || this.student.sex === Sex.Male) 
    ){
      return true;
    }
    return false;
  }
}
