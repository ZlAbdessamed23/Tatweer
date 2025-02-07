import { Prisma } from "@prisma/client";

export type AdminSignupData = {
  adminFirstName: string;
  adminLastName: string;
  adminPassword: string;
  adminEmail: string;
  adminPhoneNumber: string;
  companyName: string;
  companyLocation: string;
  companyPhoneNumber: string;
  companyEmail: string;
  companyEmployeeNumber: number;
  planName: string;
};

export const requiredFields: (keyof AdminSignupData)[] = [
  "adminFirstName",
  "adminLastName",
  "adminPassword",
  "adminEmail",
  "adminPhoneNumber",
  "companyName",
  "companyLocation",
  "companyPhoneNumber",
  "companyEmail",
  "companyEmployeeNumber",
  "planName",
];


export type AdminSignupResult = {
  admin: Prisma.AdminGetPayload<{
    include: {
      managedCompany: {
        include: {
          companySubscription: true;
        };
      };
      emailVerificationToken: true;
    };
  }>;
  token: string; // Added the missing token property
};
