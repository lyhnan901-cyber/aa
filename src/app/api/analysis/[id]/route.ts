import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
    }

    const { id } = await params;
    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      return Response.json({ error: "التحليل غير موجود" }, { status: 404 });
    }

    if (analysis.userId !== user.id && user.role !== "admin") {
      return Response.json({ error: "غير مصرح" }, { status: 403 });
    }

    return Response.json({ analysis });
  } catch (error) {
    console.error("Get analysis error:", error);
    return Response.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
