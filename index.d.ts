export declare enum CONSOLE_COLORS {
    RESET = "\u001B[0m",
    FG_BLACK = "\u001B[38;5;0m",
    FG_RED = "\u001B[38;5;1m",
    FG_GREEN = "\u001B[38;5;2m",
    FG_YELLOW = "\u001B[38;5;3m",
    FG_BLUE = "\u001B[38;5;4m",
    FG_MAGENTA = "\u001B[38;5;5m",
    FG_CYAN = "\u001B[38;5;6m",
    FG_WHITE = "\u001B[38;5;7m",
    FG_HI_BLACK = "\u001B[38;5;8m",
    FG_HI_RED = "\u001B[38;5;9m",
    FG_HI_GREEN = "\u001B[38;5;10m",
    FG_HI_YELLOW = "\u001B[38;5;11m",
    FG_HI_BLUE = "\u001B[38;5;12m",
    FG_HI_MAGENTA = "\u001B[38;5;13m",
    FG_HI_CYAN = "\u001B[38;5;14m",
    FG_HI_WHITE = "\u001B[38;5;15m",
    BG_BLACK = "\u001B[48;5;0m",
    BG_RED = "\u001B[48;5;1m",
    BG_GREEN = "\u001B[48;5;2m",
    BG_YELLOW = "\u001B[48;5;3m",
    BG_BLUE = "\u001B[48;5;4m",
    BG_MAGENTA = "\u001B[48;5;5m",
    BG_CYAN = "\u001B[48;5;6m",
    BG_WHITE = "\u001B[48;5;7m",
    BG_HI_BLACK = "\u001B[48;5;8m",
    BG_HI_RED = "\u001B[48;5;9m",
    BG_HI_GREEN = "\u001B[48;5;10m",
    BG_HI_YELLOW = "\u001B[48;5;11m",
    BG_HI_BLUE = "\u001B[48;5;12m",
    BG_HI_MAGENTA = "\u001B[48;5;13m",
    BG_HI_CYAN = "\u001B[48;5;14m",
    BG_HI_WHITE = "\u001B[48;5;15m"
}
export declare class MyLogger {
    enable: boolean;
    name: string;
    useColors: boolean;
    useHighIntensityColors: boolean;
    useNameInPrefix: boolean;
    useTimestampInPrefix: boolean;
    colors: LoggerColors;
    constructor(options?: LoggerConfig);
    private getBasePrefix;
    private getPrefixesString;
    info(message: string, ...prefixes: string[]): void;
    debug(message: string, ...prefixes: string[]): void;
    warn(message: string, ...prefixes: string[]): void;
    error(message: string, ...prefixes: string[]): void;
    ok(message: string, ...prefixes: string[]): void;
}
export default MyLogger;
export interface LoggerConfig {
    /**
     * Partial object to override default colors.
     */
    colors?: Partial<LoggerColors>;
    /**
     * Boolean to enable/disable logger. Defaults to true.
     */
    enable?: boolean;
    /**
     * Name of the logger. Defaults to "MyLogger".
     */
    name?: string;
    /**
     * Boolean to enable/disable colors. Defaults to true.
     */
    useColors?: boolean;
    /**
     * Boolean to enable/disable high intensity colors. Defaults to false.
     */
    useHighIntensityColors?: boolean;
    /**
     * Boolean to enable/disable logger name in prefix. Defaults to true.
     */
    useNameInPrefix?: boolean;
    /**
     * Boolean to enable/disable timestamp in prefix. Defaults to true.
     */
    useTimestampInPrefix?: boolean;
}
export interface LoggerColors {
    debug: CONSOLE_COLORS;
    error: CONSOLE_COLORS;
    info: CONSOLE_COLORS;
    ok: CONSOLE_COLORS;
    warn: CONSOLE_COLORS;
    timestamp: CONSOLE_COLORS;
    name: CONSOLE_COLORS;
}
//# sourceMappingURL=index.d.ts.map