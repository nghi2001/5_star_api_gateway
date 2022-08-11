import Express from 'express';
import httpProxy from 'express-http-proxy';
import { AuthApi } from '../config/apiConfig';
import verifyToken from '../middlewares/verifyToken';

const router = Express.Router();
const authServiceProxy = httpProxy(`${AuthApi}`)
// console.log(AuthApi);

router.post('/auth/sigin',authServiceProxy);
router.post('/auth/sigup',authServiceProxy);
router.post('/auth/changepass',authServiceProxy);
router.post('/auth/active', authServiceProxy);
router.post('/', verifyToken,(req,res) => {
    // console.log(req.cookies);
    res.json('khdbv')
    
})

export default router