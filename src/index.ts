import * as fs from "fs";
import * as path from "path";
import { Severity } from "./constants/severity.constant";
import { ReporterService } from "./services/reporter.service";
import { ScannerService } from "./services/scanner.service";

function printUsage(): void {
  console.log("Usage: node dist/index.js");
}

function assertFileReadable(inputPath: string): string {
  const resolvedPath: string = path.resolve(inputPath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File does not exist: ${resolvedPath}`);
  }
  return resolvedPath;
}

function run(): void {
  const [, , inputPath] = process.argv;

  if (!inputPath) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const filePath: string = assertFileReadable(inputPath);
  const scannerService: ScannerService = new ScannerService();
  const reporterService: ReporterService = new ReporterService();
  const result = scannerService.scanFile(filePath);
  reporterService.print(result);

  const hasHighSeverity: boolean = result.findings.some(
    (finding): boolean => finding.severity === Severity.High
  );
  process.exitCode = hasHighSeverity ? 2 : 0;
}

run();
