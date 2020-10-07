import winston, { Logger } from 'winston';
import split from 'split';

export default function logger(options: Record<string, any>): Logger {
    const winstonLogger = winston.createLogger({
        transports: [
            new winston.transports.File(options.file),
            new winston.transports.Console(options.console)
        ],
        exitOnError: false
    });

    winstonLogger.stream = split().on('data', function (
        message: string
    ) {
        winstonLogger.info(message);
    });

    return winstonLogger;
}
