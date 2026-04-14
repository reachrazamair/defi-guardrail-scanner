import { Severity } from "../constants/severity.constant";

export interface RuleMatchContext {
  readonly lineNumber: number;
  readonly lineText: string;
}

export interface RuleEvaluationResult {
  readonly isMatch: boolean;
  readonly matchedContexts: RuleMatchContext[];
}

export interface DetectionRule {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly severity: Severity;
  readonly recommendation: string;
  evaluate(sourceCode: string): RuleEvaluationResult;
}
