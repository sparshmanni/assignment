import { Token } from "./token";

export interface Slot {
  time: string;
  capacity: number;
  tokens: Token[];
}
