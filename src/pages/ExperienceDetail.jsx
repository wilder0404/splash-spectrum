import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, CheckCircle, MessageCircle, Shield, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const WHATSAPP_NUMBER = '966554563447';

const KIDS_PHOTO1 = "https://media.base44.com/images/public/69e5ef89828747441c931879/3790a7901_image.png";
const KIDS_PHOTO2 = "https://media.base44.com/images/public/69e5ef89828747441c931879/0b3715ba6_image.png";
const BIRTHDAY_PHOTO = "https://media.base44.com/images/public/69e5ef89828747441c931879/11d7bf5be_image.png";
const BIRTHDAY_PACK = "https://media.base44.com/images/public/69e5ef89828747441c931879/f96c1d22f_image.png";
const OPEN_PAINT_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png";
const GROUP_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png";
const EVENTS_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png";
const GALLERY1 = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/64a9b5ac5_image.png";
const GALLERY2 = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/a9569b78f_image.png";
const GALLERY3 = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/6c3b5dcdf_image.png";
const PHONE_CASE_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/906f677bf_image.png";
// Figurine product photos
const FIG_BUNNY = "https://media.base44.com/images/public/69e5ef89828747441c931879/418062ae7_image.png";
const FIG_KITTY = "https://media.base44.com/images/public/69e5ef89828747441c931879/174b825da_image.png";
const FIG_ELEPHANT = "https://media.base44.com/images/public/69e5ef89828747441c931879/cec3dc21c_image.png";
const FIG_PRINCESS = "https://media.base44.com/images/public/69e5ef89828747441c931879/2d90ae041_image.png";
const FIG_PIKACHU = "https://media.base44.com/images/public/69e5ef89828747441c931879/06eef13c7_image.png";
const FIG_BEARBRICK = "https://media.base44.com/images/public/69e5ef89828747441c931879/7a3c6986b_image.png";
const FIG_BEAR_PLAIN = "https://media.base44.com/images/public/69e5ef89828747441c931879/7064eef9b_image.png";
const BDAY_PACK_BOX = "https://media.base44.com/images/public/69e5ef89828747441c931879/835731a7c_image.png";
const NEON_SESSION = "https://media.base44.com/images/public/69e5ef89828747441c931879/ee158501e_image.png";

