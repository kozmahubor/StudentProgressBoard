import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StudentCourse} from "../_models/student-course";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {Course} from "../_models/course";

@Component({
  selector: 'app-courses-teacher-statistic',
  templateUrl: './courses-teacher-statistic.component.html',
  styleUrls: ['./courses-teacher-statistic.component.scss']
})
export class CoursesTeacherStatisticComponent {
  myControl = new FormControl();
  options: Course[] = [];
  filteredOptions: Observable<Course[]>;
  nonNullTeachers: Course[];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'code', 'credit']; // These items are shown on the table

  constructor(private http: HttpClient) {
    this.http.get<Course[]>("https://localhost:5057/api/Course").subscribe(resp => {
      this.options = resp;
      this.nonNullTeachers = this.options.filter(x => x.responsibleTeacher !== null);

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this.nonNullTeachers.filter(option => option.responsibleTeacher.toLowerCase()))
      );
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)));
    });
  }

  private _filter(value: string): Course[] {
    const filterValue = value.toLowerCase();
    //const slicedOptions = this.options.slice(0, 3); // Only the first 3 item
    return this.nonNullTeachers.filter(option => option.responsibleTeacher.toLowerCase().includes(filterValue));
  }
}
