// Seed script for Splash Spectrum experiences
// Run with: node --env-file-if-exists=/vercel/share/.env.project scripts/seed-experiences.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 
                    process.env.NEXT_PUBLIC_SUPABASE_URL ||
                    'https://ujmbpfawpquyiabptdqw.supabase.co';

const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                        process.env.SUPABASE_ANON_KEY ||
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbWJwZmF3cHF1eWlhYnB0ZHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjYzMTMsImV4cCI6MjA2MTQ0MjMxM30.toH9czMjkSpcEF9rMCNpXJlDfKx8q2y7GprLxpGcblc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const experiences = [
  {
    slug: 'open-paint-sessions',
    title_en: 'Open Paint Sessions',
    title_ar: 'جلسات الرسم المفتوحة',
    tagline_en: 'Unleash your creativity with splatter painting',
    tagline_ar: 'أطلق إبداعك مع الرسم بالرش',
    description_en: 'Join our open paint sessions where you can splash, throw, and drip paint onto canvases in a fun, judgment-free environment. Perfect for beginners and experienced artists alike.',
    description_ar: 'انضم إلى جلسات الرسم المفتوحة حيث يمكنك رش وإلقاء وتقطير الطلاء على اللوحات في بيئة ممتعة وخالية من الحكم. مثالي للمبتدئين والفنانين ذوي الخبرة على حد سواء.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    icon: 'Palette',
    color: '#FF1493',
    is_active: true,
    sort_order: 1,
    duration: '60-90 min',
    price_table: [
      { name_en: 'Single Canvas (30x40cm)', name_ar: 'لوحة فردية (30×40سم)', price: 150 },
      { name_en: 'Double Canvas (50x70cm)', name_ar: 'لوحة مزدوجة (50×70سم)', price: 250 },
      { name_en: 'Big Canvas (100x100cm)', name_ar: 'لوحة كبيرة (100×100سم)', price: 400 }
    ],
    highlights: ['Unlimited paint colors', 'All supplies included', 'Take home your artwork', 'No experience needed'],
    includes: ['Canvas of your choice', 'Acrylic paints', 'Protective gear', 'Brushes & tools'],
    whatsapp_only: false
  },
  {
    slug: 'splash-spin-art',
    title_en: 'Splash Spin Art',
    title_ar: 'فن الدوران بالألوان',
    tagline_en: 'Watch paint dance as it spins',
    tagline_ar: 'شاهد الألوان ترقص وهي تدور',
    description_en: 'Create mesmerizing spin art on a rotating canvas. Watch as colors blend and swirl into unique patterns that are truly one-of-a-kind.',
    description_ar: 'أنشئ فن الدوران الساحر على لوحة دوارة. شاهد كيف تمتزج الألوان وتدور في أنماط فريدة من نوعها.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    icon: 'RotateCw',
    color: '#8B5CF6',
    is_active: true,
    sort_order: 2,
    duration: '30-45 min',
    price_table: [
      { name_en: 'Small Spin (20cm)', name_ar: 'دوران صغير (20سم)', price: 100 },
      { name_en: 'Medium Spin (30cm)', name_ar: 'دوران متوسط (30سم)', price: 150 },
      { name_en: 'Large Spin (40cm)', name_ar: 'دوران كبير (40سم)', price: 200 }
    ],
    highlights: ['Hypnotic spinning action', 'Unique patterns every time', 'Quick & fun', 'Great for all ages'],
    includes: ['Spinning canvas', 'Premium acrylic paints', 'Protective gear'],
    whatsapp_only: false
  },
  {
    slug: 'pouring-art',
    title_en: 'Pouring Art',
    title_ar: 'فن السكب',
    tagline_en: 'Flow with the paint',
    tagline_ar: 'تدفق مع الألوان',
    description_en: 'Experience the meditative art of paint pouring. Watch as colors flow and mix to create beautiful, organic patterns on your canvas.',
    description_ar: 'اختبر فن السكب التأملي. شاهد كيف تتدفق الألوان وتمتزج لتخلق أنماطاً جميلة وعضوية على لوحتك.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    icon: 'Droplets',
    color: '#00CED1',
    is_active: true,
    sort_order: 3,
    duration: '60-90 min',
    price_table: [
      { name_en: 'Small Pour (20x20cm)', name_ar: 'سكب صغير (20×20سم)', price: 120 },
      { name_en: 'Medium Pour (30x30cm)', name_ar: 'سكب متوسط (30×30سم)', price: 180 },
      { name_en: 'Large Pour (40x40cm)', name_ar: 'سكب كبير (40×40سم)', price: 250 }
    ],
    highlights: ['Relaxing & meditative', 'Beautiful fluid effects', 'Guided technique', 'Stunning results'],
    includes: ['Canvas', 'Pouring medium', 'Acrylic paints', 'Silicone additives'],
    whatsapp_only: false
  },
  {
    slug: 'group-splash',
    title_en: 'Group Splash',
    title_ar: 'سبلاش جماعي',
    tagline_en: 'Paint together, create memories',
    tagline_ar: 'ارسموا معاً، اصنعوا ذكريات',
    description_en: 'Bring your friends, family, or team for a collaborative splash painting experience. Work together on large canvases and create something amazing.',
    description_ar: 'أحضر أصدقاءك أو عائلتك أو فريقك لتجربة رسم جماعية. اعملوا معاً على لوحات كبيرة واصنعوا شيئاً مذهلاً.',
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800',
    icon: 'Users',
    color: '#32CD32',
    is_active: true,
    sort_order: 4,
    duration: '90-120 min',
    price_table: [
      { name_en: 'Small Group (3-5 people)', name_ar: 'مجموعة صغيرة (3-5 أشخاص)', price: 500 },
      { name_en: 'Medium Group (6-10 people)', name_ar: 'مجموعة متوسطة (6-10 أشخاص)', price: 900 },
      { name_en: 'Large Group (11-15 people)', name_ar: 'مجموعة كبيرة (11-15 شخص)', price: 1200 }
    ],
    highlights: ['Team building', 'Large shared canvas', 'Group photos', 'Memorable experience'],
    includes: ['Big canvas (up to 3 canvases)', 'Unlimited paints', 'Protective gear for all', 'Group photo session'],
    whatsapp_only: false
  },
  {
    slug: 'splash-phone-case',
    title_en: 'Splash Phone Case',
    title_ar: 'كفر جوال سبلاش',
    tagline_en: 'Design your own phone case',
    tagline_ar: 'صمم كفر جوالك بنفسك',
    description_en: 'Create a unique, custom phone case using splash painting techniques. Your phone will never look the same!',
    description_ar: 'أنشئ كفر جوال فريد ومخصص باستخدام تقنيات الرسم بالرش. جوالك لن يبدو كما كان من قبل!',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    icon: 'Smartphone',
    color: '#FF6B6B',
    is_active: true,
    sort_order: 5,
    duration: '30-45 min',
    price_table: [
      { name_en: 'Phone Case', name_ar: 'كفر جوال', price: 100 }
    ],
    highlights: ['Unique design', 'Durable finish', 'Quick & fun', 'Great gift idea'],
    includes: ['Phone case (fits most models)', 'Paints', 'Protective coating'],
    whatsapp_only: false
  },
  {
    slug: 'custom-art-figurines',
    title_en: 'Custom Art Figurines',
    title_ar: 'مجسمات فنية مخصصة',
    tagline_en: 'Paint your own figurines',
    tagline_ar: 'لون مجسماتك الخاصة',
    description_en: 'Choose from a variety of figurines and customize them with your own splash painting style. Perfect for collectors and creative souls.',
    description_ar: 'اختر من مجموعة متنوعة من المجسمات وخصصها بأسلوب الرسم بالرش الخاص بك. مثالي للهواة والأرواح الإبداعية.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    icon: 'Shapes',
    color: '#FFD700',
    is_active: true,
    sort_order: 6,
    duration: '45-60 min',
    price_table: [
      { name_en: 'Small Figurine', name_ar: 'مجسم صغير', price: 80 },
      { name_en: 'Medium Figurine', name_ar: 'مجسم متوسط', price: 120 },
      { name_en: 'Large Figurine', name_ar: 'مجسم كبير', price: 180 }
    ],
    highlights: ['Variety of figurines', 'Detailed customization', 'Great collectibles', 'Perfect gifts'],
    includes: ['Figurine of choice', 'Acrylic paints', 'Fine brushes', 'Protective finish'],
    whatsapp_only: false
  },
  {
    slug: 'special-events',
    title_en: 'Special Events & Birthdays',
    title_ar: 'المناسبات الخاصة وأعياد الميلاد',
    tagline_en: 'Celebrate with a splash of color',
    tagline_ar: 'احتفل برشقة من الألوان',
    description_en: 'Host your birthday party, corporate event, or special celebration at Splash Spectrum. We provide a unique and memorable experience for all occasions.',
    description_ar: 'استضف حفلة عيد ميلادك أو حدث الشركة أو احتفالك الخاص في سبلاش سبكتروم. نقدم تجربة فريدة ولا تُنسى لجميع المناسبات.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    icon: 'PartyPopper',
    color: '#FF69B4',
    is_active: true,
    sort_order: 7,
    duration: 'Flexible',
    price_table: [
      { name_en: 'Birthday Package (up to 10)', name_ar: 'باقة عيد الميلاد (حتى 10 أشخاص)', price: 1500 },
      { name_en: 'Birthday Package (up to 20)', name_ar: 'باقة عيد الميلاد (حتى 20 شخص)', price: 2500 },
      { name_en: 'Corporate Event', name_ar: 'حدث الشركات', price: 'Contact us' }
    ],
    highlights: ['Private venue', 'Customizable packages', 'Catering options', 'Dedicated host'],
    includes: ['Private space', 'All art supplies', 'Setup & cleanup', 'Group photo'],
    whatsapp_only: true
  }
];

async function seedExperiences() {
  console.log('Starting to seed experiences...');
  console.log('Supabase URL:', supabaseUrl);
  
  for (const exp of experiences) {
    console.log(`Inserting: ${exp.title_en}...`);
    
    const { data, error } = await supabase
      .from('experiences')
      .upsert(exp, { onConflict: 'slug' })
      .select();
    
    if (error) {
      console.error(`Error inserting ${exp.title_en}:`, error.message);
    } else {
      console.log(`Successfully inserted/updated: ${exp.title_en}`);
    }
  }
  
  console.log('\nSeeding complete!');
  
  // Verify the data
  const { data: allExperiences, error: fetchError } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (fetchError) {
    console.error('Error fetching experiences:', fetchError.message);
  } else {
    console.log(`\nTotal experiences in database: ${allExperiences?.length || 0}`);
    allExperiences?.forEach(exp => {
      console.log(`- ${exp.title_en} (${exp.slug})`);
    });
  }
}

seedExperiences().catch(console.error);
