import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { runAnalysis } from "@/lib/analysis-engine";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
    }

    const data = await request.json();
    const { platform, accountUrl, businessType, country, city, targetAudience, adBudget, mainGoal } = data;

    if (!platform || !accountUrl || !businessType || !country || !city || !targetAudience || !mainGoal) {
      return Response.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        platform,
        accountUrl,
        businessType,
        country,
        city,
        targetAudience,
        adBudget: adBudget || "غير محدد",
        mainGoal,
        status: "analyzing",
      },
    });

    const result = await runAnalysis({
      platform,
      accountUrl,
      businessType,
      country,
      city,
      targetAudience,
      adBudget,
      mainGoal,
    });

    const updated = await prisma.analysis.update({
      where: { id: analysis.id },
      data: {
        status: "completed",
        overallScore: result.scores.overallScore,
        identityScore: result.scores.identityScore,
        contentScore: result.scores.contentScore,
        engagementScore: result.scores.engagementScore,
        trustScore: result.scores.trustScore,
        salesScore: result.scores.salesScore,
        adsScore: result.scores.adsScore,
        messageScore: result.scores.messageScore,
        mainProblem: result.mainProblem,
        mainOpportunity: result.mainOpportunity,
        awarenessLevel: result.journey.awarenessLevel,
        attractionLevel: result.journey.attractionLevel,
        trustLevel: result.journey.trustLevel,
        purchaseLevel: result.journey.purchaseLevel,
        loyaltyLevel: result.journey.loyaltyLevel,
        strengths: JSON.stringify(result.strengths),
        weaknesses: JSON.stringify(result.weaknesses),
        recommendations: JSON.stringify(result.recommendations),
        plan30Days: JSON.stringify(result.plan30Days),
        adPlan: JSON.stringify(result.adPlan),
        competitorAnalysis: JSON.stringify(result.competitorAnalysis),
        fullReport: result.fullReport,
      },
    });

    return Response.json({ analysis: updated });
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json({ error: "حدث خطأ في التحليل" }, { status: 500 });
  }
}
