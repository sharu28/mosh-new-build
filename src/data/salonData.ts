import { Service, Stylist, GalleryItem, QuizQuestion, FaqItem, Product } from '../types';

export const SERVICES: Service[] = [
  // ==================== HAIR SERVICES ====================
  {
    id: 'hair-keratin',
    name: 'Silk-Infused Keratin Repair',
    category: 'hair',
    priceLKR: 32500,
    durationMinutes: 150,
    description: 'Bespoke bond-repairing keratin formula designed to fortify broken cuticles, seal hydration, and eliminate tropical frizz for silky-straight glass hair.',
    tagline: 'mosh.lk/keratin',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-colors',
    name: 'Mosh Signature High-Gloss Color & Balayage',
    category: 'hair',
    priceLKR: 21500,
    durationMinutes: 120,
    description: 'Exquisite hand-painted highlights and multi-dimensional pigmentation. Formulated with protective oils to protect base follicle integrity.',
    tagline: 'mosh.lk/Haircolors',
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-nanoplastia',
    name: 'Advanced Nanoplastia Straightening & Repair',
    category: 'hair',
    priceLKR: 42000,
    durationMinutes: 180,
    description: 'Biological, amino-acid based straightening therapy that restructures hair at a cellular level, restoring high-gloss mirror shine without harsh chemicals.',
    tagline: 'mosh.lk/nanoplastia',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-botox',
    name: 'Capillary Hair Botox Plumping',
    category: 'hair',
    priceLKR: 29000,
    durationMinutes: 120,
    description: 'An anti-aging thermal treatment infused with collagen and botanical oils. Deeply replumps hollow fibers, restoring incredible density and spring.',
    tagline: 'mosh.lk/Botox',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-care',
    name: 'Deep Hydration Steam & Scalp Care',
    category: 'hair',
    priceLKR: 9500,
    durationMinutes: 45,
    description: 'Restorative scalp cleanse coupled with ultrasonic micro-mist steam infusion. Rebalances dry, tense crowns and locks organic shine.',
    tagline: 'mosh.lk/haircare',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'
  },

  // ==================== SKIN SERVICES ====================
  {
    id: 'skin-acne',
    name: 'Oxygenating Acne Erase Facial',
    category: 'skin',
    priceLKR: 16500,
    durationMinutes: 75,
    description: 'Clinical-grade extraction with organic salicylic complexes and blue light therapy to purify inflamed pores and restore clear cell structure.',
    tagline: 'mosh.lk/acnetreatment',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-whitescience',
    name: 'Dermal White Science Brightening Peel',
    category: 'skin',
    priceLKR: 19500,
    durationMinutes: 90,
    description: 'Advanced whitening and tone harmonization therapy. Safely targets sun damage, hyperpigmentation, and blemishes for immediate luminescence.',
    tagline: 'mosh.lk/Whitescience',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-glassskin',
    name: 'Ultimate Korean Glass Skin Treatment',
    category: 'skin',
    priceLKR: 24000,
    durationMinutes: 90,
    description: 'Multistage pore-tightening treatment involving double cleansing, peptide-enrichment masks, and ice-globe lifting to achieve that coveted moist, translucent finish.',
    tagline: 'mosh.lk/koreanglassskin',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-hydra',
    name: 'High-End Mosh HydraFacial Luxe',
    category: 'skin',
    priceLKR: 21000,
    durationMinutes: 60,
    description: 'Patented hydra-peeling tip exfoliation that deep-vacuums sebum while infusing customized vitamins and antioxidant serum boosters into the dermis.',
    tagline: 'mosh.lk/hydrafacial',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-antiaging',
    name: 'Micro-Current Sculpting Anti-Aging Lift',
    category: 'skin',
    priceLKR: 27500,
    durationMinutes: 80,
    description: 'Lymphatic muscle stimulation and hyaluronic micro-fillers combined to iron out fine expression lines and dramatically contour sagging jawlines.',
    tagline: 'mosh.lk/antiaging',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-microneedling',
    name: 'Fractional Micro Needling Collagen therapy',
    category: 'skin',
    priceLKR: 32500,
    durationMinutes: 90,
    description: 'Precision collagen induction therapy using sterilized needle pens to repair deep acne scars, minimize enlarged pores, and tighten skin tissue.',
    tagline: 'mosh.lk/microneedling',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },

  // ==================== SLIMMING SERVICES ====================
  {
    id: 'slimming-fatfreezing',
    name: 'Elite Cryolipolysis Fat Freezing',
    category: 'slimming',
    priceLKR: 45000,
    durationMinutes: 60,
    description: 'Non-invasive fat-freezing cups which target and break down stubborn fat cells in key target fields without zero downtime or pain.',
    tagline: 'mosh.lk/Fatfreezing',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-ems',
    name: 'High-Intensity Electro-Muscle Slimming (EMS)',
    category: 'slimming',
    priceLKR: 22000,
    durationMinutes: 45,
    description: 'Neuromuscular stimulation generating thousands of targeted passive contractions to sculpt, tone, and firm core abdominal or thigh muscles.',
    tagline: 'mosh..lk/ems',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-cavitation',
    name: 'Ultrasonic Cavitation Cellulite reduction',
    category: 'slimming',
    priceLKR: 18000,
    durationMinutes: 50,
    description: 'Dual-frequency acoustic shockwaves used to liquefy stubborn subcutaneous fat walls. Extremely effective for smoothing hips and thighs.',
    tagline: 'mosh.lk/Cavitation',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-doublechin',
    name: 'Double Chin Laser & Jaw Contouring',
    category: 'slimming',
    priceLKR: 14500,
    durationMinutes: 45,
    description: 'Focused micro-laser thermal therapy designed to melt submental fat and tighten loose sagging tissue around the throat and jawline.',
    tagline: 'mosh.lk/doublechin',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-tummyslimming',
    name: 'Core Tummy Slimming Organic Herbal Wrap',
    category: 'slimming',
    priceLKR: 26000,
    durationMinutes: 60,
    description: 'Infrared moisture detox wrap incorporating heat-activated botanical enzymes to rapidly drain fluid retention and flatten abdominal lines.',
    tagline: 'mosh.lk/tummyslimming',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-lipolaser',
    name: 'Lipo Laser Adipose Contouring',
    category: 'slimming',
    priceLKR: 28000,
    durationMinutes: 60,
    description: 'Low-level laser pads emit red wavelengths to trigger chemical breakdown of stored triglycerides, promoting rapid fat release from target zones.',
    tagline: 'mosh.lk/lipolaser',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },

  // ==================== WEDDINGS & BRIDAL ====================
  {
    id: 'bridal-royal',
    name: 'Royal Sri Lankan Bridal Luxury Package',
    category: 'bridal',
    priceLKR: 85000,
    durationMinutes: 240,
    description: 'Masterpiece bridal makeup with HD airbrush finish, traditional Kandyan frill drape work, styling hair pins, crown placement and 3-week trial session.',
    tagline: 'mosh.lk/wedding - Brides By Mosh',
    imageUrl: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bridal-traditional',
    name: 'Brides By Mosh Traditional Kandyan / Western',
    category: 'bridal',
    priceLKR: 72000,
    durationMinutes: 180,
    description: 'A beautifully curated traditional Kandyan, Indian or elegant Western bridal package. Includes custom high-definition makeup, meticulous flower hair-weaving, and drape set-up by our master drapers.',
    tagline: 'mosh.lk/bridesbymosh',
    imageUrl: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bridal-party',
    name: 'Mosh Bridesmaid & Party Glow Up',
    category: 'bridal',
    priceLKR: 35000,
    durationMinutes: 120,
    description: 'Elite hair updos, soft ambient makeup, and dupatta/saree draping for bridesmaids and family members to harmonize with the wedding theme.',
    tagline: 'Bridal Party Support',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'groom-royal',
    name: 'Grooms By Mosh Gentlemen Grooming Luxe',
    category: 'bridal',
    priceLKR: 24000,
    durationMinutes: 95,
    description: 'Elite grooming package for the modern groom. Includes a precision haircut, beard trim sculpting, oxygen-infrared micro-peel facial, and executive hand manicure.',
    tagline: 'mosh.lk/Groomsbymosh',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'emma-rose',
    name: 'Emma Rose',
    role: 'Lead Stylist',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    reviewsCount: 342,
    specialty: 'Precision Cuts & Luxury Redesigns',
    bio: 'With over 12 years of international experience across Europe and Sri Lanka, Emma specializes in structural precision cuts and creating effortless, modern hair shapes.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableHours: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  },
  {
    id: 'sophia-lane',
    name: 'Sophia Lane',
    role: 'Color Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviewsCount: 289,
    specialty: 'Handpainted Balayage & Bright Highlights',
    bio: 'Sophia is certified by global color academies. She is praised for customizing multi-dimensional tones that protect hair integrity while producing dazzling depth.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
    availableHours: ['09:30 AM', '10:30 AM', '11:30 AM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM']
  },
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    role: 'Hair Treatment Expert',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    reviewsCount: 198,
    specialty: 'Steam Rituals & Keratin Reconstruction',
    bio: 'Jane understands the intricate biological composition of hair. She develops personalized detoxifying and bond-reconstruction rituals for chemically processed hair.',
    availableDays: ['Monday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'],
    availableHours: ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
  },
  {
    id: 'olivia-tate',
    name: 'Olivia Tate',
    role: 'Blowout & Styling Artist',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviewsCount: 156,
    specialty: 'High-Volume Blowouts & Bridal Draping',
    bio: 'An artist at sculpture, Olivia shapes high-fashion volume locks, soft waves, and stunning traditional bridal updos that stay immaculately in place all day.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    availableHours: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Warm Honey Balayage Makeover',
    category: 'Color Transformation',
    description: 'Shifted a dull, flat dark brown dye into a seamless, multi-tonal handpainted warm golden honey balayage with structural framing.',
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80',
    clientName: 'Nipuni Perera',
    reviewText: 'Mosh totally revived my dull locks! The honey tone is beautifully personalized to match my skin tone perfectly, and the hair texture feels even softer than before!',
    rating: 5
  },
  {
    id: 'g-2',
    title: 'Textured Bob & Fringe Sculpting',
    category: 'Cut & Re-Style',
    description: 'We carved heavy weight off thick frizzy hair to create an airy, highly structural layered bob with wispy customized fringe.',
    imageUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324d48?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324d48?auto=format&fit=crop&w=800&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80',
    clientName: 'Dilani Alwis',
    reviewText: 'Emma Rose is an absolute magician with shears. My thick hair always felt bulky, but now it has gorgeous natural flow and looks so luxury!',
    rating: 5
  },
  {
    id: 'g-3',
    title: 'Keratin Damage Recovery Ritual',
    category: 'Treatment Cure',
    description: 'Restructured dry, highly porous, bleached blonde hair into a reflective and resilient protective silk wrap.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    clientName: 'Sanduni Fernando',
    reviewText: 'My bleach-ruined curls were snap-breaking when combed. After Jane’s reconstruction treatment, they look incredibly healthy and hold waves again!',
    rating: 5
  }
];

