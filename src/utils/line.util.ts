import { RuleMatchContext } from "../types/rule.type";

export function extractMatchedLines(sourceCode: string, pattern: RegExp): RuleMatchContext[] {
  const lines: string[] = sourceCode.split(/\r?\n/);
  const matches: RuleMatchContext[] = [];

  lines.forEach((line: string, index: number): void => {
    if (pattern.test(line)) {
      matches.push({
        lineNumber: index + 1,
        lineText: line.trim()
      });
    }
  });

  return matches;
}