const EXPERIENCES_EN = {
  'open-paint-sessions': {
    title: 'Open Paint Sessions',
    tagline: 'No rules. Just paint.',
    description: 'Walk in, pick your colors, and let loose. Under UV lights, every splash becomes a masterpiece. Open sessions are perfect if you just want to show up and have fun, no pressure, just pure creative chaos. Available with regular lighting (afternoon) and neon UV lighting (from 7 PM until closing).',
    image: OPEN_PAINT_IMG,
    extraImages: [GALLERY1, GALLERY2, GALLERY3],
    icon: '🎨', color: '#FF007F',
    duration: '60–90 min', groupSize: '1–20 people',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR', desc: 'Throw paint on canvas under UV light' },
      { name: '🌀 Spin', price: '149 SAR', desc: 'Spin art using a spinning canvas machine' },
      { name: '🎢 Swing', price: '149 SAR', desc: 'Swing and splash paint mid-air' },
      { name: '🐻 Pour (e.g. bears)', price: '160 SAR', desc: 'Pour paint over a 3D figurine of your choice' },
      { name: '📱 Splash Phone Case', price: '105 SAR', desc: 'Customize your own phone case' },
      { name: '🖼️ Group Splash (Big Canvas)', price: '385 SAR', desc: 'Shared large canvas for a group' },
    ],
    includes: [
      'All UV paints & brushes',
      'Apron & protective cover-up',
      'Shoe covers',
      'Locker for your personal items',
      'Take-home artwork',
      'Available in afternoon (regular light) or evening neon UV lighting (from 7 PM)',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult at all times.',
      'Any additional guardian beyond one requires a paid entry.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Solo', 'Couples', 'Small groups', 'Walk-in friendly'],
    whatsappOnly: false,
    gallery: [GALLERY1, GALLERY2, GALLERY3],
  },
  'birthday-experiences': {
    title: 'Birthday Experiences',
    tagline: 'The most colorful birthday ever.',
    description: 'Forget boring dinner reservations. Celebrate your birthday with a full-on paint party, UV lights, your crew, birthday music, and neon color everywhere. We set everything up so you just have to show up and have the best time of your year. Sessions run 1.5 hours (one service) or 2 hours (two services). Neon UV lighting: 7 PM to 11 PM. Regular lighting: 3 PM to 6:30 PM.',
    image: BIRTHDAY_PHOTO,
    extraImages: [BDAY_PACK_BOX, NEON_SESSION],
    icon: '🎉', color: '#9D00FF',
    duration: '90–120 min', groupSize: '10+ people',
    priceTable: null,
    price: 'Custom — DM via WhatsApp',
    bigBirthdayPack: {
      allowed: ['Cakes', 'Water', 'Small bites & snacks', 'Up to 5 extra guardians', 'Decorative balloons'],
      prohibited: ['Large food meals', 'Extra activities (e.g. clowns, soap bubbles)'],
      booking: ['Contact us via WhatsApp', 'Visit our studio before making any down payment', '20% down payment required'],
      additional: ['For a private booking, a minimum of 25 children is required', 'One service lasts 1.5 hours', 'Two services last 2 hours'],
    },
    includes: [
      'Birthday music playlist for the whole group',
      'Birthday card',
      'Neon glow VIP bracelets for everyone',
      'VIP glow in the dark glasses for the group',
      'Happy Birthday hair band',
      'All UV paints & materials',
      'Private or semi-private space (we do our best)',
      'Birthday cake available as add-on (+100 SAR)',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult at all times.',
      'Booking is done exclusively via WhatsApp.',
      'Food is NOT provided by Splash Spectrum (except cakes in Big Birthday Pack).',
      'For private booking, minimum 25 children required.',
      'Please arrive 10 minutes before your session.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Birthday parties', 'Milestone celebrations', 'Group events'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, BDAY_PACK_BOX, NEON_SESSION, BIRTHDAY_PACK],
  },
  'graduation': {
    title: 'Graduation Celebrations',
    tagline: 'Mark your milestone in color.',
    description: 'You made it, celebrate in the most unforgettable way. A graduation paint experience at Splash Spectrum is a vibrant, energetic event that your whole group will talk about for years. We will do everything we can to make your space private and special. Food is NOT provided, but groups of 20 to 25+ are welcome to bring their own.',
    image: BIRTHDAY_PHOTO,
    extraImages: [GROUP_IMG],
    icon: '🎓', color: '#00F3FF',
    duration: '90–120 min', groupSize: '10+ people',
    priceTable: null,
    price: 'Custom — DM via WhatsApp',
    includes: [
      'All UV paints & materials for every guest',
      'Private or semi-private space (we do our best)',
      'Celebratory atmosphere with music',
      'Take-home artwork for every participant',
      'Graduation badge/add-ons available upon request',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult at all times.',
      'Booking is done exclusively via WhatsApp.',
      'Food is NOT provided by Splash Spectrum.',
      'Groups of 20 to 25 people or more are welcome to bring their own food.',
      'We will do our utmost to make the space as private as possible for your group.',
      'Please arrive 10 minutes before your session.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Graduation parties', 'Private group events', 'Milestone celebrations'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, GROUP_IMG, GALLERY2],
  },
  'group-friends': {
    title: 'Group & Friends',
    tagline: 'Bring your crew. Leave with memories.',
    description: 'There is no better bonding activity than getting covered in fluorescent paint together. Group sessions are high-energy, loud, and incredibly fun. Whether it\'s a friend group, a date night squad, or a casual gathering, this is the move. Guided by our team, every technique from Splash to Spin to Pour is open to you.',
    image: GROUP_IMG,
    extraImages: [GALLERY1, EVENTS_IMG],
    icon: '👯', color: '#00F3FF',
    duration: '90 min', groupSize: '4–50 people',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR/person', desc: 'Throw paint on canvas under UV light' },
      { name: '🌀 Spin', price: '149 SAR/person', desc: 'Spin art using a spinning canvas machine' },
      { name: '🎢 Swing', price: '149 SAR/person', desc: 'Swing and splash paint mid-air' },
      { name: '🐻 Pour (e.g. bears)', price: '160 SAR/person', desc: 'Pour paint over a 3D figurine of your choice' },
      { name: '🖼️ Group Splash (Big Canvas)', price: '385 SAR (shared)', desc: 'One giant canvas for the whole group' },
    ],
    includes: [
      'Guided session by our team',
      'All paints & tools',
      'Aprons & cover-ups',
      'Take-home artwork',
      'Available in regular or UV neon lighting',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult at all times.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Friend groups', 'Date nights', 'Team bonding', 'Celebrations'],
    whatsappOnly: false,
    gallery: [GROUP_IMG, GALLERY1, EVENTS_IMG],
  },
  'kids-experiences': {
    title: 'Kids Experiences',
    tagline: 'Safe, silly, and absolutely magical.',
    description: 'Designed specifically for younger artists (ages 3+). Fully supervised, with child-safe UV paint, and activities tailored to keep little ones engaged. One parent or guardian must be present at all times. Any additional guardian requires an entry fee. Painting is scientifically proven to nurture creativity and promote psychological well-being in children of all ages.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png",
    extraImages: [KIDS_PHOTO1, KIDS_PHOTO2],
    icon: '🧸', color: '#39FF14',
    duration: '60–90 min', groupSize: '2–30 kids',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR/child', desc: 'Throw paint on canvas under UV light' },
      { name: '🌀 Spin', price: '149 SAR/child', desc: 'Spin art using a spinning machine' },
      { name: '🎢 Swing', price: '149 SAR/child', desc: 'Swing and splash paint mid-air' },
      { name: '🐻 Pour (e.g. bears)', price: '160 SAR/child', desc: 'Pour paint over a 3D figurine to take home' },
    ],
    schoolPackages: [
      { students: 30, before: '4,470', discount: '10%', saving: '447', after: '4,023', perKid: '134' },
      { students: 50, before: '7,450', discount: '15%', saving: '1,118', after: '6,333', perKid: '126' },
      { students: 80, before: '11,920', discount: '20%', saving: '2,384', after: '9,536', perKid: '119' },
      { students: 100, before: '14,900', discount: '20%', saving: '2,980', after: '11,920', perKid: '119' },
    ],
    includes: [
      'Child-safe UV paint & brushes',
      'Fully supervised activities',
      'Take-home artwork with box to carry it safely',
      'Aprons & mess protection',
      'One parent accompaniment included',
    ],
    rules: [
      'Ages 3 and above welcome.',
      'ONE parent or guardian must accompany children at all times.',
      'Any additional guardian requires a paid entry fee.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Ages 3+', 'Supervised', 'Parent-friendly', 'School trips'],
    whatsappOnly: false,
    gallery: [KIDS_PHOTO1, KIDS_PHOTO2, GALLERY3],
  },
  'custom-art-figurines': {
    title: 'Custom Art & Figurines',
    tagline: 'Paint something you\'ll keep forever.',
    description: 'Move beyond canvas. Choose from a stunning range of 3D figurines, bears, Hello Kitty, elephants, princesses, Pikachu and more, then pour UV paint over them under neon lights. The paint flows and drips creating a one-of-a-kind glowing masterpiece that you take home. It\'s precise, personal, and mesmerizing to watch come to life.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png",
    extraImages: [FIG_BEAR_PLAIN, FIG_BEARBRICK, FIG_BUNNY],
    icon: '🎁', color: '#FF007F',
    duration: '90 min', groupSize: '1–20 people',
    priceTable: [
      { name: '🐻 Pour (Bear / Figurine)', price: '160 SAR/person', desc: 'Choose your figurine + specialty UV paints + take-home box' },
    ],
    figurines: [
      { name: 'Classic Bear', img: FIG_BEAR_PLAIN },
      { name: 'Bearbrick', img: FIG_BEARBRICK },
      { name: 'Bunny Doll', img: FIG_BUNNY },
      { name: 'Hello Kitty', img: FIG_KITTY },
      { name: 'Elephant', img: FIG_ELEPHANT },
      { name: 'Princess', img: FIG_PRINCESS },
      { name: 'Pikachu', img: FIG_PIKACHU },
    ],
    includes: [
      'Your choice of 3D figurine',
      'Specialty UV paints in all colors',
      'Fine pouring tools',
      'Take-home box for your masterpiece',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult.',
      'No prior art experience needed.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Artistic', 'Detail-focused', 'Unique keepsake', 'All ages'],
    whatsappOnly: false,
    gallery: [FIG_BEAR_PLAIN, FIG_BEARBRICK, FIG_BUNNY, FIG_KITTY, FIG_ELEPHANT, FIG_PRINCESS, FIG_PIKACHU],
  },
  'phone-case': {
    title: 'Custom Phone Case',
    tagline: 'Your art. Your case. One of a kind.',
    description: 'Now you can create your own custom iPhone case with our Splash Art experience! Unleash your creativity and design a one-of-a-kind phone case that\'s as unique as you. Throw paint, splash colors, create patterns — then take home a phone case that\'s truly yours.',
    image: PHONE_CASE_IMG,
    extraImages: [GALLERY1, GALLERY2],
    icon: '📱', color: '#00F3FF',
    duration: '60–90 min', groupSize: '1–20 people',
    priceTable: [
      { name: '📱 Splash Phone Case', price: '105 SAR/person', desc: 'Custom painted iPhone case — take it home same day' },
    ],
    includes: [
      'Your own blank phone case',
      'All UV paints & splashing tools',
      'Apron & protective cover-up',
      'Ready-to-use custom case to take home',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult.',
      'No prior art experience needed.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Creative', 'Unique keepsake', 'All ages', 'Quick session'],
    whatsappOnly: false,
    gallery: [PHONE_CASE_IMG, GALLERY1, GALLERY2],
  },
  'special-events': {
    title: 'Special Events',
    tagline: 'We build the experience around you.',
    description: 'From corporate team days to brand activations, to anniversary surprises, we craft fully custom immersive paint events for any occasion. Our experienced instructors guide your group through Splash, Spin, Swing and Pour techniques. We can host at our Riyadh studio or bring the experience to your office.',
    image: EVENTS_IMG,
    extraImages: [GROUP_IMG, GALLERY1],
    icon: '🤍', color: '#9D00FF',
    duration: 'Custom', groupSize: '10–100+ people',
    priceTable: null,
    price: 'Custom quote — DM via WhatsApp',
    includes: [
      'Full custom event coordination',
      'All paint techniques: Splash, Spin, Swing, Pour',
      'Custom branding options available',
      'Can be hosted at our studio OR at your venue',
      'Dedicated event team',
      'Group canvas or individual artwork',
    ],
    rules: [
      'All ages welcome, preferably from 3 years and above.',
      'Children under 16 must be accompanied by a trusted adult.',
      'Contact us in advance to plan your event.',
      'Minimum group size: 10 people.',
      'Venue details discussed during consultation.',
    ],
    vibes: ['Corporate events', 'Team building', 'Brand activations', 'Large groups'],
    whatsappOnly: false,
    gallery: [EVENTS_IMG, GROUP_IMG, GALLERY1],
  },
};

