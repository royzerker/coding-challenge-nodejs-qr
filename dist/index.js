"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("reflect-metadata");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dependency_injector_1 = require("./loaders/dependency-injector");
(0, dependency_injector_1.registerDependencies)();
const qr_routes_1 = __importDefault(require("./routes/qr.routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use('/api', qr_routes_1.default);
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
