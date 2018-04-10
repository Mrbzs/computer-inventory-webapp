export interface Equipment {
  id?: string;
  type: EquipmentType;
  name: string;
  description: string;
  staffId?: string;
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
