import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-most-popular-course',
  templateUrl: './most-popular-course.component.html',
  styleUrls: ['./most-popular-course.component.scss']
})
export class MostPopularCourseComponent implements OnInit {
  chart: any;
  coursesData: any[] = [];
  remainingCoursesHTML: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5057/api/StudentCourse').subscribe(resp => {
      // Group data by courseId and count number of students for each course
      const courseCountMap = new Map<number, number>();
      resp.forEach(course => {
        const courseId = course.course.id;
        const count = courseCountMap.get(courseId) || 0;
        courseCountMap.set(courseId, count + 1);
      });

      // Convert map to array of objects
      this.coursesData = Array.from(courseCountMap.entries()).map(([courseId, count]) => ({
        courseId,
        count
      }));

      // Sort courses by popularity (number of students enrolled)
      this.coursesData.sort((a, b) => b.count - a.count);

      // Extract top three courses and their popularity
      const topThreeCourses = this.coursesData.slice(0, 3);
      const topThreeCourseIds = topThreeCourses.map(entry => entry.courseId);
      const topThreeCoursePopularity = topThreeCourses.map(entry => entry.count);

      // Fetch course names for top three courses
      this.http.get<any[]>('https://localhost:5057/api/Course').subscribe(courses => {
        const courseNames = courses.filter(course => topThreeCourseIds.includes(course.id)).map(course => course.name);

        // Creating the chart
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: courseNames,
            datasets: [{
              label: 'Number of students enrolled',
              data: topThreeCoursePopularity,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
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

        // Calculate remaining courses HTML
        const remainingCourses = this.coursesData.slice(3);
        this.remainingCoursesHTML = remainingCourses.map(course => `<li>${courses.find(c => c.id === course.courseId).name}: ${course.count} students</li>`).join('');
      });
    });
  }
}
