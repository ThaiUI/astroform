import { defineDb, defineTable, column, NOW } from 'astro:db';

const Users = defineTable({
  columns: {
    name: column.text(),
    phone: column.text({ unique: true }),
    gender: column.text(),
    registered: column.date({ default: NOW }),
  },
  indexes: [{ on: ['registered'] }],
});

export default defineDb({
  tables: { Users },
});
