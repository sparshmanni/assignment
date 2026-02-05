import { Slot } from "./slot";

export interface Doctor {
  id: string;
  name: string;
  slots: Slot[];
}
