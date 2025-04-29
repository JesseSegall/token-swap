import { NextResponse } from "next/server";

const API_BASE = "https://api.fun.xyz/v1";
const API_KEY  = process.env.NEXT_PUBLIC_FUN_API_KEY!;

export async function GET(
    _req: Request,
    context: { params: { funPath: string[] } }
) {
    // This is throwing a warning that await is not needed, but it is necessary because Next.js 15
    // params is an async object now. https://nextjs.org/docs/messages/sync-dynamic-apis
    const { funPath } = await context.params;
    const apiEndpoint = `${API_BASE}/${funPath.join("/")}`;

    const apiResponse = await fetch(apiEndpoint, {
        headers: { "X-Api-Key": API_KEY },
    });

    const body = await apiResponse.json();
    return NextResponse.json(body, { status: apiResponse.status });
}
