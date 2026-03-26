// REAL DATA — Cross Construction Services, Houston TX
// Source: leads database ID 1918 + Google Reviews
// Reviews truncated to FirstName L. for privacy

export const contractor = {
  business_name: 'Cross Construction Services',
  owner_name: 'Parker',
  phone: '(713) 254-1703',
  phoneRaw: '7132541703',
  email: '',
  trade: 'concrete',
  slug: 'cross-construction',
  years_in_business: 33,
  service_areas: ['Houston', 'Katy', 'Sugar Land', 'Pearland', 'Cypress'],
  google_reviews_link: 'https://www.google.com/maps/place/Cross+Construction+Services',
  warranty_text: 'Warranty on All Work',
  license_number: 'Fully Insured & Bonded',
  business_hours: 'Mon–Sat: 7am – 6pm',
  // No AI voice agent — real phone number only
  hasVoiceAI: false,
  noindex: true,
};

const IMG = '/images/concrete';

export const services = [
  {
    name: 'Concrete Driveways',
    desc: 'Durable driveways that enhance your curb appeal.',
    price: 'From $4,000',
    priceDetail: 'Typical 2-car driveway: $4,000–$8,000',
    image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp`,
    longDesc: 'At Cross Construction Services, we specialize in creating durable, aesthetically pleasing driveways that add significant value to your property. With over three decades of experience, we use only the best materials to build driveways that endure all weather conditions. We handle HOA approvals and pay the fees.',
    faqs: [
      { q: 'How long does a driveway replacement take?', a: 'Most driveways are completed in 2-3 days, plus 7 days curing time before driving on it. We handle tear-out and haul-off.' },
      { q: 'Do you handle HOA approvals?', a: 'Yes. We handle HOA approvals and we pay the fees. Fully insured and bonded.' },
      { q: 'What about drainage issues?', a: 'Drainage is always part of our planning. We design every project to solve existing drainage problems, not create new ones.' },
    ],
  },
  {
    name: 'Driveway Repair',
    desc: 'Fix cracks and damage before they spread.',
    price: 'From $1,500',
    priceDetail: 'Typical repair: $1,500–$4,000',
    image: `${IMG}/b1-portfolio-concrete-sidewalk.webp`,
    longDesc: 'Cracked or settling driveways only get worse with time. Our repair team assesses the damage, explains your options clearly, and fixes the problem right — so you don\'t end up paying for a full replacement when a repair would do.',
    faqs: [
      { q: 'Can cracks be repaired or do I need a new driveway?', a: 'It depends on the severity. We\'ll tell you honestly — if a repair will hold, we recommend it. If replacement is the right call, we\'ll explain why.' },
      { q: 'How long do repairs last?', a: 'Our repairs are done with commercial-grade materials and typically last 10+ years.' },
    ],
  },
  {
    name: 'Patios',
    desc: 'Outdoor living spaces built to last.',
    price: 'From $5,000',
    priceDetail: 'Standard patio: $5,000–$10,000',
    image: `${IMG}/b1-portfolio-concrete-patio.webp`,
    longDesc: 'Turn your backyard into the space you actually want to spend time in. A well-built patio extends your living area and adds value to your home. From simple slabs to stamped designs with built-in seating — we design patios that complement your home and your lifestyle.',
    faqs: [
      { q: 'Do you handle the design?', a: 'Yes. Parker works with you on the design, materials, and layout before any work starts. You approve everything before we pour.' },
      { q: 'What about drainage?', a: 'Proper slope and drainage are built into every patio design. We solve drainage problems, not create them.' },
    ],
  },
  {
    name: 'Sidewalks',
    desc: 'Safe, level walkways that meet code.',
    price: 'From $2,000',
    priceDetail: 'Standard walkway: $2,000–$5,000',
    image: `${IMG}/b1-portfolio-concrete-sidewalk.webp`,
    longDesc: 'Cracked or uneven sidewalks are a safety hazard and a liability. We replace and pour new sidewalks that meet city code, look great, and stay level for years. We handle permits if required by your city.',
    faqs: [
      { q: 'Do I need a permit for sidewalk work?', a: 'Some cities require permits. We handle the entire permit process for you — no extra hassle on your end.' },
      { q: 'How long does sidewalk replacement take?', a: 'Most sidewalk projects are completed in 1-2 days.' },
    ],
  },
  {
    name: 'Patio Covers',
    desc: 'Shade and protection for your outdoor space.',
    price: 'From $6,000',
    priceDetail: 'Typical patio cover: $6,000–$15,000',
    image: `${IMG}/b1-portfolio-concrete-patio.webp`,
    longDesc: 'Enjoy your patio year-round with a custom patio cover. We design and build covers that protect from sun and rain while adding style to your outdoor space. Combined with a new patio, it transforms your backyard into a true extension of your home.',
    faqs: [
      { q: 'Can you add a patio cover to an existing patio?', a: 'Yes, we can add covers to existing patios. We assess the foundation to make sure it can support the structure.' },
      { q: 'What materials do you use?', a: 'We use aluminum and wood structures depending on your style and budget. Both are built to withstand Houston weather.' },
    ],
  },
  {
    name: 'Commercial Concrete',
    desc: 'Foundations, parking lots, and more.',
    price: 'Free consultation',
    image: `${IMG}/b1-portfolio-concrete-retaining-wall.webp`,
    longDesc: 'Cross Construction Services delivers expert commercial concrete solutions tailored to meet the specific needs of your business. From large-scale foundations to parking lots, we bring the same attention to detail and quality materials that define our residential work.',
    faqs: [
      { q: 'Do you handle commercial projects?', a: 'Yes. We serve both residential and commercial clients across the Houston area.' },
      { q: 'How do I get a commercial estimate?', a: 'Call us or use our online estimator. For larger projects, we schedule a site visit to assess scope and provide a detailed quote.' },
    ],
  },
];

// REAL Google Reviews — truncated names for privacy
export const reviews = [
  {
    text: "Cross Construction did an awesome job replacing my driveway. The crew showed up on time, everything was like clockwork, and they cleaned up after all was done. When I saw my brand new driveway, I had the biggest smile on my face. The price was very reasonable.",
    name: "Elaine W.",
    location: "Houston, TX",
    service: "Driveway Replacement",
  },
  {
    text: "Parker did magnificent work replacing my sidewalk, driveway, patio and patio cover. Every detail mattered and everyone took the time to explain every step. Drainage was a huge issue before and the team did extraordinary work to solve it. I am extremely happy with the results.",
    name: "John M.",
    location: "Houston, TX",
    service: "Driveway, Patio & Patio Cover",
  },
  {
    text: "Cross Construction Services did a fantastic job repairing my cracked driveway. From the first call, they were responsive, friendly, and professional. The finished repair looks seamless. I highly recommend them to anyone looking for quality concrete work done right the first time.",
    name: "David Z.",
    location: "Houston, TX",
    service: "Driveway Repair",
  },
];

export const stats = { years: 33, projects: 84, rating: 5.0, satisfaction: 100 };

export const statCards = [
  { target: 84, suffix: '+', label: 'Google Reviews' },
  { target: 33, suffix: '+', label: 'Years in Houston' },
  { target: 5.0, suffix: '★', label: 'Google Rating', decimal: true },
  { target: 100, suffix: '%', label: 'Satisfaction' },
];

export const heroImage = `${IMG}/a4-impact-bg-concrete.webp`;
export const crewImage = `${IMG}/b2-crew-concrete.webp`;

export const processImages = [
  `${IMG}/b3-process-concrete-demolition.webp`,
  `${IMG}/b3-process-concrete-pour.webp`,
  `${IMG}/b3-process-concrete-finish.webp`,
];

export const beforeAfterPairs = [
  { before: `${IMG}/a3-before-after-concrete-1-before.webp`, after: `${IMG}/a3-before-after-concrete-1-after.webp`, title: 'Driveway Replacement', location: 'Houston, TX' },
  { before: `${IMG}/a3-before-after-concrete-2-before.webp`, after: `${IMG}/a3-before-after-concrete-2-after.webp`, title: 'Patio & Patio Cover', location: 'Houston, TX' },
  { before: `${IMG}/a3-before-after-concrete-3-before.webp`, after: `${IMG}/a3-before-after-concrete-3-after.webp`, title: 'Sidewalk Repair', location: 'Houston, TX' },
];

export const galleryProjects = [
  { id: 1, title: 'Double Driveway Pour', category: 'Concrete Driveways', location: 'Houston, TX', image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp`, cost: '$7,200', timeline: '3 days' },
  { id: 2, title: 'Backyard Patio & Cover', category: 'Patios', location: 'Houston, TX', image: `${IMG}/b1-portfolio-concrete-patio.webp`, cost: '$12,000', timeline: '5 days' },
  { id: 3, title: 'Stamped Driveway', category: 'Concrete Driveways', location: 'Katy, TX', image: `${IMG}/b1-portfolio-concrete-driveway-stamped.webp`, cost: '$9,500', timeline: '4 days' },
  { id: 4, title: 'Commercial Parking', category: 'Commercial Concrete', location: 'Houston, TX', image: `${IMG}/b1-portfolio-concrete-retaining-wall.webp`, cost: '$18,000', timeline: '7 days' },
  { id: 5, title: 'Front Walkway', category: 'Sidewalks', location: 'Sugar Land, TX', image: `${IMG}/b1-portfolio-concrete-sidewalk.webp`, cost: '$3,200', timeline: '2 days' },
  { id: 6, title: 'Driveway Repair', category: 'Driveway Repair', location: 'Pearland, TX', image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp`, cost: '$2,800', timeline: '1 day' },
  { id: 7, title: 'Extended Patio', category: 'Patios', location: 'Cypress, TX', image: `${IMG}/b1-portfolio-concrete-patio.webp`, cost: '$8,500', timeline: '4 days' },
  { id: 8, title: 'New Driveway Pour', category: 'Concrete Driveways', location: 'Houston, TX', image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp`, cost: '$5,100', timeline: '3 days' },
];

export const badges = [
  { src: '/images/badges/badge-5-star.webp', alt: '5-Star Rated' },
  { src: '/images/badges/badge-licensed-insured.webp', alt: 'Fully Insured & Bonded' },
  { src: '/images/badges/badge-satisfaction.webp', alt: '100% Satisfaction' },
  { src: '/images/badges/badge-free-estimates.webp', alt: 'Free Estimates' },
  { src: '/images/badges/badge-locally-owned.webp', alt: 'Locally Owned' },
];
