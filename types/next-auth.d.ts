import "next-auth";
import { UserPlan } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    plan: UserPlan;
    cvCount: number;
    maxCvs: number;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan: UserPlan;
      cvCount: number;
      maxCvs: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan: UserPlan;
    cvCount: number;
    maxCvs: number;
  }
}
