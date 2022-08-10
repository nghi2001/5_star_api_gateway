"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthServiceRoute_1 = __importDefault(require("./routes/AuthServiceRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use('/api', AuthServiceRoute_1.default);
app.get("/", (req, res) => {
    console.log('nguyen dnhg nghi');
    res.json(process.env.PORT);
});
app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.AUTH_SERVICE);
});
