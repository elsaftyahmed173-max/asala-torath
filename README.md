# أصالة التراث المصري

متجر فخم للقطع اليدوية والصدف الطبيعي والآرابيسك المصري.

## التشغيل

```bash
npm install
npx prisma db push
npm run prisma:seed
npm run dev
```

## لوحة الإدارة

- رابط: http://localhost:3000/admin/login
- البريد: admin@asala.com
- كلمة المرور: admin123

## المتغيرات

```env
DATABASE_URL="..."
NEXTAUTH_SECRET="..."
ADMIN_EMAIL="admin@asala.com"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```
