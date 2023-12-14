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

  constructor(options: LoggerConfig = {}) {
    this.enable = options.enable ?? true;
    this.name = options.name ?? "MyLogger";
    this.useColors = options.useColors ?? true;
    this.useHighIntensityColors = options.useHighIntensityColors ?? true;
    this.useNameInPrefix = options.useNameInPrefix ?? true;
    this.useTimestampInPrefix = options.useTimestampInPrefix ?? true;

    const defaultHiColors: LoggerColors = {
      debug: CONSOLE_COLORS.FG_HI_CYAN,
      error: CONSOLE_COLORS.FG_HI_RED,
      info: CONSOLE_COLORS.FG_HI_BLUE,
      ok: CONSOLE_COLORS.FG_HI_GREEN,
      warn: CONSOLE_COLORS.FG_HI_YELLOW,
      timestamp: CONSOLE_COLORS.FG_HI_MAGENTA,
      name: CONSOLE_COLORS.FG_HI_WHITE
    };

    const defaultColors: LoggerColors = {
      debug: CONSOLE_COLORS.FG_CYAN,
      error: CONSOLE_COLORS.FG_RED,
      info: CONSOLE_COLORS.FG_BLUE,
      ok: CONSOLE_COLORS.FG_GREEN,
      warn: CONSOLE_COLORS.FG_YELLOW,
      timestamp: CONSOLE_COLORS.FG_MAGENTA,
      name: CONSOLE_COLORS.FG_WHITE
    };

    const userDefinedColors = options.colors ?? {};

    this.colors = this.useHighIntensityColors ? defaultHiColors : defaultColors;
    this.colors = {
      ...this.colors,
      ...userDefinedColors
    };

  }

  private getBasePrefix() {
    let prefix = "";
    if (this.useTimestampInPrefix) {
      const timestampString = `[${new Date().toISOString()}]`;
      if (this.useColors)
        prefix += `${this.colors.timestamp}${timestampString}${CONSOLE_COLORS.RESET}`;
      else
        prefix += timestampString;
    }
    if (this.useNameInPrefix) {
      const nameString = `[${this.name}]`;
      if (this.useColors)
        prefix += `${this.colors.name}${nameString}${CONSOLE_COLORS.RESET}`;
      else
        prefix += nameString;
    }

    return prefix;
  }

  private getPrefixesString(method: keyof Omit<LoggerColors, 'name' | 'timestamp'>, prefixes: string[]) {
    let prefix = "";
    prefixes.unshift(method.toUpperCase());
    for (const p of prefixes) {
      prefix += `[${p}]`;
    }
    if (this.useColors)
      prefix = `${this.colors[method]}${prefix}${CONSOLE_COLORS.RESET}`;

    return prefix;
  }

  info(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const p = this.getBasePrefix() + this.getPrefixesString('info', prefixes);
      console.log(`${p} ${message}`);
    }
  }

  debug(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const p = this.getBasePrefix() + this.getPrefixesString('debug', prefixes);
      console.log(`${p} ${message}`);
    }
  }

  warn(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const p = this.getBasePrefix() + this.getPrefixesString('warn', prefixes);
      console.log(`${p} ${message}`);
    }
  }

  error(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const p = this.getBasePrefix() + this.getPrefixesString('error', prefixes);
      console.log(`${p} ${message}`);
    }
  }

  ok(message: string, ...prefixes: string[]) {
    if (this.enable) {
      const p = this.getBasePrefix() + this.getPrefixesString('ok', prefixes);
      console.log(`${p} ${message}`);
    }
  }
}

export default MyLogger

export interface LoggerConfig {
  /**
   * Partial object to override default colors.
   */
  colors?: Partial<LoggerColors>
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
  debug       : CONSOLE_COLORS;
  error       : CONSOLE_COLORS;
  info        : CONSOLE_COLORS;
  ok          : CONSOLE_COLORS;
  warn        : CONSOLE_COLORS;
  timestamp   : CONSOLE_COLORS;
  name        : CONSOLE_COLORS;
}
