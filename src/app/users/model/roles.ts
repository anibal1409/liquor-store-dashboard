
export enum UserRole {
  Super = 'super',
  SalesAdvisor = 'sales-advisor',
  Manager = 'manager',
}

export const USER_ROLES = [
  {
    name: 'Super usuario',
    value: UserRole.Super,
  },
  {
    name: 'Gerente',
    value: UserRole.Manager,
  },
  {
    name: 'Asesor de ventas',
    value: UserRole.SalesAdvisor,
  },
];

export const USER_ROLES_VALUE: { [key: string]: { name: string; value: UserRole} } = {
  [UserRole.Super]: USER_ROLES[0],
  [UserRole.Manager]: USER_ROLES[1],
  [UserRole.SalesAdvisor]: USER_ROLES[2],
};
