import { type NextRequest } from "next/server";
import { ZodIssue } from "zod";
import { catchRateInputSchema } from "@/dto/CatchRateInputDto";
import { CatchRateOutputDto } from "@/dto/CatchRateOutputDto";
import { calculateProbability } from "@/catchRate/CatchRateCalculator";

export async function POST(request: NextRequest) {
    // step 1: validate request schema
    const validatedData = catchRateInputSchema.safeParse(await request.json());

    if (!validatedData.success) {
        const errors: string[] = [];
        validatedData.error.issues
            .map((error: ZodIssue) => {
                errors.push(error.path.join(", "));
            })
            .filter((value, index, array) => array.indexOf(value) === index);

        return Response.json(errors, {
            status: 400,
        });
    }

    // step 2: validate logical integrity
    // e.g. using netball together with gen 1 or jirachi with gen 2

    // step 3: calculate probability
    const response: CatchRateOutputDto = {
        probability: calculateProbability(validatedData.data),
    };

    return Response.json(response);
}
