/**
 * Logger service central.
 * Níveis: debug, info, warn, error
 *
 * Em produção (NODE_ENV=production) suprime debug e info.
 */

const isDev = process.env.NODE_ENV !== 'production';

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const MIN_LEVEL = isDev ? LEVELS.debug : LEVELS.warn;

const formatMsg = (level, context, message) =>
  `[${new Date().toISOString()}] [${level.toUpperCase()}] [${context}] ${message}`;

const createLogger = (context) => ({
  debug: (msg, ...args) => {
    if (LEVELS.debug >= MIN_LEVEL) console.debug(formatMsg('debug', context, msg), ...args);
  },
  info: (msg, ...args) => {
    if (LEVELS.info >= MIN_LEVEL) console.info(formatMsg('info', context, msg), ...args);
  },
  warn: (msg, ...args) => {
    if (LEVELS.warn >= MIN_LEVEL) console.warn(formatMsg('warn', context, msg), ...args);
  },
  error: (msg, ...args) => {
    console.error(formatMsg('error', context, msg), ...args);
  },
});

export default createLogger;
