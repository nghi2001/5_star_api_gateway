import Express from 'express';
import httpProxy from 'express-http-proxy';
import { AuthApi } from '../config/apiConfig';
const router = Express.Router();
const authServiceProxy = httpProxy(`${AuthApi}`)
// console.log(AuthApi);

router.post('/auth/signin',authServiceProxy);
router.post('/auth/signup',authServiceProxy);

export default router