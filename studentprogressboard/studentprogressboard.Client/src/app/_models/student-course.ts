import { CourseStatus } from "../_enums/course-status";
import { CourseType } from "../_enums/course-type";
import { RequirementType } from "../_enums/requirement-type";

export class StudentCourse{
    id: number;
    name: string;
    credits: number;
    grade: number;
    courseStatus: CourseStatus;
    courseType: CourseType;
    requirementType: RequirementType;
    semesterId: number;
    
    courseId: number;
}