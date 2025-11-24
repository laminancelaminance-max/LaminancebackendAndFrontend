import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  plainPassword: {  // NEW: Store plain password for admin viewing
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  verify_email: {
    type: Boolean,
    default: false,
  },
  last_login_date: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  address_details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }
  ],
  shopping_cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartProducts",
    }
  ],  
  order_history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }
  ],
  forgot_password_otp: {
    type: String,
    default: null,
  },
  forgot_password_expiry: {
    type: Date,
    default: null,
  },
  role: {
    type: String,    
    enum: ["user", "admin"],
    default: "user",
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
}, {
  timestamps: true,  
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;