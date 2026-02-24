/* ============================================================
   SARHAN INDICATORS — i18n (Internationalization) Module
   Handles: Arabic/English bilingual support with localStorage persistence
   ============================================================ */

const translations = {
  ar: {
    // ===== NAVBAR =====
    'nav.home': 'الرئيسية',
    'nav.indicators': 'المؤشرات',
    'nav.pricing': 'الأسعار',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.login': 'تسجيل الدخول',
    'nav.myAccount': 'حسابي',
    'nav.adminPanel': 'لوحة التحكم',

    // ===== HERO =====
    'hero.badge': '2000+ متداول يستخدم المؤشرات على TradingView',
    'hero.title': 'ابدأ التداول بدقة المؤشرات',
    'hero.subtitle': 'احصل على إشارات دخول وخروج دقيقة مبنية على تحليل فني متقدم. مؤشراتنا مصممة لتقليل الضوضاء وزيادة احتمالية الأرباح في أسواق المال',
    'hero.cta': 'اكتشف المؤشرات الآن',
    'hero.indicatorDesc': 'مؤشر مُطور بيعتمد على دمج 3 استراتيجيات قوية (Trend – Breakout – Pullback) في وقت واحد:',
    'hero.indicatorF1': 'بيحدد نقطة دخول مؤكدة بعد توافق الاستراتيجيات.',
    'hero.indicatorF2': 'نسبة نجاح ممكن توصل لـ 75% مع الالتزام بالتعليمات.',
    'hero.indicatorF3': 'مزود بنظام التارجت سيستم اللي بيحدد الدخول والهدف والاستوب تلقائيًا فور ظهور الإشارة.',
    'hero.indicatorF4': 'بيساعدك تنفّذ الصفقة فورًا بدون ما تحسب أي مستويات أو تعمل اجتهاد شخصي',
    'hero.learnMore': 'تعرف أكثر عن',

    // ===== X TREND PRO SECTION =====
    'xtrend.tag': 'مؤشر الصفقات',
    'xtrend.subtitle': 'مؤشر مُطور بيعتمد على دمج 3 استراتيجيات قوية في وقت واحد: Trend – Breakout – Pullback',
    'xtrend.feature1': 'بيحدد نقطة دخول مؤكدة بعد توافق الاستراتيجيات',
    'xtrend.feature2': 'نسبة نجاح ممكن توصل لـ 75% مع الالتزام بالتعليمات',
    'xtrend.feature3': 'مزود بنظام التارجت سيستم اللي بيحدد الدخول والهدف والاستوب تلقائيًا فور ظهور الإشارة',
    'xtrend.feature4': 'بيساعدك تنفّذ الصفقة فورًا بدون ما تحسب أي مستويات أو تعمل اجتهاد شخصي',
    'xtrend.learnMore': 'تعرف أكثر ←',

    // ===== SARHAN SMART MAP SECTION =====
    'smartmap.tag': 'مؤشر تحليل (SMC)',
    'smartmap.desc': 'أداة تحليل متكاملة مبنية على Smart Money + Price Action وتشرح حركة السوق بشكل واضح.',
    'smartmap.f1': 'الهيكل السعري (BOS / CHoCH)',
    'smartmap.f2': 'الـ Order Blocks',
    'smartmap.f3': 'فجوات القيمة العادلة (FVG)',
    'smartmap.f4': 'مناطق السيولة (Liquidity Grabs) · جلسات التداول',
    'smartmap.f5': 'Premium & Discount Zones · الاتجاه العام + الموفينج أفريج',
    'smartmap.f6': 'مستويات السيولة (Buy Side / Sell Side)',
    'smartmap.subtitle': 'المؤشر بيحدد لك هيكل السوق الداخلي والخارجي بشكل واضح ودقيق، مما بيساعدك على فهم الاتجاه الحقيقي للسعر.',
    'smartmap.feature1': 'تحديد جميع الفجوات السعرية (FVG) على الشارت',
    'smartmap.feature2': 'مناطق الـ Order Blocks بدقة عالية مع نسبة المشترين والبائعين',
    'smartmap.feature3': 'مناطق تجمع السيولة مثل القمم والقيعان المتساوية',
    'smartmap.feature4': 'مناطق الـ Premium والـ Discount وجلسات التداول',
    'smartmap.learnMore': 'تعرف أكثر عن',

    // ===== ONE SYSTEM =====
    'onesystem.line1': 'نظام واحد',
    'onesystem.line2': 'هو كل ما تحتاجه',
    'onesystem.title': 'نظام واحد هو كل ما',
    'onesystem.titleHighlight': 'تحتاجه',
    'onesystem.text': 'مع مؤشرات Sarhan، مش محتاج أدوات كتير أو استراتيجيات معقدة. نظام واحد بيجمع لك التحليل والصفقات وإدارة المخاطر — في مكان واحد.',

    // ===== SOCIAL PROOF =====
    'social.traders': 'متداول يستخدم المؤشرات',
    'social.successRate': 'نسبة نجاح الإشارات',
    'social.support': 'دعم فني متواصل',
    'social.shareReview': '★ شاركنا رأيك',
    'social.loading': 'جاري تحميل آراء المتداولين...',

    // ===== PRICING =====
    'pricing.header': 'اختار الباقة المناسبة لك',
    'pricing.yearly': 'سنويا',
    'pricing.monthly': 'شهريا',
    'pricing.planSubtitle.xtrend': 'مؤشر الصفقات',
    'pricing.planSubtitle.both': 'المؤشرين معًا',
    'pricing.planSubtitle.smartmap': 'مؤشر التحليل (SMC)',
    'pricing.proBadge': 'Pro — الأفضل قيمة',
    'pricing.feature.fullAccessXtrend': 'وصول كامل لمؤشر X TREND PRO',
    'pricing.feature.fullAccessSmartmap': 'وصول كامل لمؤشر SARHAN SMART MAP',
    'pricing.feature.fullAccessXtrendShort': 'وصول كامل لـ X TREND PRO',
    'pricing.feature.fullAccessSmartmapShort': 'وصول كامل لـ SARHAN SMART MAP',
    'pricing.feature.videoLessons': 'دروس فيديو تعليمية',
    'pricing.feature.support': 'دعم فني 24 ساعة',
    'pricing.subscribe': 'اشترك الان',
    'pricing.loading': 'جاري التحميل...',
    'pricing.periodYearly': '/ سنويا',
    'pricing.periodMonthly': '/ شهريا',
    'pricing.discount': 'خصم',

    // ===== FAQ =====
    'faq.header': 'الاسئلة الشائعه',
    'faq.q1': 'هل يمكنني استخدام مخططات sarhan مع النسخة المجانية من TradingView؟',
    'faq.a1': 'نعم! جميع أدوات SARHAN INDICATORS تعمل مع النسخة المجانية من TradingView. ما عليك سوى التسجيل وإدخال اسم المستخدم الخاص بك، وسنقوم بتفعيل حسابك فورًا.',
    'faq.q2': 'كيف يمكنني الحصول على إمكانية الوصول بعد الاشتراك؟',
    'faq.a2': 'بعد إتمام عملية الشراء، أدخل اسم مستخدم TradingView الخاص بك، وسنقوم بتفعيل المؤشرات. ما عليك سوى تحديث صفحة TradingView وإذا وجهتك أي مشكلة تواصل مع الدعم.',
    'faq.q3': 'في أي أسواق تعمل هذه المؤشرات؟',
    'faq.a3': 'تعمل مؤشرات sarhan indicators على جميع الأسواق المتاحة في TradingView — العملات المشفرة، والأسهم، والفوركس، والمؤشرات، والعقود الآجلة.',
    'faq.q4': 'ما هي الأطر الزمنية التي تعمل عليها المؤشرات؟',
    'faq.a4': 'تعمل مؤشرات sarhan indicators على جميع الأطر الزمنية، من الدقيقة الواحدة إلى الشهر. سواء كنت تمارس المضاربة السريعة، أو التداول اليومي، أو التداول المتأرجح، فإن الأدوات تتكيف مع استراتيجيتك.',
    'faq.q5': 'كيف يمكنني تعلم التداول باستخدام مؤشرات sarhan indicators؟',
    'faq.a5': 'البدء سهل. ستحصل على إمكانية الوصول إلى دروس فيديو تعليمية، وفصول مباشرة، وشروحات استراتيجية — حتى تتمكن من تعلم الأدوات وتطبيقها بثقة في تداولاتك.',
    'faq.q6': 'كيف يمكنني الوصول إلى مؤشرات sarhan indicators؟',
    'faq.a6': 'للوصول إلى مؤشراتنا المميزة، يجب عليك الاشتراك في إحدى باقات sarhan indicators. بعد الاشتراك، يمكنك تطبيق المؤشرات على الرسم البياني الخاص بك على TradingView.',

    // ===== FOOTER =====
    'footer.desc': 'نحن نقدم أدوات تحليل فني متقدمة ومؤشرات حصرية مبنية على استراتيجيات احترافية لمساعدتك في اتخاذ قرارات تداول أكثر دقة وسهولة على منصة TradingView.',
    'footer.products': 'المنتجات',
    'footer.subscriptionPlans': 'باقات الاشتراك',
    'footer.tradingview': 'سجّل في TradingView',
    'footer.supportTitle': 'الدعم',
    'footer.faqLink': 'الأسئلة الشائعة',
    'footer.telegramSupport': 'الدعم عبر تلجرام',
    'footer.telegramChannel': 'قناة تلجرام',
    'footer.legal': 'قانوني',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.disclaimer': 'إخلاء المسؤولية',
    'footer.refund': 'سياسة الاسترجاع',
    'footer.developedBy': 'Developed By',

    // ===== LOGIN =====
    'login.title': 'تسجيل الدخول',
    'login.subtitle': 'ادخل بياناتك للوصول إلى حسابك',
    'login.emailLabel': 'البريد الإلكتروني',
    'login.passwordLabel': 'كلمة المرور',
    'login.submit': 'تسجيل الدخول',
    'login.submitting': 'جاري الدخول...',
    'login.noAccount': 'ما عندك حساب؟',
    'login.createAccount': 'إنشاء حساب جديد',
    'login.invalidCredentials': 'بيانات الدخول غير صحيحة',
    'login.connectionError': 'حدث خطأ في الاتصال. حاول مرة أخرى.',

    // ===== REGISTER =====
    'register.title': 'إنشاء حساب جديد',
    'register.subtitle': 'سجل الآن للوصول إلى مؤشرات Sarhan',
    'register.nameLabel': 'الاسم',
    'register.namePlaceholder': 'اسمك بالكامل',
    'register.emailLabel': 'البريد الإلكتروني',
    'register.passwordLabel': 'كلمة المرور',
    'register.passwordPlaceholder': '6 أحرف على الأقل',
    'register.confirmPasswordLabel': 'تأكيد كلمة المرور',
    'register.confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
    'register.submit': 'إنشاء حساب',
    'register.submitting': 'جاري إنشاء الحساب...',
    'register.hasAccount': 'عندك حساب بالفعل؟',
    'register.loginLink': 'تسجيل الدخول',
    'register.passwordMismatch': 'كلمات المرور غير متطابقة',
    'register.error': 'حدث خطأ في التسجيل',
    'register.connectionError': 'حدث خطأ في الاتصال. حاول مرة أخرى.',

    // ===== X TREND PRO DEEP DIVE =====
    'xtrendPage.tag': 'صفحة المؤشرات (تعمق أكثر)',
    'xtrendPage.subtitle': 'مؤشر الصفقات',
    'xtrendPage.feature1Title': 'مؤشر مُطور يعتمد على دمج 3 استراتيجيات',
    'xtrendPage.feature1P1': 'مؤشر مُطور بيعتمد على دمج 3 استراتيجيات قوية في وقت واحد:',
    'xtrendPage.feature1P2': 'بيحدد نقطة دخول مؤكدة بعد توافق الاستراتيجيات.',
    'xtrendPage.feature1P3': 'نسبة نجاح ممكن توصل لـ 75% مع الالتزام بالتعليمات.',
    'xtrendPage.feature1P4': 'مزود بنظام التارجت سيستم اللي بيحدد الدخول والهدف والاستوب تلقائيًا فور ظهور الإشارة.',
    'xtrendPage.feature1P5': 'بيساعدك تنفّذ الصفقة فورًا بدون ما تحسب أي مستويات أو تعمل اجتهاد شخصي.',
    'xtrendPage.feature2Title': 'نظام تارجت سيستم واضح',
    'xtrendPage.feature2P1': 'بمجرد ظهور إشارة Breakout، المؤشر يحدد لك تلقائيًا وقف الخسارة و3 أهداف واضحة على الشارت بالأرقام، بدون أي حسابات أو اجتهاد شخصي.',
    'xtrendPage.feature2P2': 'كل ما عليك هو التنفيذ فقط، بإدارة مخاطر واضحة ورؤية كاملة للصفقة من أول لحظة.',
    'xtrendPage.ctaTitle': 'ابدأ تداولك بإشارات واضحة وإدارة صفقة جاهزة',
    'xtrendPage.ctaWith': 'مع',
    'xtrendPage.ctaText': 'اشترك الآن واحصل على وصول فوري للمؤشر',
    'xtrendPage.ctaBtn': 'اشترك الآن',

    // ===== SMART MAP DEEP DIVE =====
    'smartmapPage.tag': 'صفحة المؤشرات (تعمق أكثر)',
    'smartmapPage.subtitle': 'مؤشر تحليل (SMC)',
    'smartmapPage.feature1Title': 'هيكل السوق بشكل واضح ودقيق',
    'smartmapPage.feature1P1': 'المؤشر بيحدد لك هيكل السوق الداخلي والخارجي بشكل واضح ودقيق، مما بيساعدك على فهم الاتجاه الحقيقي للسعر، والتمييز بين الحركة التصحيحية والتغير الفعلي في الاتجاه.',
    'smartmapPage.feature1P2': 'من خلال توضيح البنية السعرية على أكثر من مستوى، تقدر تشوف الصورة الكاملة للسوق وتتخذ قراراتك بثقة، بدون تخمين أو تعقيد في التحليل.',
    'smartmapPage.feature2Title': 'الفجوات السعرية ومناطق الأوردر بلوك',
    'smartmapPage.feature2P1': 'المؤشر يقوم بتحديد جميع الفجوات السعرية (FVG) على الشارت، بالإضافة إلى مناطق الـ Order Blocks بدقة عالية.',
    'smartmapPage.feature2P2': 'كما يوضّح نسبة المشترين والبائعين داخل كل Order Block، مما يساعدك على تمييز المناطق القوية والفعّالة، ومعرفة أين يتواجد الاهتمام الحقيقي لصناع السوق قبل اتخاذ قرار الدخول.',
    'smartmapPage.feature3Title': 'مناطق السيولة وجلسات التداول',
    'smartmapPage.feature3P1': 'كما يحدد المؤشر مناطق تجمع السيولة مثل القمم والقيعان المتساوية، مما يساعدك على تجنّب أفخاخ صُنّاع السوق والحركات الوهمية قبل الانطلاق الحقيقي للسعر.',
    'smartmapPage.feature3P2': 'بالإضافة إلى ذلك، يوضّح مناطق الـ Premium والـ Discount، وهي مناطق سعرية قوية يرتد منها السعر في أغلب الأحيان، مما يمنحك أفضلية واضحة في توقيت الدخول والخروج وكمان بيحددلك جلسات التداول.',
    'smartmapPage.ctaTitle': 'كل الأدوات دي في مؤشر واحد',
    'smartmapPage.ctaText': 'اشترك الآن وابدأ التداول بثقة',
    'smartmapPage.ctaBtn': 'اشترك الآن',

    // ===== REVIEW =====
    'review.title': 'رأيك يهمنا',
    'review.subtitle': 'ساعدنا في التحسن وشارك تجربتك مع مؤشرات Sarhan Indicators',
    'review.nameLabel': 'الاسم / اللقب',
    'review.namePlaceholder': 'كيف نحب أن نناديك؟',
    'review.messageLabel': 'رسالتك لنا',
    'review.messagePlaceholder': 'اوصف تجربتك مع المؤشرات والنقاط التي نالت إعجابك...',
    'review.submit': 'إرسال التقييم',
    'review.submitting': 'جاري الإرسال...',
    'review.selectRating': 'يرجى اختيار تقييم بالنجوم أولاً',
    'review.error': 'حدث خطأ أثناء الإرسال',
    'review.connectionError': 'فشل الاتصال بالسيرفر. يرجى التأكد من اتصالك بالإنترنت.',
    'review.successTitle': 'شكراً جزيلاً!',
    'review.successText': 'كلماتك تعني لنا الكثير. تم استلام تقييمك وسوف يظهر على صفحتنا الرئيسية فور مراجعته.',
    'review.backHome': 'العودة للرئيسية',

    // ===== PROFILE =====
    'profile.loading': 'جاري التحميل...',
    'profile.personalData': 'البيانات الشخصية',
    'profile.subscriptions': 'إدارة الاشتراكات',
    'profile.security': 'الأمان وكلمة المرور',
    'profile.logout': 'تسجيل الخروج',
    'profile.profileTitle': 'الملف الشخصي',
    'profile.profileDesc': 'تحكم في بياناتك الأساسية وكيف تظهر في المنصة.',
    'profile.nameLabel': 'الاسم الثلاثي',
    'profile.namePlaceholder': 'أدخل اسمك الكامل',
    'profile.emailLabel': 'البريد الإلكتروني',
    'profile.tvLabel': 'حساب TradingView',
    'profile.tvPlaceholder': 'مثال: Sarhan_Trader',
    'profile.updateData': 'تحديث البيانات',
    'profile.updating': 'جاري التحديث...',
    'profile.updateSuccess': 'تم تحديث البيانات بنجاح',
    'profile.syncError': 'فشل مزامنة البيانات',
    'profile.connectionError': 'خطأ في الاتصال بالسيرفر',
    'profile.subsTitle': 'الاشتراكات والوصول',
    'profile.subsDesc': 'قائمة المؤشرات المفعلة على حسابك وتاريخ انتهاء الصلاحية.',
    'profile.syncingSubs': 'جاري مزامنة الاشتراكات...',
    'profile.noSubs': 'لا توجد اشتراكات نشطة حالياً',
    'profile.explorePlans': 'استكشاف الباقات المتاحة',
    'profile.instantActivation': 'تفعيل فوري للمنصة',
    'profile.subDate': 'تاريخ الاشتراك',
    'profile.endDate': 'تاريخ الانتهاء',
    'profile.cycleType': 'نوع الدورة',
    'profile.telegram': 'تيليجرام',
    'profile.telegramNotLinked': '⚠️ لم يتم ربط التيليجرام',
    'profile.saveTelegram': 'حفظ',
    'profile.telegramRequired': 'يرجى إدخال رقم التيليجرام',
    'profile.telegramSuccess': 'تم ربط التيليجرام بنجاح',
    'profile.telegramError': 'حدث خطأ في الاتصال',
    'profile.securityTitle': 'إعدادات الأمان',
    'profile.securityDesc': 'قم بتأمين حسابك عبر تغيير كلمة المرور بشكل دوري.',
    'profile.currentPassword': 'كلمة المرور الحالية',
    'profile.newPassword': 'كلمة المرور الجديدة',
    'profile.confirmNewPassword': 'تأكيد كلمة المرور الجديدة',
    'profile.updatePassword': 'تحديث كلمة المرور',
    'profile.updatingPassword': 'جاري التحديث...',
    'profile.passwordSuccess': 'تم تحديث كلمة المرور بنجاح',
    'profile.passwordMismatch': 'كلمات المرور الجديدة غير متطابقة',
    'profile.newUser': 'مستخدم جديد',
    'profile.statusActive': 'نشط',
    'profile.statusPending': 'معلق',
    'profile.statusExpired': 'منتهي',
    'profile.statusCancelled': 'ملغي',

    // ===== PAYMENT CALLBACK =====
    'payment.verifying': 'جاري التحقق من الدفع...',
    'payment.verifyingDesc': 'يرجى الانتظار بينما نتحقق من عملية الدفع',
    'payment.successTitle': 'تم الدفع بنجاح! 🎉',
    'payment.successDesc': 'تم تفعيل اشتراكك بنجاح. أدخل اسم مستخدم TradingView الخاص بك لتفعيل المؤشرات على حسابك.',
    'payment.tvLabel': 'اسم مستخدم TradingView',
    'payment.telegramLabel': 'رقم (ID) التليجرام الخاص بك',
    'payment.activateBtn': 'تفعيل الاشتراك',
    'payment.saving': 'جاري الحفظ...',
    'payment.activatedSuccess': 'تم التفعيل بنجاح ✓ وصل حسابك',
    'payment.saveError': 'حدث خطأ في حفظ البيانات. يرجى مراجعة الدعم.',
    'payment.connectionError': 'حدث خطأ في الاتصال',
    'payment.allFieldsRequired': 'يرجى إدخال جميع البيانات المطلوبة',
    'payment.loginRequired': 'يرجى تسجيل الدخول أولاً',
    'payment.backHome': 'العودة للرئيسية',
    'payment.failTitle': 'فشل الدفع',
    'payment.failDesc': 'عذرًا، لم تتم عملية الدفع بنجاح. يمكنك المحاولة مرة أخرى أو التواصل مع الدعم.',
    'payment.retry': 'حاول مرة أخرى',
    'payment.telegramOnlyDesc': 'أدخل رقم الـ Telegram الخاص بك للإضافة إلى المجموعة الخاصة.',

    // ===== GENERAL =====
    'general.error': 'حدث خطأ. حاول مرة أخرى.',
    'general.connectionError': 'حدث خطأ في الاتصال. حاول مرة أخرى.',
  },

  en: {
    // ===== NAVBAR =====
    'nav.home': 'Home',
    'nav.indicators': 'Indicators',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.myAccount': 'My Account',
    'nav.adminPanel': 'Admin Panel',

    // ===== HERO =====
    'hero.badge': '2000+ traders use our indicators on TradingView',
    'hero.title': 'Start Trading with Indicator Precision',
    'hero.subtitle': 'Get precise entry and exit signals built on advanced technical analysis. Our indicators are designed to reduce noise and increase profit probability in financial markets',
    'hero.cta': 'Discover Indicators Now',
    'hero.indicatorDesc': 'An advanced indicator combining 3 powerful strategies simultaneously (Trend – Breakout – Pullback):',
    'hero.indicatorF1': 'Identifies confirmed entry points after strategy alignment.',
    'hero.indicatorF2': 'Success rate can reach up to 75% with proper discipline.',
    'hero.indicatorF3': 'Equipped with a target system that auto-sets entry, target & stop loss as soon as a signal appears.',
    'hero.indicatorF4': 'Helps you execute trades instantly without calculating levels or personal guesswork',
    'hero.learnMore': 'Learn More About',

    // ===== X TREND PRO SECTION =====
    'xtrend.tag': 'Trade Signals Indicator',
    'xtrend.subtitle': 'An advanced indicator that combines 3 powerful strategies simultaneously: Trend – Breakout – Pullback',
    'xtrend.feature1': 'Identifies confirmed entry points after strategy alignment',
    'xtrend.feature2': 'Success rate can reach up to 75% with proper discipline',
    'xtrend.feature3': 'Equipped with a target system that auto-sets entry, target & stop loss as soon as a signal appears',
    'xtrend.feature4': 'Helps you execute trades instantly without calculating levels or personal guesswork',
    'xtrend.learnMore': 'Learn More →',

    // ===== SARHAN SMART MAP SECTION =====
    'smartmap.tag': 'SMC Analysis Indicator',
    'smartmap.desc': 'A comprehensive analysis tool built on Smart Money + Price Action that explains market movements clearly.',
    'smartmap.f1': 'Price Structure (BOS / CHoCH)',
    'smartmap.f2': 'Order Blocks',
    'smartmap.f3': 'Fair Value Gaps (FVG)',
    'smartmap.f4': 'Liquidity Grabs · Trading Sessions',
    'smartmap.f5': 'Premium & Discount Zones · Trend + Moving Average',
    'smartmap.f6': 'Liquidity Levels (Buy Side / Sell Side)',
    'smartmap.subtitle': 'The indicator identifies internal and external market structure clearly and precisely, helping you understand the true price direction.',
    'smartmap.feature1': 'Identifies all Fair Value Gaps (FVG) on the chart',
    'smartmap.feature2': 'Order Blocks with high precision including buyer/seller ratio',
    'smartmap.feature3': 'Liquidity zones such as equal highs and lows',
    'smartmap.feature4': 'Premium & Discount zones and trading sessions',
    'smartmap.learnMore': 'Learn More About',

    // ===== ONE SYSTEM =====
    'onesystem.line1': 'One System',
    'onesystem.line2': 'Is All You Need',
    'onesystem.title': 'One System Is All You',
    'onesystem.titleHighlight': 'Need',
    'onesystem.text': 'With Sarhan Indicators, you don\'t need multiple tools or complex strategies. One system that combines analysis, trades, and risk management — all in one place.',

    // ===== SOCIAL PROOF =====
    'social.traders': 'Traders Using Our Indicators',
    'social.successRate': 'Signal Success Rate',
    'social.support': '24/7 Technical Support',
    'social.shareReview': '★ Share Your Review',
    'social.loading': 'Loading trader reviews...',

    // ===== PRICING =====
    'pricing.header': 'Choose the Right Plan for You',
    'pricing.yearly': 'Yearly',
    'pricing.monthly': 'Monthly',
    'pricing.planSubtitle.xtrend': 'Trade Signals Indicator',
    'pricing.planSubtitle.both': 'Both Indicators',
    'pricing.planSubtitle.smartmap': 'Analysis Indicator (SMC)',
    'pricing.proBadge': 'Pro — Best Value',
    'pricing.feature.fullAccessXtrend': 'Full access to X TREND PRO indicator',
    'pricing.feature.fullAccessSmartmap': 'Full access to SARHAN SMART MAP indicator',
    'pricing.feature.fullAccessXtrendShort': 'Full access to X TREND PRO',
    'pricing.feature.fullAccessSmartmapShort': 'Full access to SARHAN SMART MAP',
    'pricing.feature.videoLessons': 'Video tutorial lessons',
    'pricing.feature.support': '24-hour technical support',
    'pricing.subscribe': 'Subscribe Now',
    'pricing.loading': 'Loading...',
    'pricing.periodYearly': '/ year',
    'pricing.periodMonthly': '/ month',
    'pricing.discount': 'OFF',

    // ===== FAQ =====
    'faq.header': 'Frequently Asked Questions',
    'faq.q1': 'Can I use Sarhan indicators with the free version of TradingView?',
    'faq.a1': 'Yes! All SARHAN INDICATORS tools work with the free version of TradingView. Simply register and enter your username, and we\'ll activate your account immediately.',
    'faq.q2': 'How do I get access after subscribing?',
    'faq.a2': 'After completing your purchase, enter your TradingView username and we\'ll activate the indicators. Just refresh your TradingView page, and contact support if you encounter any issues.',
    'faq.q3': 'Which markets do these indicators work on?',
    'faq.a3': 'Sarhan Indicators work on all markets available on TradingView — cryptocurrencies, stocks, forex, indices, and futures.',
    'faq.q4': 'What timeframes do the indicators work on?',
    'faq.a4': 'Sarhan Indicators work on all timeframes, from 1 minute to monthly. Whether you\'re scalping, day trading, or swing trading, the tools adapt to your strategy.',
    'faq.q5': 'How can I learn to trade using Sarhan Indicators?',
    'faq.a5': 'Getting started is easy. You\'ll get access to video tutorials, live sessions, and strategy explanations — so you can learn the tools and apply them confidently in your trades.',
    'faq.q6': 'How can I access Sarhan Indicators?',
    'faq.a6': 'To access our premium indicators, you need to subscribe to one of the Sarhan Indicators plans. After subscribing, you can apply the indicators to your chart on TradingView.',

    // ===== FOOTER =====
    'footer.desc': 'We provide advanced technical analysis tools and exclusive indicators built on professional strategies to help you make more precise and easier trading decisions on TradingView.',
    'footer.products': 'Products',
    'footer.subscriptionPlans': 'Subscription Plans',
    'footer.tradingview': 'Sign up on TradingView',
    'footer.supportTitle': 'Support',
    'footer.faqLink': 'FAQ',
    'footer.telegramSupport': 'Telegram Support',
    'footer.telegramChannel': 'Telegram Channel',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.disclaimer': 'Disclaimer',
    'footer.refund': 'Refund Policy',
    'footer.developedBy': 'Developed By',

    // ===== LOGIN =====
    'login.title': 'Login',
    'login.subtitle': 'Enter your credentials to access your account',
    'login.emailLabel': 'Email Address',
    'login.passwordLabel': 'Password',
    'login.submit': 'Login',
    'login.submitting': 'Logging in...',
    'login.noAccount': 'Don\'t have an account?',
    'login.createAccount': 'Create New Account',
    'login.invalidCredentials': 'Invalid login credentials',
    'login.connectionError': 'Connection error. Please try again.',

    // ===== REGISTER =====
    'register.title': 'Create New Account',
    'register.subtitle': 'Register now to access Sarhan Indicators',
    'register.nameLabel': 'Name',
    'register.namePlaceholder': 'Your full name',
    'register.emailLabel': 'Email Address',
    'register.passwordLabel': 'Password',
    'register.passwordPlaceholder': 'At least 6 characters',
    'register.confirmPasswordLabel': 'Confirm Password',
    'register.confirmPasswordPlaceholder': 'Re-enter your password',
    'register.submit': 'Create Account',
    'register.submitting': 'Creating account...',
    'register.hasAccount': 'Already have an account?',
    'register.loginLink': 'Login',
    'register.passwordMismatch': 'Passwords do not match',
    'register.error': 'Registration error',
    'register.connectionError': 'Connection error. Please try again.',

    // ===== X TREND PRO DEEP DIVE =====
    'xtrendPage.tag': 'Indicator Deep Dive',
    'xtrendPage.subtitle': 'Trade Signals Indicator',
    'xtrendPage.feature1Title': 'An Advanced Indicator Combining 3 Strategies',
    'xtrendPage.feature1P1': 'An advanced indicator that combines 3 powerful strategies simultaneously:',
    'xtrendPage.feature1P2': 'Identifies confirmed entry points after strategy alignment.',
    'xtrendPage.feature1P3': 'Success rate can reach up to 75% with proper discipline.',
    'xtrendPage.feature1P4': 'Equipped with a target system that auto-sets entry, target & stop loss as soon as a signal appears.',
    'xtrendPage.feature1P5': 'Helps you execute trades instantly without calculating levels or personal guesswork.',
    'xtrendPage.feature2Title': 'Clear Target System',
    'xtrendPage.feature2P1': 'As soon as a Breakout signal appears, the indicator automatically sets your stop loss and 3 clear targets on the chart with numbers, without any calculations or personal guesswork.',
    'xtrendPage.feature2P2': 'All you need is to execute, with clear risk management and complete visibility of the trade from the first moment.',
    'xtrendPage.ctaTitle': 'Start Trading with Clear Signals and Ready Trade Management',
    'xtrendPage.ctaWith': 'with',
    'xtrendPage.ctaText': 'Subscribe now and get instant access to the indicator',
    'xtrendPage.ctaBtn': 'Subscribe Now',

    // ===== SMART MAP DEEP DIVE =====
    'smartmapPage.tag': 'Indicator Deep Dive',
    'smartmapPage.subtitle': 'Analysis Indicator (SMC)',
    'smartmapPage.feature1Title': 'Clear and Precise Market Structure',
    'smartmapPage.feature1P1': 'The indicator identifies internal and external market structure clearly and precisely, helping you understand the true price direction and distinguish between corrective movements and actual trend changes.',
    'smartmapPage.feature1P2': 'By clarifying the price structure on multiple levels, you can see the complete market picture and make decisions with confidence, without guessing or complex analysis.',
    'smartmapPage.feature2Title': 'Fair Value Gaps and Order Blocks',
    'smartmapPage.feature2P1': 'The indicator identifies all Fair Value Gaps (FVG) on the chart, plus Order Block zones with high precision.',
    'smartmapPage.feature2P2': 'It also shows the buyer/seller ratio within each Order Block, helping you identify strong and effective zones and understand where market makers\' real interest lies before making entry decisions.',
    'smartmapPage.feature3Title': 'Liquidity Zones and Trading Sessions',
    'smartmapPage.feature3P1': 'The indicator identifies liquidity zones such as equal highs and lows, helping you avoid market maker traps and fake movements before the real price action begins.',
    'smartmapPage.feature3P2': 'Additionally, it shows Premium and Discount zones — strong price areas where price often bounces — giving you a clear advantage in timing entries and exits, plus it identifies trading sessions.',
    'smartmapPage.ctaTitle': 'All These Tools in One Indicator',
    'smartmapPage.ctaText': 'Subscribe now and start trading with confidence',
    'smartmapPage.ctaBtn': 'Subscribe Now',

    // ===== REVIEW =====
    'review.title': 'Your Opinion Matters',
    'review.subtitle': 'Help us improve and share your experience with Sarhan Indicators',
    'review.nameLabel': 'Name / Nickname',
    'review.namePlaceholder': 'What should we call you?',
    'review.messageLabel': 'Your Message',
    'review.messagePlaceholder': 'Describe your experience with the indicators and what you liked...',
    'review.submit': 'Submit Review',
    'review.submitting': 'Submitting...',
    'review.selectRating': 'Please select a star rating first',
    'review.error': 'An error occurred while submitting',
    'review.connectionError': 'Failed to connect to server. Please check your internet connection.',
    'review.successTitle': 'Thank You!',
    'review.successText': 'Your words mean a lot to us. Your review has been received and will appear on our homepage after review.',
    'review.backHome': 'Back to Home',

    // ===== PROFILE =====
    'profile.loading': 'Loading...',
    'profile.personalData': 'Personal Data',
    'profile.subscriptions': 'Manage Subscriptions',
    'profile.security': 'Security & Password',
    'profile.logout': 'Logout',
    'profile.profileTitle': 'My Profile',
    'profile.profileDesc': 'Manage your personal information and how you appear on the platform.',
    'profile.nameLabel': 'Full Name',
    'profile.namePlaceholder': 'Enter your full name',
    'profile.emailLabel': 'Email Address',
    'profile.tvLabel': 'TradingView Account',
    'profile.tvPlaceholder': 'Example: Sarhan_Trader',
    'profile.updateData': 'Update Data',
    'profile.updating': 'Updating...',
    'profile.updateSuccess': 'Data updated successfully',
    'profile.syncError': 'Failed to sync data',
    'profile.connectionError': 'Server connection error',
    'profile.subsTitle': 'Subscriptions & Access',
    'profile.subsDesc': 'List of activated indicators on your account and expiry dates.',
    'profile.syncingSubs': 'Syncing subscriptions...',
    'profile.noSubs': 'No active subscriptions currently',
    'profile.explorePlans': 'Explore Available Plans',
    'profile.instantActivation': 'Instant platform activation',
    'profile.subDate': 'Subscription Date',
    'profile.endDate': 'Expiry Date',
    'profile.cycleType': 'Billing Cycle',
    'profile.telegram': 'Telegram',
    'profile.telegramNotLinked': '⚠️ Telegram not linked',
    'profile.saveTelegram': 'Save',
    'profile.telegramRequired': 'Please enter your Telegram ID',
    'profile.telegramSuccess': 'Telegram linked successfully',
    'profile.telegramError': 'Connection error',
    'profile.securityTitle': 'Security Settings',
    'profile.securityDesc': 'Secure your account by changing your password regularly.',
    'profile.currentPassword': 'Current Password',
    'profile.newPassword': 'New Password',
    'profile.confirmNewPassword': 'Confirm New Password',
    'profile.updatePassword': 'Update Password',
    'profile.updatingPassword': 'Updating...',
    'profile.passwordSuccess': 'Password updated successfully',
    'profile.passwordMismatch': 'New passwords do not match',
    'profile.newUser': 'New User',
    'profile.statusActive': 'Active',
    'profile.statusPending': 'Pending',
    'profile.statusExpired': 'Expired',
    'profile.statusCancelled': 'Cancelled',

    // ===== PAYMENT CALLBACK =====
    'payment.verifying': 'Verifying Payment...',
    'payment.verifyingDesc': 'Please wait while we verify your payment',
    'payment.successTitle': 'Payment Successful! 🎉',
    'payment.successDesc': 'Your subscription has been activated. Enter your TradingView username to activate the indicators on your account.',
    'payment.tvLabel': 'TradingView Username',
    'payment.telegramLabel': 'Your Telegram ID',
    'payment.activateBtn': 'Activate Subscription',
    'payment.saving': 'Saving...',
    'payment.activatedSuccess': 'Activated Successfully ✓ Account linked',
    'payment.saveError': 'Error saving data. Please contact support.',
    'payment.connectionError': 'Connection error',
    'payment.allFieldsRequired': 'Please fill in all required fields',
    'payment.loginRequired': 'Please login first',
    'payment.backHome': 'Back to Home',
    'payment.failTitle': 'Payment Failed',
    'payment.failDesc': 'Sorry, the payment was not successful. You can try again or contact support.',
    'payment.retry': 'Try Again',
    'payment.telegramOnlyDesc': 'Enter your Telegram ID to be added to the private group.',

    // ===== GENERAL =====
    'general.error': 'An error occurred. Please try again.',
    'general.connectionError': 'Connection error. Please try again.',
  }
};

/**
 * Get the current language (defaults to 'ar')
 */
function getLang() {
  return localStorage.getItem('lang') || 'ar';
}

/**
 * Get a translated string by key
 */
function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || (translations['ar'] && translations['ar'][key]) || key;
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
  const lang = getLang();
  const dict = translations[lang] || translations['ar'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Check if element has data-i18n-attr for attributes (e.g. placeholder)
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Also handle data-i18n-placeholder separately
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Handle data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key]) {
      el.title = dict[key];
    }
  });
}

/**
 * Set the language and apply it
 */
function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  
  const html = document.documentElement;
  if (lang === 'en') {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
  } else {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
  }

  applyTranslations();

  // Update language toggle button text
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
  }

  // Dispatch event for other scripts to react
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Initialize language on page load
 */
function initLanguage() {
  const lang = getLang();
  setLanguage(lang);
}

// Make functions globally available
window.i18n = { t, setLanguage, getLang, initLanguage, applyTranslations, translations };
