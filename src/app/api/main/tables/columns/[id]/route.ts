import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { updateColumn,  deleteColumn } from "@/app/api/main/tables/columns/[id]/controller";
import { handleError } from "@/lib/error-handler/handleError";


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    

    const ColumnId = params.id;
     await deleteColumn(
      ColumnId,
      
     
      
    );

    return NextResponse.json(
      {
        message: "Column deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    const ColumnId = params.id;
    const updateData = await request.json();

     await updateColumn(
      ColumnId,
      
      updateData
    );

    return NextResponse.json(
      {
        message: "column updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}