import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        analysis: { select: { platform: true, businessType: true, overallScore: true } },
      },
    });

    return Response.json({ payments });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
