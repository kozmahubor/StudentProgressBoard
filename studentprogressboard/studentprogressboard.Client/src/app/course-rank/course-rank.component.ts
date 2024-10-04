import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentCourse } from '../_models/student-course';

@Component({
  selector: 'app-course-rank',
  templateUrl: './course-rank.component.html',
  styleUrls: ['./course-rank.component.scss']
})
export class CourseRankComponent {
  chart: any;
  First:string
  FirstStudents:number;
  second:string
  SecondStudents:number;
  third:string
  ThirdStudents:number;
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    
    const studentCourseCountMap = new Map<string, Map<string, number>>();
const courseMaxCounts = new Map<string, number>();
        this.http.get<any[]>("https://localhost:5057/api/StudentCourse")
        .subscribe(resp => {
          console.log(resp)
          resp.forEach(student => {
            const studentId = student.semester.studentId;
            const courseName = student.course.name;

            if (!studentCourseCountMap.has(studentId)) {
              studentCourseCountMap.set(studentId, new Map<string, number>());
            }

            const courseCountMap = studentCourseCountMap.get(studentId);

            if (courseCountMap) {
              if (!courseCountMap.has(courseName)) {
                courseCountMap.set(courseName, 0);
              }
              const currentCount = courseCountMap.get(courseName);

              if (typeof currentCount === 'number') {
                courseCountMap.set(courseName, currentCount + 1);


                const maxCount = courseMaxCounts.get(courseName) || 0;
                if (currentCount + 1 > maxCount) {
                  courseMaxCounts.set(courseName, currentCount + 1);
                }
              }
            }
        });
        
        studentCourseCountMap.forEach((courseCountMap, studentId) => {
          console.log(`Student ID: ${studentId}`);
          
          courseCountMap.forEach((count, courseName) => {
            const maxCount = courseMaxCounts.get(courseName) || 0;
            if (count === maxCount) {
              console.log(`  Legtöbbször felvett kurzus: ${courseName}, Felvételek száma: ${count}`);
            }
          });
        });

const courseStudentCounts = new Map<string, number>();


studentCourseCountMap.forEach((courseCountMap) => {
  courseCountMap.forEach((count, courseName) => {
    if (count >= 2) {
      if (!courseStudentCounts.has(courseName)) {
        courseStudentCounts.set(courseName, 0);
      }
      courseStudentCounts.set(courseName, courseStudentCounts.get(courseName)! + 1); 
    }
  });
});


const sortedCoursesByStudentCount = Array.from(courseStudentCounts.entries())
  .sort((a, b) => b[1] - a[1]); 



const topThreeCourses = sortedCoursesByStudentCount.slice(0, 3);

this.First=topThreeCourses[0][0];
this.FirstStudents=topThreeCourses[0][1];
this.second=topThreeCourses[1][0];
this.SecondStudents=topThreeCourses[1][1];
this.third=topThreeCourses[2][0];
this.ThirdStudents=topThreeCourses[2][1];
topThreeCourses.forEach(([courseName, studentCount]) => {
  

});
      });
    }
}
