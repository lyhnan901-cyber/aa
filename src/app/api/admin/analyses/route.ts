import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    const analyses = await prisma.analysis.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        payments: { select: { amount: true, status: true, packageType: true } },
      },
    });

    return Response.json({ analyses });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
