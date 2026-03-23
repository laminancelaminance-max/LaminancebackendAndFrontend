


import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
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
  country: {
    type: String,
    default: ''
  },
  zipCode: {
    type: String,
    default: ''
  }
});

const geoLocationSchema = new mongoose.Schema({
  country: {
    type: String,
    default: 'unknown'
  },
  region: {
    type: String,
    default: 'unknown'
  },
  city: {
    type: String,
    default: 'unknown'
  }
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    maxlength: [100, 'Email cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    default: '',
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  // Add preferredDate and preferredTime fields (optional)
  preferredDate: {
    type: Date,
    default: null
  },
  preferredTime: {
    type: String,
    default: '',
    trim: true,
    maxlength: [50, 'Time slot cannot exceed 50 characters']
  },
  address: {
    type: addressSchema,
    default: () => ({})
  },
  subject: {
    type: String,
    trim: true,
    minlength: [2, 'Subject must be at least 2 characters'],
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    default: ''  // Make message optional by setting default
  },
  sendCopy: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'resolved', 'spam'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['general', 'quote', 'appointment', 'complaint', 'feedback', 'other'],
    default: 'general'
  },
  ipAddress: {
    type: String,
    default: '0.0.0.0',
  },
  userAgent: {
    type: String,
    default: ''
  },
  submittedFrom: {
    type: String,
    default: 'unknown'
  },
  geoLocation: {
    type: geoLocationSchema,
    default: () => ({})
  },
  notes: {
    type: String,
    default: ''
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockedReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ ipAddress: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ 'geoLocation.country': 1 });
contactSchema.index({ isBlocked: 1 });
contactSchema.index({ preferredDate: 1 }); // Add index for date queries

// Pre-save middleware to prevent spam
contactSchema.pre('save', function(next) {
  // Only check spam if message exists
  if (this.message && this.message.length > 0) {
    // Basic spam check (can be enhanced)
    const spamKeywords = ['viagra', 'cialis', 'casino', 'porn', 'xxx'];
    const message = this.message.toLowerCase();
    
    for (const keyword of spamKeywords) {
      if (message.includes(keyword)) {
        this.status = 'spam';
        this.isBlocked = true;
        this.blockedReason = `Contains spam keyword: ${keyword}`;
        break;
      }
    }
  }
  
  next();
});

// Static method to check if IP is blocked
contactSchema.statics.isIPBlocked = async function(ip) {
  const blockedIPs = await this.find({
    ipAddress: ip,
    isBlocked: true,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
  }).limit(5);
  
  return blockedIPs.length >= 5; // Block if 5 submissions in 24 hours
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;