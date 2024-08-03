// Ensure your tsconfig.json includes the types directory:
//  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "types/**/*.d.ts"],

// types/next.d.ts
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    userId?: string;
  }
}
