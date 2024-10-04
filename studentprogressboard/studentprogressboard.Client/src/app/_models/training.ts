import { TrainingMode } from "../_enums/training-mode";
import { TrainingType } from "../_enums/training-type";

export class Training{
    id: number;
    name: string;
    englishName: string;
    trainingCode: string;
    numberOfSemesters: number;
    language: string;

    trainingType: TrainingType;
    trainingMode: TrainingMode;
}