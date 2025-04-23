import { NextResponse } from "next/server";

const API_BASE = "https://api.fun.xyz/v1";
const API_KEY  = process.env.NEXT_PUBLIC_FUN_API_KEY!;

export async function GET(
    _req: Request,
    { params }: { params: { funPath: string[] } }
) {
    const apiEndpoint = `${API_BASE}/${params.funPath.join("/")}`;

    const apiResponse = await fetch(apiEndpoint, {
        headers: { "X-Api-Key": API_KEY },
    });

    const body = await apiResponse.json();
    return NextResponse.json(body, { status: apiResponse.status });
}
