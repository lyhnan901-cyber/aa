import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "..", "dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@growthlab.com" },
    update: {},
    create: {
      name: "مدير النظام",
      email: "admin@growthlab.com",
      password: hashedPassword,
      role: "admin",
      phone: "+966500000000",
    },
  });

  console.log("Seed completed: Admin user created (admin@growthlab.com / admin123)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
