import type { LearningLocale } from './internationalization';

/** Localized interface copy. Untranslated educational content stays English. */
const rows: readonly [string, string, string, string, string, string][] = [
["Knowledge Dictionary","知识词典","Diccionario de conocimientos","Dictionnaire des notions","ज्ञान शब्दकोश","قاموس المفاهيم"],
[
    "Your practical work sample",
    "你的实用工作样本",
    "Tu muestra de trabajo práctica",
    "Votre réalisation pratique",
    "आपका व्यावहारिक कार्य नमूना",
    "نموذج عملك العملي"
  ],
  [
    "Workshop worksheet",
    "工作坊练习表",
    "Hoja de trabajo del taller",
    "Fiche d’atelier",
    "कार्यशाला कार्यपत्रक",
    "ورقة عمل الورشة"
  ],
  [
    "Your response",
    "你的回答",
    "Tu respuesta",
    "Votre réponse",
    "आपका उत्तर",
    "إجابتك"
  ],
  [
    "Compare with an illustrative response",
    "对照示例回答",
    "Comparar con una respuesta de ejemplo",
    "Comparer avec une réponse illustrative",
    "उदाहरण उत्तर से तुलना करें",
    "قارن بإجابة توضيحية"
  ],
  [
    "One defensible approach, not the only correct answer.",
    "一种合理的方法，并非唯一正确答案。",
    "Un enfoque razonable, no la única respuesta correcta.",
    "Une approche défendable, pas la seule bonne réponse.",
    "यह एक सही ठहराया जा सकने वाला तरीका है, एकमात्र उत्तर नहीं।",
    "هذا نهج يمكن الدفاع عنه، وليس الإجابة الصحيحة الوحيدة."
  ],
  [
    "Self-review before finishing",
    "完成前自我检查",
    "Autoevaluación antes de terminar",
    "Autoévaluation avant de terminer",
    "समाप्ति से पहले स्व-समीक्षा",
    "مراجعة ذاتية قبل الإنهاء"
  ],
  [
    "Common traps to check",
    "需要注意的常见陷阱",
    "Errores frecuentes a revisar",
    "Pièges fréquents à vérifier",
    "ध्यान देने योग्य आम गलतियाँ",
    "أخطاء شائعة يجب الانتباه إليها"
  ],
  [
    "Copy worksheet",
    "复制练习表",
    "Copiar hoja de trabajo",
    "Copier la fiche",
    "कार्यपत्रक कॉपी करें",
    "انسخ ورقة العمل"
  ],
  [
    "Workshop completed",
    "工作坊已完成",
    "Taller completado",
    "Atelier terminé",
    "कार्यशाला पूरी हुई",
    "اكتملت الورشة"
  ],
  [
    "Revisit and improve",
    "回顾并改进",
    "Revisar y mejorar",
    "Revoir et améliorer",
    "दोबारा देखें और सुधारें",
    "راجع وحسّن"
  ],
  [
    "A second look is part of the workshop.",
    "再次回顾也是工作坊的一部分。",
    "Revisar una vez más forma parte del taller.",
    "Revenir sur son travail fait partie de l’atelier.",
    "दोबारा समीक्षा कार्यशाला का हिस्सा है।",
    "المراجعة الثانية جزء من الورشة."
  ],
  [
    "Track progress",
    "追踪进度",
    "Seguir mi progreso",
    "Suivre les progrès",
    "प्रगति देखें",
    "تابع التقدّم"
  ],
  [
    "Saved learning",
    "已保存的学习内容",
    "Aprendizaje guardado",
    "Apprentissages enregistrés",
    "सहेजी हुई सीख",
    "التعلّم المحفوظ"
  ],
  [
    "Review skill guide",
    "复习技能指南",
    "Revisar guía de habilidades",
    "Revoir le guide de compétences",
    "कौशल गाइड दोहराएँ",
    "راجع دليل المهارات"
  ],
  [
    "Explain the decision in at least 40 characters.",
    "用至少40个字符解释你的决定。",
    "Explica la decisión con al menos 40 caracteres.",
    "Expliquez votre décision en au moins 40 caractères.",
    "कम से कम 40 अक्षरों में निर्णय समझाएँ।",
    "اشرح القرار باستخدام 40 حرفًا على الأقل."
  ],
  [
    "Ready for self-review.",
    "可以开始自我检查。",
    "Listo para autoevaluar.",
    "Prêt pour l’autoévaluation.",
    "स्व-समीक्षा के लिए तैयार।",
    "جاهز للمراجعة الذاتية."
  ],
  [
    "Progress",
    "进度",
    "Progreso",
    "Progression",
    "प्रगति",
    "التقدّم"
  ],
  [
    "Total practice XP",
    "练习总经验值",
    "Puntos totales de práctica",
    "Total des points de pratique",
    "कुल अभ्यास XP",
    "مجموع نقاط التدريب"
  ],
  [
    "Reset this sprint",
    "重置本次冲刺",
    "Reiniciar esta práctica",
    "Réinitialiser ce sprint",
    "इस स्प्रिंट को रीसेट करें",
    "أعد هذا التدريب"
  ],
  [
    "Understand it",
    "理解概念",
    "Compréndelo",
    "Comprendre",
    "इसे समझें",
    "افهم الفكرة"
  ],
  [
    "Example",
    "示例",
    "Ejemplo",
    "Exemple",
    "उदाहरण",
    "مثال"
  ],
  [
    "Try it at work",
    "在工作中尝试",
    "Pruébalo en el trabajo",
    "Essayez au travail",
    "काम पर आज़माएँ",
    "جرّبه في العمل"
  ],
  [
    "Retrieval check",
    "记忆检测",
    "Prueba de memoria",
    "Test de rappel",
    "याददाश्त की जाँच",
    "اختبار الاسترجاع"
  ],
  [
    "Apply it in a workshop",
    "在工作坊中应用",
    "Aplicarlo en un taller",
    "Appliquer dans un atelier",
    "कार्यशाला में लागू करें",
    "طبّقه في ورشة"
  ],
  [
    "View progress",
    "查看进度",
    "Ver progreso",
    "Voir les progrès",
    "प्रगति देखें",
    "عرض التقدّم"
  ],
  [
    "Correct—good judgment.",
    "正确——判断很好。",
    "Correcto: buen criterio.",
    "Correct — bon jugement.",
    "सही—अच्छा निर्णय।",
    "صحيح — حكم جيّد."
  ],
  [
    "Not quite. Compare the options once more.",
    "还不完全正确。再比较一次选项。",
    "No del todo. Compara de nuevo las opciones.",
    "Pas tout à fait. Comparez de nouveau les choix.",
    "अभी नहीं। विकल्पों की फिर से तुलना करें।",
    "ليس تمامًا. قارن الخيارات مرة أخرى."
  ],
  [
    "Continue",
    "继续",
    "Continuar",
    "Continuer",
    "जारी रखें",
    "متابعة"
  ],
  [
    "Complete sprint",
    "完成冲刺",
    "Completar práctica",
    "Terminer le sprint",
    "स्प्रिंट पूरा करें",
    "أكمل التدريب"
  ],
  [
    "Answer once from memory, then use the feedback to correct your model.",
    "先凭记忆回答，再利用反馈纠正理解。",
    "Responde de memoria y usa los comentarios para ajustar tu comprensión.",
    "Répondez de mémoire, puis utilisez le retour pour corriger votre compréhension.",
    "पहले याददाश्त से उत्तर दें, फिर प्रतिक्रिया से समझ सुधारें।",
    "أجب من الذاكرة أولًا، ثم استخدم الملاحظات لتصحيح فهمك."
  ],
  [
    "No penalty for retrying",
    "重试不扣分",
    "Sin penalización por reintentar",
    "Aucune pénalité en cas de nouvel essai",
    "दोबारा कोशिश पर कोई दंड नहीं",
    "لا عقوبة على إعادة المحاولة"
  ],
  [
    "Reward earned",
    "已获得奖励",
    "Recompensa obtenida",
    "Récompense obtenue",
    "इनाम मिल गया",
    "تم الحصول على المكافأة"
  ],
  [
    "Correct—your model holds up.",
    "正确——你的理解经得起检验。",
    "Correcto: tu razonamiento se sostiene.",
    "Correct — votre raisonnement tient la route.",
    "सही—आपकी समझ ठीक है।",
    "صحيح — فهمك متماسك."
  ],
  [
    "Not yet. Compare the decision, evidence, and consequence once more.",
    "还不正确。再比较决定、证据与后果。",
    "Todavía no. Vuelve a comparar decisión, pruebas y consecuencias.",
    "Pas encore. Comparez de nouveau la décision, les preuves et les conséquences.",
    "अभी नहीं। निर्णय, प्रमाण और परिणाम की फिर तुलना करें।",
    "ليس بعد. قارن القرار والأدلة والعواقب مرة أخرى."
  ],
  [
    "Continue learning",
    "继续学习",
    "Seguir aprendiendo",
    "Poursuivre l’apprentissage",
    "सीखते रहें",
    "واصل التعلّم"
  ],
  [
    "All guided workshops",
    "全部指导工作坊",
    "Todos los talleres guiados",
    "Tous les ateliers guidés",
    "सभी निर्देशित कार्यशालाएँ",
    "جميع الورش الموجّهة"
  ],
  [
    "Guided workshop",
    "指导工作坊",
    "Taller guiado",
    "Atelier guidé",
    "निर्देशित कार्यशाला",
    "ورشة موجهة"
  ],
  [
    "The situation",
    "情境",
    "La situación",
    "La situation",
    "परिस्थिति",
    "الموقف"
  ],
  [
    "What you will create",
    "你将创作的成果",
    "Lo que crearás",
    "Ce que vous allez créer",
    "आप क्या बनाएँगे",
    "ما الذي ستنشئه"
  ],
  [
    "Browse all Skill Sprints",
    "浏览全部技能冲刺",
    "Ver todas las prácticas rápidas",
    "Parcourir tous les sprints",
    "सभी कौशल स्प्रिंट देखें",
    "تصفّح جميع التدريبات"
  ],
[
    "Translate this activity",
    "翻译这项练习",
    "Traducir esta actividad",
    "Traduire cette activité",
    "इस गतिविधि का अनुवाद करें",
    "ترجم هذا النشاط"
  ],
  [
    "Translating…",
    "正在翻译…",
    "Traduciendo…",
    "Traduction en cours…",
    "अनुवाद हो रहा है…",
    "جارٍ الترجمة…"
  ],
  [
    "Hide translation",
    "隐藏翻译",
    "Ocultar traducción",
    "Masquer la traduction",
    "अनुवाद छिपाएँ",
    "إخفاء الترجمة"
  ],
  [
    "Show translation",
    "显示翻译",
    "Mostrar traducción",
    "Afficher la traduction",
    "अनुवाद दिखाएँ",
    "إظهار الترجمة"
  ],
  [
    "AI translation is optional and may contain mistakes. Use the original English text and answer choices below to complete the activity.",
    "AI翻译为可选功能，可能存在错误。请使用下方的英语原文和选项完成练习。",
    "La traducción con IA es opcional y puede contener errores. Usa el texto y las opciones originales en inglés para completar la actividad.",
    "La traduction par IA est facultative et peut contenir des erreurs. Utilisez le texte et les choix originaux en anglais pour terminer l’activité.",
    "AI अनुवाद वैकल्पिक है और इसमें गलतियाँ हो सकती हैं। गतिविधि पूरी करने के लिए नीचे दिया मूल अंग्रेज़ी पाठ और उत्तर विकल्प उपयोग करें।",
    "الترجمة بالذكاء الاصطناعي اختيارية وقد تحتوي أخطاء. استخدم النص والخيارات الإنجليزية الأصلية أدناه لإكمال النشاط."
  ],
[
    "Curated, practical skill guides",
    "精选实用技能指南",
    "Guías prácticas de habilidades",
    "Guides de compétences pratiques",
    "चुने हुए व्यावहारिक कौशल गाइड",
    "أدلّة مهارات عملية مختارة"
  ],
  [
    "Find the right skill",
    "找到合适的技能",
    "Encuentra la habilidad adecuada",
    "Trouvez la bonne compétence",
    "सही कौशल खोजें",
    "اعثر على المهارة المناسبة"
  ],
  [
    "More professional skills",
    "更多职业技能",
    "Más habilidades profesionales",
    "Autres compétences professionnelles",
    "और पेशेवर कौशल",
    "المزيد من المهارات المهنية"
  ],
  [
    "Professional skills, organized for action",
    "面向实际应用的职业技能",
    "Habilidades profesionales para pasar a la acción",
    "Des compétences professionnelles prêtes à l’emploi",
    "कार्रवाई के लिए व्यवस्थित पेशेवर कौशल",
    "مهارات مهنية منظّمة للتطبيق"
  ],
  [
    "Search focused guides or browse a topic to connect individual skills with learning paths, careers, industries, and practical exercises.",
    "搜索专题指南或浏览主题，连接技能、学习路径、职业、行业与实用练习。",
    "Busca guías o temas para conectar habilidades, carreras y ejercicios prácticos.",
    "Cherchez des guides ou des thèmes reliant compétences, métiers et exercices pratiques.",
    "कौशल, करियर और अभ्यास जोड़ने के लिए गाइड खोजें या विषय देखें।",
    "ابحث في الأدلة والمواضيع لربط المهارات بالمهن والتمارين العملية."
  ],
  [
    "Connected browsing",
    "关联浏览",
    "Exploración conectada",
    "Exploration thématique",
    "जुड़ा हुआ ब्राउज़िंग",
    "تصفّح مترابط"
  ],
  [
    "Choose a topic, not a random page",
    "选择主题，而非随机页面",
    "Elige un tema, no una página al azar",
    "Choisissez un thème, pas une page au hasard",
    "कोई भी पेज नहीं, एक विषय चुनें",
    "اختر موضوعًا بدل صفحة عشوائية"
  ],
  [
    "View all topic hubs →",
    "查看全部主题中心 →",
    "Ver todos los temas →",
    "Voir tous les thèmes →",
    "सभी विषय देखें →",
    "عرض جميع المواضيع ←"
  ],
  [
    "Explore connected guides",
    "探索关联指南",
    "Explorar guías relacionadas",
    "Explorer les guides associés",
    "संबंधित गाइड देखें",
    "استكشف الأدلة المرتبطة"
  ],
  [
    "Matching guides",
    "匹配的指南",
    "Guías relacionadas",
    "Guides correspondants",
    "मिलते-जुलते गाइड",
    "الأدلة المطابقة"
  ],
  [
    "Browse the library",
    "浏览技能库",
    "Explorar la biblioteca",
    "Parcourir la bibliothèque",
    "लाइब्रेरी देखें",
    "تصفّح المكتبة"
  ],
  [
    "Search",
    "搜索",
    "Buscar",
    "Rechercher",
    "खोजें",
    "بحث"
  ],
  [
    "Clear search and filters",
    "清除搜索和筛选",
    "Borrar búsqueda y filtros",
    "Effacer la recherche et les filtres",
    "खोज और फ़िल्टर साफ़ करें",
    "مسح البحث والتصفية"
  ],
  [
    "No matching skill guides",
    "没有匹配的技能指南",
    "No hay guías que coincidan",
    "Aucun guide correspondant",
    "कोई मेल खाता गाइड नहीं",
    "لا توجد أدلة مطابقة"
  ],
  [
    "Browse learning paths",
    "浏览学习路径",
    "Explorar rutas de aprendizaje",
    "Parcourir les parcours",
    "सीखने के मार्ग देखें",
    "تصفّح مسارات التعلّم"
  ],
  [
    "Browse by the work you want to do",
    "按希望从事的工作浏览",
    "Explora según el trabajo que quieres hacer",
    "Explorez selon le travail qui vous intéresse",
    "अपनी पसंद के काम के अनुसार देखें",
    "تصفّح حسب العمل الذي ترغب به"
  ],
  [
    "Choose a direction before choosing a title",
    "先确定方向，再选择职位",
    "Elige una dirección antes del puesto",
    "Choisissez une voie avant un intitulé de poste",
    "नौकरी चुनने से पहले दिशा चुनें",
    "اختر اتجاهًا قبل المسمى الوظيفي"
  ],
  [
    "Featured Career Paths",
    "精选职业路径",
    "Trayectorias profesionales destacadas",
    "Parcours professionnels à la une",
    "प्रमुख करियर मार्ग",
    "مسارات مهنية مميزة"
  ],
  [
    "All Career Paths",
    "所有职业路径",
    "Todas las trayectorias profesionales",
    "Tous les parcours professionnels",
    "सभी करियर मार्ग",
    "جميع المسارات المهنية"
  ],
  [
    "Career Intelligence Platform",
    "职业洞察平台",
    "Plataforma de información profesional",
    "Plateforme d’orientation professionnelle",
    "करियर जानकारी मंच",
    "منصّة الرؤى المهنية"
  ],
  [
    "What current research says about changing skills",
    "最新研究如何看待技能变化",
    "Lo que dice la investigación sobre las habilidades cambiantes",
    "Ce que dit la recherche sur l’évolution des compétences",
    "बदलते कौशल पर नया शोध क्या कहता है",
    "ماذا تقول الأبحاث عن تغيّر المهارات"
  ],
  [
    "Career profile",
    "职业档案",
    "Perfil profesional",
    "Fiche métier",
    "करियर प्रोफ़ाइल",
    "ملف مهني"
  ],
  [
    "Build digital products",
    "构建数字产品",
    "Crear productos digitales",
    "Créer des produits numériques",
    "डिजिटल उत्पाद बनाएँ",
    "ابنِ منتجات رقمية"
  ],
  [
    "Turn evidence into decisions",
    "将证据转化为决策",
    "Convertir datos en decisiones",
    "Transformer les données en décisions",
    "सबूत को निर्णय में बदलें",
    "حوّل الأدلة إلى قرارات"
  ],
  [
    "Grow trust and demand",
    "建立信任与需求",
    "Generar confianza y demanda",
    "Renforcer la confiance et la demande",
    "विश्वास और माँग बढ़ाएँ",
    "نمِّ الثقة والطلب"
  ],
  [
    "Coordinate people and delivery",
    "协调人员与执行",
    "Coordinar personas y entregas",
    "Coordonner les équipes et la réalisation",
    "लोगों और काम में तालमेल बिठाएँ",
    "نسّق الفرق والتنفيذ"
  ],
[
    "Difficulty",
    "难度",
    "Dificultad",
    "Difficulté",
    "कठिनाई",
    "الصعوبة"
  ],
  [
    "Development Time",
    "学习时间",
    "Tiempo de desarrollo",
    "Temps de développement",
    "विकास समय",
    "مدة التطوير"
  ],
  [
    "Automation Risk",
    "自动化风险",
    "Riesgo de automatización",
    "Risque d’automatisation",
    "स्वचालन का जोखिम",
    "مخاطر الأتمتة"
  ],
  [
    "Career Impact",
    "职业影响",
    "Impacto profesional",
    "Impact sur la carrière",
    "करियर प्रभाव",
    "الأثر المهني"
  ],
  [
    "Why This Skill Matters",
    "为什么这项技能很重要",
    "Por qué importa esta habilidad",
    "Pourquoi cette compétence est importante",
    "यह कौशल क्यों महत्वपूर्ण है",
    "لماذا تهم هذه المهارة"
  ],
  [
    "Comprehensive Definition",
    "完整定义",
    "Definición completa",
    "Définition détaillée",
    "विस्तृत परिभाषा",
    "تعريف شامل"
  ],
  [
    "Modern Relevance",
    "现代职场关联",
    "Relevancia actual",
    "Pertinence actuelle",
    "आज की प्रासंगिकता",
    "الأهمية اليوم"
  ],
  [
    "AI Era Context",
    "AI时代背景",
    "Contexto de la era de la IA",
    "Contexte de l’ère de l’IA",
    "AI युग का संदर्भ",
    "السياق في عصر الذكاء الاصطناعي"
  ],
  [
    "Development Path",
    "技能发展路径",
    "Ruta de desarrollo",
    "Parcours de développement",
    "विकास मार्ग",
    "مسار التطوير"
  ],
  [
    "Common Mistakes to Avoid",
    "应避免的常见错误",
    "Errores comunes que debes evitar",
    "Erreurs fréquentes à éviter",
    "आम गलतियों से बचें",
    "أخطاء شائعة يجب تجنبها"
  ],
  [
    "Where This Skill Shows Up at Work",
    "这项技能在工作中的应用",
    "Dónde se utiliza esta habilidad",
    "Où cette compétence s’applique au travail",
    "काम में इस कौशल का उपयोग",
    "أين تُستخدم هذه المهارة في العمل"
  ],
  [
    "Career Applications",
    "职业应用",
    "Aplicaciones profesionales",
    "Applications professionnelles",
    "करियर में उपयोग",
    "التطبيقات المهنية"
  ],
  [
    "What Strong Execution Looks Like",
    "优秀实践的表现",
    "Cómo se ve una buena ejecución",
    "À quoi ressemble une bonne exécution",
    "अच्छा प्रदर्शन कैसा दिखता है",
    "كيف يبدو التنفيذ الجيد"
  ],
  [
    "Real-World Applications",
    "现实应用",
    "Aplicaciones reales",
    "Applications concrètes",
    "वास्तविक उपयोग",
    "تطبيقات واقعية"
  ],
  [
    "Save this skill",
    "保存这项技能",
    "Guardar esta habilidad",
    "Enregistrer cette compétence",
    "इस कौशल को सहेजें",
    "احفظ هذه المهارة"
  ],
  [
    "Practice this skill",
    "练习这项技能",
    "Practicar esta habilidad",
    "Pratiquer cette compétence",
    "इस कौशल का अभ्यास करें",
    "تدرّب على هذه المهارة"
  ],
  [
    "Try related practice",
    "尝试相关练习",
    "Probar ejercicios relacionados",
    "Essayer un exercice connexe",
    "संबंधित अभ्यास करें",
    "جرّب تدريبًا مرتبطًا"
  ],
  [
    "Quick introduction",
    "快速简介",
    "Introducción rápida",
    "Présentation rapide",
    "त्वरित परिचय",
    "مقدمة سريعة"
  ],
  [
    "Free membership · No paid tier",
    "免费会员 · 无付费等级",
    "Membresía gratis · Sin plan de pago",
    "Adhésion gratuite · Aucun forfait payant",
    "निःशुल्क सदस्यता · कोई सशुल्क स्तर नहीं",
    "عضوية مجانية · دون فئة مدفوعة"
  ],
  [
    "Don't just read about skills. Build them.",
    "不要只阅读技能，要真正掌握它们。",
    "No solo leas sobre habilidades. Desarróllalas.",
    "Ne vous contentez pas de lire : développez vos compétences.",
    "कौशल के बारे में सिर्फ़ पढ़ें नहीं, उन्हें विकसित करें।",
    "لا تكتفِ بالقراءة عن المهارات، بل طوّرها."
  ],
[
    "30-second discovery quiz",
    "30秒探索测验",
    "Test de descubrimiento de 30 segundos",
    "Mini-quiz découverte de 30 secondes",
    "30 सेकंड की खोज प्रश्नोत्तरी",
    "اختبار استكشاف في 30 ثانية"
  ],
  [
    "What would help you most today?",
    "今天什么最能帮到你？",
    "¿Qué te ayudaría más hoy?",
    "Qu’est-ce qui vous aiderait le plus aujourd’hui ?",
    "आज आपको सबसे अधिक किस चीज़ से मदद मिलेगी?",
    "ما الذي سيساعدك أكثر اليوم؟"
  ],
  [
    "Pick one. We'll point you to a useful place to start—no email required to see your result.",
    "请选择一项。我们会推荐实用的起点，无需邮箱即可查看结果。",
    "Elige una opción y te orientaremos. No necesitas correo para ver el resultado.",
    "Choisissez une option et nous vous guiderons, sans adresse courriel requise.",
    "एक चुनें। हम आपको शुरुआत का रास्ता दिखाएँगे, परिणाम के लिए ईमेल ज़रूरी नहीं।",
    "اختر خيارًا وسنقترح نقطة بداية، دون الحاجة إلى بريد إلكتروني."
  ],
  [
    "I have options, but need a clearer plan.",
    "我有一些选择，但需要更清晰的计划。",
    "Tengo opciones, pero necesito un plan más claro.",
    "J’ai des options, mais j’ai besoin d’un plan plus clair.",
    "मेरे पास विकल्प हैं, पर स्पष्ट योजना चाहिए।",
    "لدي خيارات، لكنني أحتاج خطة أوضح."
  ],
  [
    "Start with your career map",
    "从职业规划图开始",
    "Empieza con tu mapa profesional",
    "Commencez par votre carte de carrière",
    "अपने करियर मानचित्र से शुरू करें",
    "ابدأ بخريطة مسارك المهني"
  ],
  [
    "Get the free Career & Life Map workbook, then turn your answers into a practical next step.",
    "获取免费职业与生活规划手册，将答案转化为可执行的下一步。",
    "Obtén el cuaderno gratuito y convierte tus respuestas en un paso concreto.",
    "Obtenez le cahier gratuit, puis transformez vos réponses en une action concrète.",
    "निःशुल्क करियर व जीवन वर्कबुक से जवाबों को अगले कदम में बदलें।",
    "احصل على دفتر العمل المجاني ثم حوّل إجاباتك إلى خطوة عملية."
  ],
  [
    "Get the free workbook",
    "获取免费练习手册",
    "Obtener el cuaderno gratuito",
    "Obtenir le cahier gratuit",
    "निःशुल्क वर्कबुक पाएँ",
    "احصل على دفتر العمل المجاني"
  ],
  [
    "Try something practical",
    "尝试一些实用练习",
    "Prueba algo práctico",
    "Essayez quelque chose de pratique",
    "कुछ व्यावहारिक आज़माएँ",
    "جرّب شيئًا عمليًا"
  ],
  [
    "I want a quick challenge I can actually do.",
    "我想要一个可以马上完成的小挑战。",
    "Quiero un reto rápido que pueda hacer.",
    "Je veux un défi rapide et réalisable.",
    "मुझे एक छोटी चुनौती चाहिए जो मैं कर सकूँ।",
    "أريد تحدّيًا سريعًا أستطيع تنفيذه."
  ],
  [
    "Try a skill challenge",
    "尝试技能挑战",
    "Prueba un reto de habilidades",
    "Essayez un défi de compétences",
    "कौशल चुनौती आज़माएँ",
    "جرّب تحدّي مهارة"
  ],
  [
    "Explore hands-on activities and short exercises. You can browse without creating an account.",
    "浏览动手活动和简短练习，无需创建账户。",
    "Explora actividades prácticas y ejercicios breves sin crear una cuenta.",
    "Explorez les activités et exercices courts sans créer de compte.",
    "खाता बनाए बिना व्यावहारिक गतिविधियाँ और छोटे अभ्यास देखें।",
    "استكشف الأنشطة والتمارين القصيرة دون إنشاء حساب."
  ],
  [
    "Explore skill activities",
    "探索技能活动",
    "Explorar actividades de habilidades",
    "Explorer les activités pratiques",
    "कौशल गतिविधियाँ देखें",
    "استكشف أنشطة المهارات"
  ],
  [
    "Keep track of progress",
    "追踪学习进度",
    "Seguir mi progreso",
    "Suivre mes progrès",
    "प्रगति पर नज़र रखें",
    "تابع التقدّم"
  ],
  [
    "I want to save skills and return to them.",
    "我想保存技能，以后再查看。",
    "Quiero guardar habilidades y volver a ellas.",
    "Je veux enregistrer des compétences pour y revenir.",
    "मैं कौशल सहेजकर बाद में फिर देखना चाहता हूँ।",
    "أريد حفظ المهارات والعودة إليها لاحقًا."
  ],
  [
    "Make your learning stick",
    "巩固学习成果",
    "Haz que tu aprendizaje perdure",
    "Ancrez vos apprentissages",
    "जो सीखें उसे याद रखें",
    "ثبّت ما تتعلّمه"
  ],
  [
    "Create a free account to save skills and return to your personal learning dashboard.",
    "创建免费账户，保存技能并返回个人学习面板。",
    "Crea una cuenta gratis para guardar habilidades y volver a tu panel.",
    "Créez un compte gratuit pour enregistrer vos compétences et retrouver votre tableau de bord.",
    "कौशल सहेजने और अपने डैशबोर्ड पर लौटने के लिए निःशुल्क खाता बनाएँ।",
    "أنشئ حسابًا مجانيًا لحفظ المهارات والعودة إلى لوحتك."
  ],
  [
    "Create my free account",
    "创建免费账户",
    "Crear mi cuenta gratis",
    "Créer mon compte gratuit",
    "मेरा निःशुल्क खाता बनाएँ",
    "أنشئ حسابي المجاني"
  ],
  [
    "Your next step",
    "你的下一步",
    "Tu próximo paso",
    "Votre prochaine étape",
    "आपका अगला कदम",
    "خطوتك التالية"
  ],
  [
    "Start over",
    "重新开始",
    "Empezar de nuevo",
    "Recommencer",
    "फिर से शुरू करें",
    "ابدأ من جديد"
  ],
  [
    "Joining…",
    "正在加入…",
    "Registrando…",
    "Inscription…",
    "जुड़ रहे हैं…",
    "جارٍ الاشتراك…"
  ],
  [
    "Get the weekly skill",
    "获取每周技能邮件",
    "Recibir la habilidad semanal",
    "Recevoir la compétence de la semaine",
    "साप्ताहिक कौशल पाएँ",
    "احصل على مهارة الأسبوع"
  ],
  [
    "One useful email at a time. Unsubscribe anytime.",
    "每次一封实用邮件，随时可取消订阅。",
    "Un correo útil a la vez. Cancela cuando quieras.",
    "Un courriel utile à la fois. Désabonnez-vous à tout moment.",
    "एक समय में एक उपयोगी ईमेल। कभी भी सदस्यता छोड़ें।",
    "رسالة مفيدة في كل مرة. يمكنك إلغاء الاشتراك متى شئت."
  ],
  [
    "Practice XP",
    "练习经验值",
    "Puntos de práctica",
    "Points de pratique",
    "अभ्यास XP",
    "نقاط التدريب"
  ],
  [
    "Practice rhythm",
    "练习节奏",
    "Ritmo de práctica",
    "Rythme de pratique",
    "अभ्यास की लय",
    "وتيرة التدريب"
  ],
  [
    "Completed activities",
    "已完成活动",
    "Actividades completadas",
    "Activités terminées",
    "पूरी गतिविधियाँ",
    "الأنشطة المكتملة"
  ],
  [
    "Short Skill Sprints turn selected guides into active practice. Each sprint combines a clear concept, a workplace challenge, and a retrieval check you can finish in about fifteen minutes.",
    "短期技能冲刺将学习指南转化为主动练习，包含概念、职场挑战和记忆检测，约十五分钟即可完成。",
    "Las prácticas rápidas convierten guías en ejercicios con conceptos, retos laborales y pruebas de memoria de unos quince minutos.",
    "Les sprints transforment les guides en pratique avec une notion, un défi professionnel et un rappel actif en quinze minutes.",
    "कौशल स्प्रिंट गाइड को सक्रिय अभ्यास में बदलते हैं: अवधारणा, कार्यस्थल चुनौती और याददाश्त जाँच, लगभग 15 मिनट में।",
    "تحوّل التدريبات السريعة الأدلة إلى ممارسة تشمل مفهومًا وتحدّي عمل واختبار تذكّر خلال نحو 15 دقيقة."
  ],
  [
    "Explore the skill guide in English, or ask the AI Coach for an explanation in your preferred language.",
    "英语技能指南仍可阅读，或请AI教练用你偏好的语言解释。",
    "Lee la guía en inglés o pide al asistente de IA una explicación en tu idioma.",
    "Lisez le guide en anglais ou demandez au coach IA de l’expliquer dans votre langue.",
    "गाइड अंग्रेज़ी में पढ़ें, या AI कोच से अपनी भाषा में समझाने को कहें।",
    "اقرأ دليل المهارة بالإنجليزية أو اطلب شرحًا بلغتك من المرشد الذكي."
  ],
  [
    "Explore practical skill guides, career pathways, and modern-work ideas designed to help you decide what to learn next.",
    "探索实用技能指南、职业路径和现代职场想法，帮助你决定下一步学什么。",
    "Explora guías de habilidades y carreras para elegir qué aprender después.",
    "Explorez des guides de compétences et de carrières pour décider quoi apprendre ensuite.",
    "अगला क्या सीखें यह तय करने के लिए कौशल और करियर गाइड देखें।",
    "استكشف أدلّة المهارات والمسارات المهنية لتحديد ما تتعلّمه بعد ذلك."
  ],
  [
    "Choose something you want to do more clearly, confidently, or consistently.",
    "选择一项你希望更清晰、自信或稳定完成的技能。",
    "Elige algo que quieras hacer con más claridad y confianza.",
    "Choisissez une compétence à exercer avec plus d’aisance et d’assurance.",
    "ऐसा कौशल चुनें जिसे आप अधिक आत्मविश्वास से करना चाहते हैं।",
    "اختر مهارة تريد إتقانها بوضوح وثقة."
  ],
  [
    "See what the work involves, which capabilities matter, and how people can enter the field.",
    "了解工作内容、所需技能以及入行方式。",
    "Conoce el trabajo, las habilidades necesarias y cómo empezar.",
    "Découvrez le métier, les compétences clés et les voies d’accès.",
    "जानें काम में क्या होता है, कौन से कौशल चाहिए और शुरुआत कैसे करें।",
    "تعرّف إلى طبيعة العمل والمهارات المطلوبة وطرق الدخول إلى المجال."
  ],
  [
    "Follow a connected learning sequence when you already know the outcome you want.",
    "如果目标明确，请按关联的学习顺序前进。",
    "Sigue una ruta de aprendizaje cuando tengas clara tu meta.",
    "Suivez un parcours structuré lorsque votre objectif est clair.",
    "लक्ष्य स्पष्ट हो तो संबंधित सीखने का मार्ग अपनाएँ।",
    "اتبع مسارًا تعليميًا مترابطًا عندما تعرف هدفك."
  ],
  [
    "Explore career matches and update your fit profile",
    "探索职业匹配并更新适配档案",
    "Explora carreras afines y actualiza tu perfil",
    "Explorez des carrières adaptées et actualisez votre profil",
    "मेल खाते करियर देखें और प्रोफ़ाइल अपडेट करें",
    "استكشف المهن المناسبة وحدّث ملفك"
  ],
  [
    "Explore practical learning paths and skill guides",
    "探索实用学习路径与技能指南",
    "Explora rutas y guías de habilidades",
    "Explorez des parcours et des guides pratiques",
    "व्यावहारिक कौशल मार्ग और गाइड देखें",
    "استكشف مسارات التعلّم وأدلّة المهارات"
  ],
  [
    "Return to saved skills, careers and insights",
    "返回已保存的技能、职业和见解",
    "Vuelve a tus habilidades, carreras e ideas guardadas",
    "Retrouvez vos compétences, carrières et idées enregistrées",
    "सहेजे कौशल, करियर और विचारों पर लौटें",
    "عُد إلى المهارات والمهن والأفكار المحفوظة"
  ],
  [
    "Review practice, achievements and learning activity",
    "回顾练习、成就和学习活动",
    "Revisa tus ejercicios, logros y actividad",
    "Consultez votre pratique, vos réussites et vos activités",
    "अभ्यास, उपलब्धियाँ और गतिविधियाँ देखें",
    "راجع تدريباتك وإنجازاتك وأنشطتك"
  ],
  [
    "Skills",
    "技能",
    "Habilidades",
    "Compétences",
    "कौशल",
    "المهارات"
  ],
  [
    "Careers",
    "职业",
    "Carreras",
    "Carrières",
    "करियर",
    "المهن"
  ],
  [
    "Learning Paths",
    "学习路径",
    "Rutas de aprendizaje",
    "Parcours d’apprentissage",
    "सीखने के मार्ग",
    "مسارات التعلّم"
  ],
  [
    "Practice Lab",
    "练习实验室",
    "Laboratorio de práctica",
    "Atelier pratique",
    "अभ्यास प्रयोगशाला",
    "مختبر التدريب"
  ],
  [
    "Practice",
    "练习",
    "Práctica",
    "Pratique",
    "अभ्यास",
    "التدريب"
  ],
  [
    "Community",
    "社区",
    "Comunidad",
    "Communauté",
    "समुदाय",
    "المجتمع"
  ],
  [
    "Topics",
    "主题",
    "Temas",
    "Thèmes",
    "विषय",
    "المواضيع"
  ],
  [
    "Industries",
    "行业",
    "Sectores",
    "Secteurs",
    "उद्योग",
    "القطاعات"
  ],
  [
    "Blog",
    "博客",
    "Blog",
    "Blogue",
    "ब्लॉग",
    "المدونة"
  ],
  [
    "About",
    "关于我们",
    "Acerca de",
    "À propos",
    "हमारे बारे में",
    "من نحن"
  ],
  [
    "Privacy",
    "隐私",
    "Privacidad",
    "Confidentialité",
    "गोपनीयता",
    "الخصوصية"
  ],
  [
    "Member sign in",
    "会员登录",
    "Iniciar sesión",
    "Connexion membre",
    "सदस्य लॉगिन",
    "تسجيل دخول الأعضاء"
  ],
  [
    "Explore",
    "探索",
    "Explorar",
    "Explorer",
    "जानें",
    "استكشف"
  ],
  [
    "Account",
    "账户",
    "Cuenta",
    "Compte",
    "खाता",
    "الحساب"
  ],
  [
    "Sign In",
    "登录",
    "Iniciar sesión",
    "Se connecter",
    "लॉग इन",
    "تسجيل الدخول"
  ],
  [
    "Sign Out",
    "退出登录",
    "Cerrar sesión",
    "Se déconnecter",
    "लॉग आउट",
    "تسجيل الخروج"
  ],
  [
    "Sign out",
    "退出登录",
    "Cerrar sesión",
    "Se déconnecter",
    "लॉग आउट",
    "تسجيل الخروج"
  ],
  [
    "Get Started",
    "立即开始",
    "Comenzar",
    "Commencer",
    "शुरू करें",
    "ابدأ الآن"
  ],
  [
    "My Dashboard",
    "我的学习面板",
    "Mi panel",
    "Mon tableau de bord",
    "मेरा डैशबोर्ड",
    "لوحتي التعليمية"
  ],
  [
    "Find a skill",
    "查找技能",
    "Buscar una habilidad",
    "Trouver une compétence",
    "कौशल खोजें",
    "ابحث عن مهارة"
  ],
  [
    "Practical skills for modern work",
    "适应现代工作的实用技能",
    "Habilidades prácticas para el trabajo actual",
    "Des compétences pratiques pour le monde du travail",
    "आधुनिक काम के लिए व्यावहारिक कौशल",
    "مهارات عملية للعمل الحديث"
  ],
  [
    "Build skills that actually move you forward.",
    "培养真正助你前进的技能。",
    "Desarrolla habilidades que te hagan avanzar.",
    "Développez des compétences qui vous font vraiment progresser.",
    "ऐसे कौशल सीखें जो आपको आगे बढ़ाएँ।",
    "طوّر مهارات تدفعك فعلاً إلى الأمام."
  ],
  [
    "Explore a deep library of practical skills, career connections, and learning paths built for work that keeps changing.",
    "探索实用技能、职业方向和学习路径，适应不断变化的职场。",
    "Explora habilidades prácticas, conexiones profesionales y rutas de aprendizaje para un mundo laboral cambiante.",
    "Explorez des compétences concrètes, des débouchés professionnels et des parcours adaptés à un monde du travail en évolution.",
    "बदलती कामकाजी दुनिया के लिए कौशल, करियर संबंध और सीखने के मार्ग खोजें।",
    "استكشف المهارات العملية والمسارات المهنية والتعليمية لعالم عمل متغيّر."
  ],
  [
    "Explore skills",
    "探索技能",
    "Explorar habilidades",
    "Explorer les compétences",
    "कौशल देखें",
    "استكشف المهارات"
  ],
  [
    "Explore careers",
    "探索职业",
    "Explorar carreras",
    "Explorer les carrières",
    "करियर देखें",
    "استكشف المهن"
  ],
  [
    "Your next useful idea",
    "你的下一个实用想法",
    "Tu próxima idea útil",
    "Votre prochaine idée utile",
    "आपका अगला उपयोगी विचार",
    "فكرتك المفيدة التالية"
  ],
  [
    "More ways to explore",
    "更多探索方式",
    "Más formas de explorar",
    "D’autres façons d’explorer",
    "और विकल्प देखें",
    "طرق أخرى للاستكشاف"
  ],
  [
    "Skills, careers, and learning paths",
    "技能、职业和学习路径",
    "Habilidades, carreras y rutas de aprendizaje",
    "Compétences, carrières et parcours",
    "कौशल, करियर और सीखने के मार्ग",
    "المهارات والمهن ومسارات التعلّم"
  ],
  [
    "More free tools and resources",
    "更多免费工具与资源",
    "Más herramientas y recursos gratuitos",
    "Plus d’outils et de ressources gratuits",
    "और निःशुल्क टूल व संसाधन",
    "المزيد من الأدوات والموارد المجانية"
  ],
  [
    "Workbooks, saved skills, activities",
    "练习手册、已保存技能、活动",
    "Cuadernos, habilidades guardadas y actividades",
    "Cahiers, compétences enregistrées et activités",
    "वर्कबुक, सहेजे कौशल और गतिविधियाँ",
    "دفاتر العمل والمهارات المحفوظة والأنشطة"
  ],
  [
    "Start with a skill",
    "从一项技能开始",
    "Empieza con una habilidad",
    "Commencer par une compétence",
    "किसी कौशल से शुरू करें",
    "ابدأ بمهارة"
  ],
  [
    "Start with a career",
    "从一个职业开始",
    "Empieza con una carrera",
    "Commencer par une carrière",
    "करियर से शुरू करें",
    "ابدأ بمهنة"
  ],
  [
    "Start with a destination",
    "从目标开始",
    "Empieza con una meta",
    "Commencer par un objectif",
    "लक्ष्य से शुरू करें",
    "ابدأ بهدف"
  ],
  [
    "Browse skills",
    "浏览技能",
    "Explorar habilidades",
    "Parcourir les compétences",
    "कौशल ब्राउज़ करें",
    "تصفّح المهارات"
  ],
  [
    "Follow a path",
    "遵循学习路径",
    "Seguir una ruta",
    "Suivre un parcours",
    "मार्ग अपनाएँ",
    "اتبع مسارًا"
  ],
  [
    "Free downloadable guide",
    "免费下载指南",
    "Guía gratuita para descargar",
    "Guide gratuit à télécharger",
    "निःशुल्क डाउनलोड गाइड",
    "دليل مجاني للتنزيل"
  ],
  [
    "Get the Career & Life Map",
    "获取职业与生活规划图",
    "Obtén el mapa de carrera y vida",
    "Obtenir la carte carrière et vie",
    "करियर और जीवन मानचित्र पाएँ",
    "احصل على خريطة المهنة والحياة"
  ],
  [
    "Explore the guide",
    "查看指南",
    "Explorar la guía",
    "Explorer le guide",
    "गाइड देखें",
    "استكشف الدليل"
  ],
  [
    "Free member tools",
    "免费会员工具",
    "Herramientas gratuitas para miembros",
    "Outils gratuits pour les membres",
    "निःशुल्क सदस्य टूल",
    "أدوات مجانية للأعضاء"
  ],
  [
    "Save skills as you learn",
    "学习时保存技能",
    "Guarda habilidades mientras aprendes",
    "Enregistrez vos compétences en apprenant",
    "सीखते हुए कौशल सहेजें",
    "احفظ المهارات أثناء التعلّم"
  ],
  [
    "Create an account",
    "创建账户",
    "Crear una cuenta",
    "Créer un compte",
    "खाता बनाएँ",
    "أنشئ حسابًا"
  ],
  [
    "Hands-on activities",
    "动手练习",
    "Actividades prácticas",
    "Activités pratiques",
    "व्यावहारिक गतिविधियाँ",
    "أنشطة تطبيقية"
  ],
  [
    "Try a skill today",
    "今天尝试一项技能",
    "Prueba una habilidad hoy",
    "Essayez une compétence aujourd’hui",
    "आज एक कौशल आज़माएँ",
    "جرّب مهارة اليوم"
  ],
  [
    "Browse activities",
    "浏览活动",
    "Explorar actividades",
    "Parcourir les activités",
    "गतिविधियाँ देखें",
    "تصفّح الأنشطة"
  ],
  [
    "Start learning free",
    "免费开始学习",
    "Empieza a aprender gratis",
    "Commencer à apprendre gratuitement",
    "निःशुल्क सीखना शुरू करें",
    "ابدأ التعلّم مجانًا"
  ],
  [
    "Explore Practice Lab",
    "探索练习实验室",
    "Explorar el laboratorio de práctica",
    "Explorer l’atelier pratique",
    "अभ्यास प्रयोगशाला देखें",
    "استكشف مختبر التدريب"
  ],
  [
    "Not sure where to start?",
    "不知道从哪里开始？",
    "¿No sabes por dónde empezar?",
    "Vous ne savez pas par où commencer ?",
    "समझ नहीं आ रहा कहाँ से शुरू करें?",
    "لا تعرف من أين تبدأ؟"
  ],
  [
    "Find my skill path",
    "寻找我的技能路径",
    "Encontrar mi ruta de habilidades",
    "Trouver mon parcours de compétences",
    "मेरा कौशल मार्ग खोजें",
    "اعثر على مسار مهاراتي"
  ],
  [
    "Featured skills",
    "精选技能",
    "Habilidades destacadas",
    "Compétences à la une",
    "प्रमुख कौशल",
    "مهارات مميزة"
  ],
  [
    "Try today’s skill challenge",
    "尝试今日技能挑战",
    "Prueba el reto de habilidades de hoy",
    "Essayez le défi de compétences du jour",
    "आज की कौशल चुनौती आज़माएँ",
    "جرّب تحدّي المهارات اليوم"
  ],
  [
    "Turn reading into real comprehension.",
    "让阅读转化为真正的理解。",
    "Convierte la lectura en comprensión real.",
    "Transformez la lecture en réelle compréhension.",
    "पढ़ने को वास्तविक समझ में बदलें।",
    "حوّل القراءة إلى فهم حقيقي."
  ],
  [
    "Learn less. Practice more.",
    "少读一点，多练一点。",
    "Lee menos. Practica más.",
    "Lisez moins. Pratiquez davantage.",
    "कम पढ़ें, अधिक अभ्यास करें।",
    "اقرأ أقل، وتدرّب أكثر."
  ],
  [
    "Jump to",
    "跳转至",
    "Ir a",
    "Aller à",
    "यहाँ जाएँ",
    "انتقل إلى"
  ],
  [
    "Daily challenge",
    "每日挑战",
    "Reto diario",
    "Défi quotidien",
    "दैनिक चुनौती",
    "التحدّي اليومي"
  ],
  [
    "Workshops",
    "工作坊",
    "Talleres",
    "Ateliers",
    "कार्यशालाएँ",
    "ورش العمل"
  ],
  [
    "Interactive exercises",
    "互动练习",
    "Ejercicios interactivos",
    "Exercices interactifs",
    "इंटरैक्टिव अभ्यास",
    "تمارين تفاعلية"
  ],
  [
    "Skill Sprints",
    "技能冲刺",
    "Prácticas rápidas",
    "Sprints de compétences",
    "कौशल स्प्रिंट",
    "تدريبات مهارية سريعة"
  ],
  [
    "View my levels and achievements",
    "查看我的等级与成就",
    "Ver mis niveles y logros",
    "Voir mes niveaux et réussites",
    "मेरे स्तर और उपलब्धियाँ देखें",
    "عرض مستوياتي وإنجازاتي"
  ],
  [
    "Explore all four practice formats",
    "探索四种练习方式",
    "Explora las cuatro formas de practicar",
    "Découvrez les quatre formats de pratique",
    "चारों अभ्यास तरीके देखें",
    "استكشف طرق التدريب الأربع"
  ],
  [
    "Warm up",
    "热身",
    "Calentamiento",
    "Échauffement",
    "शुरुआत करें",
    "التهيئة"
  ],
  [
    "Today’s 60-second challenge",
    "今日60秒挑战",
    "Reto de 60 segundos de hoy",
    "Le défi de 60 secondes du jour",
    "आज की 60 सेकंड की चुनौती",
    "تحدّي اليوم في 60 ثانية"
  ],
  [
    "Where to practise",
    "练习入口",
    "Dónde practicar",
    "Où pratiquer",
    "अभ्यास कहाँ करें",
    "أين تتدرّب"
  ],
  [
    "Four ways to turn reading into a rep",
    "将阅读转化为练习的四种方式",
    "Cuatro maneras de practicar lo que lees",
    "Quatre façons de passer de la lecture à la pratique",
    "पढ़ने को अभ्यास में बदलने के चार तरीके",
    "أربع طرق لتحويل القراءة إلى ممارسة"
  ],
  [
    "Guided work-sample workshops",
    "工作样本指导工作坊",
    "Talleres guiados con muestras de trabajo",
    "Ateliers guidés de réalisations pratiques",
    "निर्देशित कार्य-नमूना कार्यशालाएँ",
    "ورش عمل موجهة لإنشاء نماذج عمل"
  ],
  [
    "Open workshop",
    "打开工作坊",
    "Abrir taller",
    "Ouvrir l’atelier",
    "कार्यशाला खोलें",
    "افتح ورشة العمل"
  ],
  [
    "More than quizzes",
    "不止是测验",
    "Más que cuestionarios",
    "Bien plus que des quiz",
    "क्विज़ से कहीं अधिक",
    "أكثر من اختبارات"
  ],
  [
    "Interactive practice library",
    "互动练习库",
    "Biblioteca de práctica interactiva",
    "Bibliothèque d’exercices interactifs",
    "इंटरैक्टिव अभ्यास लाइब्रेरी",
    "مكتبة التمارين التفاعلية"
  ],
  [
    "Start practicing",
    "开始练习",
    "Empieza a practicar",
    "Commencez à pratiquer",
    "अभ्यास शुरू करें",
    "ابدأ التدريب"
  ],
  [
    "Available Skill Sprints",
    "可用的技能冲刺",
    "Prácticas rápidas disponibles",
    "Sprints de compétences disponibles",
    "उपलब्ध कौशल स्प्रिंट",
    "التدريبات المهارية المتاحة"
  ],
  [
    "Start this sprint",
    "开始本次冲刺",
    "Iniciar esta práctica",
    "Commencer ce sprint",
    "यह स्प्रिंट शुरू करें",
    "ابدأ هذا التدريب"
  ],
  [
    "Your learning space",
    "你的学习空间",
    "Tu espacio de aprendizaje",
    "Votre espace d’apprentissage",
    "आपका सीखने का स्थान",
    "مساحة التعلّم الخاصة بك"
  ],
  [
    "What would you like to do today?",
    "今天你想做什么？",
    "¿Qué te gustaría hacer hoy?",
    "Que souhaitez-vous faire aujourd’hui ?",
    "आज आप क्या करना चाहेंगे?",
    "ماذا تريد أن تفعل اليوم؟"
  ],
  [
    "Find my direction",
    "寻找方向",
    "Encontrar mi rumbo",
    "Trouver ma voie",
    "अपनी दिशा खोजें",
    "اعثر على اتجاهي"
  ],
  [
    "Build my skills",
    "提升我的技能",
    "Desarrollar mis habilidades",
    "Développer mes compétences",
    "मेरे कौशल विकसित करें",
    "طوّر مهاراتي"
  ],
  [
    "My saved learning",
    "我保存的学习内容",
    "Mi aprendizaje guardado",
    "Mes contenus enregistrés",
    "मेरी सहेजी सीख",
    "تعلّمي المحفوظ"
  ],
  [
    "Track my progress",
    "追踪我的进度",
    "Seguir mi progreso",
    "Suivre mes progrès",
    "मेरी प्रगति देखें",
    "تابع تقدّمي"
  ],
  [
    "Back to my learning space",
    "返回我的学习空间",
    "Volver a mi espacio de aprendizaje",
    "Retour à mon espace d’apprentissage",
    "सीखने के स्थान पर वापस जाएँ",
    "العودة إلى مساحة تعلّمي"
  ],
  [
    "Personal learning profile",
    "个人学习档案",
    "Perfil de aprendizaje personal",
    "Profil d’apprentissage personnel",
    "व्यक्तिगत सीखने की प्रोफ़ाइल",
    "الملف التعليمي الشخصي"
  ],
  [
    "Edit fit profile",
    "编辑匹配档案",
    "Editar mi perfil",
    "Modifier mon profil",
    "प्रोफ़ाइल संपादित करें",
    "تعديل الملف الشخصي"
  ],
  [
    "Explore more",
    "探索更多",
    "Explorar más",
    "Explorer davantage",
    "और जानें",
    "استكشف المزيد"
  ],
  [
    "Skill repository",
    "技能库",
    "Biblioteca de habilidades",
    "Répertoire de compétences",
    "कौशल संग्रह",
    "مستودع المهارات"
  ],
  [
    "Career profiles",
    "职业档案",
    "Perfiles profesionales",
    "Fiches métiers",
    "करियर प्रोफ़ाइल",
    "الملفات المهنية"
  ],
  [
    "Industry guides",
    "行业指南",
    "Guías sectoriales",
    "Guides sectoriels",
    "उद्योग गाइड",
    "أدلّة القطاعات"
  ],
  [
    "Learning paths",
    "学习路径",
    "Rutas de aprendizaje",
    "Parcours d’apprentissage",
    "सीखने के मार्ग",
    "مسارات التعلّم"
  ],
  [
    "Ask about this lesson",
    "询问本课内容",
    "Preguntar sobre esta lección",
    "Poser une question sur cette leçon",
    "इस पाठ के बारे में पूछें",
    "اسأل عن هذا الدرس"
  ],
  [
    "Hide AI help",
    "隐藏AI帮助",
    "Ocultar ayuda de IA",
    "Masquer l’aide IA",
    "AI सहायता छिपाएँ",
    "إخفاء مساعدة الذكاء الاصطناعي"
  ],
  [
    "Your question",
    "你的问题",
    "Tu pregunta",
    "Votre question",
    "आपका प्रश्न",
    "سؤالك"
  ],
  [
    "Get explanation",
    "获取解释",
    "Obtener explicación",
    "Obtenir une explication",
    "स्पष्टीकरण पाएँ",
    "احصل على شرح"
  ],
  [
    "Thinking…",
    "思考中…",
    "Pensando…",
    "Réflexion en cours…",
    "सोच रहा है…",
    "جارٍ التفكير…"
  ],
  [
    "Your learning coach",
    "你的学习教练",
    "Tu guía de aprendizaje",
    "Votre coach d’apprentissage",
    "आपका लर्निंग कोच",
    "مرشدك التعليمي"
  ],
  [
    "Copy",
    "复制",
    "Copiar",
    "Copier",
    "कॉपी करें",
    "نسخ"
  ],
  [
    "Copied",
    "已复制",
    "Copiado",
    "Copié",
    "कॉपी किया",
    "تم النسخ"
  ],
  [
    "Practical example",
    "实用示例",
    "Ejemplo práctico",
    "Exemple pratique",
    "व्यावहारिक उदाहरण",
    "مثال عملي"
  ],
  [
    "Check understanding",
    "检查理解",
    "Comprobar comprensión",
    "Vérifier ma compréhension",
    "समझ जाँचें",
    "اختبر فهمي"
  ],
  [
    "Simplify",
    "简化解释",
    "Simplificar",
    "Simplifier",
    "सरल बनाएँ",
    "بسّط"
  ],
  [
    "Restore question",
    "恢复问题",
    "Restaurar pregunta",
    "Restaurer la question",
    "प्रश्न वापस लाएँ",
    "استعادة السؤال"
  ],
  [
    "Need help choosing your next step?",
    "需要帮助决定下一步吗？",
    "¿Necesitas ayuda para elegir tu próximo paso?",
    "Besoin d’aide pour choisir la suite ?",
    "अगला कदम चुनने में मदद चाहिए?",
    "هل تحتاج مساعدة لاختيار خطوتك التالية؟"
  ],
  [
    "One useful skill every week",
    "每周一项实用技能",
    "Una habilidad útil cada semana",
    "Une compétence utile chaque semaine",
    "हर सप्ताह एक उपयोगी कौशल",
    "مهارة مفيدة كل أسبوع"
  ],
  [
    "Explore the free guide →",
    "探索免费指南 →",
    "Explorar la guía gratuita →",
    "Explorer le guide gratuit →",
    "निःशुल्क गाइड देखें →",
    "استكشف الدليل المجاني ←"
  ],
  [
    "Admin",
    "管理员",
    "Administración",
    "Administration",
    "एडमिन",
    "الإدارة"
  ]
];

const dictionaries: Record<LearningLocale, Record<string, string>> = {
  en: {}, 'zh-CN': {}, es: {}, fr: {}, hi: {}, ar: {},
};
for (const [en, zh, es, fr, hi, ar] of rows) {
  dictionaries['zh-CN'][en] = zh;
  dictionaries.es[en] = es;
  dictionaries.fr[en] = fr;
  dictionaries.hi[en] = hi;
  dictionaries.ar[en] = ar;
}

export function translateInterface(text: string, locale: LearningLocale): string {
  return dictionaries[locale][text] || text;
}
