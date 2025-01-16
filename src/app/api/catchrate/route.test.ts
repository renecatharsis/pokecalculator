/**
 * @jest-environment node
 */
import { POST } from "./route";
import { NextRequest } from "next/server";

it("should return data with status 200", async () => {
    const requestObj = {
        json: async () => ({}),
    } as NextRequest;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.length).toBe(9);
});
