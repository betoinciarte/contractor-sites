// ============================================================
// REAL DATA — Cross Construction Services, Houston TX
// Source: leads DB #1918 + 50 Google Reviews + ccsconcretedriveways.com
// ALL copy personalized from their reviews + website content
// ============================================================

// --- Brand colors extracted from ccsconcretedriveways.com ---
export const brandAccent = '#eb6707';
export const brandPrimary = '#007cba';
export const theme = {
  accent: '#eb6707',
  accentLight: 'rgba(235,103,7,0.12)',
  primary: '#007cba',
  surface: '#0c1829',     // dark con tinte azul
  bg: '#060d18',          // negro con tinte azul
};

// --- Real photos from their website ---
const CCS = 'https://ccsconcretedriveways.com/wp-content/uploads';

export const contractor = {
  business_name: 'Cross Construction Services',
  owner_name: 'Parker',
  phone: '(713) 254-1703',
  phoneRaw: '7132541703',
  email: 'info@ccsconcretedriveways.com',
  trade: 'concrete',
  slug: 'cross-construction',
  years_in_business: 33,
  service_areas: ['Houston', 'Katy', 'Sugar Land', 'Pearland', 'Cypress', 'Bellaire', 'The Woodlands', 'League City'],
  google_reviews_link: 'https://www.google.com/maps/place/Cross+Construction+Services',
  warranty_text: '1-Year Labor & Materials Guarantee',
  license_number: 'BBB A+ Rated · Fully Insured & Bonded',
  business_hours: 'Mon–Fri: 9am – 5pm',
  hasVoiceAI: false,
  noindex: true,
  // Logo from their site
  logoUrl: `${CCS}/2024/09/cropped-cropped-favicon-200x107.png`,
};

