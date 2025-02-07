import { Prisma } from "@prisma/client";

export type EmailVerificationResult =
  | {
      status: "success";
      user: Prisma.AdminGetPayload<{}> | Prisma.ManagerGetPayload<{}>;
    }
  | { status: "invalid" }
  | { status: "expired" };