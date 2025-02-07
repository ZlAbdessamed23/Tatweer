-- DropForeignKey
ALTER TABLE "DepartmentManager" DROP CONSTRAINT "DepartmentManager_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentManager" DROP CONSTRAINT "DepartmentManager_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_tableDepartmentId_fkey";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "adminIsActivated" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "managerIsActivated" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "DepartmentManager" ADD CONSTRAINT "DepartmentManager_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentManager" ADD CONSTRAINT "DepartmentManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("managerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_tableDepartmentId_fkey" FOREIGN KEY ("tableDepartmentId") REFERENCES "Department"("departmentId") ON DELETE CASCADE ON UPDATE CASCADE;
