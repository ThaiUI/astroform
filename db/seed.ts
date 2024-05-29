import { db, Users } from 'astro:db';

export default async function () {
  await db.insert(Users).values([
    { name: 'Ann', phone: '0810100010', gender: 'female' },
    { name: 'Bee', phone: '0810100011', gender: 'male' },
  ]);
}
