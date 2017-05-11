/**
 * let log = Log.Factory.get('log.name');
 *
 * log.trace('template', ...);
 * log.debug('template', ...);
 * log.info('template', ...);
 * log.warn('template', ...);
 * log.error('template', ...);
 * log.fatal('template', ...);
 * log.logAt(Log.Level.TRACE, 'template', ...);
 * log.logAt(Log.Level.DEBUG, 'template', ...);
 * log.logAt(Log.Level.INFO, 'template', ...);
 * log.logAt(Log.Level.WARN, 'template', ...);
 * log.logAt(Log.Level.ERROR, 'template', ...);
 * log.logAt(Log.Level.FATAL, 'template', ...);
 *
 * log = Log.ROOT;
 * log.info('template', ...);
 */


export interface LogFactory {
  get(name: string): Log
}

interface LogLut {
  [key: string]: Log
}

let Factory = {
  _: {
    lut: <LogLut>{}
  },
  get(name: string = ''): Log {
    let key: string, log: Log;

    key = name;
    log = this._.lut[key];
    if (!log) {
      log = new Log({
        name: key
      });
      this._.lut[key] = log;
    }
    return log;
  }
};

export class Log {

  static ROOT: Log = Factory.get('');
  static Factory: LogFactory = Factory;
  static Level = Object.freeze({
    TRACE: 0,
    DEBUG: 2000,
    INFO: 4000,
    WARN: 6000,
    ERROR: 8000,
    FATAL: 10000
  });

  readonly name: string;

  /**
   * @param {Object} cfg - The log configuration.
   * @param {string} cfg.name - The dot separated name of the log.
   */
  constructor(cfg: { name: string }) {
    if (typeof cfg.name != 'string') {
      throw TypeError('`name` must be a dot separated string containing only alpha characters.');
    }
    if (cfg.name !== '') {
      cfg.name.split('.').forEach((item, idx, arr) => {
        if (item.length === 0 || item.match('[^A-Za-z]')) {
          throw TypeError('`name` must be a dot separated string containing only alpha characters.');
        }
      });
    }
    this.name = cfg.name;
    Object.freeze(this);
  }

  debug(message?: string, ...optionalParams: any[]) {
    console.log.apply(console, [message, ...optionalParams]);
  }

  error(message?: string, ...optionalParams: any[]) {
    console.error.apply(console, [message, ...optionalParams])
  }

  fatal(message?: string, ...optionalParams: any[]) {
    console.error.apply(console, [message, ...optionalParams])
  };

  info(message?: string, ...optionalParams: any[]) {
    console.info.apply(console, [message, ...optionalParams])
  };

  logAt(logLevel: number, message?: string, ...optionalParams: any[]) {
    let args = [message, ...optionalParams];

    if (logLevel < Log.Level.DEBUG) {
      console.trace.apply(console, args);
    }
    else if (logLevel < Log.Level.INFO) {
      console.log.apply(console, args);
    }
    else if (logLevel < Log.Level.WARN) {
      console.info.apply(console, args);
    }
    else if (logLevel < Log.Level.ERROR) {
      console.warn.apply(console, args);
    }
    else {
      console.error.apply(console, args); // Error and fatal.
    }
  }

  trace(message?: string, ...optionalParams: any[]) {
    console.trace.apply(console, [message, ...optionalParams]);
  }

  warn(message?: string, ...optionalParams: any[]) {
    console.warn.apply(console, [message, ...optionalParams])
  }

}
