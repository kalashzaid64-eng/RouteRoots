import React, { useState } from 'react';
import { Sparkles, Search, Sliders, ShoppingCart, ArrowRight, Star, ShoppingBag } from 'lucide-react';

export const MarketBanner = ({ recommendations = [] }) => (
  <div className="container px-4 mt-4">
    <div className="ai-recommendation-banner">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <div className="ai-sparkle-icon">
          <Sparkles size={22} fill="currentColor" />
        </div>
        <div>
          <h3 className="title is-5 mb-0" style={{ fontWeight: 800 }}>AI-Powered Recommendations</h3>
        </div>
      </div>
      <p className="subtitle is-6 mb-4" style={{ color: '#455A64', lineHeight: 1.5 }}>
        Based on your activity, we think you'll love these picks.
      </p>
      {recommendations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recommendations.slice(0, 3).map((rec) => (
            <div key={rec.product.id} className="is-flex is-justify-content-space-between is-align-items-center" style={{ background: 'white', borderRadius: '12px', padding: '10px 14px' }}>
              <div>
                <p className="has-text-weight-bold mb-0" style={{ fontSize: '0.9rem' }}>{rec.product.name}</p>
                <p className="has-text-grey is-size-7">{rec.product.category}</p>
              </div>
              <span className="has-text-weight-bold" style={{ color: 'var(--primary-green)' }}>${rec.product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);


export const MarketHeader = ({ activeCategory, setActiveCategory, onOpenCart, cartCount = 0 }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { name: 'All', id: 'all' },
    { name: 'Footwear', id: 'footwear' },
    { name: 'Apparel', id: 'apparel' },
    { name: 'Accessories', id: 'accessories' },
    { name: 'Electronics', id: 'electronics' },
    { name: 'Safety', id: 'safety' },
    { name: 'Skating', id: 'skating' }
  ];

  const currentLabel = categories.find((c) => c.id === activeCategory)?.name ?? 'All';

  return (
    <div className="market-header">
      <div className="search-bar-wrapper mb-4">
        <span className="icon is-left" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#757575' }}>
          <Search size={18} />
        </span>
        <input className="market-search-bar" type="text" placeholder="Search products..." />
      </div>

      <div className="columns is-mobile is-variable is-2 mb-4">
        <div className="column is-6">
          <div className={`dropdown ${isFilterOpen ? 'is-active' : ''}`} style={{ width: '100%' }}>
            <div className="dropdown-trigger" style={{ width: '100%' }}>
              <button className="market-action-btn" onClick={() => setIsFilterOpen((v) => !v)}>
                <Sliders size={18} /> {currentLabel}
              </button>
            </div>
            <div className="dropdown-menu" role="menu" style={{ width: '100%' }}>
              <div className="dropdown-content">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href="#"
                    className={`dropdown-item ${activeCategory === cat.id ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory?.(cat.id);
                      setIsFilterOpen(false);
                    }}
                    style={{ fontWeight: activeCategory === cat.id ? 700 : 600 }}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="cart-badge-wrapper">
            <button className="market-action-btn" onClick={() => onOpenCart?.()}>
              <ShoppingCart size={18} /> Cart
            </button>
            {cartCount > 0 && <div className="cart-item-count">{cartCount}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, onOpenDetails, onAddToCart }) => {
  const getCategoryClass = (cat) => {
    switch(cat.toLowerCase()) {
      case 'footwear': return 'cat-footwear';
      case 'apparel': return 'cat-apparel';
      case 'accessories': return 'cat-accessories';
      case 'electronics': return 'cat-electronics';
      case 'safety': return 'cat-safety';
      case 'skating': return 'cat-skating';
      default: return '';
    }
  };

  return (
    <div className="container px-4 mt-4">
      <div className="product-card" onClick={() => onOpenDetails?.(product)} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
  {product.discount && <div className="discount-tag">-{product.discount}%</div>}
  <div className={`category-tag ${getCategoryClass(product.category)}`}>{product.category}</div>
  {product.image 
    ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    : <ShoppingBag size={80} strokeWidth={1} />
  }
</div>

        
        <div className="product-info">
          <h3 className="title is-5 mb-2" style={{ fontWeight: 800 }}>{product.name}</h3>
          <p className="subtitle is-6 has-text-grey mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
            {product.description}
          </p>
          
          <div className="is-flex is-align-items-center gap-1 mb-4">
            <Star size={16} fill="#F59E0B" color="#F59E0B" />
            <span className="has-text-weight-bold" style={{ color: '#F59E0B' }}>{product.rating}</span>
            <span className="has-text-grey" style={{ fontSize: '0.9rem' }}>({product.reviews} reviews)</span>
          </div>

          <div className="is-flex is-align-items-center is-justify-content-space-between mt-auto">
            <div className="is-flex is-align-items-baseline">
              <span className="product-price">${product.price}</span>
              {product.oldPrice && <span className="original-price">${product.oldPrice}</span>}
            </div>
            <button
              className="button rr-btn-green"
              style={{ borderRadius: '12px' }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
