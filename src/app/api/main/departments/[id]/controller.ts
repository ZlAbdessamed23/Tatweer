import prisma from "@/lib/prisma/prismaClient";
import {
  AddDepartmentData,
  DepartmentResult,
} from "./types";
import {
  NotFoundError,
  UnauthorizedError,
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { Prisma } from "@prisma/client";

export async function updateDepartment(
  departmentId: string,
  data: AddDepartmentData
): Promise<DepartmentResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const updateData: Prisma.DepartmentUpdateInput = {};

      if (data.departmentName !== undefined) {
        updateData.departmentName = data.departmentName;
      }
      if (data.departmentType !== undefined) {
        updateData.departmentType = data.departmentType;
      }

      if (Array.isArray(data.managerAccess)) {
        const newManagerIds = data.managerAccess
          .filter(ma => ma.managerId !== "") // Filter out empty manager IDs
          .map(ma => ma.managerId);

        updateData.departmentManagers = {
          deleteMany: {}, // Clear existing relationships
          create: newManagerIds.map((managerId) => ({
            managerId: managerId,
          })),
        };
      }

      if (Object.keys(updateData).length > 0) {
        const updatedDepartment = await prisma.department.update({
          where: { departmentId },
          data: updateData,
          select: {
            departmentId: true,
            departmentName: true,
            departmentType: true,
          },
        });

        return { Department: updatedDepartment };
      }

      const existingDepartment = await prisma.department.findUnique({
        where: { departmentId },
        select: {
          departmentId: true,
          departmentName: true,
          departmentType: true,
        },
      });

      return { Department: existingDepartment };
    });
  } catch (error) {
    throw throwAppropriateError(error);
  }
}

export async function getDepartmentById(
  departmentId: string,
  companyId: string,
  managerId: string
): Promise<DepartmentResult> {
  try {
    const existingDepartment = await prisma.department.findUnique({
      where: { departmentId },
      include: {
        parentCompany: true,
        departmentManagers: {
          include: {
            departmentManager: true,
          },
        },
      },
    });

    if (!existingDepartment || existingDepartment.departmentCompanyId !== companyId) {
      throw new NotFoundError(`Département non trouvé`);
    }

    // Check if the requesting manager has access to this department
    const hasAccess = existingDepartment.departmentManagers.some(
      (access) => access.managerId === managerId
    );

    if (!hasAccess) {
      throw new UnauthorizedError(
        "Vous n'êtes pas autorisé à consulter ce département"
      );
    }

    return {
      Department: {
        departmentId: existingDepartment.departmentId,
        departmentName: existingDepartment.departmentName,
        departmentType: existingDepartment.departmentType,
      }
    };
  } catch (error) {
    throw throwAppropriateError(error);
  }
}

export async function deleteDepartment(
  departmentId: string,
 
): Promise<DepartmentResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      

      const deletedDepartment = await prisma.department.delete({
        where: { departmentId },
        select: {
          departmentId: true,
          departmentName: true,
          departmentType: true,
        },
      });

      return { Department: deletedDepartment };
    });
  } catch (error) {
    throw throwAppropriateError(error);
  }
}