const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const basicAuth = require('../middlewares/basicAuth');

const swaggerLoader = (app) => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Orientation Website API',
      version: '1.0.0',
      description: "This is a REST API for UofT Engineering's orientation week.",
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: [
      path.resolve(__dirname, '../routes/*.js'),
      path.resolve(__dirname, '../components.yaml'),
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/docs', basicAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerLoader;