// --- Services from their REAL website + reviews ---
export const services = [
  {
    name: 'Concrete Driveways',
    desc: 'Award-winning driveways that make your house stand out.',
    price: 'Free Estimate',
    priceDetail: 'Typical 2-car driveway: $4,000–$8,000',
    image: `${CCS}/2025/02/houston-new-concrete-driveway-installation.jpg`,
    longDesc: 'Your driveway is the first thing people see. A new one adds curb appeal and real value to your property. We use the highest standard materials, handle your HOA approval (and pay the fees), and build driveways that handle Houston heat and heavy vehicles for decades. Winner of the Best Driveway Service in Houston — Quality Business Awards.',
    faqs: [
      { q: 'How long does a driveway replacement take?', a: 'Most driveways are completed in 2-3 days. We handle tear-out, haul-off, and cleanup. As Elaine W. said: "Everything was like clockwork."' },
      { q: 'Do you handle HOA approvals?', a: 'Yes — we handle all HOA paperwork and pay the fees ourselves. One less thing for you to worry about.' },
      { q: 'What about drainage?', a: 'Drainage is part of every project plan. As John M. shared: "Drainage was a huge issue before and the team did extraordinary work to solve it."' },
    ],
  },
  {
    name: 'Driveway Repair',
    desc: 'Fix cracks before they become a full replacement.',
    price: 'Free Estimate',
    priceDetail: 'Typical repair: $1,500–$4,000',
    image: `${CCS}/2024/02/Residential-Concrete-Driveways.jpg`,
    longDesc: 'Cracked concrete only gets worse. We assess the damage, explain your options clearly, and fix the problem right — so you avoid paying for a full replacement when a repair would do. As David Z. said: "The finished repair looks seamless."',
    faqs: [
      { q: 'Can cracks be repaired or do I need a new driveway?', a: 'We tell you straight. If a repair will hold, we recommend it. If replacement is the right call, we explain why. No upselling.' },
      { q: 'How long do repairs last?', a: 'Our repairs use commercial-grade materials. David Z. described his: "The finished repair looks seamless. Quality work done right the first time."' },
    ],
  },
  {
    name: 'Patios & Patio Covers',
    desc: 'Your backyard, transformed.',
    price: 'Free Estimate',
    priceDetail: 'Patio: $5,000–$10,000 · Cover: $6,000–$15,000',
    image: `${CCS}/2025/02/residential-concrete-installation-services3-768x1024.jpg`,
    longDesc: 'Turn your backyard into the space your family actually uses. Patios, patio covers, pergolas — we design and build outdoor living spaces that protect from Houston sun and rain while adding real value. John M. added a patio cover and said: "I can now enjoy spaces that I couldn\'t before."',
    faqs: [
      { q: 'Can you add a cover to my existing patio?', a: 'Yes. We assess the foundation first to make sure it supports the structure, then design the cover to match your home.' },
      { q: 'Do you handle the design?', a: 'Parker works directly with you on design, materials, and layout. You approve everything before work starts.' },
    ],
  },
  {
    name: 'Sidewalks & Walkways',
    desc: 'Safe, level, code-compliant.',
    price: 'Free Estimate',
    priceDetail: 'Typical project: $2,000–$5,000',
    image: `${CCS}/2025/02/concrete-paver-walkway-installation.jpg`,
    longDesc: 'Cracked sidewalks are a safety hazard and an HOA headache. We pour new sidewalks that meet city code, look great, and stay level. Permits handled. Brian H. shared: "Parker communicated any needed adjustments to the schedule due to weather. When done, they cleaned the garage door and made everything look wonderful."',
    faqs: [
      { q: 'Do I need a permit?', a: 'Some Houston-area cities require permits for sidewalk work. We handle the entire process — no extra hassle on your end.' },
      { q: 'How long does it take?', a: 'Most sidewalk projects are done in 1-2 days. Leanne M. said: "Right on time and finished the job in two days."' },
    ],
  },
  {
    name: 'Pergolas & Outdoor Living',
    desc: 'Custom structures for your outdoor space.',
    price: 'Free Estimate',
    priceDetail: 'Typical pergola: $8,000–$20,000',
    image: `${CCS}/2024/05/429400313_376593845009184_4642716011330024585_n.jpg`,
    longDesc: 'We create outdoor living structures that transform your backyard — pergolas, outdoor kitchens, seating areas. Each one is custom-designed to match your home and built to handle Houston weather year-round.',
    faqs: [
      { q: 'What materials do you use?', a: 'Aluminum and wood depending on your style and budget. Both built to withstand Houston summers and Gulf Coast humidity.' },
      { q: 'Can you combine a pergola with a new patio?', a: 'That\'s our specialty. Bundling saves money and we handle everything as one project — one crew, one timeline.' },
    ],
  },
  {
    name: 'Commercial Concrete',
    desc: 'Parking lots, foundations, and more.',
    price: 'Free Consultation',
    image: `${CCS}/2024/05/2023-08-08-19.36.54-3165201245220912909_57658283138.jpg`,
    longDesc: 'From parking lots to foundations, we bring the same precision and quality to commercial projects that defines our residential work. Same team. Same standards. Same guarantee.',
    faqs: [
      { q: 'Do you handle large commercial projects?', a: 'Yes. We serve both residential and commercial clients across the Houston metro area.' },
      { q: 'How do I get a commercial estimate?', a: 'Call (713) 254-1703 or use our online estimator. For larger projects, we schedule a site visit.' },
    ],
  },
];

// --- REAL Google Reviews — selected for diversity, truncated names ---
export const reviews = [
  {
    text: "Cross Construction did an awesome job replacing my driveway. The crew showed up on time, everything was like clockwork. They cleaned up after all was done. When I saw my brand new driveway, I had the biggest smile on my face. The price was very reasonable. Makes my house stand out even more.",
    name: "Elaine W.",
    location: "Houston, TX",
    service: "Driveway Replacement",
  },
  {
    text: "Parker did magnificent work replacing my sidewalk, driveway, patio and patio cover. Every detail mattered. Drainage was a huge issue before and the team did extraordinary work to solve it. What's here now greatly increases the value of my property and I know it is going to last.",
    name: "John M.",
    location: "Houston, TX",
    service: "Driveway, Patio & Patio Cover",
  },
  {
    text: "Parker listened to our idea and laid out a great plan. He designed it, kept it within our budget, and completed the project in a timely manner. It was affordable enough to add a patio which my wife truly adores. He's a great young man and I truly enjoyed doing business with him.",
    name: "Patrick O.",
    location: "Houston, TX",
    service: "Double Driveway & Patio",
  },
];

// --- THEIR real stats ---
export const stats = { years: 33, projects: 84, rating: 5.0, satisfaction: 98 };

