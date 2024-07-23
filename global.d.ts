import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;

  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DATABASE_URL: string;
    }
  }
}