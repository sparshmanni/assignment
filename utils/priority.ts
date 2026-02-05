export type TokenSource =
  | "EMERGENCY"
  | "PAID"
  | "FOLLOW_UP"
  | "ONLINE"
  | "WALK_IN";

export function getPriority(source: TokenSource): number {
  switch (source) {
    case "EMERGENCY": return 1;
    case "PAID": return 2;
    case "FOLLOW_UP": return 3;
    case "ONLINE": return 4;
    case "WALK_IN": return 5;
    default: return 99;
  }
}
