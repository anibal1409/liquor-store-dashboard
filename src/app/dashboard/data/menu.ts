import { UserRole } from '../../users/model';
import { optionMenu } from '../models';

export const MENU: Array<optionMenu> = [
  {
    name: 'Tipos de examen',
    value: 'exam-types',
    icon: 'category',
    permissions: [UserRole.Super, UserRole.Manager, UserRole.Bionalist, UserRole.LaboratoryAssistant],
  },
  {
    name: 'Examenes',
    value: 'exams',
    icon: 'compare',
    permissions: [UserRole.Super, UserRole.Manager, UserRole.Bionalist, UserRole.Administrativessistant, UserRole.LaboratoryAssistant],
  },
  {
    name: 'Estudios',
    value: 'studies',
    icon: 'folder_shared',
    permissions: [UserRole.Super, UserRole.Manager, UserRole.Bionalist, UserRole.Administrativessistant, UserRole.LaboratoryAssistant],
  },
  {
    name: 'Pacientes',
    value: 'patients',
    icon: 'supervisor_account',
    permissions: [UserRole.Super, UserRole.Manager, UserRole.Bionalist, UserRole.Administrativessistant, UserRole.LaboratoryAssistant],
  },
  {
    name: 'Estadísticas',
    value: 'statistics',
    icon: 'bar_chart',
    permissions: [UserRole.Super, UserRole.Manager, UserRole.Bionalist],
  },
  {
    name: 'Usuarios',
    value: 'users',
    icon: 'person',
    permissions: [UserRole.Super, UserRole.Manager],
  },
]