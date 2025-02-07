import prisma from "@/lib/prisma/prismaClient";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { SignJWT } from "jose";
import { generateVerificationToken } from "@/lib/third-party/email/generateVerificationToken";
import { sendMail } from "@/lib/third-party/email/sendMail";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  AccountNotActivatedError,
  PaymentError,
  SubscriptionError,
} from "@/lib/error-handler/customeErrors";
import {
  SignInData,
  SignInResult,
  User,
  Admin,
  Manager,

} from "@/app/api/auth/signin/types";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import {  PrismaClient, Plan } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);



export async function signIn(data: SignInData): Promise<SignInResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { existingUser } = await validateSignInData(data, prisma);
      await validatePassword(data.userPassword, existingUser);
      await checkUserActivation(existingUser, data.userRole);

      if (data.userRole === "admin") {
        return await handleAdminSignIn(existingUser as Admin);
      } else if (data.userRole === "manager") {
        return await handleManagerSignIn(existingUser as Manager);
      }

      throw new ValidationError("Le rôle sélectionné n'est pas valide");
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

async function validateSignInData(
  data: SignInData,
  prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
): Promise<{ existingUser: User }> {
  let existingUser: User | null = null;

  if (data.userRole === "admin") {
    existingUser = await prisma.admin.findUnique({
      where: { adminEmail: data.userEmail },
      include: {
        managedCompany: {
          include: {
            companySubscription: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        },
      },
    });
  } else if (data.userRole === "manager") {
    existingUser = await prisma.manager.findUnique({
      where: { managerEmail: data.userEmail },
      include: {
        employingCompany: {
          include: {
            companySubscription: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        },
      },
    });
  } else {
    throw new ValidationError("Le rôle donné n'est pas valide");
  }

  if (!existingUser) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  return { existingUser };
}

async function validatePassword(
  inputPassword: string,
  user: User
): Promise<void> {
  const storedPassword = 'adminPassword' in user ? user.adminPassword : user.managerPassword;
  const isPasswordValid = await bcrypt.compare(inputPassword, storedPassword);
  
  if (!isPasswordValid) {
    throw new UnauthorizedError("Mot de passe non valide");
  }
}

async function checkUserActivation(
  user: User,
  role: string
): Promise<void> {
  const isActivated = 'adminIsActivated' in user ? user.adminIsActivated : user.managerIsActivated;
  const userId = 'adminId' in user ? user.adminId : user.managerId;
  const userEmail = 'adminEmail' in user ? user.adminEmail : user.managerEmail;
  const firstName = 'adminFirstName' in user ? user.adminFirstName : user.managerFirstName;

  if (!isActivated) {
    const token = generateVerificationToken(userId);
    await createVerificationToken(token, userId, role);
    await sendVerificationEmail(userEmail, token, firstName);
    throw new AccountNotActivatedError(
      "Svp veuillez vérifier votre boite mail pour confimer l'action"
    );
  }
}

async function createVerificationToken(
  token: string,
  userId: string,
  role: string
): Promise<void> {
  // First delete any existing tokens for this user
  await prisma.emailVerificationToken.deleteMany({
    where: {
      ...(role === "admin"
        ? { emailVerificationTokenAdminId: userId }
        : { emailVerificationTokenManagerId: userId }),
    },
  });

  // Then create the new token
  await prisma.emailVerificationToken.create({
    data: {
      emailVerificationTokenToken: token,
      ...(role === "admin"
        ? { emailVerificationTokenAdminId: userId }
        : { emailVerificationTokenManagerId: userId }),
      emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
}

async function sendVerificationEmail(
  email: string,
  token: string,
  firstName: string
): Promise<void> {
  const verificationLink = `${process.env.BASE_URL}/${token}`;
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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <title>Email Verification</title>
    </head>
    <body style="font-family: Roboto;max-width: 600px; margin: auto; padding-top: 10px;">
        <div style="border: 2px solid rgb(212, 212, 212); border-radius: 15px; box-shadow: 2px 2px 8px rgba(170, 170, 170, 0.5);">
            <div style="text-align: center; padding-top: 16px">
                <a href="http://104.154.75.47/"><img src="https://i.postimg.cc/FFSgdbv6/hotyverse.png" alt="hotyverse-logo-image" style="size: 3rem;"></a>
                <h2 style="font-size: medium; font-weight: 500; letter-spacing: 5px;">Hoty Verse</h2>
                <h1 style="font-size: x-large; font-weight: 700; letter-spacing: 1.2px;">Activer Votre Compte</h1>
            </div>
            <div style="height: 1px; width: 100%; background-color: #E8E6F6;"></div>
            <div style="padding-top: 10px;padding-right: 10px;padding-left: 40px;padding-bottom: 16px;">
                <p style="font-size: medium;font-weight: 500;">Hey ${firstName},</p>
                <p style="font-size: medium; font-weight: 400;">Activer votre compte par cet email. Cliquez simplement sur le bouton ci-dessous et tout sera prêt. Si vous n'avez pas créé ce compte, veuillez ignorer cet e-mail.</p>
            </div>
            <div style="text-align: center; padding-bottom: 46px;">
                <a href="${verificationLink}" style="display: inline-block; width: 75%; height: 60px; border-radius: 8px; background-color: #3177FF; border: none; color: white; font-weight: 400; font-size: medium; text-align: center; line-height: 60px; text-decoration: none; transition: background-color 0.3s;">
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
    </html>`
  );
}

async function generateToken(
  userId: string,
  companyId: string,
  role: string,
  endDate: Date,
  planName: string
): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_COMPANY_SECRET);
  return await new SignJWT({
    id: userId,
    companyId,
    role,
    endDate,
    planName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

async function handleAdminSignIn(admin: Admin): Promise<SignInResult> {
  if (!admin.managedCompany?.companySubscription) {
    throw new ValidationError("Informations d'abonnement non trouvées");
  }

  const { subscriptionEndDate, subscriptionPlan } = admin.managedCompany.companySubscription;
  
  if (subscriptionEndDate < new Date()) {
    const session = await createStripeCheckoutSession(subscriptionPlan, admin.managedCompany.companyId);
    throw new SubscriptionError("L'abonnement a expiré");
  }

  const token = await generateToken(
    admin.adminId,
    admin.managedCompany.companyId,
    "admin",
    subscriptionEndDate,
    subscriptionPlan.planName
  );

  return { user: admin, token };
}

async function handleManagerSignIn(manager: Manager): Promise<SignInResult> {
  if (!manager.employingCompany?.companySubscription) {
    throw new ValidationError("Informations d'abonnement de l'entreprise non trouvées");
  }

  const { subscriptionEndDate, subscriptionPlan } = manager.employingCompany.companySubscription;

  if (subscriptionEndDate < new Date()) {
    throw new SubscriptionError(
      "Votre limite d'abonnement est déja atteinte, votre administrateur doit renouveler l'abonnement pour que vous devez continuer"
    );
  }

  const token = await generateToken(
    manager.managerId,
    manager.employingCompany.companyId,
    "manager",
    subscriptionEndDate,
    subscriptionPlan.planName
  );

  return { user: manager, token };
}

async function createStripeCheckoutSession(
  plan: Plan,
  companyId: string
): Promise<string> {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${plan.planName} Plan` },
            unit_amount: 2000, // You might want to store this in the Plan model
          },
          quantity: 1,
        },
      ],
      metadata: { companyId },
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return session.url as string;
  } catch (error) {
    throw new PaymentError("Échec de la création de la session de paiement");
  }
}