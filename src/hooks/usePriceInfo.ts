import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrice } from "@/lib/api";
import { PriceInfo } from "@/types/api";

export default function usePriceInfo(
    chainId: string,
    address: string,
    enabled: boolean = false
) {
    return useQuery<PriceInfo>({
        queryKey: ["priceInfo", chainId, address],
        queryFn: () => fetchTokenPrice(chainId, address),
        enabled: enabled,
        retry: 2,
    });
}
