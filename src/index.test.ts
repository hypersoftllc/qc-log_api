
import * as printf from 'printf';

import { Log } from './index';

describe('qc-log_api', () => {

  describe('`Log`', () => {

    it('should be a function', () => {
      expect(typeof Log).toBe('function');
    });

    describe('`.Factory`', () => {

      it('should be an object', () => {
        expect(typeof Log.Factory).toBe('object');
      });

      describe('`.get`', () => {

        it('should be a function', () => {
          expect(typeof Log.Factory.get).toBe('function');
        });

        it('called with `undefined` should help code coverage', () => {
          Log.Factory.get();
        });

        it('called with `""` should return a Log instance', () => {
          let log: Log;

          log = Log.Factory.get("");
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('');
        });

        it('called with most legal JavaScript identifiers should return a Log instance', () => {
          let log: Log;

          log = Log.Factory.get('$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$');

          log = Log.Factory.get('$foo');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$foo');

          log = Log.Factory.get('$foo$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$foo$');

          log = Log.Factory.get('i18n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('i18n');

          log = Log.Factory.get('i$1');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('i$1');

          log = Log.Factory.get('$l10n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$l10n');

          log = Log.Factory.get('$.$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.$');

          log = Log.Factory.get('$.$foo');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.$foo');

          log = Log.Factory.get('$.$foo$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.$foo$');

          log = Log.Factory.get('$.i18n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.i18n');

          log = Log.Factory.get('$.i$1');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.i$1');

          log = Log.Factory.get('$.$l10n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('$.$l10n');

          log = Log.Factory.get('_.$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.$');

          log = Log.Factory.get('_.$foo');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.$foo');

          log = Log.Factory.get('_.$foo$');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.$foo$');

          log = Log.Factory.get('_.i18n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.i18n');

          log = Log.Factory.get('_.i$1');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.i$1');

          log = Log.Factory.get('_.$l10n');
          expect(log).toBeInstanceOf(Log);
          expect(log.name).toBe('_.$l10n');
        });

        it('called with non-string should throw a `TypeError`', () => {
          expect(() => {
            Log.Factory.get(null);
          }).toThrow(TypeError);
        });

        it('called with `"."` should throw a `TypeError`', () => {
          expect(() => {
            Log.Factory.get(".");
          }).toThrow(TypeError);
        });

        it('called with `".foo"` should throw a `TypeError`', () => {
          expect(() => {
            Log.Factory.get(".foo");
          }).toThrow(TypeError);
        });

        it('called with `"foo."` should throw a `TypeError`', () => {
          expect(() => {
            Log.Factory.get("foo.");
          }).toThrow(TypeError);
        });

        it('called with log name beginning with a number should throw a `TypeError`', () => {
          expect(() => {
            Log.Factory.get("0");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("1");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("9");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("42");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("4alpha");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("valid.0");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("valid.1");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("valid.9");
          }).toThrow(TypeError);
          expect(() => {
            Log.Factory.get("valid.42");
          }).toThrow(TypeError);
        });

      });

    });

    describe('`.Level`', () => {

      it('should be an object', () => {
        expect(typeof Log.Level).toBe('object');
      });

      describe('`.TRACE`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.TRACE).toBe('number');
        });

      });

      describe('`.DEBUG`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.DEBUG).toBe('number');
        });

      });

      describe('`.INFO`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.INFO).toBe('number');
        });

      });

      describe('`.WARN`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.WARN).toBe('number');
        });

      });

      describe('`.ERROR`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.ERROR).toBe('number');
        });

      });

      describe('`.FATAL`', () => {

        it('should be a number', () => {
          expect(typeof Log.Level.FATAL).toBe('number');
        });

      });

    });

    describe('`.ROOT`', () => {

      it('should be an instance of `Log` with empty string for its name', () => {
        expect(Log.ROOT).toBeInstanceOf(Log);
        expect(Log.ROOT.name).toBe('');
      });

    });

    describe('`instances`', () => {
      let global_console;

      beforeEach(function () {
        global_console = console;
        console = {
          error: jest.fn(function (...rest) {
            // global_console.log('mock error');
            // global_console.error.apply(global_console, [...rest]);
          }),
          info: jest.fn(function (...rest) {
            // global_console.log('mock info');
            // global_console.info.apply(global_console, [...rest]);
          }),
          log: jest.fn(function (...rest) {
            // global_console.log('mock trace');
            // global_console.log.apply(global_console, [...rest]);
          }),
          trace: jest.fn(function (...rest) {
            // global_console.log('mock trace');
            // global_console.trace.apply(global_console, [...rest]);
          }),
          warn: jest.fn(function (...rest) {
            // global_console.log('mock warn');
            // global_console.warn.apply(global_console, [...rest]);
          }),
        };
      });

      afterEach(function () {
        console = global_console;
      });

      it('should have a `trace` function', () => {
        expect(typeof Log.ROOT.trace).toBe('function');

        Log.ROOT.trace('testing %s', 'Log#trace');
        expect(console.trace).toHaveBeenCalledTimes(1);
        expect(console.trace).toHaveBeenLastCalledWith('testing %s', 'Log#trace');

        Log.ROOT.trace(printf, 'testing %s with %s', 'Log#trace', 'printf');
        expect(console.trace).toHaveBeenCalledTimes(2);
        expect(console.trace).toHaveBeenLastCalledWith('testing Log#trace with printf');
      });

      it('should have a `debug` function', () => {
        expect(typeof Log.ROOT.debug).toBe('function');

        Log.ROOT.debug('testing %s', 'Log#debug');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenLastCalledWith('testing %s', 'Log#debug');

        Log.ROOT.debug(printf, 'testing %s with %s', 'Log#debug', 'printf');
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenLastCalledWith('testing Log#debug with printf');
      });

      it('should have a `error` function', () => {
        expect(typeof Log.ROOT.error).toBe('function');

        Log.ROOT.error('testing %s', 'Log#error');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenLastCalledWith('testing %s', 'Log#error');

        Log.ROOT.error(printf, 'testing %s with %s', 'Log#error', 'printf');
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenLastCalledWith('testing Log#error with printf');
      });

      it('should have a `fatal` function', () => {
        expect(typeof Log.ROOT.fatal).toBe('function');

        Log.ROOT.fatal('testing %s', 'Log#fatal');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenLastCalledWith('testing %s', 'Log#fatal');

        Log.ROOT.fatal(printf, 'testing %s with %s', 'Log#fatal', 'printf');
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenLastCalledWith('testing Log#fatal with printf');
      });

      it('should have a `info` function', () => {
        expect(typeof Log.ROOT.info).toBe('function');

        Log.ROOT.info('testing %s', 'Log#info');
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenLastCalledWith('testing %s', 'Log#info');

        Log.ROOT.info(printf, 'testing %s with %s', 'Log#info', 'printf');
        expect(console.info).toHaveBeenCalledTimes(2);
        expect(console.info).toHaveBeenLastCalledWith('testing Log#info with printf');
      });

      it('should have a `warn` function', () => {
        expect(typeof Log.ROOT.warn).toBe('function');

        Log.ROOT.warn('testing %s', 'Log#warn');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith('testing %s', 'Log#warn');

        Log.ROOT.warn(printf, 'testing %s with %s', 'Log#warn', 'printf');
        expect(console.warn).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenLastCalledWith('testing Log#warn with printf');
      });

      it('should have a `logAt` function', () => {
        expect(typeof Log.ROOT.logAt).toBe('function');

        Log.ROOT.logAt(Log.Level.TRACE, 'testing %s at %s', 'Log#logAt', 'Log.Level.TRACE');
        expect(console.trace).toHaveBeenCalledTimes(1);
        expect(console.trace).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.TRACE');

        Log.ROOT.logAt(Log.Level.TRACE, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.TRACE', 'printf');
        expect(console.trace).toHaveBeenCalledTimes(2);
        expect(console.trace).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.TRACE with printf');

        Log.ROOT.logAt(Log.Level.DEBUG, 'testing %s at %s', 'Log#logAt', 'Log.Level.DEBUG');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.DEBUG');

        Log.ROOT.logAt(Log.Level.DEBUG, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.DEBUG', 'printf');
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.DEBUG with printf');

        Log.ROOT.logAt(Log.Level.INFO, 'testing %s at %s', 'Log#logAt', 'Log.Level.INFO');
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.INFO');

        Log.ROOT.logAt(Log.Level.INFO, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.INFO', 'printf');
        expect(console.info).toHaveBeenCalledTimes(2);
        expect(console.info).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.INFO with printf');

        Log.ROOT.logAt(Log.Level.WARN, 'testing %s at %s', 'Log#logAt', 'Log.Level.WARN');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.WARN');

        Log.ROOT.logAt(Log.Level.WARN, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.WARN', 'printf');
        expect(console.warn).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.WARN with printf');

        Log.ROOT.logAt(Log.Level.ERROR, 'testing %s at %s', 'Log#logAt', 'Log.Level.ERROR');
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.ERROR');

        Log.ROOT.logAt(Log.Level.ERROR, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.ERROR', 'printf');
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.ERROR with printf');

        Log.ROOT.logAt(Log.Level.FATAL, 'testing %s at %s', 'Log#logAt', 'Log.Level.FATAL');
        expect(console.error).toHaveBeenCalledTimes(3);
        expect(console.error).toHaveBeenLastCalledWith('testing %s at %s', 'Log#logAt', 'Log.Level.FATAL');

        Log.ROOT.logAt(Log.Level.FATAL, printf, 'testing %s at %s with %s', 'Log#logAt', 'Log.Level.FATAL', 'printf');
        expect(console.error).toHaveBeenCalledTimes(4);
        expect(console.error).toHaveBeenLastCalledWith('testing Log#logAt at Log.Level.FATAL with printf');
      });

    });

  });

});
