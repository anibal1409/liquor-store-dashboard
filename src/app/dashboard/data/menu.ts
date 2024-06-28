import { UserRole } from '../../users/model';
import { optionMenu } from '../models';

export const MENU: Array<optionMenu> = [
  {
    name: 'Categorías',
    value: 'categories',
    icon: 'category',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Productos',
    value: 'products',
    icon: 'dashboard',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Pedidos',
    value: 'orders',
    icon: 'list_alt',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Ventas',
    value: 'sales',
    icon: 'shopping_cart',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Clientes',
    value: 'customers',
    icon: 'supervisor_account',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Estadísticas',
    value: 'statistics',
    icon: 'bar_chart',
    permissions: [UserRole.Super, UserRole.Manager],
  },
  {
    name: 'Usuarios',
    value: 'users',
    icon: 'person',
    permissions: [UserRole.Super, UserRole.Manager],
  },
]