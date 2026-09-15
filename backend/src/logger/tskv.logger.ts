import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: unknown,
    ...optionalParams: unknown[]
  ): string {
    const parts: string[] = [
      `level=${level}`,
      `message=${this.stringify(message)}`,
    ];

    if (optionalParams.length > 0) {
      parts.push(`params=${this.stringify(optionalParams)}`);
    }

    return parts.join('\t') + '\n';
  }

  private stringify(value: unknown): string {
    if (value === null || value === undefined) return String(value);
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    process.stderr.write(
      this.formatMessage('error', message, ...optionalParams),
    );
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    process.stderr.write(
      this.formatMessage('warn', message, ...optionalParams),
    );
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(
      this.formatMessage('debug', message, ...optionalParams),
    );
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(
      this.formatMessage('verbose', message, ...optionalParams),
    );
  }
}
