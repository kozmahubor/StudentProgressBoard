import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentCoursesListComponent } from './student-courses-list/student-courses-list.component';
import { SideNavBarComponent } from './core/components/side-nav-bar/side-nav-bar.component';
import { MainComponent } from './core/components/main/main.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SideNavBarModule} from "./core/components/side-nav-bar/side-nav-bar.module";
import {MainModule} from "./core/components/main/main.module";
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import {NavBarModule} from "./core/components/nav-bar/nav-bar.module";
import { SharedButtonComponent } from './shared/components/buttons/shared-button/shared-button.component';
import { SharedPageButtonComponent } from './shared/components/buttons/shared-page-button/shared-page-button.component';
import {CommonModule} from "@angular/common";

// form
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

// DESIGN
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TrainingListComponent } from './training-list/training-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { LoginComponent } from './login/login.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { SemesterEditComponent } from './semester-edit/semester-edit.component';
import { StudentCoursesEditComponent } from './student-courses-edit/student-courses-edit.component';
import { ErrorComponent } from './error/error.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { RegisterComponent } from './register/register.component';

// export function MSALInstanceFactory(): IPublicClientApplication{
//   return new PublicClientApplication({
//     auth: {
//       clientId: '40775f63-0f04-41f6-88e5-b9ca4ddaaabb',
//       authority: 'https://login.microsoftonline.com/1d6a56fa-705a-4bbc-8004-67a21d5e9b97',
//       redirectUri: 'http://localhost:4200'
//     }
//   });
// }
import { StudentNationalityStatisticComponent } from './student-statistic/student-nationality-statistic/student-nationality-statistic.component';
import { TrainingStatisticsComponent } from './training-statistics/training-statistics.component';

import {BaseStatisticsItemModule} from "./base-statistics-item/base-statistics-item.module";
import { CourseCompletionStatisticComponent } from './course-completion-statistic/course-completion-statistic.component';
import {StudentStatisticComponent} from "./student-statistic/student-statistic.component";
import { CoursesTeacherStatisticComponent } from './courses-teacher-statistic/courses-teacher-statistic.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { RanksOfTeachersComponent } from './ranks-of-teachers/ranks-of-teachers.component';
import { AverageCreditOrganizationComponent } from './average-credit-organization/average-credit-organization.component';
import { ExamMidTermRatioStatisticComponent } from './exam-mid-term-ratio-statistic/exam-mid-term-ratio-statistic.component';
import { StudentReceivedDegreeStatisticComponent } from './student-received-degree-statistic/student-received-degree-statistic.component';
import { CourseRankComponent } from './course-rank/course-rank.component';
import { MostPopularCourseComponent } from './most-popular-course/most-popular-course.component';
import { StatisticRouteStudentsComponent } from './statistic-route-students/statistic-route-students.component';
import { StatisticRouteTrainingsComponent } from './statistic-route-trainings/statistic-route-trainings.component';
import { TopPerformingStudentsComponent } from './top-performing-students/top-performing-students.component';
import { GradesPerTrainingComponent } from './grades-per-training/grades-per-training.component';
import { UnsuccessfulCourseRatiosStatisticComponent } from './unsuccessful-course-ratios-statistic/unsuccessful-course-ratios-statistic.component';
import { StatisticRouteCoursesComponent } from './statistic-route-courses/statistic-route-courses.component';
import { StatisticRouteTeachersComponent } from './statistic-route-teachers/statistic-route-teachers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    StudentCoursesListComponent,
    TrainingListComponent,
    StudentListComponent,
    SemesterListComponent,
    StudentEditComponent,
    LoginComponent,
    TrainingEditComponent,
    SemesterEditComponent,
    StudentCoursesEditComponent,
    ErrorComponent,
    CourseListComponent,
    CourseEditComponent,
    RegisterComponent,
    StudentNationalityStatisticComponent,
    TrainingStatisticsComponent,

    CourseCompletionStatisticComponent,
    CoursesTeacherStatisticComponent,
    StudentStatisticComponent,
    RanksOfTeachersComponent,
    AverageCreditOrganizationComponent,
    ExamMidTermRatioStatisticComponent,
    StudentReceivedDegreeStatisticComponent,
    CourseRankComponent,
    MostPopularCourseComponent,
    StatisticRouteStudentsComponent,
    StatisticRouteTrainingsComponent,
    TopPerformingStudentsComponent,
    GradesPerTrainingComponent,
    UnsuccessfulCourseRatiosStatisticComponent,
    StatisticRouteCoursesComponent,
    StatisticRouteTeachersComponent,
  ],
  imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      MatIconModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatListModule,
      MatDialogModule,
      MatTableModule,
      MatSelectModule,
      BrowserAnimationsModule,
      SideNavBarModule,
      MainModule,
      NavBarModule,
      MatSnackBarModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatSlideToggleModule,
      MatCheckboxModule,
      MatDatepickerModule,
      BaseStatisticsItemModule,
      MatAutocompleteModule
  ],

  providers: [
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory
    // },
    // MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
