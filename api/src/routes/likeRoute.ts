import express from 'express'
import { LikeController } from '../controllers/likeController';


const likeController = new LikeController();
const router = express.Router();

router.post('/like', likeController.create);
router.get('/likes', likeController.getAll);
router.get('/like/:id', likeController.getById);
router.put('/like/:id', likeController.update);
router.delete('/like/:id', likeController.delete);
router.get('/countlikes/:id', likeController.countByPostId);

export default router;

