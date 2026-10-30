import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  { name: "طاولة شطرنج ملكية صدف طبيعي", category: "طاولات زهر و شطرنج", price: 185000, status: "غير متوفر" },
  { name: "ترابيزة أباه نجمة الملكة كليوباترا صدف ملكي", category: "ترابيزات", price: 75000, status: "متوفر" },
  { name: "ترابيزة السلطان سليمان القانوني", category: "ترابيزات", price: 55000, status: "متوفر" },
  { name: "كرسي أرابيسك ملكي قابل للطي - صدف طبيعي - إصدار العرش", category: "أثاث ملكي", price: 65000, status: "متوفر" },
  { name: "صندوق بخور وعود ملكي صدف طبيعي - السلطان صلاح الدين", category: "صناديق و شكمجيات", price: 65000, status: "متوفر" },
  { name: "طاولة شطرنج وزهور 2 في 1 - صدف ملكي الملك فاروق", category: "ترابيزات", price: 40000, status: "متوفر" },
  { name: "صندوق عروسة ملكي - صدف طبيعي الملكة كليوباترا", category: "صناديق و شكمجيات", price: 65000, status: "متوفر" },
  { name: "كومود ملكي بومبيه - 3 أدراج - صدف فرعوني - الملكة حتشبسوت", category: "أثاث ملكي", price: 185000, status: "متوفر" },
  { name: "مبخر الملكة حتشبسوت", category: "مباخر", price: 25000, status: "متوفر" },
  { name: "كرسي محمد علي باشا", category: "أثاث ملكي", price: 175000, status: "متوفر" },
  { name: "علبة مناديل صدف ملون - زهرة اللوتس", category: "لولو صدف", price: 15000, status: "متوفر" },
];

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "أصالة التراث المصري",
      slogan: "عاشق ومعشوق — فن يدوي تم تصنيعه بحب من القلب",
      description: "أفخم منتجات الصدف الطبيعي المصري والأرابيسك اليدوي — توصيل من الكويت إلى دول الخليج وجميع أنحاء العالم",
      whatsapp: "96551118069",
      email: "asalat.al.torath.Kw.Eg@GMAIL.COM",
      instagram: "https://www.instagram.com/asalat.al.torath.kw.eg",
      facebook: "https://www.facebook.com/profile.php?id=61595434109686",
      heroTitle: "قطعة من مصر، وحكاية في بيتك.",
      heroSubtitle: "من بريق الصدف الطبيعي ودِفء الخشب، نصنع قطعًا تحمل روح التراث المصري. تفاصيل تُنسج باليد، لتبقى معك عمرًا.",
      aboutTitle: "ليست مجرد قطعة أثاث. إنها ذاكرة من الجمال.",
      aboutText: "في كل قطعة، صبر حرفي وحكاية توارثتها الأيدي. نختار الصدف الطبيعي وخشب الزان، ونطعّمهما بنقوش تستلهم الفن الإسلامي والفرعوني والأرابيسك المصري.",
      shippingTitle: "من الكويت، إلى حيث تكون",
      shippingText: "نؤكد معك تفاصيل الشحن وتكلفته وموعد الوصول على واتساب قبل تأكيد الطلب.",
      primaryColor: "#2E0C10",
      darkColor: "#1A0709",
      ivoryColor: "#F7F1EA",
      goldColor: "#D7B26A",
    },
  });

  for (const item of products) {
    const slug = item.name.replace(/\s+/g, "-");
    const categorySlug = item.category.replace(/\s+/g, "-");

    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: item.category },
      create: { name: item.category, slug: categorySlug },
    });

    await prisma.product.upsert({
      where: { slug },
      update: {
        name: item.name,
        price: item.price,
        categoryId: category.id,
        isAvailable: item.status === "متوفر",
        shortDescription: "منتج عربي فخم من الصدف الطبيعي",
        description: "منتج يدويا مصمم حسب تراث مصر",
        imageUrl: "",
      },
      create: {
        name: item.name,
        slug,
        price: item.price,
        categoryId: category.id,
        isAvailable: item.status === "متوفر",
        shortDescription: "منتج عربي فخم من الصدف الطبيعي",
        description: "منتج يدويا مصمم حسب تراث مصر",
        imageUrl: "",
      },
    });
  }

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@asala.com" },
    update: { password: passwordHash },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@asala.com",
      password: passwordHash,
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
