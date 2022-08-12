import Express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './routes/AuthServiceRoute';
import cookieParser from 'cookie-parser';
import swaggerui from 'swagger-ui-express';
import PostRoute from './routes/PostServiceRoute'
const swaggerDocument = require('../swagger.json');

const app = Express();

app.use('/api-doc',
    swaggerui.serve,
    swaggerui.setup(swaggerDocument)
)
app.use(cookieParser())
dotenv.config();
const PORT = process.env.PORT ||4001
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

app.use('/api/auth/', AuthRoute);

app.use('/api/', PostRoute);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);   
    
})