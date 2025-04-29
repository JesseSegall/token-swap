import type { TokenInfo, PriceInfo } from "@/types/api";

export async function fetchTokenInfo(
    chainId: string,
    symbol: string
): Promise<TokenInfo> {
    const res = await fetch(`/api/fun/asset/erc20/${chainId}/${symbol}`);
    if (!res.ok) throw new Error(`Token info proxy failed (${res.status})`);
    return await (await res.json() as Promise<TokenInfo>);
}

export async function fetchTokenPrice(
    chainId: string,
    address: string
): Promise<PriceInfo> {
    const res = await fetch(`/api/fun/asset/erc20/price/${chainId}/${address}`);
    if (!res.ok) throw new Error(`Token price proxy failed (${res.status})`);
    return await (await res.json() as Promise<PriceInfo>);
}