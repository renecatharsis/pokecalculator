import { NextRequest, NextResponse } from "next/server";

import { calculateProbability } from "@/catchRate/catchRateCalculator";
import { catchRateInputSchema } from "@/dto/catchRateInputDto";
import { CatchRateOutputDto } from "@/dto/catchRateOutputDto";
import { ZodIssue } from "zod";

export async function POST(request: NextRequest) {
  const validatedData = catchRateInputSchema.safeParse(await request.json());

  if (!validatedData.success) {
    const errors: string[] = [];
    validatedData.error.issues
      .map((error: ZodIssue) => {
        errors.push(error.path.join(", "));
      })
      .filter((value, index, array) => array.indexOf(value) === index);

    return NextResponse.json(errors, { status: 400 });
  }

  const response: CatchRateOutputDto = {
    probability: calculateProbability(validatedData.data),
  };

  return new NextResponse(JSON.stringify(response));
}
