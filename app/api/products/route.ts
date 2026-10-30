import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const category = await prisma.category.upsert({
    where: { slug: String(data.categorySlug || "furniture").toLowerCase().replace(/\s+/g, "-") },
    update: { name: data.categoryName || "أثاث ملكي" },
    create: {
      name: data.categoryName || "أثاث ملكي",
      slug: String(data.categorySlug || "furniture").toLowerCase().replace(/\s+/g, "-"),
    },
  });

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      price: Number(data.price || 0),
      description: data.description || "وصف المنتج",
      shortDescription: data.shortDescription || "وصف مختصر",
      imageUrl: data.imageUrl || "",
      categoryId: category.id,
      isAvailable: data.isAvailable ?? true,
      isFeatured: data.isFeatured ?? false,
    },
  });

  return NextResponse.json(product);
}
