import { Equipment } from './equipment.model';

export interface Staff {
  id: string;
  name: string;
  office: string;
  equipments?: Array<Equipment>
}
