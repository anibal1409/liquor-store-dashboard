export * from './auth.service';
import { AuthService } from './auth.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './exams.service';
import { ExamsService } from './exams.service';
export * from './patients.service';
import { PatientsService } from './patients.service';
export * from './statistics.service';
import { StatisticsService } from './statistics.service';
export * from './studies.service';
import { StudiesService } from './studies.service';
export * from './types-exams.service';
import { TypesExamsService } from './types-exams.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AuthService, DefaultService, ExamsService, PatientsService, StatisticsService, StudiesService, TypesExamsService, UsersService];