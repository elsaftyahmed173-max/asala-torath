import { prisma } from "@/lib/prisma";

export default async function HomePage() {
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
    };

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ background: "#f7f1ea" }}>
      <div style={{ background: "#2E0C10", color: "#fff", padding: "12px 20px", textAlign: "center", fontSize: 14 }}>
        من قلب مصر… إلى بيتك • صدف طبيعي 100% • حرفية يدوية • توصيل إلى دول الخليج وجميع أنحاء العالم
      </div>

      <header style={{ background: "#f7f1ea", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 800, fontSize: "1.5rem", color: "#2E0C10" }}>{settings.siteName}</div>
          <nav style={{ display: "flex", gap: 20, fontWeight: 600, color: "#2E0C10" }}>
            <a href="#home">الرئيسية</a>
            <a href="#about">حكاية الصنعة</a>
            <a href="#products">المنتجات</a>
            <a href="#shipping">التوصيل</a>
            <a href="#contact">تواصل</a>
          </nav>
          <a href="/admin/login" style={{ background: "#D7B26A", color: "#1A0709", padding: "12px 18px", borderRadius: 999, fontWeight: 800 }}>
            لوحة الإدارة
          </a>
        </div>
      </header>

      <section id="home" style={{ minHeight: 620, background: "linear-gradient(90deg, rgba(46,12,16,0.9), rgba(46,12,16,0.55)), url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "80px 20px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40 }}>
          <div style={{ color: "#fff" }}>
            <div style={{ color: "#D7B26A", marginBottom: 18, fontWeight: 700 }}>{settings.slogan}</div>
            <h1 style={{ margin: 0, fontSize: "4rem", lineHeight: 1.02 }}>{settings.heroTitle}</h1>
            <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.9, maxWidth: 620, marginTop: 20 }}>{settings.heroSubtitle}</p>

            <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#products" style={{ background: "#D7B26A", color: "#1A0709", borderRadius: 999, padding: "14px 28px", fontWeight: 800 }}>تسوق الآن</a>
              <a href="#contact" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 999, padding: "14px 28px", fontWeight: 800 }}>تواصل معنا</a>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 26, padding: 25, backdropFilter: "blur(8px)" }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <span>قطع فاخرة</span>
                <strong style={{ color: "#D7B26A", fontSize: "1.8rem" }}>500+</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <span>عملاء راضون</span>
                <strong style={{ color: "#D7B26A", fontSize: "1.8rem" }}>50+</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <span>دول شحن</span>
                <strong style={{ color: "#D7B26A", fontSize: "1.8rem" }}>28+</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>تقييم</span>
                <strong style={{ color: "#D7B26A", fontSize: "1.8rem" }}>4.9</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" style={{ maxWidth: 1200, margin: "0 auto", padding: "75px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ color: "#D7B26A", fontWeight: 700 }}>منتجاتنا</div>
          <h2 style={{ fontSize: "2.8rem", color: "#2E0C10", margin: "12px 0 0" }}>من إبداع أيدينا، إلى دفء بيوتكم</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
          {products.map((product) => (
            <article key={product.id} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 18px 35px rgba(46,12,16,0.08)" }}>
              <img
                src={product.imageUrl || "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80"}
                alt={product.name}
                style={{ width: "100%", height: 260, objectFit: "cover" }}
              />
              <div style={{ padding: 20 }}>
                <div style={{ color: "#D7B26A", fontSize: 12, fontWeight: 700 }}>{product.category.name}</div>
                <h3 style={{ color: "#2E0C10", margin: "10px 0 8px", fontSize: "1.4rem" }}>{product.name}</h3>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.8, minHeight: 70 }}>{product.shortDescription}</p>

                <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "1.4rem", color: "#2E0C10" }}>{product.price.toLocaleString()} د.ك</strong>
                  <span style={{ background: product.isAvailable ? "#eaf7ef" : "#f9e8e8", color: product.isAvailable ? "#0b7a42" : "#9c2d2d", borderRadius: 999, padding: "6px 10px", fontWeight: 700 }}>
                    {product.isAvailable ? "متوفر" : "غير متوفر"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" style={{ background: "#fff", padding: "75px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80" alt="حكاية الصنعة" style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: 30 }} />
          </div>
          <div>
            <div style={{ color: "#D7B26A", fontWeight: 700 }}>حكاية الصنعة</div>
            <h2 style={{ margin: "10px 0 18px", fontSize: "3rem", color: "#2E0C10" }}>{settings.aboutTitle}</h2>
            <p style={{ color: "#4d4d4d", lineHeight: 1.9, fontSize: "1.05rem" }}>{settings.aboutText}</p>
          </div>
        </div>
      </section>

      <section id="shipping" style={{ maxWidth: 1200, margin: "0 auto", padding: "75px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ color: "#D7B26A", fontWeight: 700 }}>التوصيل</div>
          <h2 style={{ margin: "12px 0 0", color: "#2E0C10", fontSize: "2.8rem" }}>{settings.shippingTitle}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }}>
          {[
            ["truck", "داخل الكويت", "توصيل لجميع المناطق"],
            ["globe", "دول الخليج", "شحن إلى جميع دول الخليج"],
            ["plane", "إلى العالم", "شحن دولي بتغليف يحمي قطعتك"],
            ["store", "استلام مباشر", "بالتنسيق المسبق معنا"],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: "#fff", padding: 24, borderRadius: 24, boxShadow: "0 18px 30px rgba(46,12,16,0.06)" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{icon}</div>
              <h3 style={{ color: "#2E0C10", marginBottom: 8 }}>{title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ background: "#2E0C10", color: "#fff", padding: "75px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ color: "#D7B26A", fontWeight: 700 }}>تواصل معنا</div>
            <h2 style={{ margin: "12px 0 16px", fontSize: "2.8rem" }}>تبدأ القصة بعبارة واحدة</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.9 }}>{settings.description}</p>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <div>واتساب: {settings.whatsapp}</div>
            <div>بريد: {settings.email}</div>
            <div>إنستغرام: {settings.instagram}</div>
            <div>فيسبوك: {settings.facebook}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
