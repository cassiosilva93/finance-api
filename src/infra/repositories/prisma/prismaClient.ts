import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
  errorFormat: 'colorless',
});

export default prismaClient;
