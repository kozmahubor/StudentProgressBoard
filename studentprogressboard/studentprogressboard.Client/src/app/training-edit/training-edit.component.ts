import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from '../_models/training';
import { TrainingModes, TrainingTypes } from '../_enums/enum_arrays';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss']
})
export class TrainingEditComponent {
  trainingModes = TrainingModes;
  trainingTypes = TrainingTypes;

  training: Training = new Training();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    
  }
  
  ngOnInit(){
    this.route.params.subscribe(param => {
      let trainingId = param['trainingId'];
      if(trainingId){
        this.http.get<any>('https://localhost:5057/api/Training/'+ trainingId)
        .subscribe(resp => {
          console.log(resp)
          this.training.id = resp.id;
          this.training.name = resp.name;
          this.training.englishName = resp.englishName;
          this.training.language = resp.language;
          this.training.trainingCode = resp.trainingCode;
          this.training.numberOfSemesters = resp.numberOfSemesters;
          this.training.trainingMode = resp.trainingMode;
          this.training.trainingType = resp.trainingType;
        });
      }
    }
  )}

  onSubmit(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    });
    console.log(headers)
    this.http
      .post('https://localhost:5057/api/Training', this.training,  { headers: headers })
      .subscribe(
        (success) =>{
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 });
          this.router.navigate(['/trainings']);
        },
        (error)=>{
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        }
      );
  }

}