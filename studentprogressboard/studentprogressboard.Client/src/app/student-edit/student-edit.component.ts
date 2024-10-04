import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../_models/student';
import { formatDate } from '@angular/common';
import { Training } from '../_models/training';
import { MaleOrFemale } from '../_enums/enum_arrays';
import { Sex } from '../_enums/sex';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent {
  MaleOrFemale = MaleOrFemale;

  public trainingId: number;
  studentId: number;
  student: Student = new Student();

  trainings: Training[] = [];


  selectedFiles: File [] = [];

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute,) {


  }

  ngOnInit(){
    this.route.params.subscribe(param => {
      this.trainingId = param['trainingId'];
      this.studentId = param['studentId'];

      console.log(this.studentId)
          console.log(this.trainingId)

      if(this.trainingId){
        this.student.trainingId = this.trainingId;

      }
      else{
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
      }

      if(this.studentId){
        this.http.get<any>('https://localhost:5057/api/Student/'+ this.studentId)
        .subscribe(resp => {
          this.student.id = resp.id;
          this.student.name = resp.name;
          this.student.neptunCode = resp.neptunCode;
          this.student.yearOfAdministration = resp.yearOfAdministration;
          this.student.dateOfBirth = formatDate(resp.dateOfBirth, 'yyyy-MM-dd', 'en-US')
          this.student.placeOfBirth = resp.placeOfBirth;
          this.student.address = resp.address;
          this.student.placeOfBirth = resp.placeOfBirth;
          this.student.nationality = resp.nationality;
          this.student.mothersName = resp.mothersName;
          this.student.absolved = resp.absolved;
          this.student.trainingId = resp.trainingId;
          this.student.sex = resp.sex;
          console.log(this.student)
        });
      }
      console.log(this.student)
    }
  )
  }

  onSubmit(){
    console.log(this.student)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    console.log(headers)
    this.http
      .post('https://localhost:5057/api/Student', this.student,  { headers: headers })
      .subscribe(
        (success) =>{
          console.log("SUCCESS");
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 });

          if (!this.trainingId) {
            this.router.navigate(['/students']);
          } else {
            this.router.navigate(['/students']);
          }
        },
        (error)=>{
          console.log("FAILURE");
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        }
      );
  }

  isValidEntity() : boolean{
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

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadCSV() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.error('No files selected.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i] as Blob, this.selectedFiles[i].name);
    }

    this.http.post<any[]>('https://localhost:5057/api/Student/upload', formData).subscribe(
      (students) => {
        if (students && students.length > 0) {
        } else {
          console.error('No students found in the CSV files.');
        }
      },
      (error) => {
        console.error('Error uploading CSV files:', error);
      }
    );
  }
}
