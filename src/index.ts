export enum CONSOLE_COLORS {
  RESET = "\x1b[0m",

  // Foreground standard colors
  FG_BLACK = "\x1b[38;5;0m",
  FG_RED = "\x1b[38;5;1m",
  FG_GREEN = "\x1b[38;5;2m",
  FG_YELLOW = "\x1b[38;5;3m",
  FG_BLUE = "\x1b[38;5;4m",
  FG_MAGENTA = "\x1b[38;5;5m",
  FG_CYAN = "\x1b[38;5;6m",
  FG_WHITE = "\x1b[38;5;7m",

  // Foreground high intensity colors
  FG_HI_BLACK = "\x1b[38;5;8m",
  FG_HI_RED = "\x1b[38;5;9m",
  FG_HI_GREEN = "\x1b[38;5;10m",
  FG_HI_YELLOW = "\x1b[38;5;11m",
  FG_HI_BLUE = "\x1b[38;5;12m",
  FG_HI_MAGENTA = "\x1b[38;5;13m",
  FG_HI_CYAN = "\x1b[38;5;14m",
  FG_HI_WHITE = "\x1b[38;5;15m",

  // Background standard colors
  BG_BLACK = "\x1b[48;5;0m",
  BG_RED = "\x1b[48;5;1m",
  BG_GREEN = "\x1b[48;5;2m",
  BG_YELLOW = "\x1b[48;5;3m",
  BG_BLUE = "\x1b[48;5;4m",
  BG_MAGENTA = "\x1b[48;5;5m",
  BG_CYAN = "\x1b[48;5;6m",
  BG_WHITE = "\x1b[48;5;7m",

  // Background high intensity colors
  BG_HI_BLACK = "\x1b[48;5;8m",
  BG_HI_RED = "\x1b[48;5;9m",
  BG_HI_GREEN = "\x1b[48;5;10m",
  BG_HI_YELLOW = "\x1b[48;5;11m",
  BG_HI_BLUE = "\x1b[48;5;12m",
  BG_HI_MAGENTA = "\x1b[48;5;13m",
  BG_HI_CYAN = "\x1b[48;5;14m",
  BG_HI_WHITE = "\x1b[48;5;15m",
};

export class MyLogger {
  public enable: boolean;
  public name: string;
  public useColors: boolean;
  public useHighIntensityColors: boolean;
  public useNameInPrefix: boolean;
  public useTimestampInPrefix: boolean;

  public colors: LoggerColors;

  constructor(options: LoggerConfig) {
    this.enable = options.enable ?? true;
    this.name = options.name ?? "MyLogger";
    this.useColors = options.useColors ?? true;
    this.useHighIntensityColors = options.useHighIntensityColors ?? false;
    this.useNameInPrefix = options.useNameInPrefix ?? true;
    this.useTimestampInPrefix = options.useTimestampInPrefix ?? true;

    this.colors = this.useHighIntensityColors ?
      {
        debug: CONSOLE_COLORS.FG_HI_CYAN,
        error: CONSOLE_COLORS.FG_HI_RED,
        info: CONSOLE_COLORS.FG_HI_BLUE,
        ok: CONSOLE_COLORS.FG_HI_GREEN,
        warn: CONSOLE_COLORS.FG_HI_YELLOW,
        timestamp: CONSOLE_COLORS.FG_HI_WHITE,
      } :
      {
        debug: CONSOLE_COLORS.FG_CYAN,
        error: CONSOLE_COLORS.FG_RED,
        info: CONSOLE_COLORS.FG_BLUE,
        ok: CONSOLE_COLORS.FG_GREEN,
        warn: CONSOLE_COLORS.FG_YELLOW,
        timestamp: CONSOLE_COLORS.FG_WHITE,
      };
  }

  private getBasePrefix() {
    let prefix = "";
    if (this.useTimestampInPrefix) {
      prefix += `[${new Date().toISOString()}]`;
      if (this.useColors) {
        prefix = `${this.colors.timestamp}${prefix}${CONSOLE_COLORS.RESET}`;
      }
    }
    if (this.useNameInPrefix) {
      prefix += `[${this.name}]`;
      if (this.useColors) {
        prefix = `${this.colors.info}${prefix}${CONSOLE_COLORS.RESET}`;
      }
    }

    return prefix;
  }

  private getPrefixesString(prefixes: string[]) {
    let prefix = "";
    for (const p of prefixes) {
      prefix += `[${p}]`;
    }
    return prefix;
  }

  info(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const basePrefix = this.getBasePrefix();
      let prefix = "[INFO]"
      if (prefixes.length > 0) {
        prefix += this.getPrefixesString(prefixes);
        if (this.useColors) {
          prefix = `${this.colors.info}${prefix}${CONSOLE_COLORS.RESET}`;
        }
      }
      console.log(`${basePrefix}${prefix} ${message}`)
    }
  }

  debug(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const basePrefix = this.getBasePrefix();
      let prefix = "[DEBUG]"
      if (prefixes.length > 0) {
        prefix += this.getPrefixesString(prefixes);
        if (this.useColors) {
          prefix = `${this.colors.debug}${prefix}${CONSOLE_COLORS.RESET}`;
        }
      }
      console.log(`${basePrefix}${prefix} ${message}`)
    }
  }

  warn(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const basePrefix = this.getBasePrefix();
      let prefix = "[WARN]"
      if (prefixes.length > 0) {
        prefix += this.getPrefixesString(prefixes);
        if (this.useColors) {
          prefix = `${this.colors.warn}${prefix}${CONSOLE_COLORS.RESET}`;
        }
      }
      console.log(`${basePrefix}${prefix} ${message}`)
    }
  }

  error(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const basePrefix = this.getBasePrefix();
      let prefix = "[ERROR]"
      if (prefixes.length > 0) {
        prefix += this.getPrefixesString(prefixes);
        if (this.useColors) {
          prefix = `${this.colors.error}${prefix}${CONSOLE_COLORS.RESET}`;
        }
      }
      console.log(`${basePrefix}${prefix} ${message}`)
    }
  }

  ok(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const basePrefix = this.getBasePrefix();
      let prefix = "[OK]"
      if (prefixes.length > 0) {
        prefix += this.getPrefixesString(prefixes);
        if (this.useColors) {
          prefix = `${this.colors.ok}${prefix}${CONSOLE_COLORS.RESET}`;
        }
      }
      console.log(`${basePrefix}${prefix} ${message}`)
    }
  }
}

export default MyLogger

export interface LoggerConfig {
  /**
   * Boolean to enable/disable logger. Defaults to true.
   */
  enable?: boolean
  /**
   * Name of the logger. Defaults to "MyLogger".
   */
  name?: string
  /**
   * Boolean to enable/disable colors. Defaults to true.
   */
  useColors?: boolean
  /**
   * Boolean to enable/disable high intensity colors. Defaults to false.
   */
  useHighIntensityColors?: boolean
  /**
   * Boolean to enable/disable logger name in prefix. Defaults to true.
   */
  useNameInPrefix?: boolean
  /**
   * Boolean to enable/disable timestamp in prefix. Defaults to true.
   */
  useTimestampInPrefix?: boolean
}

export interface LoggerColors {
  debug: CONSOLE_COLORS;
  error: CONSOLE_COLORS;
  info: CONSOLE_COLORS;
  ok: CONSOLE_COLORS;
  warn: CONSOLE_COLORS;
  timestamp: CONSOLE_COLORS;
}
