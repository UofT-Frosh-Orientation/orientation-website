const pino = require('pino');
const pinoHttp = require('pino-http');
const pinoPretty = require('pino-pretty');

const logger = pino({
    transport:{
        target: "pino-pretty",
        options:{
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        }
    }
  });
  const loggerMiddleware = pinoHttp({
    logger,
    customLogLevel: function (res, err) {
      // Customize the log level based on the response and error
      return 'info';
    },
    customSuccessMessage: function (res) {
      // Customize the success log message
      return `Request completed successfully with status ${res.statusCode}`;
    },
    customErrorMessage: function (error, res) {
      // Customize the error log message
      return `An error occurred: ${error.message}`;
    },
    prettyPrint: { colorize: true }, // Enable pretty printing with colors
  });

module.exports = {
    logger,
    loggerMiddleware
}