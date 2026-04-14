import { Severity } from "../constants/severity.constant";

export interface Finding {
  readonly ruleId: string;
  readonly title: string;
  readonly description: string;
  readonly severity: Severity;
  readonly recommendation: string;
  readonly filePath: string;
  readonly lineNumber: number;
  readonly lineText: string;
}
