import { Severity } from "./severity.constant";
import { REGEX_PATTERNS } from "./regex-patterns.constant";
import { DetectionRule, RuleEvaluationResult } from "../types/rule.type";
import { extractMatchedLines } from "../utils/line.util";

function evaluatePattern(sourceCode: string, pattern: RegExp): RuleEvaluationResult {
  return {
    isMatch: pattern.test(sourceCode),
    matchedContexts: extractMatchedLines(sourceCode, pattern)
  };
}

export const DETECTION_RULES: DetectionRule[] = [
  {
    id: "OS-001",
    title: "Suspicious high mask in shift guard",
    description: "Uses all-ones mask shifted by a high bit count, which often bypasses intended overflow checks.",
    severity: Severity.High,
    recommendation: "Replace mask checks with explicit threshold guard such as `n >= (1 << 192)` before `n << 64`.",
    evaluate(sourceCode: string): RuleEvaluationResult {
      return evaluatePattern(sourceCode, REGEX_PATTERNS.SUSPICIOUS_HIGH_MASK_SHIFT);
    }
  },
  {
    id: "OS-002",
    title: "Boundary check likely using wrong comparator",
    description: "Uses strict `>` near shift guards where `>=` is usually required at boundary values.",
    severity: Severity.High,
    recommendation: "For overflow boundaries, use inclusive guard (`>=`) to reject exact threshold values.",
    evaluate(sourceCode: string): RuleEvaluationResult {
      return evaluatePattern(sourceCode, REGEX_PATTERNS.WRONG_BOUNDARY_COMPARATOR);
    }
  },
  {
    id: "OS-003",
    title: "Unchecked left shift detected",
    description: "A left shift operation appears without a nearby checked guard function.",
    severity: Severity.Medium,
    recommendation: "Wrap left shifts in dedicated checked helpers that validate high bits before shifting.",
    evaluate(sourceCode: string): RuleEvaluationResult {
      const shiftMatch: RuleEvaluationResult = evaluatePattern(sourceCode, REGEX_PATTERNS.SHIFT_OPERATION);
      const hasCheckedGuard: boolean = REGEX_PATTERNS.CHECKED_GUARD_FUNCTION.test(sourceCode);
      return {
        isMatch: shiftMatch.isMatch && !hasCheckedGuard,
        matchedContexts: hasCheckedGuard ? [] : shiftMatch.matchedContexts
      };
    }
  }
];
