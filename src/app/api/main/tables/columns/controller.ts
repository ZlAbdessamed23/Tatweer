import prisma from "@/lib/prisma/prismaClient";
import { ColumnResult,  AddColumnData } from "./types";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { NotFoundError } from "@/lib/error-handler/customeErrors";

export async function AddColumn(
  data: AddColumnData
): Promise<ColumnResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Check if table exists
      const tableExists = await prisma.table.findUnique({
        where: { tableId: data.columnTableId },
        
      });

      if (!tableExists) {
        throw new NotFoundError(`Table with ID ${data.columnTableId} not found`);
      }

      const column = await prisma.column.create({
        data: {
          columnName: data.columnName,
          columnType: data.columnType,
          columnTable: {
            connect: { tableId: data.columnTableId }
          }
        },
        select:{
            columnId: true,
            columnName: true,
            columnType: true,
            columnTable: {
              select: {
                tableId: true
              }}
            }
      });

      return { Column: column };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

