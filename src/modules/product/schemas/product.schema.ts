import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  lostTime: { type: Date, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
