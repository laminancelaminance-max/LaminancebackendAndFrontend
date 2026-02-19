import express from 'express';
import appointmentController from '../controller/appointmentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * 🔐 All appointment routes require authentication
 */
router.use(auth);

/**
 * 📅 GET appointments by date
 * MUST come before /:id
 */
router.get('/date/:date', appointmentController.getAppointmentsByDate);

/**
 * 👤 GET current user's appointments
 */
router.get('/user/my-appointments', appointmentController.getUserAppointments);

/**
 * 📋 GET all appointments
 * - Admin: sees all
 * - User: sees only their own
 */
router.get('/', appointmentController.getAllAppointments);

/**
 * 🔍 GET appointment by ID
 */
router.get('/:id', appointmentController.getAppointmentById);

/**
 * ➕ CREATE new appointment
 */
router.post('/', appointmentController.createAppointment);

/**
 * ✏️ UPDATE appointment
 */
router.put('/:id', appointmentController.updateAppointment);

/**
 * ❌ DELETE appointment
 */
router.delete('/:id', appointmentController.deleteAppointment);

/**
 * 📧 SEND appointment email
 */
router.post('/:id/send-email', appointmentController.sendAppointmentEmail);

export default router;
