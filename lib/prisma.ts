// @ts-nocheck
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const logSettings = [
  {
    emit: "event",
    level: "query",
  },
  {
    emit: "event",
    level: "info",
  },
  {
    emit: "event",
    level: "warn",
  },
  {
    emit: "event",
    level: "error",
  },
];

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

prisma.$on("query", (e) => {
  console.log(`Query: ${e.query}`);
  console.log(`Params: ${e.params}`);
  console.log(`Duration: ${e.duration}ms`);
});

prisma.$on("info", (e) => {
  console.log(e.message);
});

prisma.$on("warn", (e) => {
  console.log(e.message);
});

prisma.$on("error", (e) => {
  console.log(e.message);
});

export default prisma;
