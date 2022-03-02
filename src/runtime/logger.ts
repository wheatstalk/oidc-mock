import winston from 'winston';
import { ENV_OIDC_MOCK_LOG_LEVEL } from '../constants';

const logger = winston.createLogger({
  level: process.env[ENV_OIDC_MOCK_LOG_LEVEL] ?? 'info',
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