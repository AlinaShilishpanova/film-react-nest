import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as valid JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('test message');

    expect(spy).toHaveBeenCalledTimes(1);
    const output = spy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);

    expect(parsed).toEqual({
      level: 'log',
      message: 'test message',
      optionalParams: [],
    });
  });

  it('should format error message as valid JSON', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('something went wrong', 'stack trace');

    const output = spy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe('something went wrong');
    expect(parsed.optionalParams).toEqual(['stack trace']);
  });

  it('should format warn message as valid JSON', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    logger.warn('warning message');

    const output = spy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe('warning message');
  });

  it('should format debug message as valid JSON', () => {
    const spy = jest
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);

    logger.debug('debug message', { foo: 'bar' });

    const output = spy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('debug');
    expect(parsed.message).toBe('debug message');
    expect(parsed.optionalParams).toEqual([{ foo: 'bar' }]);
  });

  it('should format verbose message as valid JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.verbose('verbose message');

    const output = spy.mock.calls[0][0] as string;
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('verbose');
    expect(parsed.message).toBe('verbose message');
  });
});
