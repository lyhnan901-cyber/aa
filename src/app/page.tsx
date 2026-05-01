import Link from "next/link";
import {
  Rocket,
  FileText,
  TrendingUp,
  Target,
  MessageSquare,
  Eye,
  ShieldCheck,
  BarChart3,
  Users,
  Megaphone,
  Map,
  Award,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Star,
  Crown,
} from "lucide-react";

const painPoints = [
  { icon: TrendingUp, text: "أنشر باستمرار ولا أرى نتائج" },
  { icon: MessageSquare, text: "التفاعل ضعيف" },
  { icon: Users, text: "الناس تدخل ولا تتواصل" },
  { icon: Megaphone, text: "أصرف على الإعلانات بدون عائد واضح" },
  { icon: Target, text: "الحساب مرتب لكن لا يبيع" },
  { icon: Eye, text: "لا أعرف أين المشكلة" },
];

const analysisAreas = [
  { icon: MessageSquare, text: "الرسالة التسويقية" },
  { icon: Eye, text: "الهوية والانطباع" },
  { icon: FileText, text: "المحتوى" },
  { icon: TrendingUp, text: "التفاعل" },
  { icon: ShieldCheck, text: "الثقة" },
  { icon: BarChart3, text: "المبيعات" },
  { icon: Megaphone, text: "الإعلانات الممولة" },
  { icon: Map, text: "السوق والمنافسين" },
  { icon: Users, text: "رحلة العميل" },
];

const steps = [
  {
    num: 1,
    title: "أدخل رابط حسابك وبيانات نشاطك",
    desc: "اختر المنصة وأدخل المعلومات الأساسية",
  },
  {
    num: 2,
    title: "يبدأ التحليل الذكي خلال ثوانٍ",
    desc: "الذكاء الاصطناعي يحلل حسابك من كل الزوايا",
  },
  {
    num: 3,
    title: "استلم تقريرك وخطة النمو",
    desc: "تقرير مفصل مع خطوات عملية للتحسين",
  },
];

const whyUs = [
  "لا نعطي ملاحظات عامة",
  "نحدد مكان المشكلة الحقيقي",
  "نربط التحليل بالمبيعات",
  "نفهم الجمهور والسوق المحلي",
  "نعطي خطوات قابلة للتنفيذ",
];

