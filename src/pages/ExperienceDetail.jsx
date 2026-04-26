import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, CheckCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const EXPERIENCES_EN = {
  'open-paint-sessions': {
    title: 'Open Paint Sessions',
    tagline: 'No rules. Just paint.',
    description: 'Walk in, pick your colors, and let loose. Under UV lights, every splash becomes a masterpiece. Open sessions are perfect if you just want to show up and have fun — no pressure, just pure creative chaos. Available with regular lighting (afternoon) and neon UV lighting (from 7 PM until closing).',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png",
    icon: '🎨', color: '#FF007F',
    duration: '60–90 min', groupSize: '1–20 people',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR' },
      { name: '🌀 Spin', price: '149 SAR' },
      { name: '🎢 Swing', price: '149 SAR' },
      { name: '🐻 Pour (Bear Figurine)', price: '160 SAR' },
      { name: '📱 Splash Phone Case', price: '105 SAR' },
      { name: '🖼️ Group Splash (Big Canvas)', price: '385 SAR' },
    ],
    includes: [
      'All UV paints & brushes',
      'Apron & protective cover-up',
      'Take-home artwork',
      'Available in afternoon (regular light) or evening neon UV lighting (from 7 PM)',
    ],
    rules: [
      'One parent/guardian must accompany children at all times. Any additional guardian requires a paid entry.',
      'Wear clothes you do not mind getting paint on, or use our aprons.',
      'Please arrive at least 10 minutes before your session.',
    ],
    vibes: ['Solo', 'Couples', 'Small groups', 'Walk-in friendly'],
    whatsappOnly: false,
    gallery: [],
  },
  'birthday-experiences': {
    title: 'Birthday Experiences',
    tagline: 'The most colorful birthday ever.',
    description: 'Forget boring dinner reservations. Celebrate your birthday with a full-on paint party — UV lights, your crew, birthday music, and neon color everywhere. We set everything up so you just have to show up and have the best time of your year. Food is NOT provided — but groups of 20–25+ are welcome to bring their own. We strive to make the space as private as possible for your group.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/049f6ea1d_generated_3b2a572d.png",
    icon: '🎉', color: '#9D00FF',
    duration: '90–120 min', groupSize: '10+ people',
    priceTable: null,
    price: 'Contact via WhatsApp for custom pricing',
    includes: [
      'Birthday music playlist for the whole group',
      'Birthday card',
      'Neon glow bracelets for everyone',
      'Neon glasses for everyone',
      'Birthday hair band',
      'All UV paints & materials',
      'Private or semi-private space (we do our best)',
      'Birthday cake available as add-on (+100 SAR)',
    ],
    rules: [
      'Booking is done exclusively via WhatsApp.',
      'Food is NOT provided by Splash Spectrum.',
      'Groups of 20–25 people or more are welcome to bring their own food.',
      'We will do our utmost to make the space as private as possible for your group.',
      'Please arrive 10 minutes before your session.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Birthday parties', 'Milestone celebrations', 'Group events'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, BIRTHDAY_PACK],
  },
  'graduation': {
    title: 'Graduation Celebrations',
    tagline: 'Mark your milestone in color.',
    description: 'You made it — celebrate in the most unforgettable way. A graduation paint experience at Splash Spectrum is a vibrant, energetic event that your whole group will talk about for years. We will do everything we can to make your space private and special. Food is NOT provided — but groups of 20–25+ are welcome to bring their own.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/11d7bf5be_image.png",
    icon: '🎓', color: '#00F3FF',
    duration: '90–120 min', groupSize: '10+ people',
    priceTable: null,
    price: 'Contact via WhatsApp for custom pricing',
    includes: [
      'All UV paints & materials for every guest',
      'Private or semi-private space (we do our best)',
      'Celebratory atmosphere with music',
      'Take-home artwork for every participant',
      'Graduation badge/add-ons available upon request',
    ],
    rules: [
      'Booking is done exclusively via WhatsApp.',
      'Food is NOT provided by Splash Spectrum.',
      'Groups of 20–25 people or more are welcome to bring their own food.',
      'We will do our utmost to make the space as private as possible for your group.',
      'Please arrive 10 minutes before your session.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Graduation parties', 'Private group events', 'Milestone celebrations'],
    whatsappOnly: true,
    gallery: [],
  },
  'group-friends': {
    title: 'Group & Friends',
    tagline: 'Bring your crew. Leave with memories.',
    description: 'There is no better bonding activity than getting covered in fluorescent paint together. Group sessions are high-energy, loud, and incredibly fun. Whether it\'s a friend group, a date night squad, or a casual gathering — this is the move. Guided by our team, every technique from Splash to Spin to Pour is open to you.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png",
    icon: '👯', color: '#00F3FF',
    duration: '90 min', groupSize: '4–50 people',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR/person' },
      { name: '🌀 Spin', price: '149 SAR/person' },
      { name: '🎢 Swing', price: '149 SAR/person' },
      { name: '🐻 Pour (Bear Figurine)', price: '160 SAR/person' },
      { name: '🖼️ Group Splash (Big Canvas)', price: '385 SAR (shared)' },
    ],
    includes: [
      'Guided session by our team',
      'All paints & tools',
      'Aprons & cover-ups',
      'Take-home artwork',
      'Available in regular or UV neon lighting',
    ],
    rules: [
      'One parent must be present for all children.',
      'Please arrive 10 minutes early.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Friend groups', 'Date nights', 'Team bonding', 'Celebrations'],
    whatsappOnly: false,
    gallery: [],
  },
  'kids-experiences': {
    title: 'Kids Experiences',
    tagline: 'Safe, silly, and absolutely magical.',
    description: 'Designed specifically for younger artists. Fully supervised, with child-safe UV paint, and activities tailored to keep little ones engaged. One parent or guardian must be present at all times. Any additional guardian requires an entry fee. Painting is scientifically proven to nurture creativity and promote psychological well-being in children of all ages.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png",
    icon: '🧸', color: '#39FF14',
    duration: '60–90 min', groupSize: '2–30 kids',
    priceTable: [
      { name: '🎨 Splash', price: '149 SAR/child' },
      { name: '🌀 Spin', price: '149 SAR/child' },
      { name: '🎢 Swing', price: '149 SAR/child' },
      { name: '🐻 Pour (Bear Figurine)', price: '160 SAR/child' },
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
      'ONE parent or guardian must accompany children at all times.',
      'Any additional guardian requires a paid entry fee.',
      'Please arrive 10 minutes before the session.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Ages 3+', 'Supervised', 'Parent-friendly', 'School trips'],
    whatsappOnly: false,
    gallery: [KIDS_PHOTO1, KIDS_PHOTO2],
  },
  'custom-art-figurines': {
    title: 'Custom Art & Figurines',
    tagline: 'Paint something you\'ll keep forever.',
    description: 'Move beyond canvas. In this session you paint a custom 3D bear figurine under UV light. The paint flows and drips creating a one-of-a-kind glowing masterpiece that you take home. It\'s precise, personal, and mesmerizing to watch come to life.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png",
    icon: '🎁', color: '#FF007F',
    duration: '90 min', groupSize: '1–20 people',
    priceTable: [
      { name: '🐻 Pour (Bear Figurine)', price: '160 SAR/person' },
    ],
    includes: [
      'Your own 3D bear figurine',
      'Specialty UV paints in all colors',
      'Fine pouring tools',
      'Take-home box for your masterpiece',
    ],
    rules: [
      'No prior art experience needed.',
      'Please arrive 10 minutes before.',
      'Wear clothes you do not mind getting paint on.',
    ],
    vibes: ['Artistic', 'Detail-focused', 'Unique keepsake', 'All ages'],
    whatsappOnly: false,
    gallery: [],
  },
  'special-events': {
    title: 'Special Events',
    tagline: 'We build the experience around you.',
    description: 'From corporate team days to brand activations, to anniversary surprises — we craft fully custom immersive paint events for any occasion. Our experienced instructors guide your group through Splash, Spin, Swing and Pour techniques. We can host at our Riyadh studio or bring the experience to your office.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png",
    icon: '🤍', color: '#9D00FF',
    duration: 'Custom', groupSize: '10–100+ people',
    priceTable: null,
    price: 'Custom quote — contact via WhatsApp',
    includes: [
      'Full custom event coordination',
      'All paint techniques: Splash, Spin, Swing, Pour',
      'Custom branding options available',
      'Can be hosted at our studio OR at your venue',
      'Dedicated event team',
      'Group canvas or individual artwork',
    ],
    rules: [
      'Contact us in advance to plan your event.',
      'Minimum group size: 10 people.',
      'Venue logistics discussed during consultation.',
    ],
    vibes: ['Corporate events', 'Team building', 'Brand activations', 'Large groups'],
    whatsappOnly: false,
    gallery: [],
  },
};

