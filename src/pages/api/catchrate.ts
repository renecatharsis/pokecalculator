import type { NextApiRequest, NextApiResponse } from "next";

import { calculateProbability } from "@/catchRate/catchRateCalculator";
import { catchRateInputSchema } from "@/dto/catchRateInputDto";
import { CatchRateOutputDto } from "@/dto/catchRateOutputDto";
import { ZodIssue } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(404);
    }

    const validatedData = catchRateInputSchema.safeParse(await req.body);

    if (!validatedData.success) {
        const errors: string[] = [];
        validatedData.error.issues
            .map((error: ZodIssue) => {
                errors.push(error.path.join(", "));
            })
            .filter((value, index, array) => array.indexOf(value) === index);

        return res.status(400).json(errors);
    }

    const response: CatchRateOutputDto = {
        probability: calculateProbability(validatedData.data),
    };

    return res.json(response);
}
