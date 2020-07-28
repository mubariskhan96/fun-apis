import express from 'express';
import { authController } from '../../controllers';
import {
    verifyToken,
} from '../../middlewares'
const initEventRoutes = () => {
  const eventRoutes = express.Router();

  eventRoutes.post('/', authController.generateToken)
  eventRoutes.post('/patch', verifyToken,authController.jsonPatch)
  eventRoutes.post('/resize', verifyToken,authController.resizeImg)

  return eventRoutes;
};

export default initEventRoutes;
