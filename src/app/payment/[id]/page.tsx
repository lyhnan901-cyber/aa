"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Crown, Zap, Award, CreditCard, Building2, Wallet } from "lucide-react";

const packages = [
  {
    id: "free",
    name: "الباقة المجانية",
    price: 0,
    badge: null,
    desc: "تحليل سريع",
    features: ["تحليل سريع", "الدرجة العامة", "المشكلة الرئيسية"],
    icon: Zap,
    color: "border-border",
    btnClass: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    btnText: "ابدأ مجاناً",
  },
  {
    id: "professional",
    name: "الباقة الاحترافية",
    price: 10,
    badge: "الأفضل للبدء",
    desc: "تقرير كامل PDF",
    features: [
      "تقرير كامل PDF احترافي",
      "تحليل شامل لجميع المحاور",
      "درجات تفصيلية",
      "تحليل رحلة العميل",
      "نقاط القوة والضعف",
      "توصيات فورية",
      "خطة أولية",
    ],
    icon: Star,
    color: "border-primary/30",
    btnClass: "bg-primary text-white hover:bg-primary-dark",
    btnText: "احصل على التقرير الكامل",
  },
  {
    id: "comprehensive",
    name: "الباقة الشاملة",
    price: 50,
    badge: "⭐ الأكثر اختياراً",
    desc: "استشارة + خطة 30 يوم",
    features: [
      "كل ما في الاحترافية",
      "جلسة استشارية لمدة ساعة",
      "تحليل مباشر للأسئلة",
      "خطة نمو 30 يوم مخصصة",
      "خطة إعلانية حسب الميزانية",
      "ترتيب أولويات التنفيذ",
      "مراجعة النشاط والسوق",
    ],
    icon: Award,
    color: "border-accent",
    btnClass: "bg-accent text-white hover:bg-accent-dark",
    btnText: "ابدأ الخطة الشاملة",
    featured: true,
  },
  {
    id: "vip",
    name: "باقة VIP",
    price: -1,
    badge: "دعنا ننفذ كل شيء عنك",
    desc: "تنفيذ كامل بواسطة المؤسسة",
    features: [
      "كل ما في الشاملة",
      "تنفيذ كامل بواسطة المؤسسة",
      "إدارة الحساب",
      "صناعة المحتوى",
      "تشغيل الإعلانات",
      "متابعة شهرية",
      "خصم 50% على رسوم التنفيذ",
    ],
    icon: Crown,
    color: "border-amber-400",
    btnClass: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    btnText: "أريد التنفيذ الكامل",
  },
];

export default function PaymentPage() {
  const params = useParams();
  const [selectedPackage, setSelectedPackage] = useState("comprehensive");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handlePurchase() {
    if (selectedPackage === "free") {
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 2000);
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-border text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2">تم الطلب بنجاح!</h1>
          <p className="text-text-secondary mb-6">
            سيتم إرسال التقرير الكامل إلى بريدك الإلكتروني خلال دقائق
          </p>
          <Link
            href={`/results/${params.id}`}
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition"
          >
            العودة للنتائج
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🧪 مختبر النمو
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            أكمل رحلتك نحو نمو حقيقي 🚀
          </h1>
          <p className="text-text-secondary">
            اختر الباقة المناسبة لك، واستلم أفضل تحليل وخطة نمو لنشاطك.
          </p>
        </div>

        {/* Personalized Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center mb-8">
          <p className="font-bold text-amber-700">
            🔥 حسابك يحتاج تحسين الثقة الآن – اختر باقة لتبدأ العلاج فوراً
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer transition hover:shadow-lg ${
                selectedPackage === pkg.id
                  ? "border-primary shadow-lg ring-2 ring-primary/20"
                  : pkg.color
              } ${pkg.featured ? "bg-gradient-to-b from-primary/5 to-white" : "bg-white"}`}
            >
              {pkg.badge && (
                <div
                  className={`text-xs font-bold inline-block px-3 py-1 rounded-full mb-3 ${
                    pkg.featured
                      ? "bg-accent text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {pkg.badge}
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <pkg.icon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">{pkg.name}</h3>
              </div>
              <div className="text-2xl font-bold mb-1">
                {pkg.price === -1 ? (
                  <span className="text-accent text-lg">حسب الحالة</span>
                ) : (
                  <>
                    {pkg.price}
                    <span className="text-sm text-text-secondary">$</span>
                  </>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-4">{pkg.desc}</p>
              <ul className="space-y-2">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✔</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        {selectedPackage !== "free" && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
              <h2 className="text-xl font-bold mb-6">وسيلة الدفع</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <span className="text-sm font-medium">بطاقة بنكية</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("transfer")}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    paymentMethod === "transfer"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Building2 className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <span className="text-sm font-medium">تحويل بنكي</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    paymentMethod === "paypal"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Wallet className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <span className="text-sm font-medium">PayPal</span>
                </button>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-green-700 mb-2">
                  لماذا يشتري العملاء؟
                </h3>
                <ul className="space-y-1 text-sm text-green-600">
                  <li>✔ تحليل احترافي</li>
                  <li>✔ خطوات قابلة للتنفيذ</li>
                  <li>✔ وضوح أين المشكلة</li>
                  <li>✔ نتائج قابلة للتحسين</li>
                </ul>
              </div>

              <button
                onClick={handlePurchase}
                disabled={!paymentMethod || processing}
                className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {processing ? "جاري المعالجة..." : "إتمام الطلب 🚀"}
              </button>

              <p className="text-center text-xs text-text-secondary mt-4">
                كل يوم تأخير يعني فرص ضائعة – ابدأ الآن
              </p>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-lg mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">أسئلة شائعة</h2>
          <div className="space-y-4">
            {[
              {
                q: "هل التحليل فوري؟",
                a: "نعم خلال دقائق.",
              },
              {
                q: "هل التقرير مفهوم؟",
                a: "نعم بلغة بسيطة وواضحة.",
              },
              {
                q: "هل أحتاج خبرة؟",
                a: "لا.",
              },
              {
                q: "هل يمكنكم التنفيذ؟",
                a: "نعم عبر باقة VIP.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-border"
              >
                <h3 className="font-bold mb-1">{item.q}</h3>
                <p className="text-text-secondary text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
