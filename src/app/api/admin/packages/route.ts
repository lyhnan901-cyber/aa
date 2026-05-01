import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const packages = await prisma.package.findMany({ orderBy: { sortOrder: "asc" } });
    return Response.json({ packages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const data = await request.json();

    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        nameAr: data.nameAr,
        price: data.price,
        features: data.features,
        badge: data.badge,
        sortOrder: data.sortOrder || 0,
      },
    });

    return Response.json({ package: pkg });
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ في الخادم";
    const status = message === "Unauthorized" || message === "Forbidden" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
