import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grades-per-training',
  templateUrl: './grades-per-training.component.html',
  styleUrls: ['./grades-per-training.component.scss']
})
export class GradesPerTrainingComponent implements OnInit {
  chart: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5057/api/StudentCourse').subscribe(resp => {
      const averageGradesPerTraining = new Map<string, { sum: number, count: number }>();
      resp.forEach(course => {
        const trainingName = course.semester.student.training.englishName;
        const grade = course.grade;
        let currentTrainingGrade = averageGradesPerTraining.get(trainingName);
        if (!currentTrainingGrade) {
          currentTrainingGrade = { sum: 0, count: 0 };
        }
        currentTrainingGrade.sum += grade;
        currentTrainingGrade.count++;
        averageGradesPerTraining.set(trainingName, currentTrainingGrade);
      });

      const trainingNames = Array.from(averageGradesPerTraining.keys());
      const averageGrades = Array.from(averageGradesPerTraining.values()).map(avg => avg.sum / avg.count);

      this.createBarChart(trainingNames, averageGrades);
    });
  }

  createBarChart(labels: string[], data: number[]): void {
    const colors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Grades per Training',
          data: data,
          backgroundColor: colors,
          borderColor: borderColors,
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
  }
}
