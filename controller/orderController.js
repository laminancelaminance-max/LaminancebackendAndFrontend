import OrderModel from '../models/Order.js';
import UserModel from '../models/user.model.js';

// Create new order
const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orderData = req.body;
    
    // Validate required fields
    if (!orderData.totalCost && orderData.totalCost !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Total cost is required',
        error: true
      });
    }

    // Check if invoiceId already exists
    const existingOrder = await OrderModel.findOne({ invoiceId: orderData.invoiceId });
    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: 'Order with this invoice ID already exists',
        error: true
      });
    }

    // Ensure totalCost is a number
    const numericTotalCost = parseFloat(orderData.totalCost);
    if (isNaN(numericTotalCost)) {
      return res.status(400).json({
        success: false,
        message: 'Total cost must be a valid number',
        error: true
      });
    }

    // Create order with validated data and user association
    const order = new OrderModel({
      ...orderData,
      totalCost: numericTotalCost,
      user: userId
    });
    
    await order.save();

    // Populate user info in response
    const populatedOrder = await OrderModel.findById(order._id).populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors,
        error: true
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Invoice ID already exists',
        error: true
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
      error: true
    });
  }
};

// Get orders for current user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, status, search } = req.query;
    
    let query = { user: userId };
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { 'customerInfo.firstName': { $regex: search, $options: 'i' } },
        { 'customerInfo.lastName': { $regex: search, $options: 'i' } },
        { 'customerInfo.email': { $regex: search, $options: 'i' } },
        { invoiceId: { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await OrderModel.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await OrderModel.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
      error: true
    });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const userId = req.userId;
    
    const user = await UserModel.findById(userId);
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
        error: true
      });
    }

    const { page = 1, limit = 10, status, search } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { 'customerInfo.firstName': { $regex: search, $options: 'i' } },
        { 'customerInfo.lastName': { $regex: search, $options: 'i' } },
        { 'customerInfo.email': { $regex: search, $options: 'i' } },
        { invoiceId: { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await OrderModel.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await OrderModel.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
      error: true
    });
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId || req.params.id;

    const order = await OrderModel.findById(orderId).populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: true
      });
    }

    const user = await UserModel.findById(userId);
    if (order.user._id.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this order',
        error: true
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message,
      error: true
    });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId || req.params.id;

    const existingOrder = await OrderModel.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: true
      });
    }

    const user = await UserModel.findById(userId);
    if (existingOrder.user.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to update this order',
        error: true
      });
    }

    if (req.body.totalCost !== undefined) {
      const numericTotalCost = parseFloat(req.body.totalCost);
      if (isNaN(numericTotalCost)) {
        return res.status(400).json({
          success: false,
          message: 'Total cost must be a valid number',
          error: true
        });
      }
      req.body.totalCost = numericTotalCost;
    }

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors,
        error: true
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message,
      error: true
    });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId || req.params.id;
    const { status } = req.body;

    const user = await UserModel.findById(userId);
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
        error: true
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: true
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message,
      error: true
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId || req.params.id;

    const existingOrder = await OrderModel.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: true
      });
    }

    const user = await UserModel.findById(userId);
    if (existingOrder.user.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to delete this order',
        error: true
      });
    }

    await OrderModel.findByIdAndDelete(orderId);

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message,
      error: true
    });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    let query = {};
    let totalRevenuePipeline = [];

    if (user.role === 'admin') {
      totalRevenuePipeline = [
        { $group: { _id: null, total: { $sum: '$totalCost' } } }
      ];
    } else {
      query = { user: userId };
      totalRevenuePipeline = [
        { $match: { user: userId } },
        { $group: { _id: null, total: { $sum: '$totalCost' } } }
      ];
    }

    const totalOrders = await OrderModel.countDocuments(query);
    const pendingOrders = await OrderModel.countDocuments({ ...query, status: 'Pending' });
    const confirmedOrders = await OrderModel.countDocuments({ ...query, status: 'Confirmed' });
    const inProgressOrders = await OrderModel.countDocuments({ ...query, status: 'In Progress' });
    const completedOrders = await OrderModel.countDocuments({ ...query, status: 'Completed' });
    const cancelledOrders = await OrderModel.countDocuments({ ...query, status: 'Cancelled' });
    
    const totalRevenue = await OrderModel.aggregate(totalRevenuePipeline);

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        inProgressOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
      error: true
    });
  }
};

// Export the functions (without Controller suffix)
export {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};