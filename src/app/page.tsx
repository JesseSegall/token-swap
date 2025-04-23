"use client";
import { useEffect } from "react";
import useTokenInfo from "@/hooks/useTokenInfo";
import usePriceInfo from "@/hooks/usePriceInfo";

export default function Home() {

  // Test data
  const chainId = "1";
  const symbol  = "USDC";


  const {
    data: tokenInfo,
    isLoading: tokenLoading,
    error:   tokenError,
  } = useTokenInfo(chainId, symbol);


  const {
    data: priceInfo,
    isLoading: priceLoading,
    error:   priceError,
  } = usePriceInfo(chainId, tokenInfo?.address || "", 150);


  console.log("Token Info:", { tokenLoading, tokenError, tokenInfo });
  console.log("Price Info:", { priceLoading, priceError, priceInfo });


  useEffect(() => {
    fetch(`/api/fun/asset/erc20/${chainId}/${symbol}`)
        .then((response) => response.json())
        .then((logRes) => console.log("raw proxy JSON:", logRes));
  }, [chainId, symbol]);

  return (
      <div className="p-8 text-center">
        <h1>Hello World</h1>
      </div>
  );
}