const EXPERIENCES_AR = {
  'open-paint-sessions': {
    title: 'جلسات الرسم الحرة',
    tagline: 'لا قواعد. فقط ألوان.',
    description: 'ادخل، اختر ألوانك، وانطلق. تحت أضواء الفلورسنت كل رشة تصبح لوحة فنية. الجلسات الحرة مثالية إذا أردت فقط الاستمتاع — لا ضغط، فقط فوضى إبداعية خالصة. متوفرة بإضاءة عادية (فترة العصر) وإضاءة نيون UV (من الساعة 7 مساءً حتى الإغلاق).',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png",
    icon: '🎨', color: '#FF007F',
    duration: '60–90 دقيقة', groupSize: '1–20 شخص',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال' },
      { name: '🌀 سبين', price: '149 ريال' },
      { name: '🎢 سوينق', price: '149 ريال' },
      { name: '🐻 فن السكب (دب)', price: '160 ريال' },
      { name: '📱 سبلاش كفر جوال', price: '105 ريال' },
      { name: '🖼️ سبلاش لوحة كبيرة (جماعي)', price: '385 ريال' },
    ],
    includes: [
      'جميع ألوان UV والفراشي',
      'مريلة وغطاء واقي',
      'لوحة فنية تأخذها معك للبيت',
      'متاحة بإضاءة عادية (العصر) أو إضاءة نيون (من 7م)',
    ],
    rules: [
      'يجب أن يرافق أحد الوالدين الأطفال في جميع الأوقات. أي مرافق إضافي يتطلب رسوم دخول.',
      'ارتدِ ملابس لا تمانع تلطيخها، أو استخدم مريلتنا.',
      'يُرجى الحضور قبل 10 دقائق من بدء جلستك.',
    ],
    vibes: ['منفرد', 'ثنائي', 'مجموعات صغيرة', 'دخول حر'],
    whatsappOnly: false,
    gallery: [],
  },
  'birthday-experiences': {
    title: 'تجارب أعياد الميلاد',
    tagline: 'أجمل عيد ميلاد في حياتك.',
    description: 'انسَ حجوزات العشاء المملة. احتفل بعيد ميلادك بحفلة رسم كاملة — أضواء UV، مجموعتك، موسيقى عيد الميلاد، وألوان نيون في كل مكان. نحن نجهز كل شيء، ما عليك إلا الحضور والاستمتاع. الطعام غير مقدم — لكن المجموعات من 20–25 شخصاً فأكثر يمكنها إحضار طعامها الخاص. نحرص على توفير أقصى درجات الخصوصية لمجموعتك.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/049f6ea1d_generated_3b2a572d.png",
    icon: '🎉', color: '#9D00FF',
    duration: '90–120 دقيقة', groupSize: '10+ أشخاص',
    priceTable: null,
    price: 'تواصل عبر واتساب للاستفسار عن الأسعار',
    includes: [
      'موسيقى عيد الميلاد للمجموعة كاملة',
      'بطاقة عيد الميلاد',
      'أساور نيون متوهجة للجميع',
      'نظارات نيون للجميع',
      'ربطة شعر عيد الميلاد',
      'جميع ألوان UV والمواد',
      'مساحة خاصة أو شبه خاصة (نبذل قصارى جهدنا)',
      'كعكة عيد الميلاد متاحة كإضافة (+100 ريال)',
    ],
    rules: [
      'الحجز يتم حصرياً عبر واتساب.',
      'الطعام غير مقدم من سبلاش سبيكتروم.',
      'المجموعات من 20–25 شخصاً فأكثر يمكنها إحضار طعامها الخاص.',
      'نحرص على توفير أقصى درجات الخصوصية لمجموعتك.',
      'يُرجى الحضور قبل 10 دقائق من الموعد.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['حفلات أعياد الميلاد', 'الاحتفالات', 'المجموعات'],
    whatsappOnly: true,
    gallery: [BIRTHDAY_PHOTO, BIRTHDAY_PACK],
  },
  'graduation': {
    title: 'احتفالات التخرج',
    tagline: 'احتفل بإنجازك بالألوان.',
    description: 'لقد نجحت — احتفل بأكثر الطرق لا تُنسى. تجربة رسم التخرج في سبلاش سبيكتروم هي حدث نابض بالحياة ومليء بالطاقة ستتحدث عنه مجموعتك لسنوات. نبذل قصارى جهدنا لجعل المساحة خاصة ومميزة لك. الطعام غير مقدم — لكن المجموعات من 20–25 شخصاً فأكثر يمكنها إحضار طعامها الخاص.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/11d7bf5be_image.png",
    icon: '🎓', color: '#00F3FF',
    duration: '90–120 دقيقة', groupSize: '10+ أشخاص',
    priceTable: null,
    price: 'تواصل عبر واتساب للاستفسار عن الأسعار',
    includes: [
      'جميع ألوان UV والمواد لكل ضيف',
      'مساحة خاصة أو شبه خاصة (نبذل قصارى جهدنا)',
      'أجواء احتفالية مع موسيقى',
      'لوحة فنية يأخذها كل مشارك للبيت',
      'إضافات خاصة بالتخرج متاحة عند الطلب',
    ],
    rules: [
      'الحجز يتم حصرياً عبر واتساب.',
      'الطعام غير مقدم من سبلاش سبيكتروم.',
      'المجموعات من 20–25 شخصاً فأكثر يمكنها إحضار طعامها الخاص.',
      'نحرص على توفير أقصى درجات الخصوصية لمجموعتك.',
      'يُرجى الحضور قبل 10 دقائق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['حفلات التخرج', 'المجموعات الخاصة', 'الاحتفالات الكبرى'],
    whatsappOnly: true,
    gallery: [],
  },
  'group-friends': {
    title: 'المجموعات والأصدقاء',
    tagline: 'أحضر مجموعتك. اخرج بذكريات.',
    description: 'لا توجد نشاط لبناء الفريق أفضل من أن تتلطخوا جميعاً بالألوان الفلورسنت. الجلسات الجماعية مليئة بالطاقة والضحك والمرح. سواء كانت مجموعة أصدقاء، ليلة ثنائية، أو احتفال — هذا هو الخيار المثالي.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png",
    icon: '👯', color: '#00F3FF',
    duration: '90 دقيقة', groupSize: '4–50 شخص',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال/شخص' },
      { name: '🌀 سبين', price: '149 ريال/شخص' },
      { name: '🎢 سوينق', price: '149 ريال/شخص' },
      { name: '🐻 فن السكب (دب)', price: '160 ريال/شخص' },
      { name: '🖼️ سبلاش لوحة كبيرة', price: '385 ريال (مشترك)' },
    ],
    includes: [
      'جلسة موجهة من فريقنا',
      'جميع الألوان والأدوات',
      'مرايل وأغطية واقية',
      'لوحة فنية للمنزل',
      'متاحة بإضاءة عادية أو نيون UV',
    ],
    rules: [
      'يجب أن يرافق أحد الوالدين الأطفال.',
      'يُرجى الحضور قبل 10 دقائق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['مجموعات الأصدقاء', 'الثنائيات', 'بناء الفريق', 'الاحتفالات'],
    whatsappOnly: false,
    gallery: [],
  },
  'kids-experiences': {
    title: 'تجارب الأطفال',
    tagline: 'آمنة، مرحة، وسحرية تماماً.',
    description: 'مصممة خصيصاً للفنانين الصغار. إشراف كامل، ألوان UV آمنة للأطفال، وأنشطة مصممة لإبقاء الأطفال منخرطين طوال الوقت. يجب أن يكون أحد الوالدين حاضراً في جميع الأوقات. أثبتت الدراسات العلمية أن الرسم يعزز الإبداع والرفاهية النفسية لدى الأطفال.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png",
    icon: '🧸', color: '#39FF14',
    duration: '60–90 دقيقة', groupSize: '2–30 طفل',
    priceTable: [
      { name: '🎨 سبلاش', price: '149 ريال/طفل' },
      { name: '🌀 سبين', price: '149 ريال/طفل' },
      { name: '🎢 سوينق', price: '149 ريال/طفل' },
      { name: '🐻 فن السكب (دب)', price: '160 ريال/طفل' },
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
      'يجب أن يرافق أحد الوالدين الأطفال في جميع الأوقات.',
      'أي مرافق إضافي يتطلب رسوم دخول.',
      'يُرجى الحضور قبل 10 دقائق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['من سن 3 سنوات', 'تحت الإشراف', 'صديق للوالدين', 'رحلات مدرسية'],
    whatsappOnly: false,
    gallery: [KIDS_PHOTO1, KIDS_PHOTO2],
  },
  'custom-art-figurines': {
    title: 'الفن المخصص والمجسمات',
    tagline: 'ارسم شيئاً ستحتفظ به إلى الأبد.',
    description: 'تجاوز اللوحة العادية. في هذه الجلسة تقوم بطلاء مجسم دب ثلاثي الأبعاد تحت أضواء UV. يتدفق الطلاء وينسكب ليخلق قطعة فنية متوهجة فريدة من نوعها تأخذها للمنزل. دقيقة، شخصية، ورائعة المنظر وهي تتشكل.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png",
    icon: '🎁', color: '#FF007F',
    duration: '90 دقيقة', groupSize: '1–20 شخص',
    priceTable: [
      { name: '🐻 فن السكب (مجسم الدب)', price: '160 ريال/شخص' },
    ],
    includes: [
      'مجسم الدب الثلاثي الأبعاد الخاص بك',
      'ألوان UV المتخصصة بجميع الألوان',
      'أدوات السكب الدقيقة',
      'صندوق لحمل تحفتك الفنية للمنزل',
    ],
    rules: [
      'لا تحتاج لأي خبرة فنية مسبقة.',
      'يُرجى الحضور قبل 10 دقائق.',
      'ارتدِ ملابس لا تمانع تلطيخها.',
    ],
    vibes: ['فني', 'تفصيلي', 'تذكار فريد', 'جميع الأعمار'],
    whatsappOnly: false,
    gallery: [],
  },
  'special-events': {
    title: 'الفعاليات الخاصة',
    tagline: 'نبني التجربة حول احتياجاتك.',
    description: 'من أيام فريق الشركات إلى تفعيل العلامات التجارية، إلى مفاجآت الذكرى السنوية — نصمم فعاليات رسم غامرة مخصصة لأي مناسبة. يمكننا الاستضافة في استوديونا بالرياض أو إحضار التجربة إلى مقر شركتك.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png",
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
      'تواصل معنا مسبقاً لتخطيط فعاليتك.',
      'الحد الأدنى لحجم المجموعة: 10 أشخاص.',
      'يتم مناقشة لوجستيات المكان خلال الاستشارة.',
    ],
    vibes: ['فعاليات الشركات', 'بناء الفريق', 'تفعيل العلامة التجارية', 'المجموعات الكبيرة'],
    whatsappOnly: false,
    gallery: [],
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
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors font-body text-sm">
              <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} /> {tr(lang, 'detail_back')}
            </Link>
            <span className="text-4xl block mb-3">{exp.icon}</span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-white mb-2" style={{ textShadow: `0 0 40px ${exp.color}66` }}>
              {exp.title}
            </h1>
            <p className="font-body text-white/60 text-lg">{exp.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-8">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="font-body text-white/65 leading-relaxed text-base">
              {exp.description}
            </motion.p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: tr(lang, 'detail_duration'), value: exp.duration },
                { icon: Users, label: tr(lang, 'detail_group'), value: exp.groupSize },
                { icon: Star, label: tr(lang, 'detail_price'), value: exp.price || (isAr ? 'انظر الأسعار' : 'See pricing') },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: exp.color }} />
                  <p className="text-white/30 text-xs font-body mb-0.5">{label}</p>
                  <p className="font-heading font-bold text-white text-xs">{value}</p>
                </div>
              ))}
            </div>

            {/* Pricing Table */}
            {exp.priceTable && (
              <div>
                <h3 className="font-heading font-bold text-white text-lg mb-4">{tr(lang, 'detail_prices')}</h3>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                  {exp.priceTable.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-3 ${i < exp.priceTable.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <span className="font-body text-white/70 text-sm">{row.name}</span>
                      <span className="font-heading font-bold text-sm" style={{ color: exp.color }}>{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* School Packages */}
            {exp.schoolPackages && (
              <div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {isAr ? 'باقات المدارس' : 'School Trip Packages'}
                </h3>
                <p className="text-white/40 text-xs mb-4 font-body">
                  {isAr ? 'نوفر صناديق للطلاب لحمل أعمالهم الفنية بسهولة إلى المنزل.' : 'We provide boxes for students to safely take home their artwork.'}
                </p>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden text-xs">
                  <div className="grid grid-cols-5 px-4 py-2 border-b border-white/10 text-white/40 font-heading font-semibold text-center">
                    <span>{isAr ? 'طلاب' : 'Students'}</span>
                    <span>{isAr ? 'قبل الخصم' : 'Before'}</span>
                    <span>{isAr ? 'خصم' : 'Discount'}</span>
                    <span className="text-neon-green">{isAr ? 'بعد الخصم' : 'After'}</span>
                    <span>{isAr ? 'للطالب' : 'Per Kid'}</span>
                  </div>
                  {exp.schoolPackages.map((row, i) => (
                    <div key={i} className={`grid grid-cols-5 px-4 py-2.5 text-center ${i < exp.schoolPackages.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <span className="text-white font-bold">{row.students}</span>
                      <span className="text-white/50">{row.before}</span>
                      <span className="text-uv-purple font-semibold">{row.discount}</span>
                      <span className="text-neon-green font-bold">{row.after}</span>
                      <span className="text-white/70">{row.perKid}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's included */}
            <div>
              <h3 className="font-heading font-bold text-white text-lg mb-4">{tr(lang, 'detail_includes')}</h3>
              <ul className="space-y-2">
                {exp.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: exp.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rules */}
            {exp.rules && exp.rules.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <h3 className="font-heading font-bold text-white text-base mb-3">📋 {tr(lang, 'detail_rules')}</h3>
                <ul className="space-y-2">
                  {exp.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-white/50 text-sm">
                      <span className="shrink-0 mt-0.5">•</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {exp.gallery && exp.gallery.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-white text-lg mb-4">{tr(lang, 'detail_gallery')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {exp.gallery.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full rounded-xl object-cover aspect-square" />
                  ))}
                </div>
              </div>
            )}

            {/* Vibes */}
            <div className="flex flex-wrap gap-2">
              {exp.vibes.map(vibe => (
                <span key={vibe} className="px-3 py-1 rounded-full border text-xs font-heading font-semibold"
                  style={{ borderColor: `${exp.color}44`, color: exp.color, background: `${exp.color}10` }}>
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Booking / WhatsApp */}
          <div>
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 md:p-8 sticky top-6">
              {exp.whatsappOnly ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="font-heading font-black text-white text-xl mb-3">{tr(lang, 'detail_whatsapp_only_title')}</h3>
                  <p className="font-body text-white/55 text-sm leading-relaxed mb-6">{tr(lang, 'detail_whatsapp_only_body')}</p>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full h-14 rounded-xl font-heading font-bold text-base text-white flex items-center justify-center gap-3 transition-transform hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {tr(lang, 'detail_whatsapp_btn')}
                  </button>
                  <p className="text-white/20 text-xs mt-4 font-body">+966 55 456 3447</p>
                </motion.div>
              ) : submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-heading font-black text-white text-2xl mb-3">{tr(lang, 'detail_booked_title')}</h3>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-4">{tr(lang, 'detail_booked_sub')}</p>
                  <div className="bg-neon-pink/10 border border-neon-pink/20 rounded-xl p-4 text-left space-y-1 mb-6">
                    <p className="text-white/80 text-sm font-body">📅 {form.date} — {form.time}</p>
                    <p className="text-white/80 text-sm font-body">👥 {form.people}</p>
                    <p className="text-white/80 text-sm font-body">👤 {form.name}</p>
                  </div>
                  <div className="bg-electric-cyan/5 border border-electric-cyan/20 rounded-xl p-4">
                    <p className="text-electric-cyan font-heading font-bold text-sm mb-1">{tr(lang, 'detail_reminder_title')}</p>
                    <p className="text-white/60 text-xs font-body leading-relaxed">{tr(lang, 'detail_reminder_body')}</p>
                  </div>
                  <Link to="/" className="mt-6 inline-block text-white/40 hover:text-white text-sm font-body transition-colors">
                    {tr(lang, 'detail_back')}
                  </Link>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-white text-xl mb-6">{tr(lang, 'detail_reserve')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_date')}</Label>
                        <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_time')}</Label>
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
                      <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_num_people')}</Label>
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
                      <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_your_name')}</Label>
                      <Input required placeholder={tr(lang, 'booking_fullname')} value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_email')}</Label>
                        <Input type="email" required placeholder="you@email.com" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">{tr(lang, 'detail_phone')}</Label>
                        <Input placeholder="+966..." value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-white font-heading font-bold rounded-xl text-base animate-pulse-glow"
                      style={{ backgroundColor: exp.color }}>
                      {tr(lang, 'detail_book_btn')}
                    </Button>
                    <p className="text-center text-white/20 text-xs font-body">{tr(lang, 'detail_cancel')}</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}