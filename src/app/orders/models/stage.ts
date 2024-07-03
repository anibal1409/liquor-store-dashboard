export enum StageOrder {
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Paid = 'Paid',
  Printed = 'Printed',
  Completed = 'Completed',
  All = 'All',
}


export const STAGE_SALE = [
  {
    name: 'Pendiente',
    value: StageOrder.Pending,
  },
  {
    name: 'Cancelado',
    value: StageOrder.Cancelled,
  },
  {
    name: 'Pagado',
    value: StageOrder.Paid,
  },
  {
    name: 'Impreso',
    value: StageOrder.Printed,
    disabled: true,
  },
  {
    name: 'Completado',
    value: StageOrder.Completed,
  },
];

export const STAGE_STUDY_VALUE: { [key: string]: { name: string; value: StageOrder} } = {
  [StageOrder.Pending]: STAGE_SALE[0],
  [StageOrder.Cancelled]: STAGE_SALE[1],
  [StageOrder.Paid]: STAGE_SALE[2],
  [StageOrder.Printed]: STAGE_SALE[3],
  [StageOrder.Completed]: STAGE_SALE[4],
};

export const STAGES_ACTIVES = [StageOrder.Pending];