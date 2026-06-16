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
    tagline: 'Silk Keratin',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-colors',
    name: 'Mosh Signature High-Gloss Color & Balayage',
    category: 'hair',
    priceLKR: 21500,
    durationMinutes: 120,
    description: 'Exquisite hand-painted highlights and multi-dimensional pigmentation. Formulated with protective oils to protect base follicle integrity.',
    tagline: 'High-Gloss Color',
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-nanoplastia',
    name: 'Advanced Nanoplastia Straightening & Repair',
    category: 'hair',
    priceLKR: 42000,
    durationMinutes: 180,
    description: 'Biological, amino-acid based straightening therapy that restructures hair at a cellular level, restoring high-gloss mirror shine without harsh chemicals.',
    tagline: 'Nanoplastia Straightening',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-botox',
    name: 'Capillary Hair Botox Plumping',
    category: 'hair',
    priceLKR: 29000,
    durationMinutes: 120,
    description: 'An anti-aging thermal treatment infused with collagen and botanical oils. Deeply replumps hollow fibers, restoring incredible density and spring.',
    tagline: 'Hair Botox Plump',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-care',
    name: 'Deep Hydration Steam & Scalp Care',
    category: 'hair',
    priceLKR: 9500,
    durationMinutes: 45,
    description: 'Restorative scalp cleanse coupled with ultrasonic micro-mist steam infusion. Rebalances dry, tense crowns and locks organic shine.',
    tagline: 'Deep Scalp Care',
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
    tagline: 'Acne Erase Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-whitescience',
    name: 'Dermal White Science Brightening Peel',
    category: 'skin',
    priceLKR: 19500,
    durationMinutes: 90,
    description: 'Advanced whitening and tone harmonization therapy. Safely targets sun damage, hyperpigmentation, and blemishes for immediate luminescence.',
    tagline: 'White Science Brighten',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-glassskin',
    name: 'Ultimate Korean Glass Skin Treatment',
    category: 'skin',
    priceLKR: 24000,
    durationMinutes: 90,
    description: 'Multistage pore-tightening treatment involving double cleansing, peptide-enrichment masks, and ice-globe lifting to achieve that coveted moist, translucent finish.',
    tagline: 'Korean Glass Skin',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-hydra',
    name: 'High-End Mosh HydraFacial Luxe',
    category: 'skin',
    priceLKR: 21000,
    durationMinutes: 60,
    description: 'Patented hydra-peeling tip exfoliation that deep-vacuums sebum while infusing customized vitamins and antioxidant serum boosters into the dermis.',
    tagline: 'HydraFacial Luxe',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-antiaging',
    name: 'Micro-Current Sculpting Anti-Aging Lift',
    category: 'skin',
    priceLKR: 27500,
    durationMinutes: 80,
    description: 'Lymphatic muscle stimulation and hyaluronic micro-fillers combined to iron out fine expression lines and dramatically contour sagging jawlines.',
    tagline: 'Anti-Aging Sculpt',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'skin-microneedling',
    name: 'Fractional Micro Needling Collagen therapy',
    category: 'skin',
    priceLKR: 32500,
    durationMinutes: 90,
    description: 'Precision collagen induction therapy using sterilized needle pens to repair deep acne scars, minimize enlarged pores, and tighten skin tissue.',
    tagline: 'Micro Needling Therapy',
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
    tagline: 'Cryo Fat Freeze',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-ems',
    name: 'High-Intensity Electro-Muscle Slimming (EMS)',
    category: 'slimming',
    priceLKR: 22000,
    durationMinutes: 45,
    description: 'Neuromuscular stimulation generating thousands of targeted passive contractions to sculpt, tone, and firm core abdominal or thigh muscles.',
    tagline: 'EMS Sculpt',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-cavitation',
    name: 'Ultrasonic Cavitation Cellulite reduction',
    category: 'slimming',
    priceLKR: 18000,
    durationMinutes: 50,
    description: 'Dual-frequency acoustic shockwaves used to liquefy stubborn subcutaneous fat walls. Extremely effective for smoothing hips and thighs.',
    tagline: 'Acoustic Cavitation',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-doublechin',
    name: 'Double Chin Laser & Jaw Contouring',
    category: 'slimming',
    priceLKR: 14500,
    durationMinutes: 45,
    description: 'Focused micro-laser thermal therapy designed to melt submental fat and tighten loose sagging tissue around the throat and jawline.',
    tagline: 'Laser Jaw Contour',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-tummyslimming',
    name: 'Core Tummy Slimming Organic Herbal Wrap',
    category: 'slimming',
    priceLKR: 26000,
    durationMinutes: 60,
    description: 'Infrared moisture detox wrap incorporating heat-activated botanical enzymes to rapidly drain fluid retention and flatten abdominal lines.',
    tagline: 'Herbal Tummy Wrap',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'slimming-lipolaser',
    name: 'Lipo Laser Adipose Contouring',
    category: 'slimming',
    priceLKR: 28000,
    durationMinutes: 60,
    description: 'Low-level laser pads emit red wavelengths to trigger chemical breakdown of stored triglycerides, promoting rapid fat release from target zones.',
    tagline: 'Lipo Laser Contour',
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
    tagline: 'Brides By Mosh',
    imageUrl: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bridal-traditional',
    name: 'Brides By Mosh Traditional Kandyan / Western',
    category: 'bridal',
    priceLKR: 72000,
    durationMinutes: 180,
    description: 'A beautifully curated traditional Kandyan, Indian or elegant Western bridal package. Includes custom high-definition makeup, meticulous flower hair-weaving, and drape set-up by our master drapers.',
    tagline: 'Traditional Bridal',
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
    tagline: 'Grooms By Mosh',
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
    id: 'prod-lisse-oil',
    name: 'Keratin Therapy Lisse Design: The Oil',
    brand: 'Alfaparf Milano',
    priceLKR: 15500,
    description: 'A luxurious silk-infused finish oil formulated with Kera-Collagen Complex and Babassu Oil. Prevents split ends, limits drying, locks out humidity, and yields an incredible silk-like glow.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 164,
    category: 'oil',
    isPopular: true,
    stock: 15
  },
  {
    id: 'prod-lisse-shampoo',
    name: 'Keratin Therapy Lisse Design: Maintenance Shampoo',
    brand: 'Alfaparf Milano',
    priceLKR: 11500,
    description: 'Sulfate and paraben-free shampoo that gently cleanses the hair and helps maintain and prolong the cosmetic results obtained with local saloon keratin treatments.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 142,
    category: 'shampoo',
    isPopular: true,
    stock: 22
  },
  {
    id: 'prod-lisse-mask',
    name: 'Keratin Therapy Lisse Design: Rehydrating Mask No. 4',
    brand: 'Alfaparf Milano',
    priceLKR: 13800,
    description: 'An intensive restructuring and rehydrating treatment mask. Re-infuses moisture back to dry strands, sealing structural blockades against humidity and mechanical heat tools.',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 98,
    category: 'treatment',
    isPopular: true,
    stock: 12
  },
  {
    id: 'prod-lisse-conditioner',
    name: 'Keratin Therapy Lisse Design: Maintenance Conditioner',
    brand: 'Alfaparf Milano',
    priceLKR: 12000,
    description: 'Nourishing paraben-free upkeep conditioner. Formulated to deeply smooth fiber layout, leaving hair silky, radiant, and incredibly soft and easy to comb through.',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 110,
    category: 'treatment',
    isPopular: false,
    stock: 18
  },
  {
    id: 'prod-cristalli-liquidi',
    name: 'Semi Di Lino: Cristalli Liquid Serum',
    brand: 'Alfaparf Milano',
    priceLKR: 16800,
    description: 'The legendary instant illuminating serum. Protects hair against environmental pollution, heat, and humidity while delivering an immediate and longlasting diamond shine.',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 245,
    category: 'oil',
    isPopular: true,
    stock: 25
  },
  {
    id: 'prod-sdl-reconstruct-shampoo',
    name: 'Semi Di Lino: Reconstruction Low Shampoo',
    brand: 'Alfaparf Milano',
    priceLKR: 9800,
    description: 'Delicate reparative shampoo designed specifically for dry, brittle, or heavily processed hair. Restructures deep fiber cortexes, recovering body and natural strength.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 184,
    category: 'shampoo',
    isPopular: false,
    stock: 30
  },
  {
    id: 'prod-sdl-reconstruct-mask',
    name: 'Semi Di Lino: Reconstruction Reparative Mask',
    brand: 'Alfaparf Milano',
    priceLKR: 12500,
    description: 'An intensive cortex-consolidating treatment. Restructures brittle fibers step by step, drastically reducing hair breakage and sealing hydration.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 136,
    category: 'treatment',
    isPopular: false,
    stock: 14
  },
  {
    id: 'prod-sdl-nutritive-leavein',
    name: 'Semi Di Lino: Nutritive Leave-In Conditioner',
    brand: 'Alfaparf Milano',
    priceLKR: 11200,
    description: 'Ultra-lightweight softening fluid for dry hair. Replenishes nutrition, seals cuticle layout, detangles instantly, and adds a supreme silky dimension without heavy buildup.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 89,
    category: 'styling',
    isPopular: false,
    stock: 16
  },
  {
    id: 'prod-style- clay',
    name: 'Style Stories: Matte Funk Clay',
    brand: 'Alfaparf Milano',
    priceLKR: 8900,
    description: 'Strong-hold matte finish clay paste. Styles and models hair layout with amazing shape discipline, leaving a natural, structured finish without greasy residues.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 75,
    category: 'styling',
    isPopular: false,
    stock: 20
  },
  {
    id: 'prod-pure-equalizer',
    name: 'Pure Equalizer: Anti-impurity Fluid 24H',
    brand: 'DIBI Milano',
    priceLKR: 19500,
    description: 'High-performance sebum-balancing face fluid. Mattifies shiny zones, calms irritation, tightens enlarged skin pores, and protects from pollution for 24 continuous hours.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 62,
    category: 'treatment',
    isPopular: false,
    stock: 10
  },
  {
    id: 'prod-sdl-nutritive-shampoo',
    name: 'Semi Di Lino: Nutritive Low Shampoo',
    brand: 'Alfaparf Milano',
    priceLKR: 10500,
    description: 'Gently cleanses and hydrates dry hair fibers, returning absolute softness, elasticity, and brilliant mirror shine to dull hairs.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 147,
    category: 'shampoo',
    isPopular: false,
    stock: 16
  },
  {
    id: 'prod-sdl-anti-yellow-conditioner',
    name: 'Semi Di Lino: Anti-Yellow Conditioner',
    brand: 'Alfaparf Milano',
    priceLKR: 12500,
    description: 'Anti-yellow silver pigment upkeep conditioner. Formulated with violet ash pigments to detangle and deeply nourish curls while neutralizing brassy yellow tones.',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 88,
    category: 'treatment',
    isPopular: false,
    stock: 14
  },
  {
    id: 'prod-acid-infusion-cream',
    name: 'Acid Infusion: No-Age Restructuring Cream SPF30',
    brand: 'DIBI Milano',
    priceLKR: 23500,
    description: 'Rich restructuring formula featuring Glycyrrhetinic Acid and Vitamin F to combat photo-aging. Restores outer sebum defenses and defends against aggressive UV radiation.',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 42,
    category: 'treatment',
    isPopular: true,
    stock: 6
  },
  {
    id: 'prod-lift-creator-serum',
    name: 'Lift Creator: Concentrate Vitamin B-C-PP Serum',
    brand: 'DIBI Milano',
    priceLKR: 26500,
    description: 'Highly concentrated lift-effect serum with vitamins and anti-oxidant complexes. Drastically reduces the appearance of tired skin and boosts structural tone.',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 39,
    category: 'oil',
    isPopular: false,
    stock: 8
  },
  {
    id: 'prod-sdl-energizing-tonic',
    name: 'Semi Di Lino: Energizing Tonic (For Hair Loss)',
    brand: 'Alfaparf Milano',
    priceLKR: 12500,
    description: 'An energizing and rebalancing treatment for scalps prone to hair loss. Maintains optimum scalp condition, strengthens hair fiber, and stimulates micro-circulation to encourage fuller hair growth.',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 63,
    category: 'treatment',
    isPopular: false,
    stock: 14
  },
  {
    id: 'prod-sdl-purifying-shampoo',
    name: 'Semi Di Lino: Purifying Low Shampoo (For Dandruff)',
    brand: 'Alfaparf Milano',
    priceLKR: 10500,
    description: 'Delicate anti-dandruff shampoo for dry or oily scalps. Normalizes scalp sebum levels, removes persistent flakes, preventing dandruff re-occurrence while leaving hair soft and nourished.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 88,
    category: 'shampoo',
    isPopular: false,
    stock: 20
  },
  {
    id: 'prod-sdl-diamond-shampoo',
    name: 'Semi Di Lino: Diamond Illuminating Low Shampoo',
    brand: 'Alfaparf Milano',
    priceLKR: 10800,
    description: 'Sulfate-free illuminating shampoo for normal hair. Gently cleanses and revitalizes, delivering extreme and persistent shine, keeping locks soft, lightweight, and healthy-looking.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 114,
    category: 'shampoo',
    isPopular: true,
    stock: 18
  },
  {
    id: 'prod-sdl-diamond-mask',
    name: 'Semi Di Lino: Diamond Illuminating Mask',
    brand: 'Alfaparf Milano',
    priceLKR: 13200,
    description: 'An intensive shine-revealing mask designed for normal hair. Promotes cuticle cohesion, adds softness, and enhances diamond-like reflection without burdening the hair body.',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 95,
    category: 'treatment',
    isPopular: false,
    stock: 12
  },
  {
    id: 'prod-sdl-volumizing-shampoo',
    name: 'Semi Di Lino: Volumizing Low Shampoo (For Fine Hair)',
    brand: 'Alfaparf Milano',
    priceLKR: 10600,
    description: 'Gentle volumizing shampoo designed for fine or limp hair. Enhances body, creates immediate lift from the root, thickens strands, and locks in lightweight volume for 72 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewsCount: 52,
    category: 'shampoo',
    isPopular: false,
    stock: 15
  },
  {
    id: 'prod-sdl-enhancing-shampoo',
    name: 'Semi Di Lino: Enhancing Low Shampoo (For Curly & Wavy Hair)',
    brand: 'Alfaparf Milano',
    priceLKR: 11200,
    description: 'Gentle shampoo that hydrates and defines curls and waves. Controls frizz, detangles hair, and enhances bounce while defending locks against humidity.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 71,
    category: 'shampoo',
    isPopular: false,
    stock: 16
  },
  {
    id: 'prod-sdl-enhancing-mask',
    name: 'Semi Di Lino: Enhancing Mask (For Curly & Wavy Hair)',
    brand: 'Alfaparf Milano',
    priceLKR: 13500,
    description: 'An intensive hydrating treatment that detangles and strengthens curls and waves. Controls frizz, seals cuticle cells, and provides supreme flexibility, leaving curls velvety soft and bouncy.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 48,
    category: 'treatment',
    isPopular: false,
    stock: 10
  },
  {
    id: 'prod-sdl-anti-orange-shampoo',
    name: 'Semi Di Lino: Anti-Orange Low Shampoo (For Brown Hair)',
    brand: 'Alfaparf Milano',
    priceLKR: 11500,
    description: 'Sulfate-free blue shampoo formulated with blue pigments to neutralize unwanted orange and brassy tones in dyed brown or dark hair, reviving colored brilliance.',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 39,
    category: 'shampoo',
    isPopular: false,
    stock: 14
  },
  {
    id: 'prod-voi-keratin-shampoo',
    name: 'Voi - Keratin Shampoo - Argan Oil (Sulfate Free)',
    brand: 'VOI Care',
    priceLKR: 6800,
    description: 'Sulfate-free keratin shampoo infused with nourishing Argan Oil. Gently cleanses hair fibers, repairs damage, speeds up structure rebuild, and keeps strands deeply soft and silky.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 162,
    category: 'shampoo',
    isPopular: true,
    stock: 35
  }
];
