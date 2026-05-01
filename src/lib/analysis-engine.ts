"use server";

interface AnalysisInput {
  platform: string;
  accountUrl: string;
  businessType: string;
  country: string;
  city: string;
  targetAudience: string;
  adBudget: string;
  mainGoal: string;
}

interface AnalysisScores {
  overallScore: number;
  identityScore: number;
  contentScore: number;
  engagementScore: number;
  trustScore: number;
  salesScore: number;
  adsScore: number;
  messageScore: number;
}

interface JourneyLevels {
  awarenessLevel: string;
  attractionLevel: string;
  trustLevel: string;
  purchaseLevel: string;
  loyaltyLevel: string;
}

export interface AnalysisResult {
  scores: AnalysisScores;
  journey: JourneyLevels;
  mainProblem: string;
  mainOpportunity: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  plan30Days: string[];
  adPlan: string[];
  competitorAnalysis: string[];
  fullReport: string;
}

function generateScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLevel(score: number): string {
  if (score >= 80) return "ممتاز";
  if (score >= 60) return "جيد";
  if (score >= 40) return "متوسط";
  return "ضعيف";
}

const problemTemplates: Record<string, string[]> = {
  restaurant: [
    "ضعف الثقة يؤدي إلى انخفاض الحجوزات والطلبات",
    "المحتوى لا يعكس جودة الطعام والخدمة الفعلية",
    "غياب استراتيجية واضحة لجذب العملاء الجدد",
  ],
  store: [
    "ضعف التحويل من زائر إلى مشتري",
    "الرسالة التسويقية غير واضحة للجمهور المستهدف",
    "غياب محتوى بناء الثقة قبل البيع المباشر",
  ],
  clinic: [
    "ضعف بناء الثقة الطبية عبر المحتوى",
    "غياب شهادات المرضى وقصص النجاح",
    "المحتوى يركز على البيع أكثر من التثقيف",
  ],
  services: [
    "ضعف الثقة يؤدي إلى انخفاض المبيعات والتحويل",
    "الحساب يبيع قبل أن يبني ثقة كافية",
    "الرسالة التسويقية غير ملائمة للسوق المستهدف",
  ],
  content: [
    "ضعف التحويل من متابع إلى عميل",
    "المحتوى جيد لكنه لا يقود لإجراء واضح",
    "غياب استراتيجية تحويل المتابعين إلى مبيعات",
  ],
  default: [
    "ضعف الثقة يؤدي إلى انخفاض المبيعات والتحويل",
    "الحساب يبيع مبكراً قبل بناء الثقة الكافية",
    "الرسالة التسويقية غير متوافقة مع الجمهور المستهدف",
  ],
};

const strengthTemplates = [
  "الحساب منظم بشكل جيد",
  "الهوية البصرية واضحة ومتناسقة",
  "الجمهور المستهدف مناسب للنشاط",
  "لديك فرصة نمو ممتازة",
  "المحتوى البصري جيد الجودة",
  "معدل النشر منتظم",
  "التفاعل الأساسي موجود",
  "وجود قاعدة متابعين حقيقية",
];

const weaknessTemplates = [
  "الثقة ضعيفة - لا توجد شهادات أو تجارب كافية",
  "CTA غير واضح في المنشورات",
  "محتوى البيع أكثر من اللازم مقارنة بمحتوى القيمة",
  "الإعلان الحالي يحتاج تعديل في الاستهداف",
  "غياب محتوى بناء الثقة",
  "عدم وجود رحلة عميل واضحة",
  "ضعف في وضوح العرض والقيمة",
  "عدم استغلال القصص والريلز بشكل كافي",
];

const recommendationTemplates = [
  "تعديل الرسالة التسويقية لتكون أكثر وضوحاً",
  "رفع محتوى ثقة: شهادات، تجارب، نتائج حقيقية",
  "إعادة هيكلة الإعلان الحالي",
  "إضافة CTA واضح في كل منشور",
  "تقليل محتوى البيع المباشر مؤقتاً",
  "إنشاء سلسلة محتوى تثقيفي",
  "تحسين البايو وإضافة رابط تواصل واضح",
  "إنشاء عروض محدودة لتحفيز الشراء",
];