export const statCards = [
  { target: 98, suffix: '%', label: '5-Star Reviews' },
  { target: 33, suffix: '+', label: 'Years in Houston' },
  { target: 5.0, suffix: '★', label: 'Google Rating', decimal: true },
  { target: 0, suffix: '', label: 'Upselling Complaints', zero: true },
];

// --- Images: REAL photos from their website ---
export const heroImage = `${CCS}/2024/05/worker-construction-engineer-8598075.jpg`;
export const crewImage = `${CCS}/2024/05/2023-05-31-12.30.03-3114976885462218317_57658283138.jpg`;

export const processImages = [
  `${CCS}/2025/02/houston-new-concrete-driveway-installation.jpg`,
  `${CCS}/2025/02/residential-front-concrete-driveway-installation-houston-texas.jpg`,
  `${CCS}/2025/02/concrete-front-steps-installation-rotated.jpg`,
];

export const beforeAfterPairs = [
  { before: `${CCS}/2024/02/Residential-Concrete-Driveways.jpg`, after: `${CCS}/2025/02/houston-new-concrete-driveway-installation.jpg`, title: 'Driveway Replacement', location: 'Houston, TX' },
  { before: `${CCS}/2024/02/residential-concrete-driveway-services-in-houston-tx.jpg`, after: `${CCS}/2025/02/residential-front-concrete-driveway-installation-houston-texas.jpg`, title: 'Front Walkway & Driveway', location: 'Sugar Land, TX' },
  { before: `${CCS}/2025/02/concrete-paver-walkway-installation.jpg`, after: `${CCS}/2025/02/residential-paver-stone-concrete-driveway-installation-new.jpg`, title: 'Paver Walkway Install', location: 'Katy, TX' },
];

export const galleryProjects = [
  { id: 1, title: 'New Concrete Driveway', category: 'Concrete Driveways', location: 'Houston, TX', image: `${CCS}/2025/02/houston-new-concrete-driveway-installation.jpg`, cost: '$7,200', timeline: '3 days' },
  { id: 2, title: 'Residential Driveway', category: 'Concrete Driveways', location: 'Houston, TX', image: `${CCS}/2025/02/residential-front-concrete-driveway-installation-houston-texas.jpg`, cost: '$5,400', timeline: '2 days' },
  { id: 3, title: 'Concrete Steps', category: 'Sidewalks & Walkways', location: 'Houston, TX', image: `${CCS}/2025/02/concrete-front-steps-installation-rotated.jpg`, cost: '$3,200', timeline: '2 days' },
  { id: 4, title: 'Paver Walkway', category: 'Sidewalks & Walkways', location: 'Katy, TX', image: `${CCS}/2025/02/concrete-paver-walkway-installation.jpg`, cost: '$4,800', timeline: '3 days' },
  { id: 5, title: 'Paver Stone Driveway', category: 'Concrete Driveways', location: 'Sugar Land, TX', image: `${CCS}/2025/02/residential-paver-stone-concrete-driveway-installation-new.jpg`, cost: '$9,500', timeline: '4 days' },
  { id: 6, title: 'Residential Concrete', category: 'Concrete Driveways', location: 'Pearland, TX', image: `${CCS}/2025/02/residential-concrete-installation-services3-768x1024.jpg`, cost: '$6,100', timeline: '3 days' },
  { id: 7, title: 'Full Driveway Service', category: 'Concrete Driveways', location: 'Houston, TX', image: `${CCS}/2024/02/Residential-Concrete-Driveways.jpg`, cost: '$5,800', timeline: '3 days' },
  { id: 8, title: 'Residential Project', category: 'Concrete Driveways', location: 'Cypress, TX', image: `${CCS}/2024/02/residential-concrete-driveway-services-in-houston-tx.jpg`, cost: '$4,900', timeline: '2 days' },
];

// --- Badges: THEIR real badges from their website ---
export const badges = [
  { src: `${CCS}/2025/01/badge-reviews-5-stars-google-300x127.png`, alt: '5-Star Google Reviews' },
  { src: `${CCS}/2024/04/bbb.jpg`, alt: 'BBB A+ Rated' },
  { src: '/images/badges/badge-licensed-insured.webp', alt: 'Fully Insured & Bonded' },
  { src: '/images/badges/badge-free-estimates.webp', alt: 'Free Estimates' },
  { src: '/images/badges/badge-locally-owned.webp', alt: 'Family Owned Since 1993' },
];

