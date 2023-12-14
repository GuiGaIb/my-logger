# my-logger
Logger tool for Node.js applications.

## Usage
Create instances logger instances by using the MyLogger class' constructor:

```typescript
import MyLogger from 'my-logger';

const myLogger = new MyLogger();

myLogger.info("MyLogger is ready to use!");
```
The last line will log the following to the console (with colors):

```bash
[1970-01-01T00:00:000Z][MyLogger][INFO] MyLogger is ready to use!
```
The timestamp will be generated using the `Date.toISOString()` method with the current date and time.
## Customization
You can choose to customize and enable or disable certain features by passing a `LoggerConfig` object to the constructor:

```typescript
import MyLogger from 'my-logger'

const options = {
  enable: process.env.NODE_ENV !== 'production',
  name: 'MyLogger',
  useColors: true,
  useHighIntensityColors: false,
  useNameInPrefix: true,
  useTimestampInPrefix?: boolean
};

const myLogger = new MyLogger(options);
```

The `LoggerConfig` interface is defined as follows:

```typescript
interface LoggerConfig {
  enable?: boolean;
  name?: string;
  useColors?: boolean;
  useHighIntensityColors?: boolean;
  useNameInPrefix?: boolean;
  useTimestampInPrefix?: boolean;
}
```

### `options.enable`
This option allows you to enable or disable the logger.
If set to `false`, the logger will not log anything to the console.
The default value is `true`.

### `options.name`
This option allows you to set the name of the logger.
The default value is `"MyLogger"`.

### `options.useColors`
This option allows you to enable or disable colors in the logger.
The default value is `true`.

### `options.useHighIntensityColors`
This option allows you to enable or disable high intensity colors in the logger.
The default value is `false`.

### `options.useNameInPrefix`
This option allows you to enable or disable the name in the prefix of the logger.
The default value is `true`.

### `options.useTimestampInPrefix`
This option allows you to enable or disable the timestamp in the prefix of the logger.
The default value is `true`.

## Methods
All methods take a `message` parameter of type `string`, and a list of `prefixes` of type `string[]` as parameters.
The `prefixes` parameter is optional, and it's used to add prefixes to the log message.

### `debug(message: string, ...prefixes?: string[]): void`
Logs a message with the `DEBUG` level.

### `error(message: string, ...prefixes?: string[]): void`
Logs a message with the `ERROR` level.

### `info(message: string, ...prefixes?: string[]): void`
Logs a message with the `INFO` level.

### `warn(message: string, ...prefixes?: string[]): void`
Logs a message with the `WARN` level.

### `ok(message: string, ...prefixes?: string[]): void`
Logs a message with the `OK` level.

#### Example
```typescript
import MyLogger from 'my-logger';

const logger = new MyLogger({
  name: "TestLogger",
  useNameInPrefix: false
});

const error = new TypeError("Wrong type!");
const statusCode = 200;

logger.info("Logger is ready!");
logger.debug("Log debug data", "CLASS_NAME", "METHOD_NAME");
logger.warn("Heads up! Something happened...", "FILE_NAME");
logger.error(error.message, error.name, "FUNCTION_NAME");
logger.ok("Transaction successful!", String(statusCode));
```
This will log the following to the console (with colors):
```bash
[1970-01-01T00:00:000Z][INFO] Logger is ready!
[1970-01-01T00:00:000Z][DEBUG][CLASS_NAME][METHOD_NAME] Log debug data
[1970-01-01T00:00:000Z][WARN][FILE_NAME] Heads up! Something happened...
[1970-01-01T00:00:000Z][ERROR][TypeError][FUNCTION_NAME] Wrong Type!
[1970-01-01T00:00:000Z][OK][200] Transaction successful!
```

## Change log
### 1.1.0
- Fixed a bug where the colors were not set properly.
- Added option to customize colors.
