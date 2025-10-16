// models/Order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true
  },
  // Add user reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    date: { type: String, required: true },
    discount: { type: Number, default: 0 }
  },
  cabinets: [{
    type: { type: String, required: true },
    height: { type: String },
    width: { type: String },
    color: { type: String },
    material: { type: String },
    unitCost: { type: String },
    discount: { type: Number, default: 0 },
    description: { type: String },
    qty: { type: Number, default: 1 },
    drawerSlides: { type: String },
    hinges: { type: String },
    pvcSize: { type: String },
    profileHandleInches: { type: String }
  }],
  country: {
    type: String,
    required: true,
    enum: ["Custom", "Shaker"]
  },
  totalCost: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: false
  },
  salesTax: {
    type: Number,
    required: false
  },
  finalTotal: {
    type: Number,
    required: false
  },
  overallDiscount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
    default: "Pending"
  }
}, {
  timestamps: true
});

// Add indexes for better performance
orderSchema.index({ invoiceId: 1 });
orderSchema.index({ user: 1 }); // Add user index
orderSchema.index({ "customerInfo.email": 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;