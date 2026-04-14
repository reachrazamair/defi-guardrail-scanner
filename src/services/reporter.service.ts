import { Severity } from "../constants/severity.constant";
import { Finding } from "../types/finding.type";
import { ScanResult } from "../types/scan-result.type";

export class ReporterService {
  private static readonly DIVIDER: string = "============================================================";

  public print(result: ScanResult): void {
    const highSeverityCount: number = result.findings.filter(
      (finding: Finding): boolean => finding.severity === Severity.High
    ).length;
    const mediumSeverityCount: number = result.findings.filter(
      (finding: Finding): boolean => finding.severity === Severity.Medium
    ).length;

    console.log(`\n${ReporterService.DIVIDER}`);
    console.log("OverflowSentinel Security Report");
    console.log(ReporterService.DIVIDER);
    console.log(`File       : ${result.filePath}`);
    console.log(`Total      : ${result.findings.length}`);
    console.log(`High       : ${highSeverityCount}`);
    console.log(`Medium     : ${mediumSeverityCount}`);
    console.log(ReporterService.DIVIDER);

    if (result.findings.length === 0) {
      console.log("Result     : PASS");
      console.log("Message    : No risky overflow boundary patterns detected.");
      console.log(`${ReporterService.DIVIDER}\n`);
      return;
    }

    const sortedFindings: Finding[] = [...result.findings].sort((a: Finding, b: Finding): number => {
      if (a.severity !== b.severity) {
        return a.severity === Severity.High ? -1 : 1;
      }
      return a.lineNumber - b.lineNumber;
    });

    let currentSeverity: Severity | null = null;
    sortedFindings.forEach((finding: Finding, index: number): void => {
      if (finding.severity !== currentSeverity) {
        currentSeverity = finding.severity;
        console.log(`\n${finding.severity} Severity Findings`);
        console.log("------------------------------------------------------------");
      }

      console.log(`#${index + 1} ${finding.ruleId} - ${finding.title}`);
      console.log(`   Line      : ${finding.lineNumber}`);
      console.log(`   Snippet   : ${finding.lineText}`);
      console.log(`   Why       : ${finding.description}`);
      console.log(`   Fix       : ${finding.recommendation}\n`);
    });

    console.log(ReporterService.DIVIDER);
    console.log(`Result     : ${highSeverityCount > 0 ? "FAIL" : "WARN"}`);
    console.log(
      `Exit Logic : ${
        highSeverityCount > 0 ? "Non-zero exit code (high severity present)." : "Zero exit code (no high severity)."
      }`
    );
    console.log(`${ReporterService.DIVIDER}\n`);
  }
}
