"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const platforms = [
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "facebook", name: "Facebook", icon: "📘" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "twitter", name: "Twitter / X", icon: "🐦" },
  { id: "google", name: "Google Business", icon: "📍" },
  { id: "website", name: "موقع إلكتروني", icon: "🌐" },
];

const businessTypes = [
  "مطعم",
  "متجر",
  "عيادة",
  "مؤسسة خدمات",
  "صالون تجميل",
  "صانع محتوى",
  "شركة تقنية",
  "وكالة تسويق",
  "مكتب محاماة",
  "مكتب هندسي",
  "أخرى",
];

const goals = [
  "زيادة المبيعات",
  "زيادة المتابعين",
  "تحسين التفاعل",
  "بناء الثقة",
  "الحصول على عملاء جدد",
  "تحسين الإعلانات",
  "بناء العلامة التجارية",
];

export default function AnalyzePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [form, setForm] = useState({
    platform: "",
    accountUrl: "",
    businessType: "",
    country: "",
    city: "",
    targetAudience: "",
    adBudget: "",
    mainGoal: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setIsAuthenticated(!!data.user);
        if (!data.user) router.push("/auth");
      })
      .catch(() => {
        setIsAuthenticated(false);
        router.push("/auth");
      });
  }, [router]);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.analysis) {
        router.push(`/analyzing?id=${data.analysis.id}`);
      }
    } catch {
      alert("حدث خطأ في التحليل");
    } finally {
      setLoading(false);
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
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

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 rounded ${
                    step > s ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          {/* Step 1: Choose Platform */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">اختر المنصة</h2>
              <p className="text-text-secondary mb-6">
                أي منصة تريد تحليل حسابك عليها؟
              </p>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setForm({ ...form, platform: p.id });
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border-2 text-center hover:border-primary hover:shadow-md transition ${
                      form.platform === p.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="text-3xl mb-2">{p.icon}</div>
                    <div className="font-medium">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">بيانات الحساب</h2>
              <p className="text-text-secondary mb-6">
                أدخل رابط حسابك ومعلومات نشاطك
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    رابط الحساب
                  </label>
                  <input
                    type="url"
                    value={form.accountUrl}
                    onChange={(e) =>
                      setForm({ ...form, accountUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    placeholder="https://instagram.com/your_account"
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    نوع النشاط
                  </label>
                  <select
                    value={form.businessType}
                    onChange={(e) =>
                      setForm({ ...form, businessType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    required
                  >
                    <option value="">اختر نوع النشاط</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      الدولة
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                      placeholder="السعودية"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      المدينة
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                      placeholder="الرياض"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-full border-2 border-border text-text-secondary font-bold hover:bg-gray-50 transition"
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => {
                      if (
                        form.accountUrl &&
                        form.businessType &&
                        form.country &&
                        form.city
                      ) {
                        setStep(3);
                      }
                    }}
                    className="flex-1 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition"
                  >
                    التالي
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Target & Goals */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">الجمهور والأهداف</h2>
              <p className="text-text-secondary mb-6">
                ساعدنا نفهم نشاطك أكثر
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    الجمهور المستهدف
                  </label>
                  <input
                    type="text"
                    value={form.targetAudience}
                    onChange={(e) =>
                      setForm({ ...form, targetAudience: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    placeholder="مثال: نساء 25-40 مهتمات بالعناية بالبشرة"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    الميزانية الإعلانية الشهرية
                  </label>
                  <input
                    type="text"
                    value={form.adBudget}
                    onChange={(e) =>
                      setForm({ ...form, adBudget: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    placeholder="مثال: 500$ شهرياً"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الهدف الرئيسي
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map((g) => (
                      <button
                        key={g}
                        onClick={() => setForm({ ...form, mainGoal: g })}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition ${
                          form.mainGoal === g
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-full border-2 border-border text-text-secondary font-bold hover:bg-gray-50 transition"
                  >
                    السابق
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      loading || !form.targetAudience || !form.mainGoal
                    }
                    className="flex-1 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition disabled:opacity-50"
                  >
                    {loading ? "جاري الإرسال..." : "🚀 ابدأ التحليل"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
