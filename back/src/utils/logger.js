const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Logs 'info' and more severe levels (warn, error)
  format: format.combine(
    format.colorize(), // 🎨 Add color to logs
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // 👈 Console output only
  ],
});

module.exports = logger;