import { Prisma,ColumnType } from "@prisma/client";

export type AddColumnData = {
  columnName: string;
  columnType: ColumnType;
  columnTableId: string;
};

export const requiredColumnFields: (keyof AddColumnData)[] = [
    "columnName",
    "columnType",
  "columnTableId",
];

export type ColumnResult = {
    Column: Prisma.ColumnGetPayload<{select:{
    columnId: true,
    columnName: true,
    columnType: true,
    columnTable: {
      select: {
        tableId: true
      }}
    }}> | null;
  };
  
