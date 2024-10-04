import { Component } from '@angular/core';
import {Student} from "../_models/student";
import {HttpClient} from "@angular/common/http";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-student-received-degree-statistic',
  templateUrl: './student-received-degree-statistic.component.html',
  styleUrls: ['./student-received-degree-statistic.component.scss']
})

export class StudentReceivedDegreeStatisticComponent {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<Student[]>;
  uniqueGradDate: string[];

  displayedColumns: string[] = ['name', 'neptunCode', 'graduationDate'];

  students: Student[] = [];
  /*studentsWithDegrees: Student[] = [
    {id: 1, name: "Feri", yearOfAdministration: 2021, neptunCode: "W11RTZ", absolved: true, graduated: true, graduationDate: "2022.02.20" },
    {id: 2, name: "Janka", yearOfAdministration: 2022, neptunCode: "POI567", absolved: true, graduated: true, graduationDate: "2023.06.20" },
    {id: 3, name: "Mari", yearOfAdministration: 2020, neptunCode: "GTZU61", absolved: true, graduated: true, graduationDate: "2023.02.20" },
    {id: 4, name: "Peti", yearOfAdministration: 2019, neptunCode: "PAAS32", absolved: true, graduated: true, graduationDate: "2022.06.20" }
  ];*/

  constructor(private http: HttpClient){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Student[] {
    return this.students.filter(option => String(option.graduationDate).includes(value));
  }

  ngOnInit(){
    this.http.get<any>('https://localhost:5057/api/Student')
      .subscribe(resp =>{
        this.students = resp;
        for (let index = 0; index < this.students.length; index++) {
          if (this.students[index].graduationDate!==null) {
          this.students[index].graduationDate=this.students[index].graduationDate.toString().split("T")[0]
           
          }else{

            this.students[index].graduationDate="In progress"
        
          }
           
        }
        const combinedArray: string[] = this.students.map(item => String(item.graduationDate));
        for (let index = 0; index < combinedArray.length; index++) {
          combinedArray[index]=combinedArray[index].split("T")[0]
          
        }
        
        this.uniqueGradDate = Array.from(new Set(combinedArray));
        
      });
  }
  onSelectionChange(event: any) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(event.value))
    );
   
    this.ngOnInit()
  }
}
