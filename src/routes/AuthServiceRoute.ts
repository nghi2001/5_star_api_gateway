import Express from 'express';
import httpProxy from 'express-http-proxy';
import { AuthApi } from '../config/apiConfig';
import verifyToken from '../middlewares/verifyToken';

const router = Express.Router();
const authServiceProxy = httpProxy(`${AuthApi}`)
// console.log(AuthApi);
// router.use(verifyToken)

router.get("/user/listToken/:id", verifyToken, authServiceProxy)
router.post('/user/sigin',authServiceProxy);
router.post('/user/sigup',authServiceProxy);
router.post('/user/changepass', verifyToken,authServiceProxy);
router.post('/user/active', authServiceProxy);
router.post('/', verifyToken,(req,res) => {
    console.log(req.cookies);
    res.send('jjd')
    return
    
})

export default router