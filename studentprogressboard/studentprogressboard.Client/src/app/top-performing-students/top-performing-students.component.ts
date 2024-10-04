import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-performing-students',
  templateUrl: './top-performing-students.component.html',
  styleUrls: ['./top-performing-students.component.scss']
})
export class TopPerformingStudentsComponent implements OnInit {
  topStudents: { name: string; averageGrade: number }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5057/api/StudentCourse')
      .subscribe(
        (studentCourses: any[]) => {
          const coursesByStudentId: { [key: string]: any[] } = {};

          studentCourses.forEach(course => {
            const studentId = course.semester.studentId;
            if (!coursesByStudentId[studentId]) {
              coursesByStudentId[studentId] = [];
            }
            coursesByStudentId[studentId].push(course);
          });

          const topStudentIds = Object.keys(coursesByStudentId);
          const topStudentsWithGrades = topStudentIds.map(studentId => {
            const courses = coursesByStudentId[studentId];
            const averageGrade = this.calculateAverageGrade(courses);
            return {
              studentId,
              averageGrade
            };
          });

          // Sort topStudentsWithGrades based on averageGrade
          topStudentsWithGrades.sort((a, b) => b.averageGrade - a.averageGrade);

          // Get top 3 students
          const topThreeStudents = topStudentsWithGrades.slice(0, 3);

          // Fetch student names for the top performing students
          this.fetchStudentNames(topThreeStudents);
        },
        error => {
          console.error('Error fetching student courses:', error);
        }
      );
  }

  calculateAverageGrade(courses: any[]): number {
    const totalGrade = courses.reduce((acc, course) => acc + course.grade, 0);
    return totalGrade / courses.length;
  }

  fetchStudentNames(topStudents: any[]): void {
    topStudents.forEach((student, index) => {
      this.http.get<any>(`https://localhost:5057/api/Student/${student.studentId}`)
        .subscribe(
          (studentData: any) => {
            this.topStudents.push({
              name: studentData.name,
              averageGrade: student.averageGrade
            });
            // Sort the topStudents array based on averageGrade after each name is fetched
            this.topStudents.sort((a, b) => b.averageGrade - a.averageGrade);
            // Keep only the top 3 students
            this.topStudents = this.topStudents.slice(0, 3);
          },
          error => {
            console.error('Error fetching student name:', error);
          }
        );
    });
  }
}
