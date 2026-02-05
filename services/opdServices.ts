import { doctors } from "../data/store";
import { Token } from "../models/token";
import { TokenEngine } from "../engine/tokenEngine";

export class OPDService {

  static bookToken(
    doctorId: string,
    slotTime: string,
    token: Token
  ) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) throw new Error("Doctor not found");

    const slotIndex = doctor.slots.findIndex(s => s.time === slotTime);
    if (slotIndex === -1) throw new Error("Invalid slot");

    const slot = doctor.slots[slotIndex];
    const nextSlots = doctor.slots.slice(slotIndex + 1);

    TokenEngine.allocate(slot, token, nextSlots);
  }

  static cancelToken(doctorId: string, slotTime: string, tokenId: string) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) throw new Error("Doctor not found");

    const slot = doctor.slots.find(s => s.time === slotTime);
    if (!slot) throw new Error("Invalid slot");

    TokenEngine.cancel(slot, tokenId);
  }

  static markNoShow(doctorId: string, slotTime: string, tokenId: string) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) throw new Error("Doctor not found");

    const slot = doctor.slots.find(s => s.time === slotTime);
    if (!slot) throw new Error("Invalid slot");

    TokenEngine.markNoShow(slot, tokenId);
  }

  static getDoctors() {
    return doctors;
  }
}
