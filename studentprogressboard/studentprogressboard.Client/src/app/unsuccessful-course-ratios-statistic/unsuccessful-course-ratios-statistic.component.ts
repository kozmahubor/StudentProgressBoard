import { Component } from '@angular/core';
import { StudentCourse } from '../_models/student-course';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-unsuccessful-course-ratios-statistic',
  templateUrl: './unsuccessful-course-ratios-statistic.component.html',
  styleUrls: ['./unsuccessful-course-ratios-statistic.component.scss']
})


export class UnsuccessfulCourseRatiosStatisticComponent {
  chart: any;
  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {
    this.fetchData();
  }  
  fetchData(): void {
    let xd={Ongoing:0,Completed:1,Banned:2,ExamUnsuccessfull:3, AssignmentUnsuccessful:4 }
    
    let Names: string[]=["Banned","ExamUnsuccessfull","AssignmentUnsuccessful"];
    let reason:number[] = [0,0,0];
    this.http.get<any[]>('https://localhost:5057/api/StudentCourse')
            .subscribe(resp=>{
              
              resp.map(x=>{
                let t = new StudentCourse();
                t.courseStatus=x.courseStatus;
                t.grade=x.grade

              
                if(t.courseStatus==2){
                  reason[0]+=1;
                }else if(t.courseStatus==3){
                  reason[1]+=1
                }else if(t.courseStatus==4){
                  reason[2]+=1
                }
                
              });
              this.chart = new Chart('canvas', {
                type: 'pie',
                data: {
                  labels: Names,
                  datasets: [{
                    label: 'Students Number',
                    data: reason,
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

