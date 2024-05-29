import { db, eq, Users, isDbError } from 'astro:db';

export const register = async (formData: FormData): Promise<string> => {
  const name = String(formData.get('name')).trim();
  const phone = String(formData.get('phone')).trim().replace(/\D/g, '');
  const gender = String(formData.get('gender')).trim();

  if (name !== '' && phone.length === 10 && gender !== '') {
    try {
      await db.insert(Users).values({ name, phone, gender });
      return 'success';
    } catch (e: unknown) {
      if (isDbError(e)) {
        const oldUser = await db.select().from(Users).where(eq(Users.phone, phone));
        if (oldUser.length > 0) {
          const registered = new Date(oldUser[0].registered);
          return (
            'หมายเลข ' +
            phone +
            ' ลงทะเบียนแล้วเมื่อวันที่ ' +
            registered.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
          );
        } else {
          return 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + (e as Error).message;
        }
      } else {
        return 'เกิดข้อผิดพลาด: ' + (e as Error).message;
      }
    }
  }
  return 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง';
};
