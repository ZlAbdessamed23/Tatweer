import { NextRequest, NextResponse } from "next/server";
import {
  AddColumn,
  
  
} from "@/app/api/main/tables/columns/controller";
import { AddColumnData, requiredcolumnFields } from "@/app/api/main/tables/columns/types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    
 
    const data: AddColumnData = await request.json();
    const missingFields = requiredcolumnFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
    
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }

    await AddColumn(data);

    return NextResponse.json(
      {
        message: "Column has been created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}