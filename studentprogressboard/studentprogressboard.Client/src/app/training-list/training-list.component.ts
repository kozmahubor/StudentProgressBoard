import { Component } from '@angular/core';
import { Training } from '../_models/training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getTrainingMode, getTrainingType } from '../_enums/enum_arrays';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent {
  getTrainingType = getTrainingType
  getTrainingMode = getTrainingMode;

  displayedColumns: string[] = ['id', 'name', 'englishName', 'trainingCode', 'numberOfSemesters', 'language', 'trainingType', 'trainingMode', 'update','delete'];

  dataSource: Training[] = [];

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private api: ApiService) {

  }

  ngOnInit(){
    let trainings: Training[] = [];
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
                trainings.push(t);
            })
            this.dataSource = trainings;
            console.log(this.dataSource)
      });
      this.api.isAdmin()
  }

  deleteTraining(id: number, event: Event,){
    event.stopPropagation();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('spmd-token')
    })
    this.http
    .delete('https://localhost:5057/api/Training/' + id, { headers: headers })
    .subscribe(
      (success) => {
        this.snackBar.open("Delete was successful!", "Close", { duration: 5000 });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trainings']);
        });
      },
      (error)=>{
        this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
      }
    )
  }
}
