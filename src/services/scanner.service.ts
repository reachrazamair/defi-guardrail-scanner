import * as fs from "fs";
import * as path from "path";
import { DETECTION_RULES } from "../constants/detection-rules.constant";
import { Finding } from "../types/finding.type";
import { RuleMatchContext } from "../types/rule.type";
import { ScanResult } from "../types/scan-result.type";

export class ScannerService {
  public scanFile(filePath: string): ScanResult {
    const absolutePath: string = path.resolve(filePath);
    const sourceCode: string = fs.readFileSync(absolutePath, "utf-8");
    const findings: Finding[] = [];

    DETECTION_RULES.forEach((rule): void => {
      const evaluation = rule.evaluate(sourceCode);

      if (!evaluation.isMatch) {
        return;
      }

      evaluation.matchedContexts.forEach((context: RuleMatchContext): void => {
        findings.push({
          ruleId: rule.id,
          title: rule.title,
          description: rule.description,
          severity: rule.severity,
          recommendation: rule.recommendation,
          filePath: absolutePath,
          lineNumber: context.lineNumber,
          lineText: context.lineText
        });
      });
    });

    return {
      filePath: absolutePath,
      findings
    };
  }
}
