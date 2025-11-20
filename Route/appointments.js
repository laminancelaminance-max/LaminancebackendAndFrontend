import express from 'express';
import appointmentController from '../controller/appointmentController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// GET /api/appointments - Get all appointments (user sees their own, admin sees all)
router.get('/', appointmentController.getAllAppointments);

// GET /api/appointments/user - Get current user's appointments
router.get('/user/my-appointments', appointmentController.getUserAppointments);

// GET /api/appointments/:id - Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// GET /api/appointments/date/:date - Get appointments by date
router.get('/date/:date', appointmentController.getAppointmentsByDate);

// POST /api/appointments - Create new appointment
router.post('/', appointmentController.createAppointment);

// PUT /api/appointments/:id - Update appointment
router.put('/:id', appointmentController.updateAppointment);

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', appointmentController.deleteAppointment);

// POST /api/appointments/:id/send-email - Send email for appointment
router.post('/:id/send-email', appointmentController.sendAppointmentEmail);

export default router;