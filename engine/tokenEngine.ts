import { Slot } from "../models/slot";
import { Token } from "../models/token";

export class TokenEngine {

  // allocate token
  static allocate(slot: Slot, token: Token, nextSlots: Slot[]) {

    // if space available
    if (slot.tokens.length < slot.capacity) {
      slot.tokens.push(token);
      return;
    }

    // find lowest priority
    const lowest = [...slot.tokens].sort(
      (a, b) => b.priority - a.priority
    )[0];

    // priority → replace
    if (token.priority < lowest.priority) {
      slot.tokens = slot.tokens.filter(t => t.id !== lowest.id);
      slot.tokens.push(token);
      this.reallocate(lowest, nextSlots);
      return;
    }

    throw new Error("Slot full and priority too low");
  }

  // reallocate to next slot
  static reallocate(token: Token, slots: Slot[]) {
    for (const slot of slots) {
      if (slot.tokens.length < slot.capacity) {
        slot.tokens.push(token);
        return;
      }
    }

    // no slot so cancel
    token.status = "CANCELLED";
  }

  // cancel token
  static cancel(slot: Slot, tokenId: string) {
    const token = slot.tokens.find(t => t.id === tokenId);
    if (!token) throw new Error("Token not found");

    token.status = "CANCELLED";
    slot.tokens = slot.tokens.filter(t => t.id !== tokenId);
  }

  // mark no-show
  static markNoShow(slot: Slot, tokenId: string) {
    const token = slot.tokens.find(t => t.id === tokenId);
    if (!token) throw new Error("Token not found");

    token.status = "NO_SHOW";
    slot.tokens = slot.tokens.filter(t => t.id !== tokenId);
  }
}
