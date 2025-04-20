// src/utils/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Management API',
      version: '1.0.0',
      description: 'API for registering and managing vehicles',
    },
    servers: [
      {
        url: 'http://localhost:5000//api/vehicles',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
