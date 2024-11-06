import express from 'express'
import { FollowController } from '../controllers/followController';


const followController = new FollowController();
const router = express.Router();

router.post('/follow', followController.create);
router.get('/follows', followController.getAll);
router.get('/follow/:id', followController.getById);
router.put('/follow/:id', followController.update);
router.delete('/follow/:id', followController.delete);
router.get('/follow/:followerId/:followedId', followController.getFollow)

export default router;

