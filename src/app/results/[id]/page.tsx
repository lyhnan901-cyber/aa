"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  Zap,
  ArrowLeft,
} from "lucide-react";

interface AnalysisData {
  id: string;
  platform: string;
  overallScore: number;
  identityScore: number;
  contentScore: number;
  engagementScore: number;
  trustScore: number;
  salesScore: number;
  adsScore: number;
  messageScore: number;
  mainProblem: string;
  mainOpportunity: string;
  awarenessLevel: string;
  attractionLevel: string;
  trustLevel: string;
  purchaseLevel: string;
  loyaltyLevel: string;
  strengths: string;
  weaknesses: string;
  recommendations: string;
}

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-32 text-right">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold w-10">{score}</span>
    </div>
  );
}

function JourneyStep({
  label,
  level,
}: {
  label: string;
  level: string;
}) {
  const colors: Record<string, string> = {
    ممتاز: "bg-green-500",
    جيد: "bg-blue-500",
    متوسط: "bg-amber-500",
    ضعيف: "bg-red-500",
  };

  const widths: Record<string, string> = {
    ممتاز: "w-[90%]",
    جيد: "w-[70%]",
    متوسط: "w-[45%]",
    ضعيف: "w-[25%]",
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-20 text-right">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${colors[level] || "bg-gray-400"} ${
            widths[level] || "w-1/2"
          } transition-all duration-1000`}
        />
      </div>
      <span
        className={`text-xs font-bold w-14 text-center py-1 rounded-full ${
          level === "ممتاز"
            ? "bg-green-100 text-green-700"
            : level === "جيد"
            ? "bg-blue-100 text-blue-700"
            : level === "متوسط"
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {level}
      </span>
    </div>
  );
}

function getScoreLabel(score: number): string {
  if (score >= 85) return "ممتاز";
  if (score >= 70) return "جيد… لكن يحتاج تطوير مهم";
  if (score >= 50) return "متوسط ويحتاج تحسين";
  return "ضعيف ويحتاج عمل كبير";
}

