import { PrismaClient } from '@prisma/client';

declare global {
  // Evita que TypeScript arroje errores en modo desarrollo
  // porque `global` puede ser reutilizado.
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Opcional: registra las consultas en desarrollo
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
