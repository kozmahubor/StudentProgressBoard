import { CourseStatus } from "./course-status";
import { CourseType } from "./course-type";
import { FinancialStatus } from "./finantial-status";
import { RequirementType } from "./requirement-type";
import { Sex } from "./sex";
import { TrainingMode } from "./training-mode";
import { TrainingType } from "./training-type";

export const TrainingTypes: Array<any> = [
    { id: TrainingType.FullTime, name: "Full time" },
    { id: TrainingType.Evening, name: "Evening" },
    { id: TrainingType.Distance, name: "Distance" },
  ];

export function getTrainingType(type: TrainingType): string {
  switch (type) {
    case TrainingType.FullTime:
      return 'Full time';
    case TrainingType.Evening:
      return 'Evening';
    case TrainingType.Distance:
      return 'Distance';
    default:
      return '';
  }
}

export const TrainingModes: Array<any> = [
  { id: TrainingMode.BSC, name: "BSC" },
  { id: TrainingMode.MSC, name: "MSC" },
];
export function getTrainingMode(mode: TrainingMode){
  switch (mode) {
    case TrainingMode.BSC:
      return 'BSC';
    case TrainingMode.MSC:
      return 'MSC';
    default:
      return '';
  }
}

export const FinancialStatuses: Array<any> = [
  { id: FinancialStatus.SelfSupporting, name: "Self supporting" },
  { id: FinancialStatus.Scholarship, name: "Scholarship" },
];

export function getFinancialStatus(status: FinancialStatus){
  switch (status) {
    case FinancialStatus.SelfSupporting:
      return 'Self supporting';
    case FinancialStatus.Scholarship:
      return 'Scholarship';
    default:
      return '';
  }
}

export const CourseStatuses: Array<any> = [
  { id: CourseStatus.AssignmentUnsuccessful, name: "Assignment unsuccessful" },
  { id: CourseStatus.Banned, name: "Banned" },
  { id: CourseStatus.Completed, name: "Completed" },
  { id: CourseStatus.ExamUnsuccessful, name: "Exam unsuccessful" },
  { id: CourseStatus.Ongoing, name: "Ongoing" },
];

export function getCourseStatus(status: CourseStatus){
  switch (status) {
    case CourseStatus.AssignmentUnsuccessful:
      return 'Assignment unsuccessful';
    case CourseStatus.Banned:
      return 'Banned';
    case CourseStatus.Completed:
      return 'Completed';
    case CourseStatus.ExamUnsuccessful:
      return 'Exam unsuccessful';
    case CourseStatus.Ongoing:
      return 'Ongoing';
    default:
      return '';
  }
}

export const CourseTypes: Array<any> = [
  { id: CourseType.ELearning, name: "ELearning" },
  { id: CourseType.ExamCourse, name: "Exam course" },
  { id: CourseType.Labour, name: "Labour" },
  { id: CourseType.Theisis, name: "Theisis" },
  { id: CourseType.Theory, name: "Theory" },
];

export function getCourseType(type: CourseType){
  switch (type) {
    case CourseType.ELearning:
      return 'ELearning';
    case CourseType.ExamCourse:
      return 'Exam course';
    case CourseType.Labour:
      return 'Labour';
    case CourseType.Theisis:
      return 'Theisis';
    case CourseType.Theory:
      return 'Theory';
    default:
      return '';
  }
}

export const RequirementTypes: Array<any> = [
  { id: RequirementType.Exam, name: "E-Learning" },
  { id: RequirementType.MidTermMark, name: "Mid term mark" },
];

export function getRequirementType(type: RequirementType){
  switch (type) {
    case RequirementType.Exam:
      return 'Exam';
    case RequirementType.MidTermMark:
      return 'Mid term mark';
    default:
      return '';
  }
}

export const MaleOrFemale: Array<any> = [
  { id: Sex.Male, name: "Male" },
  { id: Sex.Female, name: "Female" },
];