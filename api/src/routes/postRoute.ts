import express from 'express'
import { PostController } from '../controllers/postController';


const postController = new PostController();
const router = express.Router();

router.post('/post', postController.create);
router.get('/posts', postController.getAll);
router.get('/post/:id', postController.getById);
router.put('/post/:id', postController.update);
router.delete('/post/:id', postController.delete);
router.get('/posts/:id', postController.getByUser);

export default router;

