import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "حدث خطأ في تسجيل الدخول" }, { status: 500 });
  }
}
