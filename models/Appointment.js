import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Appointment title is required'],
    trim: true
  },
  date: {
    type: String, // Storing as YYYY-MM-DD
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String, // Storing as HH:MM
    required: [true, 'Appointment time is required']
  },
  duration: {
    type: Number,
    default: 60, // minutes
    min: 15,
    max: 480
  },
  description: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
  // LOCATION FIELDS - ADDED
  locationType: {
    type: String,
    enum: ['office', 'showroom', 'client-site', 'virtual', 'other'],
    default: 'office'
  },
  location: {
    type: String,
    default: ''
  },
  address: {
    street: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: 'USA'
    }
  },
  virtualMeetingLink: {
    type: String,
    default: ''
  },
  locationNotes: {
    type: String,
    default: ''
  },
  
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
appointmentSchema.index({ date: 1, time: 1 });
appointmentSchema.index({ userId: 1 });
appointmentSchema.index({ email: 1 });
appointmentSchema.index({ locationType: 1 }); // NEW INDEX
appointmentSchema.index({ 'address.city': 1 }); // NEW INDEX

// Virtual for full address
appointmentSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  if (!addr.street && !addr.city && !addr.state) return '';
  
  const parts = [addr.street, addr.city, addr.state, addr.zipCode].filter(Boolean);
  return parts.join(', ');
});

// Set virtuals in JSON output
appointmentSchema.set('toJSON', { virtuals: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;