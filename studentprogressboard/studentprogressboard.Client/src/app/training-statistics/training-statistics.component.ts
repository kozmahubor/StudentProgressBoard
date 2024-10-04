import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Training } from '../_models/training';
import { Student } from '../_models/student';
import { studentTraining } from '../_models/studentTraining';

@Component({
  selector: 'app-training-statistics',
  templateUrl: './training-statistics.component.html',
  styleUrls: ['./training-statistics.component.scss']
})
export class TrainingStatisticsComponent {
  chart: any;
  ChoosenYear: number = 2023;
  years: number[] = []; 
  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {
    this.fetchData();
  }

  onYearChange(): void {

    if (this.chart) {
      this.chart.destroy();
    }
    this.fetchData();
  }

  fetchData(): void {
    let students: studentTraining[] = [];
    let trainingNames: string[]=[];
    let uniqueYearsSet = new Set<number>();
    this.http.get<any[]>('https://localhost:5057/api/Student')
            .subscribe(resp=>{
              
              resp.map(x=>{
                if(x.yearOfAdministration!==0){
                let t = new studentTraining();
                t.training=x.training;
                t.year=x.yearOfAdministration;
                console.log(t.year)
                if(t.training!==null){
                trainingNames.push(t.training.name);
                }
                uniqueYearsSet.add(t.year);
                students.push(t);
              }
              });
              
              this.years = Array.from(uniqueYearsSet);
              let uniqueTrainingNamesSet = new Set(trainingNames);
              let uniqueTrainingNamesArray = Array.from(uniqueTrainingNamesSet);
              let StudentsNumberonTrainings: number[] = Array(uniqueTrainingNamesArray.length).fill(0);
              console.log(uniqueTrainingNamesArray)
              for (let indexi = 0; indexi < uniqueTrainingNamesArray.length; indexi++) {
                for (let indexj = 0; indexj < students.length; indexj++) {
                  const element = students[indexj];

                  if(element.year === this.ChoosenYear && element.training.name === uniqueTrainingNamesArray[indexi]) {
                    StudentsNumberonTrainings[indexi] = StudentsNumberonTrainings[indexi] + 1;
                  } 
                }
              }
              console.log(StudentsNumberonTrainings)
              this.chart = new Chart('canvas', {
                type: 'bar',
                data: {
                  labels: uniqueTrainingNamesArray,
                  datasets: [{
                    label: 'Students Number',
                    data: StudentsNumberonTrainings,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      `rgba(150,100 ,150, 0.2 )`
                    
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      `rgba(150,100 ,150, 1)`
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            });
  }
}
