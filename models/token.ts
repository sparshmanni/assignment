export type TokenStatus = "ACTIVE" | "CANCELLED" | "NO_SHOW";

export interface Token {
  id: string;
  patientName: string;
  source: string;
  priority: number;
  status: TokenStatus;
}
