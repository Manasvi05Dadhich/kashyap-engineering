import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Starter categories, matching the existing kashyapengineering.com catalog ---
  const categories = [
    { name: "Liquid Filling Machines", slug: "liquid-filling-machines", order: 1 },
    {
      name: "Manufacturing Tanks, Turn Tables & Conveyors",
      slug: "manufacturing-tanks-turn-tables-conveyors",
      order: 2,
    },
    { name: "Oil Filling Machines", slug: "oil-filling-machines", order: 3 },
    { name: "Bottle Filling Machines", slug: "bottle-filling-machines", order: 4 },
    { name: "Packaging Machines", slug: "packaging-machines", order: 5 },
    { name: "Tube Filling Machines", slug: "tube-filling-machines", order: 6 },
    { name: "Capping Machines", slug: "capping-machines", order: 7 },
    { name: "Sealing Machines", slug: "sealing-machines", order: 8 },
    { name: "Labeling Machines", slug: "labeling-machines", order: 9 },
    { name: "Bottle Washing Machines", slug: "bottle-washing-machines", order: 10 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // --- Trust stats shown under the hero ---
  const stats = [
    { label: "Years of experience", value: "26+", order: 1 },
    { label: "Countries served", value: "3+", order: 2 },
    { label: "Established", value: "2009", order: 3 },
    { label: "Location", value: "Vadodara, India", order: 4 },
  ];

  await prisma.companyStat.deleteMany();
  await prisma.companyStat.createMany({ data: stats });

  // --- First admin login, from environment variables ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.admin.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash, name: "Admin" },
    });
    console.log(`Admin account ready: ${adminEmail}`);
  } else {
    console.log(
      "Skipped admin creation — set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env to create one."
    );
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
