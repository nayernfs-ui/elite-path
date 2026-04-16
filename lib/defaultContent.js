// Default content for Elite-Path
// This is the fallback content if the database has nothing yet.
// Once the admin edits anything, the database version takes over.

export const defaultContent = {
  brand: {
    name_en: "Elite-Path",
    name_ar: "إيليت باث",
    tagline_en: "Premium visa, study abroad, and immigration services",
    tagline_ar: "خدمات متميزة للتأشيرات والدراسة والهجرة"
  },

  design: {
    color_bg: "#0a1628",
    color_bg_elevated: "#0f1e35",
    color_surface: "#14253f",
    color_gold: "#ceA761",
    color_gold_bright: "#e4c188",
    color_text: "#f5f1e8",
    font_display: "Cormorant Garamond",
    font_body: "Manrope"
  },

  hero: {
    eyebrow_en: "Trusted by 13,800+ travelers",
    eyebrow_ar: "يثق بنا أكثر من 13,800 مسافر",
    title_line_en: "Your passport to",
    title_line_ar: "جوازك إلى",
    title_highlight_en: "the world.",
    title_highlight_ar: "العالم.",
    lede_en: "Premium visa, study abroad, and immigration services. We turn complex paperwork into approved applications — for the US, Canada, and beyond.",
    lede_ar: "خدمات متميزة للتأشيرات والدراسة والهجرة. نحوّل الأوراق المعقدة إلى طلبات معتمدة — لأمريكا وكندا والعالم.",
    cta_primary_en: "Start Your Application",
    cta_primary_ar: "ابدأ طلبك الآن",
    cta_secondary_en: "Explore Services →",
    cta_secondary_ar: "← استكشف الخدمات"
  },

  stats: [
    { value: "13.8K+", label_en: "Community members", label_ar: "أعضاء المجتمع" },
    { value: "98%", label_en: "Approval rate", label_ar: "نسبة القبول" },
    { value: "10+", label_en: "Countries served", label_ar: "دول نخدمها" }
  ],

  services: [
    { title_en: "USA Tourism Visa (B1/B2)", title_ar: "فيزا سياحة أمريكا (B1/B2)", desc_en: "End-to-end support for US visitor visas. Application, interview prep, and documentation tailored to your profile.", desc_ar: "دعم كامل لتأشيرة الزيارة الأمريكية. تقديم الطلب، تجهيز المقابلة، والمستندات المخصصة لملفك.", featured: true },
    { title_en: "Canada Tourism Visa", title_ar: "فيزا سياحة كندا", desc_en: "Temporary Resident Visa (TRV) applications via the IRCC portal. Complete family files, strong documentation.", desc_ar: "طلبات تأشيرة الإقامة المؤقتة عبر بوابة IRCC. ملفات عائلية كاملة وتوثيق قوي.", featured: false },
    { title_en: "Study Abroad", title_ar: "الدراسة بالخارج", desc_en: "Student visa guidance, university selection, and application support for programs in the US, Canada, and Europe.", desc_ar: "إرشاد تأشيرة الطالب، اختيار الجامعة، ودعم التقديم لبرامج في أمريكا وكندا وأوروبا.", featured: false },
    { title_en: "Immigration Services", title_ar: "خدمات الهجرة", desc_en: "Long-term immigration pathways, permanent residency applications, and family sponsorship programs.", desc_ar: "مسارات الهجرة طويلة الأمد، طلبات الإقامة الدائمة، وبرامج لم الشمل العائلي.", featured: false },
    { title_en: "Interview Preparation", title_ar: "تجهيز المقابلة", desc_en: "One-on-one coaching sessions. We simulate consulate interviews so you walk in prepared and confident.", desc_ar: "جلسات تدريب فردية. نحاكي مقابلة القنصلية لتدخل بثقة واستعداد كامل.", featured: false },
    { title_en: "Document Preparation", title_ar: "تجهيز المستندات", desc_en: "Translation, notarization, and organization of your complete application package — nothing missed.", desc_ar: "ترجمة، توثيق، وتنظيم كامل ملف طلبك — دون إغفال أي تفصيل.", featured: false }
  ],

  why: [
    { title_en: "Proven track record", title_ar: "سجل حافل بالنجاح", desc_en: "Thousands of approved applications, documented and celebrated in our 13.8K+ member community.", desc_ar: "آلاف الطلبات المعتمدة، موثقة ومحتفى بها في مجتمعنا الذي يضم أكثر من 13,800 عضو." },
    { title_en: "Personal attention", title_ar: "اهتمام شخصي", desc_en: "You're not a file number. Every client gets a dedicated advisor who knows your case by heart.", desc_ar: "لست مجرد رقم ملف. كل عميل يحصل على مستشار مخصص يعرف قضيتك عن ظهر قلب." },
    { title_en: "Transparent pricing", title_ar: "أسعار شفافة", desc_en: "No hidden fees. No surprises. Clear packages that you understand before you commit.", desc_ar: "لا رسوم خفية. لا مفاجآت. باقات واضحة تفهمها قبل أن تلتزم." },
    { title_en: "Bilingual support", title_ar: "دعم بلغتين", desc_en: "Arabic and English, across every step. Because clarity should never be lost in translation.", desc_ar: "بالعربية والإنجليزية، في كل خطوة. لأن الوضوح يجب ألا يضيع في الترجمة." }
  ],

  process: [
    { title_en: "Free Consultation", title_ar: "استشارة مجانية", desc_en: "Tell us your goal. We assess your profile, recommend the right visa path, and quote a transparent fee.", desc_ar: "أخبرنا بهدفك. نُقيّم ملفك ونرشح المسار الصحيح ونحدد أتعاباً شفافة." },
    { title_en: "Document Preparation", title_ar: "تجهيز المستندات", desc_en: "We build a complete, bulletproof application file. Nothing submitted until it's ready to win.", desc_ar: "نبني ملفاً كاملاً متيناً. لا يُرسل شيء قبل أن يكون جاهزاً للفوز." },
    { title_en: "Submission & Interview", title_ar: "التقديم والمقابلة", desc_en: "We submit on your behalf and prepare you for the consular interview with mock sessions.", desc_ar: "نقدّم الطلب نيابةً عنك ونجهزك لمقابلة القنصلية بجلسات محاكاة." },
    { title_en: "Approval & Travel", title_ar: "الموافقة والسفر", desc_en: "Your visa is approved. You join our 13.8K+ community of success stories. Pack your bags.", desc_ar: "تأشيرتك معتمدة. تنضم إلى مجتمع النجاحات الذي يضم +13,800. جهّز حقائبك." }
  ],

  testimonials: [
    { name: "Malek", location_en: "Cairo, Egypt", location_ar: "القاهرة، مصر", flag: "🇺🇸", type_en: "USA B1/B2", type_ar: "أمريكا B1/B2", quote_en: "I had been rejected twice before. Elite-Path rebuilt my file from scratch and coached me for the interview. Approved on my third try.", quote_ar: "تم رفضي مرتين من قبل. إيليت باث أعادوا بناء ملفي من الصفر ودربوني للمقابلة. تمت الموافقة في المرة الثالثة." },
    { name: "Mariam", location_en: "Giza, Egypt", location_ar: "الجيزة، مصر", flag: "🇨🇦", type_en: "Canada TRV", type_ar: "كندا زيارة", quote_en: "Family of four, all approved together. The IRCC portal felt impossible before — Elite-Path made it feel simple.", quote_ar: "عائلة من أربعة أفراد، تمت الموافقة لنا جميعاً. بوابة IRCC كانت تبدو مستحيلة — إيليت باث جعلتها سهلة." },
    { name: "Khaled", location_en: "Boston, USA", location_ar: "بوسطن، أمريكا", flag: "🇺🇸", type_en: "USA Student", type_ar: "أمريكا طالب", quote_en: "They helped me choose the university, apply, and get my student visa. I'm writing this from Boston.", quote_ar: "ساعدوني في اختيار الجامعة والتقديم والحصول على تأشيرة الطالب. أكتب هذا الآن من بوسطن." }
  ],

  advisors: [
    { name_en: "Mr. Nayer Raouf", name_ar: "أ. ناير رؤوف", phone: "971559312283", phone_display: "+971 55 931 2283", initials: "NR" },
    { name_en: "Mr. Sameh Farouk", name_ar: "أ. سامح فاروق", phone: "971509787748", phone_display: "+971 50 978 7748", initials: "SF" },
    { name_en: "Dr. Karim Salama", name_ar: "د. كريم سلامة", phone: "971504485145", phone_display: "+971 50 448 5145", initials: "KS" }
  ],

  contact: {
    email: "nayer.nfs@gmail.com",
    office_en: "Dubai, UAE",
    office_ar: "دبي، الإمارات",
    facebook_url: "https://www.facebook.com/groups/577292007865093"
  }
};
