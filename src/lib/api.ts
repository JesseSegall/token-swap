
export function fetchTokenInfo(chainId: string, symbol: string) {
    return fetch(`/api/fun/asset/erc20/${chainId}/${symbol}`)
        .then((res) => {
            if (!res.ok) throw new Error(`Token info proxy failed (${res.status})`);
            return res.json() as Promise<{
                address: string;
                chain: string;
                decimals: number;
                name: string;
                symbol: string;
            }>;
        });
}


export function fetchTokenPrice(chainId: string, assetTokenAddress: string) {
    return fetch(`/api/fun/asset/erc20/price/${chainId}/${assetTokenAddress}`)
        .then((res) => {
            if (!res.ok) throw new Error(`Token price proxy failed (${res.status})`);
            return res.json() as Promise<{
                unitPrice: number;
                timestamp: number;
            }>;
        });
}
