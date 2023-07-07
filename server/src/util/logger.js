const pino = require('pino');
const pinoHttp = require('pino-http');

const fileStream = pino.destination({ dest: './output.log', minLength: 512, sync: false });

const logger = pino({
    transport:{
        targets: [
            {
                target: "pino-pretty",
                options:{
                    translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
                }
            },
        ]
    },
    redact: {
        paths: ['req.headers', 'req.remoteAddress', 'req.remotePort', 'res.headers', 'user.email', 'user.firstName', 'user.lastName', 'user.preferredName'],
        remove: true
      }
}, fileStream);

const loggerMiddleware = pinoHttp({
    logger,
    customSuccessMessage: function (req, res) {
        // Customize the success log message
        return "Request completed successfully with status " + res.statusCode;
    },
    prettyPrint: { colorize: true }, // Enable pretty printing with colors
});

module.exports = {
    logger,
    loggerMiddleware
}