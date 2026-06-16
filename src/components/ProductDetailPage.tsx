import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, Star, ShoppingBag, Plus, Minus, ShieldCheck, 
  Truck, RotateCcw, CalendarDays, Check, Sparkles, MessageSquare, 
  User, Send, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  addToCart: (product: Product, quantity: number) => void;
  onBookWithProduct: (product: Product) => void;
  allProducts: Product[];
  setSelectedProduct: (product: Product) => void;
}

interface UserReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

// Generate realistic luxury salon reviews based on product category
const getStaticReviewsForProduct = (productId: string, productName: string): UserReview[] => {
  if (productId.includes('lisse')) {
    return [
      {
        id: 'rev-1',
        author: 'Samanthie K.',
        rating: 5,
        date: 'June 02, 2026',
        comment: `Absolutely gorgeous results! In combination with my Keratin Therapy treatment at Mosh, this has managed to lock out the heavy Colombo monsoon humidity completely. My blow-outs now stay silky and straight for days instead of hours.`,
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Nisansala P.',
        rating: 5,
        date: 'May 14, 2026',
        comment: `Highly recommended by my senior stylist at Ramada branch. It doesn't weigh down fine strands and smells divine. Worth every single rupee.`,
        verified: true
      },
      {
        id: 'rev-3',
        author: 'Gayatri D.',
        rating: 4,
        date: 'April 28, 2026',
        comment: `Excellent maintenance shampoo and oil bundle. Keeps hair looking freshly colored and keeps frizz at bay.`,
        verified: true
      }
    ];
  } else if (productId.includes('cristalli') || productId.includes('lino') || productId.includes('sdl')) {
    return [
      {
        id: 'rev-1',
        author: 'Mahesha R.',
        rating: 5,
        date: 'June 09, 2026',
        comment: `The Cristalli Liquid serum is the holy grail. Just two drops onto wet ends completely transforms dull texture into a diamond glow. I get compliments on my hair shine every single day now!`,
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Fathima S.',
        rating: 5,
        date: 'May 22, 2026',
        comment: `Sulfate-free, gentle on my dry, colored curls. The reconstruction low shampoo works miracles for bleach-damaged strands. Highly recommend!`,
        verified: true
      }
    ];
  } else if (productId.includes('pure') || productId.includes('dibi') || productId.includes('acid')) {
    return [
      {
        id: 'rev-1',
        author: 'Sheruni W.',
        rating: 5,
        date: 'May 30, 2026',
        comment: `DIBI Milano is elite. After using this sebum-balancing anti-impurity fluid, my shiny T-zone is completely matte and balanced. This luxury skincare formula is an absolute game-changer.`,
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Anura G.',
        rating: 5,
        date: 'April 19, 2026',
        comment: `Rich and restorative restructuring cream. I use it before walking out into the hot midday sun – my dry skin has never felt so hydrated and shielded. Highly recommend this premium brand.`,
        verified: true
      }
    ];
  } else {
    return [
      {
        id: 'rev-1',
        author: 'Heshani M.',
        rating: 5,
        date: 'June 01, 2026',
        comment: `Truly professional formula that makes a noticeable difference. Smells incredible and leaves a silky residue-free feel. Mosh always delivers the grandest authentic salon products!`,
        verified: true
      }
    ];
  }
};

