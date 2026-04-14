import { Finding } from "./finding.type";

export interface ScanResult {
  readonly filePath: string;
  readonly findings: Finding[];
}
