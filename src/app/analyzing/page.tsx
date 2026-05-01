"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const stages = [
  { label: "تحليل الهوية", icon: "🎨" },
  { label: "تحليل المحتوى", icon: "📝" },
  { label: "تحليل السوق", icon: "📊" },
  { label: "تحليل رحلة العميل", icon: "🗺️" },
  { label: "إعداد التقرير النهائي", icon: "📋" },
];

function AnalyzingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!id) {
      router.push("/analyze");
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.push(`/results/${id}`);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [id, router]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">جاري تحليل حسابك…</h1>
          <p className="text-text-secondary">
            هذا قد يستغرق أقل من دقيقة
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-border">
          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                  i < currentStage
                    ? "bg-green-50 border border-green-200"
                    : i === currentStage
                    ? "bg-primary/5 border border-primary/20 animate-pulse"
                    : "bg-gray-50 border border-transparent"
                }`}
              >
                <span className="text-xl">{stage.icon}</span>
                <span
                  className={`font-medium flex-1 text-right ${
                    i < currentStage
                      ? "text-green-700"
                      : i === currentStage
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </span>
                {i < currentStage && (
                  <span className="text-green-500 text-lg">✓</span>
                )}
                {i === currentStage && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStage + 1) / stages.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-text-secondary mt-2">
              {Math.round(((currentStage + 1) / stages.length) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyzingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <AnalyzingContent />
    </Suspense>
  );
}
