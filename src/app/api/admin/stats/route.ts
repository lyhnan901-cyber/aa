import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    const [totalUsers, totalAnalyses, totalPayments, payments] = await Promise.all([
      prisma.user.count(),
      prisma.analysis.count(),
      prisma.payment.count({ where: { status: "completed" } }),
      prisma.payment.findMany({ where: { status: "completed" }, select: { amount: true } }),
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const recentAnalyses = await prisma.analysis.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    const businessTypes = await prisma.analysis.groupBy({
      by: ["businessType"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 6,
    });

    return Response.json({
      stats: {
        totalUsers,
        totalAnalyses,
        totalPayments,
        totalRevenue,
        avgCustomerValue: totalPayments > 0 ? totalRevenue / totalPayments : 0,
      },
      recentAnalyses,
      businessTypes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
