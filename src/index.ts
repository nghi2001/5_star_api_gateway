import Express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './routes/AuthServiceRoute';
const app = Express();

dotenv.config();

app.use(cors());

app.use('/api', AuthRoute);

app.get("/", (req,res) => {
    console.log('nguyen dnhg nghi');
    res.json(process.env.PORT);
})

app.listen(process.env.PORT||3000, () => {
    console.log(process.env.AUTH_SERVICE);
    
})