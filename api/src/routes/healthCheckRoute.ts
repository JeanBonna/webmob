import express from 'express'

import { HealthCheckController } from '../controllers/healthCheckController';


const healthCheck = new HealthCheckController();
const router = express.Router();

router.get('/healthcheck', healthCheck.check);

export default router;