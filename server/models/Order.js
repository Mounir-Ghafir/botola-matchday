const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price:    { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId:    { type: String, required: true, unique: true },
  items:      { type: [itemSchema], required: true, validate: v => v.length > 0 },
  totalPrice: { type: Number, default: 0, min: 0 },
  status:     { type: String, enum: ['pending', 'ready', 'picked_up'], default: 'pending' },
  createdAt:  { type: Date, default: Date.now }
});

orderSchema.pre('save', function () {
  if (!this.totalPrice || this.totalPrice === 0) {
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
});

module.exports = mongoose.model('Order', orderSchema);
