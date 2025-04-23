import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrice } from "@/lib/api";

export default function usePriceInfo(
    chainId: string,
    address: string,
    usdAmount: number
) {
    return useQuery({
        queryKey: ["priceInfo", chainId, address, usdAmount],
        queryFn: async () => {
            const { unitPrice } = await fetchTokenPrice(chainId, address);
            return { amount: usdAmount / unitPrice };
        },
        enabled: !!address && usdAmount > 0,
        retry: 2,
        //TODO: Refetches price data every 10 seconds, can adjust later when UI done
        refetchInterval: 10_000,
        refetchIntervalInBackground: true,
    });
}
