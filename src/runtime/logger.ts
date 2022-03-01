import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
  ],
});

export class Logger {
  static info(message: string, meta?: any) {
    logger.info(message, meta);
  }

  static debug(message: string, meta?: any) {
    logger.debug(message, meta);
  }

  static warn(message: string, meta?: any) {
    logger.warn(message, meta);
  }
}