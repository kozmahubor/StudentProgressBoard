import { Sex } from "../_enums/sex";

export class Student{
    id: number;
    name: string;
    neptunCode: string;
    yearOfAdministration: number;
    dateOfBirth: string | Date;
    placeOfBirth: string;
    address: string;
    nationality: string;
    mothersName: string;
    absolved: boolean = false;
    sex: Sex;
    graduated: boolean = false;
    graduationDate: string | Date;
    trainingId: number;
    role: string;
}

export class RegisterModel extends Student{
    userName: string;
    password: string;
}
