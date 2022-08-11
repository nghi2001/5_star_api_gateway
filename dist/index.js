"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthServiceRoute_1 = __importDefault(require("./routes/AuthServiceRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../swagger.json');
const app = (0, express_1.default)();
app.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 4001;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use('/api/auth/', AuthServiceRoute_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