const EXPERIENCES_AR = {
  'open-paint-sessions': {
    title: 'جلسات الرسم الحرة',
    tagline: 'لا قواعد. فقط ألوان.',
    description: 'ادخل، اختر ألوانك، وانطلق. تحت أضواء الفلورسنت كل رشة تصبح لوحة فنية. الجلسات الحرة مثالية إذا أردت فقط الاستمتاع، لا ضغط، فقط فوضى إبداعية خالصة. متوفرة بإضاءة عادية (فترة العصر) وإضاءة نيون UV (من الساعة 7 مساءً حتى الإغلاق).',
    image: OPEN_PAINT_IMG,
    extraImages: [GALLERY1, GALLERY2, GALLERY3],
    icon: '🎨', color: '#FF007F',
    duration: '60–90 دقيقة', groupSize: '1–20 شخص',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال', desc: 'ارمِ الألوان على اللوحة تحت ضوء UV' },
      { name: '🌀 سبين', price: '149 ريال', desc: 'رسم دوار باستخدام آلة دوارة' },
      { name: '🎢 سوينق', price: '149 ريال', desc: 'أرجوحة ورش ألوان في الهواء' },
      { name: '🐻 فن السكب (مثلاً: دب)', price: '160 ريال', desc: 'اسكب الألوان على مجسم من اختيارك' },
      { name: '📱 سبلاش كفر جوال', price: '105 ريال', desc: 'خصص كفر جوالك بيدك' },
      { name: '🖼️ سبلاش لوحة كبيرة (جماعي)', price: '385 ريال', desc: 'لوحة كبيرة مشتركة للمجموعة' },
    ],
    includes: [
      'جميع ألوان UV والفراشي',
      'مريلة وغطاء واقي',
      'غطاء أحذية',
      'خزانة لحفظ أغراضك الشخصية',
      'لوحة فنية تأخذها معك للبيت',
      'متاحة بإضاءة عادية (العصر) أو إضاءة نيون (من 7م)',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق في جميع الأوقات.',
      'أي مرافق إضافي يتطلب رسوم دخول.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['منفرد', 'ثنائي', 'مجموعات صغيرة', 'دخول حر'],
    whatsappOnly: false,
    gallery: [GALLERY1, GALLERY2, GALLERY3],
  },
  'birthday-experiences': {
    title: 'تجارب أعياد الميلاد',
    tagline: 'أجمل عيد ميلاد في حياتك.',
    description: 'انسَ حجوزات العشاء المملة. احتفل بعيد ميلادك بحفلة رسم كاملة، أضواء UV، مجموعتك، موسيقى عيد الميلاد، وألوان نيون في كل مكان. نحن نجهز كل شيء، ما عليك إلا الحضور والاستمتاع. الجلسة ساعة ونصف (خدمة واحدة) أو ساعتين (خدمتان). النيون: 7م إلى 11م. الإضاءة العادية: 3م إلى 6:30م.',
    image: BIRTHDAY_PHOTO,
    extraImages: [BDAY_PACK_BOX, NEON_SESSION],
    icon: '🎉', color: '#9D00FF',
    duration: '90–120 دقيقة', groupSize: '10+ أشخاص',
    priceTable: null,
    price: 'تواصل عبر واتساب للاستفسار',
    bigBirthdayPack: {
      allowed: ['الكيك', 'المياه', 'وجبات خفيفة صغيرة', 'حتى 5 مرافقين إضافيين', 'البالونات الزينة'],
      prohibited: ['وجبات طعام كبيرة', 'الأنشطة الإضافية (مثل المهرجين، فقاعات الصابون)'],
      booking: ['التواصل عبر واتساب', 'زيارة الاستوديو قبل أي دفعة', 'دفعة أولى 20%'],
      additional: ['للحجز الخاص يُشترط 25 طفل كحد أدنى', 'خدمة واحدة = ساعة ونصف', 'خدمتان = ساعتان'],
    },
    includes: [
      'موسيقى عيد الميلاد للمجموعة كاملة',
      'بطاقة عيد الميلاد',
      'أساور VIP نيون للجميع',
      'نظارات VIP متوهجة في الظلام للمجموعة',
      'طوق شعر Happy Birthday',
      'جميع ألوان UV والمواد',
      'مساحة خاصة أو شبه خاصة (نبذل قصارى جهدنا)',
      'كعكة عيد الميلاد متاحة كإضافة (+100 ريال)',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق في جميع الأوقات.',
      'الحجز يتم حصرياً عبر واتساب.',
      'الطعام غير مقدم (الكيك مسموح في باقة عيد الميلاد الكبيرة).',
      'للحجز الخاص يُشترط 25 طفل على الأقل.',
      'يُرجى الحضور قبل 10 دقائق من الموعد.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['حفلات أعياد الميلاد', 'الاحتفالات', 'المجموعات'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, BDAY_PACK_BOX, NEON_SESSION, BIRTHDAY_PACK],
  },
  'graduation': {
    title: 'احتفالات التخرج',
    tagline: 'احتفل بإنجازك بالألوان.',
    description: 'لقد نجحت، احتفل بأكثر الطرق لا تُنسى. تجربة رسم التخرج في سبلاش سبيكتروم هي حدث نابض بالحياة ومليء بالطاقة ستتحدث عنه مجموعتك لسنوات. الطعام غير مقدم، لكن المجموعات من 20 إلى 25 شخصاً فأكثر يمكنها إحضار طعامها الخاص.',
    image: BIRTHDAY_PHOTO,
    extraImages: [GROUP_IMG],
    icon: '🎓', color: '#00F3FF',
    duration: '90–120 دقيقة', groupSize: '10+ أشخاص',
    priceTable: null,
    price: 'تواصل عبر واتساب للاستفسار',
    includes: [
      'جميع ألوان UV والمواد لكل ضيف',
      'مساحة خاصة أو شبه خاصة (نبذل قصارى جهدنا)',
      'أجواء احتفالية مع موسيقى',
      'لوحة فنية يأخذها كل مشارك للبيت',
      'إضافات خاصة بالتخرج متاحة عند الطلب',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق في جميع الأوقات.',
      'الحجز يتم حصرياً عبر واتساب.',
      'الطعام غير مقدم من سبلاش سبيكتروم.',
      'المجموعات من 20 إلى 25 شخصاً فأكثر يمكنها إحضار طعامها الخاص.',
      'يُرجى الحضور قبل 10 دقائق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['حفلات التخرج', 'المجموعات الخاصة', 'الاحتفالات الكبرى'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, GROUP_IMG, GALLERY2],
  },
  'group-friends': {
    title: 'المجموعات والأصدقاء',
    tagline: 'أحضر مجموعتك. اخرج بذكريات.',
    description: 'لا يوجد نشاط لبناء الفريق أفضل من أن تتلطخوا جميعاً بالألوان الفلورسنت. الجلسات الجماعية مليئة بالطاقة والضحك والمرح. سواء كانت مجموعة أصدقاء، ليلة ثنائية، أو احتفال — هذا هو الخيار المثالي.',
    image: GROUP_IMG,
    extraImages: [GALLERY1, EVENTS_IMG],
    icon: '👯', color: '#00F3FF',
    duration: '90 دقيقة', groupSize: '4–50 شخص',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال/شخص', desc: 'ارمِ الألوان على اللوحة تحت ضوء UV' },
      { name: '🌀 سبين', price: '149 ريال/شخص', desc: 'رسم دوار باستخدام آلة دوارة' },
      { name: '🎢 سوينق', price: '149 ريال/شخص', desc: 'أرجوحة ورش ألوان في الهواء' },
      { name: '🐻 فن السكب (مثلاً: دب)', price: '160 ريال/شخص', desc: 'اسكب الألوان على مجسم من اختيارك' },
      { name: '🖼️ سبلاش لوحة كبيرة', price: '385 ريال (مشترك)', desc: 'لوحة عملاقة للمجموعة كاملة' },
    ],
    includes: [
      'جلسة موجهة من فريقنا',
      'جميع الألوان والأدوات',
      'مرايل وأغطية واقية',
      'لوحة فنية للمنزل',
      'متاحة بإضاءة عادية أو نيون UV',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['مجموعات الأصدقاء', 'الثنائيات', 'بناء الفريق', 'الاحتفالات'],
    whatsappOnly: false,
    gallery: [GROUP_IMG, GALLERY1, EVENTS_IMG],
  },
  'kids-experiences': {
    title: 'تجارب الأطفال',
    tagline: 'آمنة، مرحة، وسحرية تماماً.',
    description: 'مصممة خصيصاً للفنانين الصغار (من سن 3 سنوات فأكثر). إشراف كامل، ألوان UV آمنة للأطفال، وأنشطة مصممة لإبقاء الأطفال منخرطين طوال الوقت. يجب أن يكون أحد الوالدين حاضراً في جميع الأوقات. أثبتت الدراسات العلمية أن الرسم يعزز الإبداع والرفاهية النفسية لدى الأطفال.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png",
    extraImages: [KIDS_PHOTO1, KIDS_PHOTO2],
    icon: '🧸', color: '#39FF14',
    duration: '60–90 دقيقة', groupSize: '2–30 طفل',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال/طفل', desc: 'ارمِ الألوان على اللوحة تحت ضوء UV' },
      { name: '🌀 سبين', price: '149 ريال/طفل', desc: 'رسم دوار باستخدام آلة دوارة' },
      { name: '🎢 سوينق', price: '149 ريال/طفل', desc: 'أرجوحة ورش ألوان في الهواء' },
      { name: '🐻 فن السكب (مثلاً: دب)', price: '160 ريال/طفل', desc: 'اسكب الألوان على مجسم من اختيارك وخذه للبيت' },
    ],
    schoolPackages: [
      { students: 30, before: '4,470', discount: '10%', saving: '447', after: '4,023', perKid: '134' },
      { students: 50, before: '7,450', discount: '15%', saving: '1,118', after: '6,333', perKid: '126' },
      { students: 80, before: '11,920', discount: '20%', saving: '2,384', after: '9,536', perKid: '119' },
      { students: 100, before: '14,900', discount: '20%', saving: '2,980', after: '11,920', perKid: '119' },
    ],
    includes: [
      'ألوان UV آمنة للأطفال وفراشي',
      'إشراف كامل طوال الجلسة',
      'لوحة فنية تأخذها معك مع صندوق حمل',
      'مرايل وأغطية واقية',
      'دخول أحد الوالدين مشمول',
    ],
    rules: [
      'من سن 3 سنوات فأكثر.',
      'يجب أن يرافق أحد الوالدين الأطفال في جميع الأوقات.',
      'أي مرافق إضافي يتطلب رسوم دخول.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['من سن 3 سنوات', 'تحت الإشراف', 'صديق للوالدين', 'رحلات مدرسية'],
    whatsappOnly: false,
    gallery: [KIDS_PHOTO1, KIDS_PHOTO2, GALLERY3],
  },
  'custom-art-figurines': {
    title: 'الفن المخصص والمجسمات',
    tagline: 'ارسم شيئاً ستحتفظ به إلى الأبد.',
    description: 'تجاوز اللوحة العادية. اختر من مجموعة رائعة من المجسمات، دب، هيلو كيتي، فيل، أميرة، بيكاتشو والمزيد، ثم اسكب ألوان UV عليها تحت الأضواء النيون. يتدفق الطلاء وينسكب ليخلق قطعة فنية متوهجة فريدة من نوعها تأخذها للمنزل.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png",
    extraImages: [FIG_BEAR_PLAIN, FIG_BEARBRICK, FIG_BUNNY],
    icon: '🎁', color: '#FF007F',
    duration: '90 دقيقة', groupSize: '1–20 شخص',
    priceTable: [
      { name: '🐻 فن السكب (مجسم)', price: '160 ريال/شخص', desc: 'اختر مجسمك + ألوان UV متخصصة + صندوق حمل' },
    ],
    figurines: [
      { name: 'دب كلاسيكي', img: FIG_BEAR_PLAIN },
      { name: 'بير بريك', img: FIG_BEARBRICK },
      { name: 'دمية الأرنب', img: FIG_BUNNY },
      { name: 'هيلو كيتي', img: FIG_KITTY },
      { name: 'الفيل', img: FIG_ELEPHANT },
      { name: 'الأميرة', img: FIG_PRINCESS },
      { name: 'بيكاتشو', img: FIG_PIKACHU },
    ],
    includes: [
      'مجسمك الثلاثي الأبعاد من اختيارك',
      'ألوان UV المتخصصة بجميع الألوان',
      'أدوات السكب الدقيقة',
      'صندوق لحمل تحفتك الفنية للمنزل',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق.',
      'لا تحتاج لأي خبرة فنية مسبقة.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['فني', 'تفصيلي', 'تذكار فريد', 'جميع الأعمار'],
    whatsappOnly: false,
    gallery: [FIG_BEAR_PLAIN, FIG_BEARBRICK, FIG_BUNNY, FIG_KITTY, FIG_ELEPHANT, FIG_PRINCESS, FIG_PIKACHU],
  },
  'phone-case': {
    title: 'كفر جوال مخصص',
    tagline: 'فنك. كفرك. فريد من نوعه.',
    description: 'الآن يمكنك تصميم كفر آيفون مخصص مع تجربة سبلاش آرت! أطلق إبداعك وصمّم كفراً فريداً بقدر ما أنت مميز. ارمِ الألوان، ارشش، اصنع نقوشاً — وخذ كفر جوالك للبيت.',
    image: PHONE_CASE_IMG,
    extraImages: [GALLERY1, GALLERY2],
    icon: '📱', color: '#00F3FF',
    duration: '60–90 دقيقة', groupSize: '1–20 شخص',
    priceTable: [
      { name: '📱 سبلاش كفر جوال', price: '105 ريال/شخص', desc: 'كفر آيفون مرسوم — خذه للبيت في نفس اليوم' },
    ],
    includes: [
      'كفر جوال فارغ خاص بك',
      'جميع ألوان UV وأدوات الرش',
      'مريلة وغطاء واقي',
      'كفر جاهز للاستخدام تأخذه للبيت',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق.',
      'لا تحتاج لأي خبرة فنية مسبقة.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['إبداعي', 'تذكار فريد', 'جميع الأعمار', 'جلسة سريعة'],
    whatsappOnly: false,
    gallery: [PHONE_CASE_IMG, GALLERY1, GALLERY2],
  },
  'special-events': {
    title: 'الفعاليات الخاصة',
    tagline: 'نبني التجربة حول احتياجاتك.',
    description: 'من أيام فريق الشركات إلى تفعيل العلامات التجارية، إلى مفاجآت الذكرى السنوية، نصمم فعاليات رسم غامرة مخصصة لأي مناسبة. يمكننا الاستضافة في استوديونا بالرياض أو إحضار التجربة إلى مقر شركتك.',
    image: EVENTS_IMG,
    extraImages: [GROUP_IMG, GALLERY1],
    icon: '🤍', color: '#9D00FF',
    duration: 'مخصص', groupSize: '10–100+ شخص',
    priceTable: null,
    price: 'عرض سعر مخصص — تواصل عبر واتساب',
    includes: [
      'تنسيق الفعالية الكاملة',
      'جميع تقنيات الرسم: سبلاش، سبين، سوينق، فن السكب',
      'خيارات العلامة التجارية المخصصة',
      'يمكن الاستضافة في استوديونا أو مقرك',
      'فريق فعاليات متخصص',
      'لوحة جماعية أو أعمال فردية',
    ],
    rules: [
      'جميع الأعمار مرحب بها، ويُفضل من سن 3 سنوات فأكثر.',
      'يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق.',
      'تواصل معنا مسبقاً لتخطيط فعاليتك.',
      'الحد الأدنى لحجم المجموعة: 10 أشخاص.',
      'يتم مناقشة تفاصيل المكان خلال الاستشارة.',
    ],
    vibes: ['فعاليات الشركات', 'بناء الفريق', 'تفعيل العلامة التجارية', 'المجموعات الكبيرة'],
    whatsappOnly: false,
    gallery: [EVENTS_IMG, GROUP_IMG, GALLERY1],
  },
};

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

export default function ExperienceDetail() {
  const { lang, isAr } = useLang();
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('id') || 'open-paint-sessions';
  const EXPERIENCES = isAr ? EXPERIENCES_AR : EXPERIENCES_EN;
  const exp = EXPERIENCES[slug] || EXPERIENCES['open-paint-sessions'];

  const [form, setForm] = useState({ date: '', time: '', people: '', name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like to book a *${exp.title}* at Splash Spectrum. Please help me with the details! 🎨`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-obsidian" dir={isAr ? 'rtl' : 'ltr'}>

      {/* HERO */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,1) 100%)` }} />
        {/* Color glow overlay */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 60%, ${exp.color}20 0%, transparent 60%)` }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-body text-sm group">
              <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isAr ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
              {tr(lang, 'detail_back')}
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{exp.icon}</span>
                <div className="flex flex-wrap gap-2">
                  {exp.vibes.map(vibe => (
                    <span key={vibe} className="px-3 py-1 rounded-full text-xs font-heading font-semibold"
                      style={{ borderColor: `${exp.color}55`, color: exp.color, background: `${exp.color}15`, border: `1px solid ${exp.color}40` }}>
                      {vibe}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-3 leading-none" style={{ textShadow: `0 0 60px ${exp.color}55` }}>
                {exp.title}
              </h1>
              <p className="font-body text-lg md:text-xl" style={{ color: exp.color }}>{exp.tagline}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* QUICK STATS BAR */}
      <div className="border-b border-white/5" style={{ background: `linear-gradient(90deg, ${exp.color}08, transparent)` }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: exp.color }} />
            <span className="font-body text-white/60 text-sm">{exp.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: exp.color }} />
            <span className="font-body text-white/60 text-sm">{exp.groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" style={{ color: exp.color }} />
            <span className="font-body text-white/60 text-sm">{exp.price || (isAr ? 'انظر الأسعار أدناه' : 'See pricing below')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: exp.color }} />
            <span className="font-body text-white/60 text-sm">{isAr ? 'من سن 3 سنوات فأكثر' : 'Ages 3+ welcome'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Info (3 cols) */}
          <div className="lg:col-span-3 space-y-10">

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="font-body text-white/70 leading-relaxed text-base md:text-lg border-l-2 pl-5"
              style={{ borderColor: exp.color }}>
              {exp.description}
            </motion.p>

            {/* Pricing Table */}
            {exp.priceTable && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                  <span style={{ color: exp.color }}>💰</span> {tr(lang, 'detail_prices')}
                </h3>
                <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: `linear-gradient(135deg, ${exp.color}06, rgba(255,255,255,0.02))` }}>
                  {exp.priceTable.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${i < exp.priceTable.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <div>
                        <p className="font-heading font-semibold text-white text-sm">{row.name}</p>
                        {row.desc && <p className="font-body text-white/35 text-xs mt-0.5">{row.desc}</p>}
                      </div>
                      <span className="font-heading font-black text-base shrink-0 ml-4" style={{ color: exp.color }}>{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* School Packages */}
            {exp.schoolPackages && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-2 flex items-center gap-2">
                  <span>🏫</span> {isAr ? 'باقات المدارس' : 'School Trip Packages'}
                </h3>
                <p className="text-white/40 text-sm mb-5 font-body">
                  {isAr ? 'نوفر صناديق للطلاب لحمل أعمالهم الفنية بسهولة إلى المنزل.' : 'We provide boxes for students to safely take home their artwork.'}
                </p>
                <div className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="grid grid-cols-5 px-4 py-3 border-b border-white/10 text-white/40 font-heading font-semibold text-xs text-center bg-white/[0.02]">
                    <span>{isAr ? 'طلاب' : 'Students'}</span>
                    <span>{isAr ? 'قبل الخصم' : 'Before'}</span>
                    <span>{isAr ? 'خصم' : 'Discount'}</span>
                    <span className="text-neon-green">{isAr ? 'بعد الخصم' : 'After'}</span>
                    <span>{isAr ? 'للطالب' : 'Per Kid'}</span>
                  </div>
                  {exp.schoolPackages.map((row, i) => (
                    <div key={i} className={`grid grid-cols-5 px-4 py-3 text-center text-sm ${i < exp.schoolPackages.length - 1 ? 'border-b border-white/5' : ''} ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <span className="text-white font-bold">{row.students}</span>
                      <span className="text-white/40 line-through text-xs">{row.before}</span>
                      <span className="text-uv-purple font-semibold">{row.discount}</span>
                      <span className="text-neon-green font-black">{row.after}</span>
                      <span className="text-white/70">{row.perKid} {isAr ? 'ر' : 'SAR'}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Big Birthday Pack */}
            {exp.bigBirthdayPack && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-white/8">
                <div className="px-5 py-3 font-heading font-black text-white text-base" style={{ background: `linear-gradient(90deg, ${exp.color}30, ${exp.color}10)` }}>
                  🎂 {isAr ? 'باقة عيد الميلاد الكبيرة' : 'Big Birthday Pack — Details'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/5">
                    <p className="text-neon-green font-heading font-bold text-xs uppercase tracking-wider mb-2">{isAr ? '✅ مسموح' : '✅ Allowed'}</p>
                    {exp.bigBirthdayPack.allowed.map((i, k) => <p key={k} className="text-white/60 text-sm font-body">• {i}</p>)}
                  </div>
                  <div className="p-4 border-b border-white/5">
                    <p className="text-neon-pink font-heading font-bold text-xs uppercase tracking-wider mb-2">{isAr ? '🚫 ممنوع' : '🚫 Prohibited'}</p>
                    {exp.bigBirthdayPack.prohibited.map((i, k) => <p key={k} className="text-white/60 text-sm font-body">• {i}</p>)}
                  </div>
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/5">
                    <p className="text-electric-cyan font-heading font-bold text-xs uppercase tracking-wider mb-2">{isAr ? '📋 لتأكيد الحجز' : '📋 To Confirm Booking'}</p>
                    {exp.bigBirthdayPack.booking.map((i, k) => <p key={k} className="text-white/60 text-sm font-body">• {i}</p>)}
                  </div>
                  <div className="p-4">
                    <p className="text-uv-purple font-heading font-bold text-xs uppercase tracking-wider mb-2">{isAr ? 'ℹ️ معلومات إضافية' : 'ℹ️ Additional Info'}</p>
                    {exp.bigBirthdayPack.additional.map((i, k) => <p key={k} className="text-white/60 text-sm font-body">• {i}</p>)}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Figurine Picker */}
            {exp.figurines && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-4 flex items-center gap-2">
                  <span style={{ color: exp.color }}>🎭</span> {isAr ? 'اختر مجسمك' : 'Choose Your Figurine'}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {exp.figurines.map((fig, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-2 text-center hover:border-white/20 transition-all group cursor-pointer"
                      onClick={() => setLightbox(fig.img)}>
                      <img src={fig.img} alt={fig.name} className="w-full aspect-square object-cover rounded-lg mb-1.5 group-hover:scale-105 transition-transform" />
                      <p className="text-white/60 text-xs font-body">{fig.name}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/30 text-xs font-body mt-3">{isAr ? '* اضغط على أي مجسم لتكبيره' : '* Tap any figurine to zoom in'}</p>
              </motion.div>
            )}

            {/* What's Included */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                <span style={{ color: exp.color }}>✓</span> {tr(lang, 'detail_includes')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exp.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: exp.color }} />
                    <span className="font-body text-white/65 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rules */}
            {exp.rules && exp.rules.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl p-5 border"
                style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}>
                <h3 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: exp.color }} /> {tr(lang, 'detail_rules')}
                </h3>
                <ul className="space-y-2.5">
                  {exp.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-body text-white/55 text-sm leading-relaxed">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Gallery */}
            {exp.gallery && exp.gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                  <Camera className="w-5 h-5" style={{ color: exp.color }} /> {tr(lang, 'detail_gallery')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {exp.gallery.map((img, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.03 }} onClick={() => setLightbox(img)}
                      className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square">
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Booking (2 cols) */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/8 overflow-hidden"
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))` }}>

              {/* Card top accent */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}44)` }} />

              <div className="p-6 md:p-8">
                {exp.whatsappOnly ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                    <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl"
                      style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                      💬
                    </div>
                    <h3 className="font-heading font-black text-white text-xl mb-3">{tr(lang, 'detail_whatsapp_only_title')}</h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed mb-6">{tr(lang, 'detail_whatsapp_only_body')}</p>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full h-14 rounded-xl font-heading font-bold text-base text-white flex items-center justify-center gap-3 transition-all hover:scale-105 hover:brightness-110"
                      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }}>
                      <MessageCircle className="w-5 h-5" />
                      {tr(lang, 'detail_whatsapp_btn')}
                    </button>
                    <p className="text-white/20 text-xs mt-4 font-body">+966 55 456 3447</p>
                  </motion.div>
                ) : submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="font-heading font-black text-white text-2xl mb-3">{tr(lang, 'detail_booked_title')}</h3>
                    <p className="font-body text-white/60 text-sm leading-relaxed mb-5">{tr(lang, 'detail_booked_sub')}</p>
                    <div className="rounded-xl p-4 text-left space-y-1.5 mb-5 border" style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}>
                      <p className="text-white/75 text-sm font-body">📅 {form.date} — {form.time}</p>
                      <p className="text-white/75 text-sm font-body">👥 {form.people} {isAr ? 'أشخاص' : 'people'}</p>
                      <p className="text-white/75 text-sm font-body">👤 {form.name}</p>
                    </div>
                    <div className="bg-electric-cyan/5 border border-electric-cyan/20 rounded-xl p-4 mb-6">
                      <p className="text-electric-cyan font-heading font-bold text-sm mb-1">{tr(lang, 'detail_reminder_title')}</p>
                      <p className="text-white/50 text-xs font-body leading-relaxed">{tr(lang, 'detail_reminder_body')}</p>
                    </div>
                    <Link to="/" className="text-white/30 hover:text-white text-sm font-body transition-colors">{tr(lang, 'detail_back')}</Link>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-white text-xl mb-6">{tr(lang, 'detail_reserve')}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_date')}</Label>
                          <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_time')}</Label>
                          <Select required onValueChange={v => setForm({ ...form, time: v })}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm">
                              <SelectValue placeholder={tr(lang, 'detail_pick_time')} />
                            </SelectTrigger>
                            <SelectContent className="bg-obsidian border-white/10">
                              {timeSlots.map(t => (
                                <SelectItem key={t} value={t} className="text-white focus:bg-white/10">{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_num_people')}</Label>
                        <Select required onValueChange={v => setForm({ ...form, people: v })}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm">
                            <SelectValue placeholder={tr(lang, 'booking_how_many')} />
                          </SelectTrigger>
                          <SelectContent className="bg-obsidian border-white/10">
                            {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => (
                              <SelectItem key={n} value={String(n)} className="text-white focus:bg-white/10">{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_your_name')}</Label>
                        <Input required placeholder={tr(lang, 'booking_fullname')} value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_email')}</Label>
                          <Input type="email" required placeholder="you@email.com" value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_phone')}</Label>
                          <Input placeholder="+966..." value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                        </div>
                      </div>
                      <button type="submit"
                        className="w-full h-13 py-3.5 text-white font-heading font-bold rounded-xl text-base transition-all hover:scale-[1.02] hover:brightness-110"
                        style={{ backgroundColor: exp.color, boxShadow: `0 8px 30px ${exp.color}40` }}>
                        {tr(lang, 'detail_book_btn')}
                      </button>
                      <p className="text-center text-white/20 text-xs font-body">{tr(lang, 'detail_cancel')}</p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* WhatsApp CTA below form for non-whatsapp-only */}
            {!exp.whatsappOnly && (
              <div className="mt-4">
                <button onClick={handleWhatsApp}
                  className="w-full h-12 rounded-xl font-heading font-semibold text-sm text-white/80 flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] hover:bg-neon-green/10 hover:border-neon-green/30 hover:text-white transition-all">
                  <MessageCircle className="w-4 h-4 text-neon-green" />
                  {isAr ? 'أو تواصل عبر واتساب' : 'Or chat with us on WhatsApp'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-bold" onClick={() => setLightbox(null)}>✕</button>
          <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
        </motion.div>
      )}
    </div>
  );
}