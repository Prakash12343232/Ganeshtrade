import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card flex flex-col h-full group">
            <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                    <span className="category-badge uppercase tracking-tighter shadow-sm">{product.category}</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description}</p>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-3">
                        <div>
                            <span className="price-tag">₹{product.price}</span>
                            <span className="unit-label">per {product.unit}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full btn-primary py-2.5 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
