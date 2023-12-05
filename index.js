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
    constructor(options) {
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
    getBasePrefix() {
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
    getPrefixesString(prefixes) {
        let prefix = "";
        for (const p of prefixes) {
            prefix += `[${p}]`;
        }
        return prefix;
    }
    info(message, ...prefixes) {
        if (this.enable) {
            const basePrefix = this.getBasePrefix();
            let prefix = "[INFO]";
            if (prefixes.length > 0) {
                prefix += this.getPrefixesString(prefixes);
                if (this.useColors) {
                    prefix = `${this.colors.info}${prefix}${CONSOLE_COLORS.RESET}`;
                }
            }
            console.log(`${basePrefix}${prefix} ${message}`);
        }
    }
    debug(message, ...prefixes) {
        if (this.enable) {
            const basePrefix = this.getBasePrefix();
            let prefix = "[DEBUG]";
            if (prefixes.length > 0) {
                prefix += this.getPrefixesString(prefixes);
                if (this.useColors) {
                    prefix = `${this.colors.debug}${prefix}${CONSOLE_COLORS.RESET}`;
                }
            }
            console.log(`${basePrefix}${prefix} ${message}`);
        }
    }
    warn(message, ...prefixes) {
        if (this.enable) {
            const basePrefix = this.getBasePrefix();
            let prefix = "[WARN]";
            if (prefixes.length > 0) {
                prefix += this.getPrefixesString(prefixes);
                if (this.useColors) {
                    prefix = `${this.colors.warn}${prefix}${CONSOLE_COLORS.RESET}`;
                }
            }
            console.log(`${basePrefix}${prefix} ${message}`);
        }
    }
    error(message, ...prefixes) {
        if (this.enable) {
            const basePrefix = this.getBasePrefix();
            let prefix = "[ERROR]";
            if (prefixes.length > 0) {
                prefix += this.getPrefixesString(prefixes);
                if (this.useColors) {
                    prefix = `${this.colors.error}${prefix}${CONSOLE_COLORS.RESET}`;
                }
            }
            console.log(`${basePrefix}${prefix} ${message}`);
        }
    }
    ok(message, ...prefixes) {
        if (this.enable) {
            const basePrefix = this.getBasePrefix();
            let prefix = "[OK]";
            if (prefixes.length > 0) {
                prefix += this.getPrefixesString(prefixes);
                if (this.useColors) {
                    prefix = `${this.colors.ok}${prefix}${CONSOLE_COLORS.RESET}`;
                }
            }
            console.log(`${basePrefix}${prefix} ${message}`);
        }
    }
}
export default MyLogger;
//# sourceMappingURL=index.js.map