function getScoreColor(score: number): string {
  if (score >= 85) return "text-green-500";
  if (score >= 70) return "text-blue-500";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch(`/api/analysis/${params.id}`);
        const data = await res.json();
        if (data.analysis) {
          setAnalysis(data.analysis);
        } else {
          router.push("/analyze");
        }
      } catch {
        router.push("/analyze");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!analysis) return null;

  const strengths: string[] = (() => {
    try { return JSON.parse(analysis.strengths); } catch { return []; }
  })();

  const weaknesses: string[] = (() => {
    try { return JSON.parse(analysis.weaknesses); } catch { return []; }
  })();

  const recommendations: string[] = (() => {
    try { return JSON.parse(analysis.recommendations); } catch { return []; }
  })();

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

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border text-center">
          <div className="text-green-500 text-4xl mb-2">✅</div>
          <h1 className="text-2xl font-bold mb-2">تحليل حسابك جاهز</h1>
          <p className="text-text-secondary">
            حللنا حسابك، ووجدنا فرص نمو ممتازة، لكن توجد بعض العوائق التي
            تمنع أفضل النتائج حالياً.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border text-center">
          <h2 className="text-xl font-bold mb-4">تقييم حسابك</h2>
          <div
            className={`text-7xl font-bold mb-1 ${getScoreColor(
              analysis.overallScore
            )}`}
          >
            {analysis.overallScore}
          </div>
          <div className="text-text-secondary text-lg mb-3">/ 100</div>
          <div className="text-lg font-medium">
            الحالة: {getScoreLabel(analysis.overallScore)}
          </div>
          <p className="text-sm text-text-secondary mt-2">
            مقارنة: الحسابات القوية في نفس المجال تبدأ من 85+
          </p>
        </div>

        {/* Main Problem */}
        <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-700 mb-2">
                المشكلة الرئيسية في حسابك
              </h2>
              <p className="text-red-600 text-lg">{analysis.mainProblem}</p>
              <p className="text-red-500 text-sm mt-2">
                الناس تدخل الحساب، لكنها لا تجد أسباباً كافية تجعلها
                تتواصل أو تشتري بسرعة.
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          <h2 className="text-xl font-bold mb-6">درجات المحاور</h2>
          <div className="space-y-4">
            <ScoreBar
              label="الرسالة التسويقية"
              score={analysis.messageScore}
              color="bg-indigo-500"
            />
            <ScoreBar
              label="الهوية"
              score={analysis.identityScore}
              color="bg-purple-500"
            />
            <ScoreBar
              label="المحتوى"
              score={analysis.contentScore}
              color="bg-blue-500"
            />
            <ScoreBar
              label="الثقة"
              score={analysis.trustScore}
              color="bg-green-500"
            />
            <ScoreBar
              label="المبيعات"
              score={analysis.salesScore}
              color="bg-amber-500"
            />
            <ScoreBar
              label="التفاعل"
              score={analysis.engagementScore}
              color="bg-cyan-500"
            />
            <ScoreBar
              label="الإعلانات"
              score={analysis.adsScore}
              color="bg-rose-500"
            />
          </div>
        </div>

        {/* Customer Journey */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          <h2 className="text-xl font-bold mb-6">
            أين يتوقف العميل؟ (رحلة العميل)
          </h2>
          <div className="space-y-4">
            <JourneyStep
              label="الوعي"
              level={analysis.awarenessLevel}
            />
            <JourneyStep
              label="الجذب"
              level={analysis.attractionLevel}
            />
            <JourneyStep label="الثقة" level={analysis.trustLevel} />
            <JourneyStep
              label="الشراء"
              level={analysis.purchaseLevel}
            />
            <JourneyStep label="الولاء" level={analysis.loyaltyLevel} />
          </div>
        </div>

        {/* What You're Losing */}
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200">
          <h2 className="text-xl font-bold text-amber-700 mb-4">
            ماذا تخسر الآن؟
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-amber-600">
              <span>⚠️</span> زوار يدخلون ويخرجون بدون تواصل
            </li>
            <li className="flex items-center gap-2 text-amber-600">
              <span>⚠️</span> فرص مبيعات تضيع
            </li>
            <li className="flex items-center gap-2 text-amber-600">
              <span>⚠️</span> إعلان ممول لا يستفيد كامل الاستفادة
            </li>
            <li className="flex items-center gap-2 text-amber-600">
              <span>⚠️</span> محتوى جيد لكن لا يحول
            </li>
          </ul>
        </div>

        {/* Strengths */}
        <div className="bg-green-50 rounded-3xl p-8 border border-green-200">
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> نقاط القوة
          </h2>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-green-600"
              >
                <span>👍</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> نقاط الضعف
          </h2>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-center gap-2 text-red-600">
                <span>👀</span> {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Top 3 Actions */}
        <div className="bg-gradient-to-l from-primary to-primary-dark rounded-3xl p-8 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" /> أهم 3 خطوات الآن 🔥
          </h2>
          <ul className="space-y-3">
            {recommendations.slice(0, 3).map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-lg">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Opportunity */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border text-center">
          <h2 className="text-xl font-bold mb-4">
            <TrendingUp className="w-5 h-5 inline ml-2" />
            فرصة النمو
          </h2>
          <p className="text-text-secondary mb-4">
            إذا تم تنفيذ التحسينات الصحيحة، يمكن رفع الحساب من:
          </p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <div className="text-4xl font-bold text-amber-500">
                {analysis.overallScore}
              </div>
              <div className="text-sm text-text-secondary">الآن</div>
            </div>
            <ArrowLeft className="w-8 h-8 text-primary" />
            <div>
              <div className="text-4xl font-bold text-green-500">
                {Math.min(analysis.overallScore + 20, 95)}
              </div>
              <div className="text-sm text-text-secondary">
                خلال 30-60 يوم
              </div>
            </div>
          </div>
        </div>

        {/* Unlock Full Report */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-primary/30">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-3">
                التقرير الكامل يحتوي على:
              </h2>
              <ul className="space-y-2 text-text-secondary mb-6">
                <li>✔ تحليل تفصيلي لكل نقطة</li>
                <li>✔ خطة 30 يوم مخصصة</li>
                <li>✔ تحليل المنافسين</li>
                <li>✔ خطة الإعلانات</li>
                <li>✔ خطوات زيادة المبيعات</li>
                <li>✔ ملفات PDF جاهزة</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-l from-primary to-primary-dark rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">اختر خطوتك القادمة</h2>
          <p className="text-white/80 mb-6">
            ابدأ الآن واحصل على التقرير الكامل وخطة النمو
          </p>
          <Link
            href={`/payment/${analysis.id}`}
            className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition"
          >
            ابدأ الآن 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}