const suitableFor = [
  "المشاريع الصغيرة",
  "الشركات",
  "المتاجر",
  "المطاعم",
  "العيادات",
  "صناع المحتوى",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <div className="bg-gradient-to-l from-primary to-primary-dark text-white text-center py-2 text-sm font-medium">
        🔥 أكثر من 1,200 حساب تم تحليله
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🧪 مختبر النمو
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth"
              className="text-text-secondary hover:text-primary transition"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/analyze"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition font-medium"
            >
              ابدأ التحليل
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-indigo-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            اعرف لماذا حسابك لا ينمو…
            <br />
            <span className="text-primary">خلال أقل من دقيقة</span>
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            حلل حسابك بالذكاء الاصطناعي، واكتشف أين تخسر العملاء، وما الذي
            يمنع المبيعات، وكيف تنمو بخطة واضحة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
            >
              <Rocket className="w-5 h-5" />
              ابدأ التحليل مجاناً
            </Link>
            <Link
              href="#example"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-primary hover:text-white transition"
            >
              <FileText className="w-5 h-5" />
              شاهد نموذج التقرير
            </Link>
          </div>
          <p className="text-sm text-text-secondary">
            لا حاجة لخبرة – نتائج فورية – نسخة مجانية متاحة
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            هل تواجه أحد هذه المشاكل؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition"
              >
                <div className="bg-red-100 p-3 rounded-xl">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-text font-medium text-lg">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-xl font-bold text-primary">
            إذا نعم… نحن نكشف السبب الحقيقي.
          </p>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            تحليل شامل وليس مجرد ملاحظات سطحية
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
            نحلل حسابك من 9 محاور مختلفة لنعطيك صورة كاملة
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {analysisAreas.map((area, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 flex items-center gap-3 shadow-sm border border-border hover:border-primary hover:shadow-md transition"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <area.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{area.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">كيف تعمل؟</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex-1 text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Result */}
      <section id="example" className="py-16 px-4 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-center mb-6">
              مثال على نتيجة التحليل
            </h2>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-accent mb-2">63</div>
              <div className="text-text-secondary">/ 100</div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-700">
                  المشكلة الأساسية: ضعف الثقة يؤدي إلى انخفاض التحويل
                </p>
              </div>
              <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-green-700">
                  أهم فرصة: تحسين الرسالة + محتوى ثقة + حملة صحيحة
                </p>
              </div>
            </div>
            <Link
              href="/analyze"
              className="block w-full text-center bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition"
            >
              أريد تحليل حسابي الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا هذه المنصة مختلفة؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            اختر الباقة المناسبة لك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">مجاني</h3>
              <div className="text-3xl font-bold mb-4">
                0<span className="text-lg text-text-secondary">$</span>
              </div>
              <p className="text-text-secondary mb-6">
                ابدأ واكتشف وضع حسابك
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-success" /> تحليل سريع
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-success" /> الدرجة العامة
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-success" /> المشكلة الرئيسية
                </li>
              </ul>
              <Link
                href="/analyze"
                className="block text-center py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition"
              >
                ابدأ مجاناً
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition">
              <div className="text-xs font-bold text-primary bg-primary/10 inline-block px-3 py-1 rounded-full mb-2">
                الأفضل للبدء
              </div>
              <h3 className="text-xl font-bold mb-2">احترافي</h3>
              <div className="text-3xl font-bold mb-4">
                10<span className="text-lg text-text-secondary">$</span>
              </div>
              <p className="text-text-secondary mb-6">تقرير كامل PDF</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-accent" /> تقرير كامل PDF
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-accent" /> تحليل شامل
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-accent" /> نقاط القوة والضعف
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-accent" /> توصيات فورية
                </li>
              </ul>
              <Link
                href="/analyze"
                className="block text-center py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition"
              >
                احصل عليها الآن
              </Link>
            </div>

            {/* Comprehensive */}
            <div className="bg-gradient-to-b from-primary to-primary-dark rounded-2xl p-6 text-white relative shadow-xl shadow-primary/20 scale-105">
              <div className="absolute -top-3 right-4 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                ⭐ الأكثر اختياراً
              </div>
              <h3 className="text-xl font-bold mb-2">شامل</h3>
              <div className="text-3xl font-bold mb-4">
                50<span className="text-lg text-white/70">$</span>
              </div>
              <p className="text-white/80 mb-6">استشارة + خطة 30 يوم</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-accent" /> كل ما في الاحترافية
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-accent" /> جلسة استشارية ساعة
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-accent" /> خطة 30 يوم مخصصة
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-accent" /> خطة إعلانية
                </li>
              </ul>
              <Link
                href="/analyze"
                className="block text-center py-3 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition"
              >
                ابدأ الشاملة
              </Link>
            </div>

            {/* VIP */}
            <div className="bg-white rounded-2xl border-2 border-accent p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" /> VIP
              </h3>
              <div className="text-xl font-bold mb-4 text-accent">
                حسب الحالة
              </div>
              <p className="text-text-secondary mb-6">
                دعنا ننفذ كل شيء عنك
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-accent" /> تنفيذ كامل
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-accent" /> إدارة الحساب
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-accent" /> الإعلانات والمحتوى
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-accent" /> متابعة شهرية
                </li>
              </ul>
              <Link
                href="/analyze"
                className="block text-center py-3 rounded-full border-2 border-accent text-accent font-bold hover:bg-accent hover:text-white transition"
              >
                أريد التنفيذ الكامل
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable For */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">مناسبة لـ</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {suitableFor.map((item, i) => (
              <span
                key={i}
                className="bg-primary/10 text-primary px-6 py-3 rounded-full font-medium text-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-bl from-primary via-primary-dark to-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لا تضيع شهراً جديداً بنفس المشكلة
          </h2>
          <p className="text-xl text-white/80 mb-8">
            ابدأ الآن واكتشف ما يمنع نمو حسابك
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-white text-primary px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            ابدأ التحليل المجاني الآن
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <p className="text-white/60">
          © {new Date().getFullYear()} مختبر النمو - جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}
