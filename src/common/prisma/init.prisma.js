import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    nguoi_dung: {
      mat_khau: true,
    },
  },
});

export default prisma;
