// Note: All ids generated automatically by mongodb

import { Staff } from './staff.model';

export interface Equipment {
  _id?: any;
  serial: string;
  type: EquipmentType;
  name: string;
  description: string;
  staff: Staff;
}

export enum EquipmentType {
  Laptop,
  CPU,
  Monitor,
  Printer,
  Keyboard,
  Mouse,
  Speaker,
  Webcam,
  Projector
}
