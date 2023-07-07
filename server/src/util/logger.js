const pino = require('pino');
const pinoHttp = require('pino-http');

const logger = pino(
  [
    {
      redact: {
        paths: [
          'req.headers',
          'req.remoteAddress',
          'req.remotePort',
          'res.headers',
          'user.email',
          'user.firstName',
          'user.lastName',
          'user.preferredName',
        ],
        remove: true,
      },
    },
  ],
  pino.destination({ dest: `${__dirname}/../output.txt`, minLength: 2048, sync: false }),
);

const loggerMiddleware = pinoHttp({
  logger,
  customSuccessMessage: function (req, res) {
    // Customize the success log message
    return 'Request completed successfully with status ' + res.statusCode;
  },
});

module.exports = {
  logger,
  loggerMiddleware,
};