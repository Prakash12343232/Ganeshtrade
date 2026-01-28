import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop' },
    description: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
