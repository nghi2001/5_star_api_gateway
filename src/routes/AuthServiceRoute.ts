import Express from 'express';
import httpProxy from 'express-http-proxy';
import { AuthApi } from '../config/apiConfig';
import verifyToken from '../middlewares/verifyToken';

const router = Express.Router();
const authServiceProxy = httpProxy(`${AuthApi}`)
// console.log(AuthApi);
// router.use(verifyToken)

router.get("/auth/listToken/:id", verifyToken, authServiceProxy)
router.post('/auth/sigin',authServiceProxy);
router.post('/auth/sigup',authServiceProxy);
router.post('/auth/changepass', verifyToken,authServiceProxy);
router.post('/auth/active', verifyToken, authServiceProxy);
router.post('/', verifyToken,(req,res) => {
    console.log(req.cookies);
    res.send('jjd')
    return
    
})

export default router