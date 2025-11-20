import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders, 
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controller/orderController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

router.post('/create', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/all', getAllOrders);
router.get('/stats', getOrderStats);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.put('/:orderId/status', updateOrderStatus);
router.delete('/:orderId', deleteOrder);

export default router;