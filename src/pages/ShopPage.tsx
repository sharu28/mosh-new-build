import React, { useState } from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../data/salonData';
import ProductDetailPage from '../components/ProductDetailPage';
import { 
  ShoppingBag, Search, SlidersHorizontal, Star, Check, Plus, Minus,
  Trash2, ArrowRight, Eye, ShieldCheck, Truck, RotateCcw, X, Gift, Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId?: (id: string) => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ShopPage({ setCurrentPage, setPreselectedServiceId }: ShopPageProps) {
  // Products states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart System states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Checkout form
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Colombo');
  const [notes, setNotes] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  // Filtering products
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.isPopular ? 1 : -1;
    if (sortBy === 'price-low') return a.priceLKR - b.priceLKR;
    if (sortBy === 'price-high') return b.priceLKR - a.priceLKR;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Visual cue
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Pricing math
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.priceLKR * item.quantity), 0);
  const deliveryFee = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 450;
  const cartTotal = cartSubtotal + deliveryFee;

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Form submission handler
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !deliveryAddress) {
      alert('Please fill out all required details for delivery.');
      return;
    }
    const orderNo = 'MOSH-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderNumber(orderNo);
    setCheckoutSuccess(true);
  };

  const resetCheckout = () => {
    setCheckoutSuccess(false);
    setIsCheckoutOpen(false);
    setCart([]);
    setFullName('');
    setPhoneNumber('');
    setDeliveryAddress('');
    setNotes('');
  };

  // Helper mapping category values to readable titles
  const getCategoryEmoji = (cat: string) => {
    switch (cat) {
      case 'oil': return '💧';
      case 'treatment': return '✨';
      case 'shampoo': return '💆‍♀️';
      case 'styling': return '🧴';
      default: return '🛍️';
    }
  };

  // Recommended service pairing triggers
  const getRecommendedServiceId = (category: string) => {
    switch (category) {
      case 'oil': return 'hair-colors';
      case 'treatment': return 'hair-keratin';
      case 'shampoo': return 'hair-care';
      case 'styling': return 'hair-botox';
      default: return 'hair-nanoplastia';
    }
  };

  const handleBookWithProduct = (product: Product) => {
    if (setPreselectedServiceId) {
      const recId = getRecommendedServiceId(product.category);
      setPreselectedServiceId(recId);
    }
    setCurrentPage('bookings');
    window.scrollTo({ top:0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="shop-page-wrapper">
      
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          addToCart={addToCart}
          onBookWithProduct={handleBookWithProduct}
          allProducts={PRODUCTS}
          setSelectedProduct={setSelectedProduct}
        />
      ) : (
        <>
          {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" /> Luxury Care Products
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-charcoal-deep leading-tight mt-1">
            Mosh Apothecary <br />
            <span className="font-serif italic text-salon-accent">& Professional Hair Care</span>
          </h1>
          <p className="text-xs text-charcoal-light font-sans mt-3 max-w-xl leading-relaxed">
            Enhance and protect your salon-grade glow at home. Explore internationally certified gold-standard therapies, restorative treatments, and organic styling elixirs recommended by our master artists.
          </p>
        </div>

        {/* Dynamic Shopping Bag Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-3 px-6 py-3.5 bg-charcoal-deep text-cream-soft rounded-full text-xs font-semibold hover:bg-salon-accent hover:text-white transition-all duration-300 shadow-md self-start md:self-auto group"
        >
          <ShoppingBag className="w-4 h-4 text-salon-accent group-hover:text-white transition-colors" />
          <span>My Shopping Bag</span>
          {totalCartItems > 0 ? (
            <span className="bg-salon-accent text-white font-sans text-[10px] font-extrabold px-2.5 py-1 rounded-full animate-bounce">
              {totalCartItems}
            </span>
          ) : (
            <span className="text-charcoal-light group-hover:text-white/80">Empty</span>
          )}
        </button>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 py-6 px-8 rounded-2xl bg-white border border-peach-dark/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-peach-light rounded-xl">
            <ShieldCheck className="w-5 h-5 text-salon-accent" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-charcoal-deep">100% Guaranteed Authentic</h4>
            <p className="text-[10px] text-charcoal-light">Exclusively imported premium formulas</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-x border-peach-light pt-3 sm:pt-0 sm:px-4">
          <div className="p-2.5 bg-peach-light rounded-xl">
            <Truck className="w-5 h-5 text-salon-accent" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-charcoal-deep">Free Islandwide Delivery</h4>
            <p className="text-[10px] text-charcoal-light">On orders over 15,000 LKR</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
          <div className="p-2.5 bg-peach-light rounded-xl">
            <RotateCcw className="w-5 h-5 text-salon-accent" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-charcoal-deep">Return & Exchange</h4>
            <p className="text-[10px] text-charcoal-light">7-day hassle-free unopened exchange</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8 bg-cream-soft/60 p-4 rounded-2xl border border-peach-dark/30">
        
        {/* Search input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-peach-dark/80 rounded-xl text-xs text-charcoal-deep focus:outline-none focus:border-salon-accent font-sans transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal-deep"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center w-full lg:w-auto">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'shampoo', label: 'Shampoo' },
            { id: 'oil', label: 'Oils & Serums' },
            { id: 'treatment', label: 'Treatments' },
            { id: 'styling', label: 'Styling Presets' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-sans transition-all duration-300 ${
                selectedCategory === tab.id
                  ? 'bg-salon-accent text-white shadow-sm shadow-salon-accent/25'
                  : 'bg-white hover:bg-peach-light text-charcoal-light border border-peach-light hover:text-salon-accent'
              }`}
            >
              {selectedCategory === tab.id && <span className="mr-1">{getCategoryEmoji(tab.id)}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-light" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-white border border-peach-dark rounded-xl text-xs text-charcoal-deep focus:outline-none focus:border-salon-accent font-sans"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-peach-dark">
          <ShoppingBag className="w-12 h-12 text-peach-dark/80 mx-auto mb-4 animate-bounce" />
          <h2 className="font-serif text-2xl text-charcoal-deep">No luxury products found</h2>
          <p className="text-xs text-charcoal-light mt-1 max-w-sm mx-auto">
            We couldn't find matches for "{searchQuery}". Try clearing some filter tabs or searching other key ingredients.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-6 px-6 py-2.5 bg-charcoal-deep text-cream-soft rounded-full text-xs font-semibold hover:bg-salon-accent hover:text-white transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layoutId={`prod-card-${product.id}`}
              className="group bg-white border border-peach-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Holder */}
              <div 
                onClick={() => setSelectedProduct(product)}
                className="relative h-64 bg-peach-light/30 overflow-hidden border-b border-peach-light cursor-pointer"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Popularity Badge */}
                {product.isPopular && (
                  <div className="absolute top-3 left-3 bg-charcoal-deep text-cream-soft text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <Star className="w-2.5 h-2.5 text-salon-accent animate-pulse fill-salon-accent" /> Popular
                  </div>
                )}

                {/* Stock Warning */}
                {product.stock <= 10 && (
                  <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-sm text-white text-[8px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-md">
                    Only {product.stock} left
                  </div>
                )}

                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="p-2.5 bg-white/95 backdrop-blur-sm hover:bg-salon-accent hover:text-white text-charcoal-deep rounded-full shadow-lg transition-all"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 text-[10px] text-charcoal-light font-sans tracking-wide uppercase">
                    <span>{product.brand}</span>
                    <span className="bg-peach-light text-salon-accent px-2 py-0.5 rounded text-[8px] font-bold">
                      {product.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedProduct(product)}
                    className="font-serif text-base text-charcoal-deep font-semibold mt-1.5 hover:text-salon-accent transition-colors line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-charcoal-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-2.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-charcoal-light font-sans font-medium">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-peach-light flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-charcoal-light block">COLOMBO UNIT</span>
                    <span className="font-mono text-xs font-extrabold text-charcoal-deep">
                      {product.priceLKR.toLocaleString()} LKR
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="p-2.5 bg-charcoal-deep hover:bg-salon-accent text-cream-soft hover:text-white rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs font-semibold px-4"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

        </>
      )}

      {/* Shopping Bag Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              {/* Dark overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-charcoal-deep/50 backdrop-blur-xs transition-opacity"
              />

              {/* Drawer Container */}
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="pointer-events-auto w-screen max-w-md"
                >
                  <div className="flex h-full flex-col bg-white shadow-2xl border-l border-peach-dark mt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 bg-cream-soft border-b border-peach-dark">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-salon-accent" />
                        <h2 className="font-serif text-lg font-medium text-charcoal-deep">Your Luxury Bag</h2>
                        <span className="bg-salon-accent text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-sans">
                          {totalCartItems}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 px-2.5 py-1 bg-charcoal-deep text-white hover:bg-salon-accent text-xs font-sans rounded-full transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Close
                      </button>
                    </div>

                    {/* Products list area */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-peach-light/40 flex items-center justify-center mb-4">
                            <ShoppingBag className="w-8 h-8 text-salon-accent" />
                          </div>
                          <p className="font-serif text-lg text-charcoal-deep">Your bag is empty</p>
                          <p className="text-[11px] text-charcoal-light mt-1 max-w-[220px]">
                            Add exquisite, professional formulas to your bag from our boutique catalog.
                          </p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-6 px-5 py-2.5 bg-charcoal-deep text-cream-soft text-xs font-semibold rounded-full hover:bg-salon-accent transition-all"
                          >
                            Explore Apothecary
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <button 
                            onClick={clearCart}
                            className="text-[10px] text-rose-500 hover:text-rose-600 font-semibold font-sans flex items-center gap-1 mt-1 ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Clear Cart
                          </button>

                          {cart.map(item => (
                            <div 
                              key={item.product.id}
                              className="flex items-center gap-4 bg-cream-soft/40 p-3 rounded-xl border border-peach-light"
                            >
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-16 h-16 rounded-lg object-cover bg-peach-light border border-peach-light"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1">
                                <span className="text-[8px] uppercase tracking-widest font-extrabold text-salon-accent font-sans">
                                  {item.product.brand}
                                </span>
                                <h4 className="text-xs font-serif text-charcoal-deep font-semibold line-clamp-1 leading-tight">
                                  {item.product.name}
                                </h4>
                                <p className="font-mono text-[11px] font-bold text-charcoal-light mt-1">
                                  {(item.product.priceLKR * item.quantity).toLocaleString()} LKR
                                </p>
                                
                                {/* Quantity Toggles */}
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.product.id, -1)}
                                    className="p-1 bg-white hover:bg-peach-light rounded border border-peach-light text-charcoal-deep"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-charcoal-deep">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.product.id, 1)}
                                    className="p-1 bg-white hover:bg-peach-light rounded border border-peach-light text-charcoal-deep"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-2 text-charcoal-light hover:text-rose-500 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Calculator */}
                    {cart.length > 0 && (
                      <div className="border-t border-peach-dark p-6 bg-cream-soft/80 space-y-4">
                        {/* Shipping Progress bar */}
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-sans font-bold text-charcoal-deep mb-1">
                            <span>Free Shipping Progress</span>
                            <span>{cartSubtotal > 15000 ? 'Unlocked!' : `${(15000 - cartSubtotal).toLocaleString()} LKR left`}</span>
                          </div>
                          <div className="w-full bg-peach-light h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-salon-accent h-full transition-all duration-500" 
                              style={{ width: `${Math.min((cartSubtotal / 15000) * 100, 100)}%` }}
                            />
                          </div>
                          <p className="text-[9px] text-charcoal-light mt-1">Unlocks free delivery above 15,000 LKR</p>
                        </div>

                        {/* Summary Math */}
                        <div className="space-y-1.5 text-xs text-charcoal-deep font-sans">
                          <div className="flex justify-between">
                            <span className="text-charcoal-light">Subtotal</span>
                            <span>{cartSubtotal.toLocaleString()} LKR</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-charcoal-light">Colombo Courier</span>
                            <span>{deliveryFee === 0 ? 'FREE' : `${deliveryFee} LKR`}</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm pt-2 border-t border-peach-light">
                            <span>Total Estimated</span>
                            <span className="text-salon-accent font-mono">{cartTotal.toLocaleString()} LKR</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            setIsCheckoutOpen(true);
                          }}
                          className="w-full py-3 bg-charcoal-deep hover:bg-salon-accent text-cream-soft hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 shadow flex items-center justify-center gap-2 mt-2"
                        >
                          Checkout Secure Delivery <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Secure Checkout Dialog */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-charcoal-deep/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-lg bg-cream-white rounded-3xl overflow-hidden shadow-2xl border border-peach-dark z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-2 bg-charcoal-deep text-white rounded-full hover:bg-salon-accent transition-colors shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {!checkoutSuccess ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent">Boutique Delivery</span>
                    <h3 className="font-serif text-2xl text-charcoal-deep leading-tight mt-0.5">Secure Checkout</h3>
                    <p className="text-[10px] text-charcoal-light leading-relaxed mt-1">
                      Provide details below to ship your professional hair formulas straight to your doorstep (Cash on Delivery / Card readers on arrival).
                    </p>
                  </div>

                  {/* Pricing brief */}
                  <div className="bg-cream-soft p-3 rounded-xl border border-peach-light text-xs font-sans text-charcoal-deep flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-charcoal-light uppercase font-semibold">Shipping Order</p>
                      <p className="font-bold">{totalCartItems} exquisite products</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-charcoal-light uppercase font-semibold">Total Cost</p>
                      <p className="font-mono text-salon-accent font-extrabold text-sm">{cartTotal.toLocaleString()} LKR</p>
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="space-y-3.5 text-left text-xs font-sans">
                    <div>
                      <label className="block text-charcoal-deep font-semibold mb-1">
                        Full Name <span className="text-salon-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dilum Silva"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 mt-1 bg-white border border-peach-dark/80 rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-charcoal-deep font-semibold mb-1">
                          Phone Number <span className="text-salon-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +94 77 123 4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-3.5 py-2 mt-1 bg-white border border-peach-dark/80 rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                        />
                      </div>
                      <div>
                        <label className="block text-charcoal-deep font-semibold mb-1">
                          Delivery City <span className="text-salon-accent">*</span>
                        </label>
                        <select
                          value={deliveryCity}
                          onChange={(e) => setDeliveryCity(e.target.value)}
                          className="w-full px-3.5 py-2 mt-1 bg-white border border-peach-dark/80 rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                        >
                          <option value="Colombo">Colombo (1-2 Days)</option>
                          <option value="Gampaha">Gampaha (2-3 Days)</option>
                          <option value="Kandy">Kandy (3 Days)</option>
                          <option value="Galle">Galle (3 Days)</option>
                          <option value="Jaffna">Jaffna (4 Days)</option>
                          <option value="Other">Other island areas</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-charcoal-deep font-semibold mb-1">
                        Delivery Address <span className="text-salon-accent">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="No. 45, Alfred House Gardens, Colombo 03"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3.5 py-2 mt-1 bg-white border border-peach-dark/80 rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                      />
                    </div>

                    <div>
                      <label className="block text-charcoal-light font-semibold mb-1">
                        Instructions / Gate Codes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Deliver after 5 PM please."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2 mt-1 bg-white border border-peach-dark/80 rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex-1 py-3 border border-peach-dark text-charcoal-deep rounded-xl text-xs font-semibold hover:bg-peach-light transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-charcoal-deep text-cream-soft rounded-xl text-xs font-semibold hover:bg-salon-accent hover:text-white transition-colors"
                    >
                      Place Delivery Order
                    </button>
                  </div>
                </form>
              ) : (
                // Success Voucher Receipt (Aesthetic Design)
                <div className="text-center space-y-5 py-4 font-sans text-charcoal-deep">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-600 font-extrabold">Order Placed Successfully</span>
                    <h2 className="font-serif text-2xl font-normal text-charcoal-deep mt-0.5">Order Confirmed!</h2>
                    <p className="text-[11px] text-charcoal-light mt-1 max-w-sm mx-auto">
                      Thank you for trusting Mosh.Lk. Your boutique delivery has been logged in our queue and is already packing.
                    </p>
                  </div>

                  {/* Voucher Box */}
                  <div className="p-5 bg-white border border-peach-dark/80 rounded-2xl text-left text-xs space-y-2 max-w-md mx-auto shadow-sm tracking-wide relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-salon-accent" />
                    
                    <div className="flex justify-between text-[10px] font-bold text-charcoal-light">
                      <span>MOSH LUXURY PRODUCTS SHOP</span>
                      <span>RECEIPT</span>
                    </div>

                    <div className="border-b border-dashed border-peach-light pb-2.5 pt-1 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] text-charcoal-light block">VOUCHER NUMBER</span>
                        <span className="font-mono text-xs font-bold text-charcoal-deep">{generatedOrderNumber}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-charcoal-light block">SHIPPING TO</span>
                        <span className="font-sans text-xs font-bold text-salon-accent">{deliveryCity}</span>
                      </div>
                    </div>

                    {/* Bought Products list */}
                    <div className="space-y-1.5 py-1 text-[11px] text-charcoal-deep">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="line-clamp-1 flex-1 pr-10">{item.product.name} <strong className="text-salon-accent">x{item.quantity}</strong></span>
                          <span className="font-mono">{(item.product.priceLKR * item.quantity).toLocaleString()} LKR</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-peach-light pt-2.5 flex justify-between font-extrabold text-charcoal-deep">
                      <span>Total Invoice</span>
                      <span className="text-salon-accent font-mono text-sm">{cartTotal.toLocaleString()} LKR</span>
                    </div>

                    <div className="bg-peach-light/40 rounded-xl p-3 text-[10px] space-y-1 mt-3">
                      <p>👤 <strong>Recipient:</strong> {fullName}</p>
                      <p>📞 <strong>Phone:</strong> {phoneNumber}</p>
                      <p>📍 <strong>Address:</strong> {deliveryAddress}</p>
                    </div>
                  </div>

                  <button
                    onClick={resetCheckout}
                    className="w-full py-3 bg-charcoal-deep rounded-xl text-xs font-semibold text-cream-soft hover:bg-salon-accent hover:text-white transition-colors"
                  >
                    Done & Return to Boutique
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
