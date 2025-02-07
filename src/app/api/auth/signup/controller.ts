import prisma from "@/lib/prisma/prismaClient";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "@/lib/third-party/email/generateVerificationToken";
import {
  AdminSignupData,
  AdminSignupResult,
} from "@/app/api/auth/signup/types";
import {
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "@/lib/third-party/email/sendMail";

export async function createAdmin(
  data: AdminSignupData
): Promise<AdminSignupResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { existingAdmin, existingPlan } = await validateAdminData(
        data,
        prisma
      );
      if (existingAdmin) {
        throw new ConflictError("An administrator with this email already exists");
      }
      if (!existingPlan) {
        throw new NotFoundError("The plan is not valid");
      }

      const hashedPassword = await hashPassword(data.adminPassword);
      const subscriptionData = getSubscriptionData(existingPlan.planName);

      const createdAdmin = await createAdminWithCompany(
        data,
        hashedPassword,
        subscriptionData,
        prisma
      );
      const token = await createVerificationToken(createdAdmin.adminId, prisma);

      return { admin: createdAdmin, token };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

async function validateAdminData(
  data: AdminSignupData,
  prisma: Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) {
  const [existingAdmin, existingPlan] = await Promise.all([
    prisma.admin.findUnique({ where: { adminEmail: data.adminEmail } }),
    prisma.plan.findFirst({
      where: { planName: data.planName },
      select: { planName: true },
    }),
  ]);
  return { existingAdmin, existingPlan };
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function getSubscriptionData(planName: string): { endDate?: Date } {
  switch (planName) {
    case "Free":
      return {
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 50), // 50 years
      };
    case "Premium":
      return {};
    case "Standard":
      return {
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      };
    default:
      throw new ValidationError(`le type de plan est non valide : ${planName}`);
  }
}



export async function createAdminWithCompany(
    data: AdminSignupData,
    hashedPassword: string,
    subscriptionData: { endDate?: Date },
    prisma: Omit<
      PrismaClient,
      "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
    >
  ) {
    if (!subscriptionData.endDate) {
      throw new ValidationError("endDate is required in subscription");
    }
  
    // First, get the Plan ID based on the plan name
    const plan = await prisma.plan.findFirst({
      where: {
        planName: data.planName
      }
    });
  
    if (!plan) {
      throw new ValidationError(`Plan with name ${data.planName} not found`);
    }
  
    return await prisma.admin.create({
      data: {
        adminFirstName: data.adminFirstName,
        adminLastName: data.adminLastName,
        adminEmail: data.adminEmail,
        adminPassword: hashedPassword,
        
        managedCompany: {
          create: {
            companyName: data.companyName,
            companyLocation: data.companyLocation,
            companyPhoneNumber: data.companyPhoneNumber,
            companyEmail: data.companyEmail,
            companyEmployeeNumber: data.companyEmployeeNumber,
            companySubscription: {
              create: {
                subscriptionEndDate: subscriptionData.endDate,
                subscriptionPlan: {
                  connect: {
                    planId: plan.planId
                  }
                }
              }
            }
          }
        }
      },
      include: {
        managedCompany: {
          include: {
            companySubscription: true,

          }
        },
        emailVerificationToken: true
      }
    }) as AdminSignupResult['admin'];
  }

async function createVerificationToken(
  adminId: string,
  prisma: Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
): Promise<string> {
  const token = generateVerificationToken(adminId);
  await prisma.emailVerificationToken.create({
    data: {
      emailVerificationTokenToken: token,
      emailVerificationTokenAdminId: adminId,
      emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });
  return token;
}
/////////////////// send mail /////////////////
export async function sendVerificationEmail(
  email: string,
  token: string,
  firstName: string
): Promise<void> {
  const verificationLink = `${process.env.BASE_URL}/${token}`;
  try {
    await sendMail(
      email,
      "Verify Your Email",
      `Please verify your email by clicking on this link: ${verificationLink}`,
      `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
              rel="stylesheet">
          <title>Email Verification</title>
      </head>
      
      <body style="font-family: Roboto;max-width: 600px; margin: auto; padding-top: 10px;">
          <div
              style="border: 2px solid rgb(212, 212, 212); border-radius: 15px; box-shadow: 2px 2px 8px rgba(170, 170, 170, 0.5);">
              <div style="text-align: center; padding-top: 16px">
                  <a href="http://104.154.75.47/"><img src="https://i.postimg.cc/FFSgdbv6/hotyverse.png" alt="hotyverse-logo-image" style="size: 3rem;"></a>
                  <h2 style="font-size: medium; font-weight: 500; letter-spacing: 5px;">Hoty Verse</h2>
                  <h1 style="font-size: x-large; font-weight: 700; letter-spacing: 1.2px;">Activer Votre Compte</h1>
              </div>
              <div style="height: 1px; width: 100%; background-color: #E8E6F6;"></div>
              <div style="padding-top: 10px;padding-right: 10px;padding-left: 40px;padding-bottom: 16px;">
                  <p style="font-size: medium;font-weight: 500;">Hey ${firstName},</p>
                  <p style="font-size: medium; font-weight: 400;">Activer votre compte par cet email. Cliquez simplement sur
                      le bouton ci-dessous et tout sera prêt. Si
                      vous
                      n'avez pas créé ce compte, veuillez ignorer cet e-mail.</p>
      
              </div>
              <div style="text-align: center; padding-bottom: 46px;">
                  <a href="${verificationLink}"
                      style="display: inline-block; width: 75%; height: 60px; border-radius: 8px; background-color: #3177FF; border: none; color: white; font-weight: 400; font-size: medium; text-align: center; line-height: 60px; text-decoration: none; transition: background-color 0.3s;">
                      Activer le Compte
                  </a>
              </div>
          </div>
          <div style="text-align: center;">
              <p style="width: 50%;margin: auto;font-size: medium;font-weight: 300;">
                  problèmes ou questions? contactez-nous à <span style="color: #001E3C;">hotyverse@gmail.com</span>
              </p>
              <div>
                  <a href="http://104.154.75.47/"><img src="https://i.postimg.cc/FFSgdbv6/hotyverse.png" alt="hotyverse-logo-image" style="size: 3rem;"></a>
                  <p style="font-size: small; font-weight: 300; color: #001E3C;">2024 cloudy verse</p>
                  <p style="font-size: small; font-weight: 300; color: #001E3C;">Tous les droits sont réservés</p>
              </div>
          </div>
      </body>
      
      </html>
      `
    );
  } catch (error) {

    throw new InternalServerError("Echec à l'envoie de l'email , réessayer plus tard");
  }
}