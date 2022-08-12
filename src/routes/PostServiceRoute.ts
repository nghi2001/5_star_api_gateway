import Express from 'express';
import httpProxy from 'express-http-proxy';
import { PostService } from '../config/apiConfig';
import verifyToken from '../middlewares/verifyToken';

const router = Express.Router();
const PostServiceProxy = httpProxy(`${PostService}`)
// console.log(AuthApi);
// router.use(verifyToken)

router.get('/test', verifyToken,PostServiceProxy);

router.route('/post')
    .post(verifyToken,PostServiceProxy)
    .delete(verifyToken, PostServiceProxy)
    .put(verifyToken, PostServiceProxy)

router.route('/post/user/:id')
    .get(verifyToken, PostServiceProxy)
router.route('/post/:id')
    .get(verifyToken, PostServiceProxy)

export default router