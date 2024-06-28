import { PatientItemVM } from '../../customers/models';
import { ExamVM } from '../../products';

export interface StudyVM {
  id?: number;
  stage: string;
  date: string;
  note?: string;
  sendEmail: boolean;
  total: number;
  patientId: number;
  studyExams: Array<StudyExam>;
  status: boolean;
  patient?: PatientItemVM;
}

export interface StudyExam {
  id: number;
  examId: number;
  value?: string;
  exam?: ExamVM;
}

