import { Doctor } from "../models/doctor";

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr A",
    slots: [
      { time: "09:00-10:00", capacity: 2, tokens: [] },
      { time: "10:00-11:00", capacity: 2, tokens: [] }
    ]
  },
  {
    id: "d2",
    name: "Dr B",
    slots: [
      { time: "09:00-10:00", capacity: 2, tokens: [] }
    ]
  },
  {
    id: "d3",
    name: "Dr C",
    slots: [
      { time: "09:00-10:00", capacity: 1, tokens: [] }
    ]
  }
];
