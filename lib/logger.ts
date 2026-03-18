import pino from 'pino'

const isDev = process.env.NODE_ENV !== 'production'

const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  ...(isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      }
    : {}),
  base: { service: 'ondeline-telecom' },
  timestamp: pino.stdTimeFunctions.isoTime,
})

export default logger

// Convenience child loggers for different domains
export const dbLogger = logger.child({ module: 'database' })
export const apiLogger = logger.child({ module: 'api' })
export const authLogger = logger.child({ module: 'auth' })
export const emailLogger = logger.child({ module: 'email' })
export const leadLogger = logger.child({ module: 'leads' })
export const blogLogger = logger.child({ module: 'blog' })
