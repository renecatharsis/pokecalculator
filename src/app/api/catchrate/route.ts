import type { NextRequest } from "next/server";
import { calculateProbability } from "@/catchRate/CatchRateCalculator";
import { catchRateInputSchema } from "@/dto/CatchRateInputDto";
import { catchRateInputLogicSchema } from "@/dto/CatchRateInputLogicSchema";
import type { CatchRateOutputDto, CatchRateOutputNoticeDto } from "@/dto/CatchRateOutputDto";

export async function POST(request: NextRequest) {
    // step 1: validate request schema
    const jsonData = await request.json();
    const validatedData = catchRateInputSchema.safeParse(jsonData);

    if (!validatedData.success) {
        // @TODO check for something like a log level per env
        if (process.env.NODE_ENV !== "test") {
            console.error("Failed catchRate input validation:", jsonData, validatedData.error.issues);
        }

        return Response.json(validatedData.error.issues, {
            status: 422,
        });
    }

    // step 2: validate logical integrity
    // e.g. using netball together with gen 1 or jirachi with gen 2
    const notices: CatchRateOutputNoticeDto[] = [];
    const validatedLogicData = catchRateInputLogicSchema.safeParse(jsonData);

    if (!validatedLogicData.success) {
        validatedLogicData.error.issues.forEach((issue) => {
            notices.push({
                path: issue.path.join(", "),
                message: issue.message,
            });
        });
    }

    // step 3: calculate probability, format non-mathematically
    const response: CatchRateOutputDto = {
        probability: calculateProbability(validatedData.data),
        notices: notices,
    };

    return Response.json(response);
}
