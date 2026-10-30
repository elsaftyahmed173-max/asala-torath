import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveSettings, saveProduct, deleteProduct } from "@/app/admin/actions";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const settings =
    (await prisma.siteSettings.findFirst()) ?? {
      siteName: "أصالة التراث المصري",
      slogan: "عاشق ومعشوق — فن يدوي تم تصنيعه بحب من القلب",
      description:
        "أفخم منتجات الصدف الطبيعي المصري والأرابيسك اليدوي — توصيل من الكويت إلى دول الخليج وجميع أنحاء العالم",
      whatsapp: "96551118069",
      email: "asalat.al.torath.Kw.Eg@GMAIL.COM",
      instagram: "https://www.instagram.com/asalat.al.torath.kw.eg",
      facebook: "https://www.facebook.com/profile.php?id=61595434109686",
      heroTitle: "قطعة من مصر، وحكاية في بيتك.",
      heroSubtitle:
        "من بريق الصدف الطبيعي ودِفء الخشب، نصنع قطعًا تحمل روح التراث المصري. تفاصيل تُنسج باليد، لتبقى معك عمرًا.",
      aboutTitle: "ليست مجرد قطعة أثاث. إنها ذاكرة من الجمال.",
      aboutText:
        "في كل قطعة، صبر حرفي وحكاية توارثتها الأيدي. نختار الصدف الطبيعي وخشب الزان، ونطعّمهما بنقوش تستلهم الفن الإسلامي والفرعوني والأرابيسك المصري.",
      shippingTitle: "من الكويت، إلى حيث تكون",
      shippingText:
        "نؤكد معك تفاصيل الشحن وتكلفته وموعد الوصول على واتساب قبل تأكيد الطلب.",
      primaryColor: "#2E0C10",
      darkColor: "#1A0709",
      ivoryColor: "#F7F1EA",
      goldColor: "#D7B26A",
    };

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <main style={{ background: "#f7f1ea", minHeight: "100vh", padding: 30 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ color: "#2E0C10", margin: 0 }}>لوحة تحكم المتجر</h1>
          <form action="/api/auth/logout" method="post">
            <button type="submit" style={{ background: "#2E0C10", color: "#fff", border: "none", borderRadius: 999, padding: "12px 20px", fontWeight: 700, cursor: "pointer" }}>
              تسجيل الخروج
            </button>
          </form>
        </div>

        <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>إعدادات المتجر</h2>
          <form action={saveSettings} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
              <input name="siteName" defaultValue={settings.siteName} placeholder="اسم المتجر" style={inputStyle} />
              <input name="slogan" defaultValue={settings.slogan} placeholder="الشعار" style={inputStyle} />
              <input name="whatsapp" defaultValue={settings.whatsapp} placeholder="واتساب" style={inputStyle} />
              <input name="email" defaultValue={settings.email} placeholder="بريد" style={inputStyle} />
              <input name="instagram" defaultValue={settings.instagram} placeholder="إنستغرام" style={inputStyle} />
              <input name="facebook" defaultValue={settings.facebook} placeholder="فيسبوك" style={inputStyle} />
              <input name="heroTitle" defaultValue={settings.heroTitle} placeholder="عنوان الغلاف" style={inputStyle} />
              <input name="shippingTitle" defaultValue={settings.shippingTitle} placeholder="عنوان التوصيل" style={inputStyle} />
              <input name="primaryColor" defaultValue={settings.primaryColor} placeholder="العنابي الأساسي" style={inputStyle} />
              <input name="darkColor" defaultValue={settings.darkColor} placeholder="العنابي الغامق" style={inputStyle} />
              <input name="ivoryColor" defaultValue={settings.ivoryColor} placeholder="العاجي" style={inputStyle} />
              <input name="goldColor" defaultValue={settings.goldColor} placeholder="الذهبي" style={inputStyle} />
            </div>

            <textarea name="description" defaultValue={settings.description} placeholder="وصف المتجر" style={{ ...inputStyle, minHeight: 100 }} />
            <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} placeholder="وصف الغلاف" style={{ ...inputStyle, minHeight: 120 }} />
            <textarea name="aboutText" defaultValue={settings.aboutText} placeholder="نص حكاية الصنعة" style={{ ...inputStyle, minHeight: 120 }} />
            <textarea name="shippingText" defaultValue={settings.shippingText} placeholder="نص التوصيل" style={{ ...inputStyle, minHeight: 120 }} />

            <button type="submit" style={{ background: "#2E0C10", color: "#fff", border: "none", borderRadius: 999, padding: "12px 22px", fontWeight: 700, cursor: "pointer", width: 180 }}>
              حفظ التعديلات
            </button>
          </form>
        </section>

        <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>إضافة / تعديل منتج</h2>
          <form action={saveProduct} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
              <input name="name" placeholder="اسم المنتج" style={inputStyle} />
              <input name="slug" placeholder="slug" style={inputStyle} />
              <input name="price" type="number" placeholder="السعر" style={inputStyle} />
              <input name="category" placeholder="اسم القسم" style={inputStyle} />
              <input name="imageUrl" placeholder="رابط صورة المنتج" style={inputStyle} />
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <label><input type="checkbox" name="isAvailable" value="true" defaultChecked /> متوفر</label>
                <label><input type="checkbox" name="isFeatured" value="true" /> منتج مميز</label>
              </div>
            </div>
            <textarea name="shortDescription" placeholder="وصف مختصر" style={{ ...inputStyle, minHeight: 80 }} />
            <textarea name="description" placeholder="وصف كامل" style={{ ...inputStyle, minHeight: 120 }} />

            <button type="submit" style={{ background: "#D7B26A", color: "#1A0709", border: "none", borderRadius: 999, padding: "12px 22px", fontWeight: 800, cursor: "pointer", width: 180 }}>
              حفظ المنتج
            </button>
          </form>
        </section>

        <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>المنتجات</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {products.map((product) => (
              <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
                <div>
                  <strong>{product.name}</strong>
                  <div style={{ color: "#666", marginTop: 6 }}>{product.category.name} • {product.price.toLocaleString()} د.ك</div>
                </div>

                <form action={deleteProduct.bind(null, product.id)}>
                  <button type="submit" style={{ background: "#9c2d2d", color: "#fff", border: "none", borderRadius: 999, padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
                    حذف
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>الطلبات</h2>
          {orders.length === 0 ? (
            <div style={{ color: "#666" }}>لا توجد طلبات حتى الآن.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {orders.map((order) => (
                <div key={order.id} style={{ display: "flex", justifyContent: "space-between", padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
                  <div>
                    <strong>{order.customerName}</strong>
                    <div style={{ color: "#666" }}>{order.productName} • {order.phone}</div>
                  </div>
                  <div>
                    <div>{order.status}</div>
                    <div style={{ color: "#666" }}>{order.total.toLocaleString()} د.ك</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid #eee",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  background: "#fff",
  outline: "none",
} as const;
