import { ColumnType, Prisma } from "@prisma/client";

export type UpdateColumnData = {
    columnName?: string;
    columnType?: ColumnType;
  };
  
  export type ColumnResult = {
    Column: Prisma.ColumnGetPayload<{select:{
      columnName:true,
      columnType:true,
      columnId:true
    }}> | null;
  };