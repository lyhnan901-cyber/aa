import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: { select: { analyses: true, payments: true } },
      },
    });

    return Response.json({ users });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