export const CONSULTATION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    text: 'What primary hair concern would you like to address today?',
    options: [
      { id: '1-a', text: 'Dry, brittle, or frizzy locks', description: 'Feels sandpaper-dry, expands in Sri Lanka’s humidity', serviceTag: 'hair-care' },
      { id: '1-b', text: 'Damage from heavy bleaching or heat', description: 'Breakages, split ends, looks dull and lifeless', serviceTag: 'hair-keratin' },
      { id: '1-c', text: 'Flat hair needing volume and definition', description: 'Lacks density, lies lifeless against the forehead', serviceTag: 'hair-botox' },
      { id: '1-d', text: 'Seeking a total change in style or shape', description: 'Ready for an advanced biological straightening transformation', serviceTag: 'hair-nanoplastia' }
    ]
  },
  {
    id: 2,
    text: 'What is your hair history regarding chemical coloring?',
    options: [
      { id: '2-a', text: 'Virgin hair (Never colored)', description: 'Full organic structure, easy to illuminate', serviceTag: 'hair-colors' },
      { id: '2-b', text: 'Previously dyed with dark pigments', description: 'Requires gentle lifting to avoid structural damage', serviceTag: 'hair-colors' },
      { id: '2-c', text: 'Bleached blonde or highlighted', description: 'Prone to brassiness; requires custom bond protection', serviceTag: 'hair-keratin' },
      { id: '2-d', text: 'Frequent styling with straighteners/blowers', description: 'Needs high thermal defense and structural bounce', serviceTag: 'hair-botox' }
    ]
  },
  {
    id: 3,
    text: 'How much style maintenance fits your routine?',
    options: [
      { id: '3-a', text: 'High maintenance (Loving regular touch-ups)', description: 'I enjoy visiting the salon every 4-6 weeks', serviceTag: 'hair-colors' },
      { id: '3-b', text: 'Low maintenance but premium color', description: 'I prefer seamlessly blended roots that grow out naturally', serviceTag: 'hair-colors' },
      { id: '3-c', text: 'Wash-and-go with simple shape', description: 'I want a style that effortlessly frames without hours of work', serviceTag: 'hair-nanoplastia' }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'How often should I get a professional haircut?',
    answer: 'For maintaining shape, health, and clean structural ends, we recommend scheduling a subtle refinement trim every 6 to 8 weeks. If you are growing it out, this can extend to 10 weeks with hydration steam rituals.'
  },
  {
    question: 'Do you offer custom damage cures for Sri Lanka’s humidity?',
    answer: 'Absolutely! Our Bond-Repair Reconstruction and Deep Hydration Steam Rituals are specifically tailored to shield blocky cuticles from tropical humidity. Your hair is infused with moisture barriers that keep it smooth, bouncy, and frizz-free.'
  },
  {
    question: 'Can I book custom consultations online?',
    answer: 'Yes! Our digital booking calendar allows you to draft services, choose your preferred stylist, and pick an hour that matches your agenda. You will receive an immediate confirmation upon completion.'
  },
  {
    question: 'Which hair colors work best for warmer skin tones?',
    answer: 'Our experts customize color molecules based on your base undertones. Rich caramels, warm golden honeys, deep bronzes, and customized copper tones perform exceptionally well, creating a gorgeous radiant sun-kissed reflection.'
  },
  {
    question: 'Do you use professional hair products that avoid damage?',
    answer: 'We exclusively work with premium, internationally certified organic and premium brands (like L’Oréal Professionnel, Kérastase, Olaplex) to fully preserve hair integrity while yielding highly saturated colors.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-kerastase-elixir',
    name: 'Elixir Ultime L\'Huile Originale',
    brand: 'Kérastase',
    priceLKR: 18500,
    description: 'Iconic golden hair oil that deeply nourishes dry hair and provides long-lasting humidity protection, silky gloss, and frizz control.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 148,
    category: 'oil',
    isPopular: true,
    stock: 24
  },
  {
    id: 'prod-olaplex-no3',
    name: 'No. 3 Hair Perfector Treatment',
    brand: 'Olaplex',
    priceLKR: 12800,
    description: 'The global gold-standard chemical bond builder. Restores structural integrity, repairs extreme bleach damage, and stops breakage.',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 215,
    category: 'treatment',
    isPopular: true,
    stock: 18
  },
  {
    id: 'prod-kerastase-ciment',
    name: 'Résistance Ciment Thermique Blow-dry Milk',
    brand: 'Kérastase',
    priceLKR: 14200,
    description: 'Reconstructive blow-dry primer cream. Fortifies fragile hair fibers from heat design tools up to 180°C and styles perfectly.',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 94,
    category: 'styling',
    isPopular: true,
    stock: 12
  },
  {
    id: 'prod-loreal-detox',
    name: 'Metal Detox Protective Shampoo',
    brand: 'L\'Oréal Professionnel',
    priceLKR: 9600,
    description: 'Sulfate-free protective cleanser that removes copper and iron particles from local water to prevent breakages and lock colored glow.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 130,
    category: 'shampoo',
    isPopular: true,
    stock: 30
  },
  {
    id: 'prod-moroccanoil-original',
    name: 'Moroccanoil Treatment Original',
    brand: 'Moroccanoil',
    priceLKR: 15400,
    description: 'The legendary argan oil hair infusion. Speeds blow-dry hours, detangles locks seamlessly, and adds supreme silky softness.',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 182,
    category: 'oil',
    isPopular: true,
    stock: 15
  },
  {
    id: 'prod-oribe-shampoo',
    name: 'Gold Lust Repair & Restore Shampoo',
    brand: 'Oribe',
    priceLKR: 24500,
    description: 'Ultra-luxurious cleanser combining custom bio-restorative complex to re-awaken tired hair and reinforce inner structural strength.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 88,
    category: 'shampoo',
    isPopular: false,
    stock: 8
  },
  {
    id: 'prod-kerastase-genesis',
    name: 'Genesis Defense Thermique Spray',
    brand: 'Kérastase',
    priceLKR: 13800,
    description: 'Blow-dry primer and defense spray for hair prone to falling, strengthening against mechanical styling tool damage.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 76,
    category: 'styling',
    isPopular: false,
    stock: 16
  },
  {
    id: 'prod-olaplex-no4',
    name: 'No. 4 Bond Maintenance Shampoo',
    brand: 'Olaplex',
    priceLKR: 11900,
    description: 'Highly moisturizing, reparative shampoo that leaves hair easy to manage, shiny, and healthier with each single wash.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 164,
    category: 'shampoo',
    isPopular: false,
    stock: 20
  }
];