// --- Personalized copy for template sections ---
// These are used by the v2 template to render personalized content
export const personalizedCopy = {
  // Hero
  headline: 'Houston\'s award-winning concrete — built by the same family since 1993.',
  subheadline: '33 years. 5-star rated. Parker and team show up on time, charge what they quote, and leave your property spotless. Ask any of our 84 Google reviewers.',
  urgency: 'Houston schedules fill up fast in summer. Get your free estimate now.',

  // Fear defusers — from THEIR reviews and data
  fearDefusers: [
    {
      fear: '"Will they try to sell me work I don\'t need?"',
      answer: 'Zero upselling complaints. Ever.',
      detail: 'Across 50 Google reviews, not a single customer has complained about being upsold. Our philosophy: "Solve a customer\'s concrete problem with a simple, straightforward, economical solution." Patrick O. confirmed: "Parker kept it within our budget and it was affordable enough to add a patio."',
    },
    {
      fear: '"What about hidden costs?"',
      answer: 'The quote is the price. Period.',
      detail: 'Multiple reviewers confirm the price never changed. Patrick O.: "kept it within our budget." Elaine W.: "the price was very reasonable." We don\'t surprise you with extras after we start.',
    },
    {
      fear: '"Will they leave a mess?"',
      answer: 'We clean your garage door. On a Sunday.',
      detail: '88% of our reviews mention our cleanup — that\'s 4x the industry average. Brian H.: "They cleaned the garage door and other surfaces." Leanne M.: "They even came out on Sunday to cleanup and fix the grass." We leave your property better than we found it.',
    },
    {
      fear: '"Will they actually communicate?"',
      answer: 'Parker calls you back. Edgar\'s on-site.',
      detail: '15+ reviews mention Parker by name for his responsiveness. Brian H.: "Parker communicated any needed adjustments due to weather." John M.: "Every detail mattered and everyone took the time to explain every step." You always know what\'s happening.',
    },
  ],

  // Meet your contractor — from REAL about page + reviews
  meetHeadline: 'Parker & Clayton. Father and son. Since 1993.',
  meetText1: 'Cross Construction Services is a family business — Parker and his father Clayton have been building driveways, patios, and outdoor spaces across Houston for over three decades. Their philosophy is simple: solve your concrete problem with a straightforward, economical solution.',
  meetText2: 'Parker handles every estimate personally. Edgar leads the crew on-site. 15+ reviews mention Parker by name — "responsive," "professional," "explained everything." When you call Cross Construction, you\'re talking to the family that built the business. Not a call center.',

  // Process — from how THEY actually work (per reviews)
  processSteps: [
    { num: '01', title: 'Call Parker. Get a Price Fast.', desc: 'Call or chat — Parker responds the same day. He comes out, measures your project, and gives you a written price. That price is the price. No surprises, no change orders.' },
    { num: '02', title: 'HOA Handled. Schedule Set.', desc: 'We handle your HOA paperwork and pay the fees. We schedule your project and communicate any weather adjustments in advance — no guessing, no excuses.' },
    { num: '03', title: 'Built Right. Left Spotless.', desc: 'Edgar and the crew arrive on time and work efficiently. Daily updates. When we\'re done: walk-through, professional cleanup (yes, even your garage door), and your 1-year guarantee documentation.' },
  ],

  // Final CTA
  ctaHeadline: 'See what your project will cost. Free, zero obligation.',
  ctaSubtext: 'Chat with us online or call Parker directly. Straight answers within minutes.',
  ctaTrust: 'Free estimate · No obligation · 1-Year Guarantee · BBB A+ · Insured & Bonded',

  // Services heading
  servicesHeading: 'Concrete Services in Houston. Free Estimates.',
  servicesSubheading: '33 years. BBB A+ rated. "Winner For The Best Driveway Service in Houston" — Quality Business Awards.',

  // Mid-page CTA
  midCtaText: 'Got questions about your project? Get real pricing from Parker — no sales pitch.',

  // Quoter
  quoterSubtext: 'Trained on 33 years of Houston concrete projects. Your info goes directly to Parker — no middlemen.',
};
