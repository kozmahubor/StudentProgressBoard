import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentCoursesListComponent } from './student-courses-list/student-courses-list.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { StudentStatisticComponent } from './student-statistic/student-statistic.component';
import { LoginComponent } from './login/login.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { SemesterEditComponent } from './semester-edit/semester-edit.component';
import { ApiService } from './api.service';
import { ErrorComponent } from './error/error.component';
import { StudentCoursesEditComponent } from './student-courses-edit/student-courses-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { RegisterComponent } from './register/register.component';
import {CourseCompletionStatisticComponent} from "./course-completion-statistic/course-completion-statistic.component";
import { StudentNationalityStatisticComponent } from "./student-statistic/student-nationality-statistic/student-nationality-statistic.component";
import { TrainingStatisticsComponent } from './training-statistics/training-statistics.component';
import {CoursesTeacherStatisticComponent} from "./courses-teacher-statistic/courses-teacher-statistic.component";
import {RanksOfTeachersComponent} from "./ranks-of-teachers/ranks-of-teachers.component";
import { AverageCreditOrganizationComponent } from './average-credit-organization/average-credit-organization.component';
import { ExamMidTermRatioStatisticComponent } from './exam-mid-term-ratio-statistic/exam-mid-term-ratio-statistic.component';
import { StudentReceivedDegreeStatisticComponent } from "./student-received-degree-statistic/student-received-degree-statistic.component";
import { CourseRankComponent } from './course-rank/course-rank.component';
import { MostPopularCourseComponent } from './most-popular-course/most-popular-course.component';
import { StatisticRouteStudentsComponent } from './statistic-route-students/statistic-route-students.component';
import { StatisticRouteTrainingsComponent } from './statistic-route-trainings/statistic-route-trainings.component';
import { TopPerformingStudentsComponent } from './top-performing-students/top-performing-students.component';
import {GradesPerTrainingComponent} from "./grades-per-training/grades-per-training.component";
import {AdminGuard} from "./AdminGuard";
import {StatisticRouteCoursesComponent} from "./statistic-route-courses/statistic-route-courses.component";
import {StatisticRouteTeachersComponent} from "./statistic-route-teachers/statistic-route-teachers.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { backgroundClass: 'background-home' } },
  { path: 'Student-statistics', component: StatisticRouteStudentsComponent,  canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'background-student-statistics' } },
  { path: 'Training-statistics', component: StatisticRouteTrainingsComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'background-trainings' } },
  { path: 'Course-statistics', component: StatisticRouteCoursesComponent,  canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'background-students' } },
  { path: 'Teacher-statistics', component: StatisticRouteTeachersComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'background-semesters' } },
  { path: 'courses', component: CourseListComponent, canActivate: [ApiService], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-courses', component: StudentCoursesListComponent, canActivate: [ApiService], data: { backgroundClass: 'backgroundColor' } },
  { path: 'Rank-courses', component: CourseRankComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'trainings', component: TrainingListComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'students', component: StudentListComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'students/:trainingId', component: StudentListComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'semesters/:studentId', component: SemesterListComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'studentStatistic/genderStatistic', component: StudentStatisticComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-courses/:semesterId', component: StudentCoursesListComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'courseStatistic/courseCompletion', component: CourseCompletionStatisticComponent, canActivate: [ApiService, AdminGuard] },
  { path: 'courses-teacher-stat', component: CoursesTeacherStatisticComponent , canActivate: [ApiService, AdminGuard] },
  { path: 'avg-cred-org', component: AverageCreditOrganizationComponent, canActivate: [ApiService, AdminGuard] },
  { path: 'exam-midterm', component: ExamMidTermRatioStatisticComponent, canActivate: [ApiService, AdminGuard] },

  { path: 'studentStatistic/nationalityStatistic', component: StudentNationalityStatisticComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'TrainingStatistics/Students_x_year', component: TrainingStatisticsComponent, canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'course-edit', component: CourseEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'course-edit/:courseId', component: CourseEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'training-edit', component: TrainingEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'training-edit/:trainingId', component: TrainingEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-edit', component: StudentEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-edit/:trainingId', component: StudentEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-edit/:trainingId/:studentId', component: StudentEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'semester-edit/:studentId', component: SemesterEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'semester-edit/:studentId/:semesterId', component: SemesterEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-courses-edit/:semesterId', component: StudentCoursesEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-courses-edit/:semesterId/:studentCourseId', component: StudentCoursesEditComponent , canActivate: [ApiService, AdminGuard], data: { backgroundClass: 'backgroundColor' } },
  { path: 'student-degree', component: StudentReceivedDegreeStatisticComponent , canActivate: [ApiService, AdminGuard] },
  { path: 'ranks-teachers', component: RanksOfTeachersComponent , canActivate: [ApiService, AdminGuard] },
  { path: 'most-popular-course', component: MostPopularCourseComponent, canActivate: [ApiService, AdminGuard] },
  { path: 'top-performing-students', component: TopPerformingStudentsComponent, canActivate: [ApiService, AdminGuard] },
  { path: 'grades-per-training', component: GradesPerTrainingComponent, canActivate: [ApiService, AdminGuard] },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'error', component: ErrorComponent, data: { backgroundClass: 'background-err or' } },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
