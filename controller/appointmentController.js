import Appointment from '../models/Appointment.js';
import UserModel from '../models/user.model.js';
import { sendAppointmentEmail } from '../Utils/emailService.js';

const appointmentController = {
  // Get all appointments (with user authentication)
  getAllAppointments: async (req, res) => {
    try {
      const { userId, userRole } = req;
      
      let appointments;
      if (userRole === 'admin') {
        // Admin can see all appointments
        appointments = await Appointment.find()
          .populate('userId', 'name email avatar')
          .sort({ date: 1, time: 1 });
      } else {
        // Users can only see their own appointments
        appointments = await Appointment.find({ userId })
          .populate('userId', 'name email avatar')
          .sort({ date: 1, time: 1 });
      }

      res.json({
        success: true,
        data: appointments,
        count: appointments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching appointments',
        error: error.message
      });
    }
  },

  // Get appointment by ID
  getAppointmentById: async (req, res) => {
    try {
      const { userId, userRole } = req;
      const appointment = await Appointment.findById(req.params.id)
        .populate('userId', 'name email avatar');

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }

      // Check if user owns the appointment or is admin
      if (userRole !== 'admin' && appointment.userId._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.json({
        success: true,
        data: appointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching appointment',
        error: error.message
      });
    }
  },

  // Create new appointment
  createAppointment: async (req, res) => {
    try {
      const { userId } = req;
      const { title, date, time, duration, description, email, phone, userName } = req.body;

      // Validation
      if (!title || !date || !time || !email || !userName) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: title, date, time, email, userName'
        });
      }

      // Get user details
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if appointment time is available
      const existingAppointment = await Appointment.findOne({
        date,
        time,
        userId,
        status: { $in: ['scheduled', 'rescheduled'] }
      });

      if (existingAppointment) {
        return res.status(409).json({
          success: false,
          message: 'You already have an appointment at this time'
        });
      }

      // Create appointment
      const appointmentData = {
        title,
        date,
        time,
        duration,
        description,
        email,
        phone,
        userName,
        userId
      };

      const appointment = new Appointment(appointmentData);
      await appointment.save();

      // Add appointment to user's appointments array
      await UserModel.findByIdAndUpdate(userId, {
        $push: { appointments: appointment._id }
      });

      res.status(201).json({
        success: true,
        message: 'Appointment created successfully',
        data: appointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating appointment',
        error: error.message
      });
    }
  },

  // Update appointment
  updateAppointment: async (req, res) => {
    try {
      const { userId, userRole } = req;
      const { id } = req.params;
      
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }

      // Check if user owns the appointment or is admin
      if (userRole !== 'admin' && appointment.userId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      ).populate('userId', 'name email avatar');

      res.json({
        success: true,
        message: 'Appointment updated successfully',
        data: updatedAppointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating appointment',
        error: error.message
      });
    }
  },

  // Delete appointment
  deleteAppointment: async (req, res) => {
    try {
      const { userId, userRole } = req;
      const { id } = req.params;

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }

      // Check if user owns the appointment or is admin
      if (userRole !== 'admin' && appointment.userId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      await Appointment.findByIdAndDelete(id);

      // Remove appointment from user's appointments array
      await UserModel.findByIdAndUpdate(appointment.userId, {
        $pull: { appointments: id }
      });

      res.json({
        success: true,
        message: 'Appointment deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting appointment',
        error: error.message
      });
    }
  },

  // Send email for appointment
 sendAppointmentEmail: async (req, res) => {
    try {
      const { userId, userRole } = req;
      const { id } = req.params;

      console.log(`📧 Attempting to send email for appointment: ${id}`);

      const appointment = await Appointment.findById(id)
        .populate('userId', 'name email avatar');

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }

      // Check if user owns the appointment or is admin
      if (userRole !== 'admin' && appointment.userId._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      console.log(`📧 Sending email to: ${appointment.email}`);

      // Send the actual email
      const emailResult = await sendAppointmentEmail(appointment);

      console.log("✅ Email sent successfully, marking as sent in database");

      // Mark reminder as sent
      appointment.reminderSent = true;
      await appointment.save();

      res.json({
        success: true,
        message: `Email sent successfully to ${appointment.email}`,
        emailData: emailResult.data
      });

    } catch (error) {
      console.error('❌ Error sending email:', error);
      res.status(500).json({
        success: false,
        message: 'Error sending email: ' + error.message,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },


  // Get appointments by date
  getAppointmentsByDate: async (req, res) => {
    try {
      const { userId, userRole } = req;
      const { date } = req.params;

      let query = { date };
      if (userRole !== 'admin') {
        query.userId = userId;
      }

      const appointments = await Appointment.find(query)
        .populate('userId', 'name email avatar')
        .sort({ time: 1 });

      res.json({
        success: true,
        data: appointments,
        count: appointments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching appointments by date',
        error: error.message
      });
    }
  },

  // Get user's appointments
  getUserAppointments: async (req, res) => {
    try {
      const { userId } = req;

      const appointments = await Appointment.find({ userId })
        .populate('userId', 'name email avatar')
        .sort({ date: -1, time: 1 });

      res.json({
        success: true,
        data: appointments,
        count: appointments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user appointments',
        error: error.message
      });
    }
  }
};

export default appointmentController;