import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { ColumnResult, UpdateColumnData } from "./types";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma/prismaClient";

export async function updateColumn(
    columnId: string,
    data: UpdateColumnData
  ): Promise<ColumnResult> {
    try {
      return await prisma.$transaction(async (prisma) => {
        const updateData: Prisma.ColumnUpdateInput = {};
        
        // Basic fields update
        if (data.columnName !== undefined) updateData.columnName = data.columnName;
        if (data.columnType !== undefined) updateData.columnType = data.columnType;
        
        // Update column if there are changes
        if (Object.keys(updateData).length > 0) {
          const updatedColumn = await prisma.column.update({
            where: { columnId },
            data: updateData,
          });
          
          return { Column: updatedColumn };
        }
        
        // If no changes, return existing column
        const existingColumn = await prisma.column.findUnique({
          where: { columnId },
        });
        
        return { Column: existingColumn };
      });
    } catch (error) {
      throwAppropriateError(error);
    }
  }
  
  export async function deleteColumn(
    columnId: string
  ): Promise<ColumnResult> {
    try {
      const deletedColumn = await prisma.column.delete({
        where: { columnId },
      });
      
      return { Column: deletedColumn };
    } catch (error) {
      throwAppropriateError(error);
    }
  }