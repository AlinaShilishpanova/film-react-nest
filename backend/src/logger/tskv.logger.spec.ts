import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;
  let stderrSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as TSKV', () => {
    logger.log('test message');

    expect(stdoutSpy).toHaveBeenCalledTimes(1);
    const output = stdoutSpy.mock.calls[0][0] as string;

    expect(output).toContain('level=log');
    expect(output).toContain('message=test message');
    expect(output).toMatch(/\n$/);
  });

  it('should include optional params in TSKV', () => {
    logger.log('test message', 'param1', 'param2');

    const output = stdoutSpy.mock.calls[0][0] as string;

    expect(output).toContain('params=');
    expect(output).toContain('param1');
    expect(output).toContain('param2');
  });

  it('should write error messages to stderr', () => {
    logger.error('something went wrong');

    expect(stderrSpy).toHaveBeenCalledTimes(1);
    expect(stdoutSpy).not.toHaveBeenCalled();

    const output = stderrSpy.mock.calls[0][0] as string;
    expect(output).toContain('level=error');
    expect(output).toContain('message=something went wrong');
  });

  it('should write warn messages to stderr', () => {
    logger.warn('warning');

    expect(stderrSpy).toHaveBeenCalledTimes(1);
    const output = stderrSpy.mock.calls[0][0] as string;
    expect(output).toContain('level=warn');
  });

  it('should serialize object params as JSON', () => {
    logger.log('msg', { key: 'value' });

    const output = stdoutSpy.mock.calls[0][0] as string;

    expect(output).toContain('params=');
    expect(output).toContain('"key":"value"');
  });

  it('should separate fields with tab characters', () => {
    logger.log('test');

    const output = stdoutSpy.mock.calls[0][0] as string;

    expect(output).toContain('\t');
  });
});
