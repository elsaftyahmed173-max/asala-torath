"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function saveSettings(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const settings = {
    siteName: String(formData.get("siteName") ?? "أصالة التراث المصري"),
    slogan: String(formData.get("slogan") ?? "عاشق ومعشوق — فن يدوي تم تصنيعه بحب من القلب"),
    description: String(formData.get("description") ?? "أفخم منتجات الصدف الطبيعي المصري والأرابيسك اليدوي — توصيل من الكويت إلى دول الخليج وجميع أنحاء العالم"),
    whatsapp: String(formData.get("whatsapp") ?? "96551118069"),
    email: String(formData.get("email") ?? "asalat.al.torath.Kw.Eg@GMAIL.COM"),
    instagram: String(formData.get("instagram") ?? "https://www.instagram.com/asalat.al.torath.kw.eg"),
    facebook: String(formData.get("facebook") ?? "https://www.facebook.com/profile.php?id=61595434109686"),
    heroTitle: String(formData.get("heroTitle") ?? "قطعة من مصر، وحكاية في بيتك."),
    heroSubtitle: String(formData.get("heroSubtitle") ?? "من بريق الصدف الطبيعي ودِفء الخشب، نصنع قطعًا تحمل روح التراث المصري. تفاصيل تُنسج باليد، لتبقى معك عمرًا."),
    aboutTitle: String(formData.get("aboutTitle") ?? "ليست مجرد قطعة أثاث. إنها ذاكرة من الجمال."),
    aboutText: String(formData.get("aboutText") ?? "في كل قطعة، صبر حرفي وحكاية توارثتها الأيدي. نختار الصدف الطبيعي وخشب الزان، ونطعّمهما بنقوش تستلهم الفن الإسلامي والفرعوني والأرابيسك المصري."),
    shippingTitle: String(formData.get("shippingTitle") ?? "من الكويت، إلى حيث تكون"),
    shippingText: String(formData.get("shippingText") ?? "نؤكد معك تفاصيل الشحن وتكلفته وموعد الوصول على واتساب قبل تأكيد الطلب."),
    primaryColor: String(formData.get("primaryColor") ?? "#2E0C10"),
    darkColor: String(formData.get("darkColor") ?? "#1A0709"),
    ivoryColor: String(formData.get("ivoryColor") ?? "#F7F1EA"),
    goldColor: String(formData.get("goldColor") ?? "#D7B26A"),
  };

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: settings,
    create: { id: 1, ...settings },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveProduct(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const categoryName = String(formData.get("category") ?? "أثاث ملكي").trim();
  const categorySlug = categoryName.replace(/\s+/g, "-");

  const category = await prisma.category.upsert({
    where: { slug: categorySlug },
    update: { name: categoryName },
    create: { name: categoryName, slug: categorySlug },
  });

  const payload = {
    name: String(formData.get("name") ?? "منتج جديد"),
    slug: String(formData.get("slug") ?? "منتج-جديد"),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? "وصف المنتج"),
    shortDescription: String(formData.get("shortDescription") ?? "وصف مختصر"),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    isAvailable: formData.get("isAvailable") === "true",
    isFeatured: formData.get("isFeatured") === "true",
    categoryId: category.id,
  };

  await prisma.product.create({ data: payload });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProduct(productId: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.product.delete({ where: { id: productId } });

  revalidatePath("/");
  revalidatePath("/admin");
}
