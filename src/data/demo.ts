// Demo data — will be replaced with API fetch from spc-app
export const contractor = {
  business_name: 'Rodriguez Concrete',
  owner_name: 'Carlos Rodriguez',
  phone: '(214) 555-1234',
  phoneRaw: '2145551234',
  email: 'carlos@rodriguezconcrete.com',
  trade: 'concrete',
  slug: 'rodriguez-concrete',
  years_in_business: 15,
  service_areas: ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Irving'],
  google_reviews_link: 'https://g.co/rodriguez',
  warranty_text: '5-Year Warranty on All Work',
  license_number: 'TX-12345',
  business_hours: 'Mon–Sat: 7am – 6pm',
  // Voice AI agent phone number (Retell) — homeowners call this, AI answers
  voicePhone: '(214) 555-0100',
  voicePhoneRaw: '2145550100',
};

const IMG = '/images/concrete';

export const services = [
  {
    name: 'Driveways',
    desc: 'Custom concrete driveways built to last.',
    price: '$3.50/sqft',
    image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp`,
    longDesc: 'A new driveway is one of the best investments you can make in your property. We pour driveways that withstand Texas heat, heavy vehicles, and years of daily use. Every project starts with proper grading and a reinforced base.',
    faqs: [
      { q: 'How long does a driveway take?', a: 'Most driveways are completed in 2-3 days, plus 7 days curing time before driving on it.' },
      { q: 'Do you remove the old driveway?', a: 'Yes. Demo and haul-off are included in every quote.' },
      { q: 'What about cracks?', a: 'We use control joints and fiber mesh to minimize cracking. Any structural cracks within warranty are repaired free.' },
    ],
  },
  {
    name: 'Patios',
    desc: 'Beautiful outdoor living spaces.',
    price: '$4.00/sqft',
    image: `${IMG}/b1-portfolio-concrete-patio.webp`,
    longDesc: 'Transform your backyard into an outdoor living space. We design and pour patios that complement your home — from simple slabs to elaborate stamped designs with built-in seating and fire pit pads.',
    faqs: [
      { q: 'Can you match my existing concrete?', a: 'We color-match as closely as possible. We always recommend seeing samples before committing.' },
      { q: 'Do you handle drainage?', a: 'Absolutely. Proper slope and drainage are built into every patio design.' },
    ],
  },
  {
    name: 'Foundation Repair',
    desc: 'Expert foundation stabilization.',
    price: 'Free inspection',
    image: `${IMG}/b1-portfolio-concrete-retaining-wall.webp`,
    longDesc: 'Foundation problems get worse (and more expensive) over time. Our team diagnoses the real issue — not just the symptoms. We use industry-leading pier systems and stand behind every repair with a transferable warranty.',
    faqs: [
      { q: 'How do I know if I need foundation repair?', a: 'Common signs: doors that stick, cracks in walls or floors, uneven floors. We offer free inspections.' },
      { q: 'Is the warranty transferable?', a: 'Yes. If you sell your home, the warranty transfers to the new owner.' },
    ],
  },
  {
    name: 'Stamped Concrete',
    desc: 'Decorative patterns that impress.',
    price: '$6.00/sqft',
    image: `${IMG}/b1-portfolio-concrete-driveway-stamped.webp`,
    longDesc: 'Get the look of natural stone, brick, or wood — at a fraction of the cost. Stamped concrete is durable, low-maintenance, and customizable with dozens of patterns and colors. Perfect for patios, pool decks, and walkways.',
    faqs: [
      { q: 'How long does stamped concrete last?', a: 'With proper sealing every 2-3 years, stamped concrete lasts 25+ years.' },
      { q: 'Is stamped concrete slippery?', a: 'We add a non-slip additive to the sealer for safety, especially around pools.' },
    ],
  },
  {
    name: 'Sidewalks',
    desc: 'Safe, level walkways.',
    price: '$3.50/sqft',
    image: `${IMG}/b1-portfolio-concrete-sidewalk.webp`,
    longDesc: "Cracked or uneven sidewalks are a safety hazard and a liability. We replace and pour new sidewalks that meet city code, look great, and stay level for years. We handle permits if needed.",
    faqs: [
      { q: 'Do I need a permit?', a: 'Some cities require permits for sidewalk work. We handle the entire permit process for you.' },
      { q: 'How wide should my sidewalk be?', a: 'Standard is 4 feet. ADA-compliant paths are 5 feet. We advise based on your needs.' },
    ],
  },
  {
    name: 'Concrete Leveling',
    desc: 'Fix sunken slabs without replacing.',
    price: 'Starting $500',
    image: `${IMG}/b1-portfolio-concrete-sidewalk.webp`,
    longDesc: "Sunken or uneven concrete doesn't always need full replacement. Our leveling process lifts settled slabs back to their original position — faster, cheaper, and less disruptive than a full tear-out.",
    faqs: [
      { q: 'How does concrete leveling work?', a: 'We drill small holes, inject a stabilizing material underneath, and lift the slab back to level. Holes are patched same-day.' },
      { q: 'Is leveling cheaper than replacement?', a: "Typically 50-70% less than full replacement. And it's done in a few hours, not days." },
    ],
  },
];

export const reviews = [
  { text: "They were honest and told me I didn't need foundation repair — saved us thousands. You don't find that kind of honesty anymore.", name: "Maria G.", location: "Dallas, TX", service: "Foundation Inspection" },
  { text: "You could not tell any work had been done — left it spotless. The crew was friendly, on time, and professional every single day.", name: "James T.", location: "Fort Worth, TX", service: "Driveway" },
  { text: "We get compliments from neighbors and passers-by constantly. Best investment we've made in our home.", name: "Sandra L.", location: "Arlington, TX", service: "Stamped Patio" },
];

export const stats = { years: 15, projects: 50, rating: 4.9, satisfaction: 100 };

export const heroImage = `${IMG}/a4-impact-bg-concrete.webp`;
export const crewImage = `${IMG}/b2-crew-concrete.webp`;

export const processImages = [
  `${IMG}/b3-process-concrete-demolition.webp`,
  `${IMG}/b3-process-concrete-pour.webp`,
  `${IMG}/b3-process-concrete-finish.webp`,
];

export const beforeAfterPairs = [
  { before: `${IMG}/a3-before-after-concrete-1-before.webp`, after: `${IMG}/a3-before-after-concrete-1-after.webp`, title: 'Driveway Replacement', location: 'Dallas, TX' },
  { before: `${IMG}/a3-before-after-concrete-2-before.webp`, after: `${IMG}/a3-before-after-concrete-2-after.webp`, title: 'Patio Extension', location: 'Fort Worth, TX' },
  { before: `${IMG}/a3-before-after-concrete-3-before.webp`, after: `${IMG}/a3-before-after-concrete-3-after.webp`, title: 'Stamped Walkway', location: 'Arlington, TX' },
];

export const galleryProjects = [
  { id: 1, title: 'Broom-Finish Driveway', category: 'Driveways', location: 'Dallas, TX', image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp` },
  { id: 2, title: 'Backyard Patio', category: 'Patios', location: 'Fort Worth, TX', image: `${IMG}/b1-portfolio-concrete-patio.webp` },
  { id: 3, title: 'Stamped Driveway', category: 'Stamped Concrete', location: 'Arlington, TX', image: `${IMG}/b1-portfolio-concrete-driveway-stamped.webp` },
  { id: 4, title: 'Retaining Wall', category: 'Foundation Repair', location: 'Plano, TX', image: `${IMG}/b1-portfolio-concrete-retaining-wall.webp` },
  { id: 5, title: 'Front Walkway', category: 'Sidewalks', location: 'Irving, TX', image: `${IMG}/b1-portfolio-concrete-sidewalk.webp` },
  { id: 6, title: 'Stamped Entry', category: 'Stamped Concrete', location: 'Dallas, TX', image: `${IMG}/b1-portfolio-concrete-driveway-stamped.webp` },
  { id: 7, title: 'Extended Patio', category: 'Patios', location: 'Plano, TX', image: `${IMG}/b1-portfolio-concrete-patio.webp` },
  { id: 8, title: 'New Driveway Pour', category: 'Driveways', location: 'Fort Worth, TX', image: `${IMG}/b1-portfolio-concrete-driveway-broom.webp` },
  { id: 9, title: 'Sidewalk Replacement', category: 'Concrete Leveling', location: 'Arlington, TX', image: `${IMG}/b1-portfolio-concrete-sidewalk.webp` },
];

export const badges = [
  '/images/badges/badge-5-star.webp',
  '/images/badges/badge-licensed-insured.webp',
  '/images/badges/badge-satisfaction.webp',
  '/images/badges/badge-free-estimates.webp',
  '/images/badges/badge-locally-owned.webp',
];
