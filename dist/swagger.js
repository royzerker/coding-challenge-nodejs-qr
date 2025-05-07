"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const PORT = process.env.PORT || 8000;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'QR Factorization API',
            version: '1.0.0',
            description: 'API para factorizar matrices y realizar operaciones estadísticas.',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
