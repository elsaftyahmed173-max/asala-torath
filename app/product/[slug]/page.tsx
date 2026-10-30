import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        <div>
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80"}
            alt={product.name}
            style={{ width: "100%", borderRadius: 24, objectFit: "cover", height: 500 }}
          />
        </div>

        <div>
          <div style={{ color: "#D7B26A", fontWeight: 700 }}>{product.category.name}</div>
          <h1 style={{ color: "#2E0C10", fontSize: "2.8rem", margin: "12px 0 18px" }}>{product.name}</h1>
          <div style={{ fontSize: "2rem", color: "#2E0C10", fontWeight: 800 }}>{product.price.toLocaleString()} د.ك</div>

          <p style={{ color: "#555", lineHeight: 1.9, marginTop: 18 }}>{product.description}</p>

          <div style={{ marginTop: 24 }}>
            <a href={`https://wa.me/96551118069?text=${encodeURIComponent("السلام عليكم، أود طلب هذا المنتج: " + product.name + " بسعر " + product.price + " د.ك")}`} target="_blank" style={{ background: "#D7B26A", color: "#1A0709", padding: "14px 22px", borderRadius: 999, fontWeight: 800 }}>
              اطلب عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