const plan30DaysTemplates = [
  "الأسبوع 1: تحسين البايو والرسالة التسويقية + إضافة رابط تواصل واضح",
  "الأسبوع 2: نشر 3 قطع محتوى ثقة (شهادات، نتائج، خلف الكواليس)",
  "الأسبوع 3: إطلاق حملة إعلانية مُعدّلة بناءً على التوصيات",
  "الأسبوع 4: تحليل النتائج + تعديل الاستراتيجية + محتوى تحويلي",
  "يومياً: نشر ستوري واحدة على الأقل",
  "أسبوعياً: 2 ريلز + 1 كاروسيل تعليمي + 1 محتوى ثقة",
];

const adPlanTemplates = [
  "أفضل منصة إعلانية: Instagram/Facebook Ads",
  "تقسيم الميزانية: 60% وعي وجذب، 40% تحويل",
  "نوع الحملة الأنسب: حملة تفاعل ثم إعادة استهداف",
  "الجمهور المستهدف: تضييق الاستهداف حسب الاهتمامات",
  "تكلفة العميل المتوقعة: يمكن تخفيضها 30% بتحسين الصفحة",
  "نصيحة: لا تعلن قبل تجهيز الحساب لاستقبال الزوار",
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function runAnalysis(input: AnalysisInput): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const identityScore = generateScore(40, 95);
  const contentScore = generateScore(35, 90);
  const engagementScore = generateScore(30, 85);
  const trustScore = generateScore(25, 80);
  const salesScore = generateScore(20, 75);
  const adsScore = generateScore(30, 85);
  const messageScore = generateScore(35, 90);

  const overallScore = Math.round(
    identityScore * 0.15 +
    contentScore * 0.2 +
    engagementScore * 0.15 +
    trustScore * 0.2 +
    salesScore * 0.15 +
    adsScore * 0.08 +
    messageScore * 0.07
  );

  const awarenessScore = generateScore(40, 90);
  const attractionScore = generateScore(35, 85);
  const trustJourneyScore = generateScore(25, 75);
  const purchaseScore = generateScore(20, 70);
  const loyaltyScore = generateScore(30, 75);

  const businessTypeMap: Record<string, string> = {
    "مطعم": "restaurant",
    "متجر": "store",
    "عيادة": "clinic",
    "مؤسسة خدمات": "services",
    "صانع محتوى": "content",
  };
  const category = businessTypeMap[input.businessType] || "default";
  const problems = problemTemplates[category] || problemTemplates.default;
  const mainProblem = problems[Math.floor(Math.random() * problems.length)];

  const strengths = pickRandom(strengthTemplates, 4);
  const weaknesses = pickRandom(weaknessTemplates, 4);
  const recommendations = pickRandom(recommendationTemplates, 5);
  const plan30Days = plan30DaysTemplates;
  const adPlan = adPlanTemplates;

  const competitorAnalysis = [
    `المنافسون في ${input.city} يركزون على محتوى الثقة أكثر`,
    "متوسط معدل التفاعل في مجالك: 3.2%",
    "أفضل المنافسين ينشرون 4-5 مرات أسبوعياً",
    "المنافسون يستخدمون الريلز بنسبة 60% من محتواهم",
    "فرصتك: التميز بمحتوى خلف الكواليس وقصص العملاء",
  ];

  const mainOpportunity = `تحسين الرسالة التسويقية + رفع محتوى الثقة + إعادة هيكلة الحملة الإعلانية = نمو متوقع من ${overallScore} إلى ${Math.min(overallScore + 20, 95)} خلال 30-60 يوم`;

  const fullReport = JSON.stringify({
    summary: `حسابك على ${input.platform} حصل على تقييم ${overallScore}/100. ${mainProblem}. لكن لديك فرص نمو ممتازة يمكن استغلالها.`,
    scores: { identityScore, contentScore, engagementScore, trustScore, salesScore, adsScore, messageScore },
    mainProblem,
    mainOpportunity,
    strengths,
    weaknesses,
    recommendations,
    plan30Days,
    adPlan,
    competitorAnalysis,
  });

  return {
    scores: {
      overallScore,
      identityScore,
      contentScore,
      engagementScore,
      trustScore,
      salesScore,
      adsScore,
      messageScore,
    },
    journey: {
      awarenessLevel: getLevel(awarenessScore),
      attractionLevel: getLevel(attractionScore),
      trustLevel: getLevel(trustJourneyScore),
      purchaseLevel: getLevel(purchaseScore),
      loyaltyLevel: getLevel(loyaltyScore),
    },
    mainProblem,
    mainOpportunity,
    strengths,
    weaknesses,
    recommendations,
    plan30Days,
    adPlan,
    competitorAnalysis,
    fullReport,
  };
}