export default function ProductDetailPage({ 
  product, 
  onBack, 
  addToCart, 
  onBookWithProduct, 
  allProducts,
  setSelectedProduct
}: ProductDetailPageProps) {
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ritual' | 'ingredients'>('benefits');
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Load static reviews when the active product changes
  useEffect(() => {
    setReviews(getStaticReviewsForProduct(product.id, product.name));
    setQuantity(1);
    setWriteReviewOpen(false);
    setReviewSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Handle plus / minus quantity
  const handleQtyChange = (delta: number) => {
    const nextQty = quantity + delta;
    if (nextQty >= 1 && nextQty <= Math.min(product.stock, 10)) {
      setQuantity(nextQty);
    }
  };

  // Add all selected quantities to general shopping cart
  const handleAddQtyToCart = () => {
    addToCart(product, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 2000);
  };

  // Handle new review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const addedReview: UserReview = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Today',
      comment: newComment.trim(),
      verified: true
    };

    setReviews(prev => [addedReview, ...prev]);
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => {
      setWriteReviewOpen(false);
      setReviewSuccess(false);
    }, 2500);
  };

  // Safe category mapper
  const getReadableCategory = (cat: string) => {
    switch (cat) {
      case 'oil': return 'Nourishing Serum & Oils';
      case 'treatment': return 'Professional Hair & Skin Treatment';
      case 'shampoo': return 'Reparative Shampoo';
      case 'styling': return 'High-Hold Styling Clay';
      default: return 'Luxury Skincare Core';
    }
  };

  // Filter dynamic matched related items matching category or brand
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8" id="product-detail-page-wrapper">
      
      {/* 1. Back and Breadcrumbs Navigation bar */}
      <nav className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-peach-light pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 group text-xs font-semibold text-charcoal-deep hover:text-salon-accent transition-colors duration-200 self-start"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
          <span>Back to All Products</span>
        </button>

        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-charcoal-light font-sans">
          <span>Apothecary</span>
          <span className="text-peach-dark">/</span>
          <span>{product.brand}</span>
          <span className="text-peach-dark">/</span>
          <span className="text-salon-accent font-bold truncate max-w-[170px]">{product.name}</span>
        </div>
      </nav>

      {/* 2. Main Double-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16">
        
        {/* Left column: Luxury Image Vault with Zoom */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-peach-light/20 aspect-video md:aspect-square overflow-hidden rounded-3xl border border-peach-dark/60 shadow-sm group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {product.isPopular && (
              <div className="absolute top-4 left-4 bg-charcoal-deep text-cream-soft text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-salon-accent fill-salon-accent" />
                Popular Formula
              </div>
            )}

            {product.stock <= 8 && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-md shadow-md animate-pulse">
                Low Stock • Only {product.stock} Left
              </div>
            )}
          </div>

          {/* Boutique Brand Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-cream-soft/60 border border-peach-light rounded-2xl">
            <div className="flex items-center gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-salon-accent flex-shrink-0" />
              <div className="font-sans leading-tight">
                <span className="block text-[10px] font-extrabold text-charcoal-deep uppercase tracking-wider">100% Authentic</span>
                <span className="text-[9px] text-charcoal-light block">Direct Import Certified</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-left border-l border-peach-light pl-3">
              <Award className="w-4 h-4 text-salon-accent flex-shrink-0" />
              <div className="font-sans leading-tight">
                <span className="block text-[10px] font-extrabold text-charcoal-deep uppercase tracking-wider">Luxury Standard</span>
                <span className="text-[9px] text-charcoal-light block">Tested & Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Editorial Typography Details */}
        <div className="lg:col-span-7 flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans px-3 py-1 bg-peach-light/45 rounded-full inline-block">
              {product.brand} • {getReadableCategory(product.category)}
            </span>

            <h1 className="font-serif text-3xl md:text-4.5xl font-normal text-charcoal-deep mt-3 leading-tight">
              {product.name}
            </h1>

            {/* Price & Rating Row */}
            <div className="flex flex-wrap items-center gap-4 mt-4 border-b border-peach-light/60 pb-5">
              <span className="font-mono text-2xl font-extrabold text-charcoal-deep bg-cream-soft px-4 py-1.5 rounded-xl border border-peach-dark/20">
                {product.priceLKR.toLocaleString()} LKR
              </span>

              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-charcoal-light font-sans font-medium">
                  {product.rating}.0 ({product.reviewsCount} verified clients)
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-charcoal-light leading-relaxed font-sans mt-5">
              {product.description}
            </p>

            {/* 4. Quantity and Checkout Action Row */}
            <div className="mt-6 pt-5 border-t border-peach-light/80 block md:flex md:items-center md:justify-between gap-6 pb-5">
              
              {/* Volumetric Quantity Selector */}
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <span className="text-xs font-semibold text-charcoal-deep font-sans">Quantity:</span>
                <div className="inline-flex items-center bg-white border border-peach-dark rounded-xl px-2 py-1 shadow-xs">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    className="p-1 px-2.5 text-charcoal-deep hover:text-salon-accent disabled:opacity-30 disabled:hover:text-charcoal-deep transition-colors text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-bold text-charcoal-deep">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-1 px-2.5 text-charcoal-deep hover:text-salon-accent disabled:opacity-30 disabled:hover:text-charcoal-deep transition-colors text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[9px] text-charcoal-light font-sans font-medium h-4">
                  ({product.stock} units available)
                </span>
              </div>

              {/* Direct Multi-item Checkout CTA */}
              <div className="flex-1 max-w-sm">
                <button
                  onClick={handleAddQtyToCart}
                  className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wide transition-all shadow flex items-center justify-center gap-2 ${
                    isAddedFeedback 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-charcoal-deep text-cream-soft hover:bg-salon-accent hover:text-white'
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-white animate-bounce" />
                      <span>Added {quantity} items to shopping bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {quantity} {quantity === 1 ? 'Item' : 'Items'} To My Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Interactive Tabbed Detail Section */}
            <div className="mt-4 border-t border-peach-light/80 pt-6">
              {/* Tab Header */}
              <div className="flex border-b border-peach-light">
                {[
                  { id: 'benefits', label: 'Key Benefits' },
                  { id: 'ritual', label: 'Use Ritual' },
                  { id: 'ingredients', label: 'Ingredients Info' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-2.5 px-4 text-xs font-semibold font-sans transition-all relative ${
                      activeTab === tab.id
                        ? 'text-salon-accent'
                        : 'text-charcoal-light hover:text-charcoal-deep'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-salon-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-4 text-[11px] text-charcoal-light leading-relaxed font-sans min-h-[140px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2 list-disc list-inside text-charcoal-deep">
                    <li><strong className="text-salon-accent">Sulfate & Paraben Free:</strong> Gentle protective layout that preserves natural lipid balances.</li>
                    <li><strong className="text-salon-accent">Colombo Humidity Lockout:</strong> Controls frizz even in extreme multi-monsoon tropical climates.</li>
                    <li><strong className="text-salon-accent">Immediate Reflective Luster:</strong> Restores cuticle cohesion, achieving instant glass-like diamond glimmers.</li>
                    <li><strong className="text-salon-accent">Fragrance Accents:</strong> Light floral bouquet notes infused with organic therapeutic oils.</li>
                  </ul>
                )}
                
                {activeTab === 'ritual' && (
                  <p className="text-charcoal-deep bg-cream-soft/60 p-4 rounded-xl border border-peach-light">
                    💧 <strong>The Professional Ritual:</strong> Apply a hazelnut-sized drop into your palms. Emulsify well between your fingers. Distribute with uniform coverage through clean towel-dried lengths, centering explicitly on fragile tips. Blow-dry or dry naturally. For maximum restoration, configure with our signature hot-oil steam treatments weekly.
                  </p>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="font-semibold text-charcoal-deep mb-1">Authentic Laboratory Formulation:</p>
                    <p>Features certified Kera-Collagen Complex (hydrolysed keratin and quaternised collagen) combined with pristine Amazonian Babassu Oil, Vitamin F, and highly persistent structural lipids. 100% free of sodium chloride, dangerous sulfates, artificial parabens, or aggressive mechanical allergens.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Book Matched Salon Service Cross-Sell */}
            <div className="mt-2 p-4 rounded-2xl bg-peach-light/25 border border-dashed border-salon-accent/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[8px] bg-salon-accent text-white font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
                  Signature Matched Pairing
                </span>
                <p className="text-[11px] text-charcoal-deep font-semibold mt-1">
                  Amplify your home formulas with an in-salon therapy!
                </p>
                <p className="text-[9px] text-charcoal-light mt-0.5 leading-tight">
                  Book a matching luxury therapy to yield professional texture reconstruction.
                </p>
              </div>
              <button
                onClick={() => onBookWithProduct(product)}
                className="px-4 py-2 bg-salon-accent text-white hover:bg-charcoal-deep text-[10px] font-extrabold uppercase tracking-wide rounded-xl shadow-md transition-colors self-start md:self-auto"
              >
                Book Accompanying Service
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Verified Customer Testimonials Segment with Live Submission */}
      <section className="border-t border-peach-light pt-12 mb-16 text-left">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent">Client Transparency</span>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal-deep mt-0.5">
              Verified Reviews & Testimonials
            </h2>
          </div>
          <button
            onClick={() => setWriteReviewOpen(!writeReviewOpen)}
            className="px-4 py-2 border border-peach-dark text-charcoal-deep hover:bg-peach-light rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" /> 
            {writeReviewOpen ? 'Close Form' : 'Write A Review'}
          </button>
        </div>

        {/* Live Writer Drawer Accordion */}
        <AnimatePresence>
          {writeReviewOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-cream-soft/50 rounded-2xl border border-peach-dark/60 p-5 md:p-6 mb-8 max-w-xl"
            >
              {reviewSuccess ? (
                <div className="text-center py-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                    <Check className="w-5 h-5" />
                  </span>
                  <p className="text-xs font-bold text-charcoal-deep">Thank you for sharing!</p>
                  <p className="text-[10px] text-charcoal-light mt-0.5">Your glowing verified client review has been registered successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-charcoal-deep font-bold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini Silva"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-peach-dark rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-deep font-bold mb-1">Rating</label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-peach-dark rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                      >
                        <option value={5}>🌟🌟🌟🌟🌟 Excellent (5/5)</option>
                        <option value={4}>🌟🌟🌟🌟 Great (4/5)</option>
                        <option value={3}>🌟🌟🌟 Average (3/5)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-charcoal-deep font-bold mb-1">Comments / Experience details</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="My hair felt instantly smoother after the first rinse..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-peach-dark rounded-xl focus:outline-none focus:border-salon-accent text-charcoal-deep"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-charcoal-deep hover:bg-salon-accent text-cream-soft hover:text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> Post Verified Review
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(rev => (
            <div 
              key={rev.id} 
              className="bg-white p-5 rounded-2xl border border-peach-dark/50 flex flex-col justify-between"
            >
              <div>
                {/* Score rating in stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gray-200" />
                    ))}
                  </div>
                  <span className="text-[9px] text-charcoal-light font-mono uppercase tracking-wider">{rev.date}</span>
                </div>

                <p className="text-[11px] text-charcoal-deep leading-relaxed mt-3.5 italic font-sans">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-peach-light/40 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-peach-light flex items-center justify-center text-salon-accent text-[9px] font-extrabold uppercase">
                    {rev.author[0]}
                  </div>
                  <span className="font-semibold text-charcoal-deep">{rev.author}</span>
                </div>
                {rev.verified && (
                  <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-200/50 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Horizontal Related Apothecary Discoveries */}
      {relatedProducts.length > 0 && (
        <section className="bg-cream-soft/30 border border-peach-dark rounded-3xl p-6 md:p-10 text-left">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[9px] font-extrabold uppercase text-salon-accent tracking-widest font-sans flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-salon-accent fill-salon-accent" />
              Bespoke Explorations
            </span>
            <h2 className="font-serif text-2xl md:text-3.5xl font-normal text-charcoal-deep mt-1 leading-tight">
              Related Beauty Discoveries
            </h2>
            <p className="text-[10px] text-charcoal-light mt-1 mb-2 font-mono uppercase tracking-wider">
              Perfect pairings based on your active selection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group cursor-pointer bg-white border border-peach-dark/80 rounded-2xl overflow-hidden p-3.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo frame */}
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-peach-light/20 border border-peach-light">
                    <img 
                      src={p.imageUrl} 
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="text-[8px] font-bold text-salon-accent uppercase block tracking-wider">{p.brand}</span>
                    <h4 className="font-serif text-xs font-semibold text-charcoal-deep group-hover:text-salon-accent transition-colors mt-0.5 line-clamp-1">
                      {p.name}
                    </h4>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-peach-light/60 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold text-charcoal-deep">
                    {p.priceLKR.toLocaleString()} LKR
                  </span>
                  <span className="text-[9px] text-salon-accent font-semibold inline-flex items-center gap-0.5">
                    View product →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
