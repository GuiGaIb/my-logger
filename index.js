export var CONSOLE_COLORS;
(function (CONSOLE_COLORS) {
    CONSOLE_COLORS["RESET"] = "\u001B[0m";
    // Foreground standard colors
    CONSOLE_COLORS["FG_BLACK"] = "\u001B[38;5;0m";
    CONSOLE_COLORS["FG_RED"] = "\u001B[38;5;1m";
    CONSOLE_COLORS["FG_GREEN"] = "\u001B[38;5;2m";
    CONSOLE_COLORS["FG_YELLOW"] = "\u001B[38;5;3m";
    CONSOLE_COLORS["FG_BLUE"] = "\u001B[38;5;4m";
    CONSOLE_COLORS["FG_MAGENTA"] = "\u001B[38;5;5m";
    CONSOLE_COLORS["FG_CYAN"] = "\u001B[38;5;6m";
    CONSOLE_COLORS["FG_WHITE"] = "\u001B[38;5;7m";
    // Foreground high intensity colors
    CONSOLE_COLORS["FG_HI_BLACK"] = "\u001B[38;5;8m";
    CONSOLE_COLORS["FG_HI_RED"] = "\u001B[38;5;9m";
    CONSOLE_COLORS["FG_HI_GREEN"] = "\u001B[38;5;10m";
    CONSOLE_COLORS["FG_HI_YELLOW"] = "\u001B[38;5;11m";
    CONSOLE_COLORS["FG_HI_BLUE"] = "\u001B[38;5;12m";
    CONSOLE_COLORS["FG_HI_MAGENTA"] = "\u001B[38;5;13m";
    CONSOLE_COLORS["FG_HI_CYAN"] = "\u001B[38;5;14m";
    CONSOLE_COLORS["FG_HI_WHITE"] = "\u001B[38;5;15m";
    // Background standard colors
    CONSOLE_COLORS["BG_BLACK"] = "\u001B[48;5;0m";
    CONSOLE_COLORS["BG_RED"] = "\u001B[48;5;1m";
    CONSOLE_COLORS["BG_GREEN"] = "\u001B[48;5;2m";
    CONSOLE_COLORS["BG_YELLOW"] = "\u001B[48;5;3m";
    CONSOLE_COLORS["BG_BLUE"] = "\u001B[48;5;4m";
    CONSOLE_COLORS["BG_MAGENTA"] = "\u001B[48;5;5m";
    CONSOLE_COLORS["BG_CYAN"] = "\u001B[48;5;6m";
    CONSOLE_COLORS["BG_WHITE"] = "\u001B[48;5;7m";
    // Background high intensity colors
    CONSOLE_COLORS["BG_HI_BLACK"] = "\u001B[48;5;8m";
    CONSOLE_COLORS["BG_HI_RED"] = "\u001B[48;5;9m";
    CONSOLE_COLORS["BG_HI_GREEN"] = "\u001B[48;5;10m";
    CONSOLE_COLORS["BG_HI_YELLOW"] = "\u001B[48;5;11m";
    CONSOLE_COLORS["BG_HI_BLUE"] = "\u001B[48;5;12m";
    CONSOLE_COLORS["BG_HI_MAGENTA"] = "\u001B[48;5;13m";
    CONSOLE_COLORS["BG_HI_CYAN"] = "\u001B[48;5;14m";
    CONSOLE_COLORS["BG_HI_WHITE"] = "\u001B[48;5;15m";
})(CONSOLE_COLORS || (CONSOLE_COLORS = {}));
;
export class MyLogger {
    enable;
    name;
    useColors;
    useHighIntensityColors;
    useNameInPrefix;
    useTimestampInPrefix;
    colors;
    constructor(options = {}) {
        this.enable = options.enable ?? true;
        this.name = options.name ?? "MyLogger";
        this.useColors = options.useColors ?? true;
        this.useHighIntensityColors = options.useHighIntensityColors ?? true;
        this.useNameInPrefix = options.useNameInPrefix ?? true;
        this.useTimestampInPrefix = options.useTimestampInPrefix ?? true;
        const defaultHiColors = {
            debug: CONSOLE_COLORS.FG_HI_CYAN,
            error: CONSOLE_COLORS.FG_HI_RED,
            info: CONSOLE_COLORS.FG_HI_BLUE,
            ok: CONSOLE_COLORS.FG_HI_GREEN,
            warn: CONSOLE_COLORS.FG_HI_YELLOW,
            timestamp: CONSOLE_COLORS.FG_HI_MAGENTA,
            name: CONSOLE_COLORS.FG_HI_WHITE
        };
        const defaultColors = {
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
    getBasePrefix() {
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
    getPrefixesString(method, prefixes) {
        let prefix = "";
        prefixes.unshift(method.toUpperCase());
        for (const p of prefixes) {
            prefix += `[${p}]`;
        }
        if (this.useColors)
            prefix = `${this.colors[method]}${prefix}${CONSOLE_COLORS.RESET}`;
        return prefix;
    }
    info(message, ...prefixes) {
        if (this.enable) {
            const p = this.getBasePrefix() + this.getPrefixesString('info', prefixes);
            console.log(`${p} ${message}`);
        }
    }
    debug(message, ...prefixes) {
        if (this.enable) {
            const p = this.getBasePrefix() + this.getPrefixesString('debug', prefixes);
            console.log(`${p} ${message}`);
        }
    }
    warn(message, ...prefixes) {
        if (this.enable) {
            const p = this.getBasePrefix() + this.getPrefixesString('warn', prefixes);
            console.log(`${p} ${message}`);
        }
    }
    error(message, ...prefixes) {
        if (this.enable) {
            const p = this.getBasePrefix() + this.getPrefixesString('error', prefixes);
            console.log(`${p} ${message}`);
        }
    }
    ok(message, ...prefixes) {
        if (this.enable) {
            const p = this.getBasePrefix() + this.getPrefixesString('ok', prefixes);
            console.log(`${p} ${message}`);
        }
    }
}
export default MyLogger;
//# sourceMappingURL=index.js.map