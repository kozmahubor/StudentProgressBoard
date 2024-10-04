import { CourseType } from "../_enums/course-type";
import { RequirementType } from "../_enums/requirement-type";

export class Course{
    id: number;
    name: string;
    courseCode: string;
    credits: number;
    organization: string;
    responsibleTeacher: string;
    courseType: CourseType;
    requirementType: RequirementType;
}
