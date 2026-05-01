import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: analysisId } = await params;
    const { packageType, method } = await request.json();

    const analysis = await prisma.analysis.findFirst({
      where: { id: analysisId, userId: user.id },
    });

    if (!analysis) {
      return Response.json({ error: "التحليل غير موجود" }, { status: 404 });
    }

    const prices: Record<string, number> = {
      free: 0,
      professional: 10,
      comprehensive: 50,
      vip: 0,
    };

    const amount = prices[packageType] ?? 0;

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        analysisId,
        packageType,
        amount,
        currency: "USD",
        status: "completed",
        method: method || "mock",
      },
    });

    return Response.json({ payment });
  } catch (error) {
    console.error("Payment error:", error);
    return Response.json({ error: "حدث خطأ في الدفع" }, { status: 500 });
  }
}
