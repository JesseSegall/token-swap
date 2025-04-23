import { useQuery } from "@tanstack/react-query";
import { fetchTokenInfo } from "@/lib/api";

export default function useTokenInfo(chainId: string, symbol: string) {
    return useQuery({
        queryKey: ["tokenInfo", chainId, symbol],
        queryFn: () => fetchTokenInfo(chainId, symbol),
        enabled: !!symbol,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
}
