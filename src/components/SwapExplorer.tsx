'use client';

import React, { useState } from 'react';
import SwapCard from './SwapCard';
import { ArrowRight } from 'lucide-react';
import useTokenInfo from '@/hooks/useTokenInfo';
import usePriceInfo from '@/hooks/usePriceInfo';

const TOKENS = ['USDC', 'USDT', 'ETH', 'WBTC'] as const;
type Token = (typeof TOKENS)[number];

export default function SwapExplorer() {
  const chainId = '1';

  // token pair [fromToken, toToken]
  const [tokenPair, setTokenPair] = useState<[Token, Token]>([TOKENS[0], TOKENS[1]]);
  const [usdAmount, setUsdAmount] = useState(0);
  const [showRates, setShowRates] = useState(false);
  const [rotated, setRotated] = useState(false);

  const [fromToken, toToken] = tokenPair;

  const { data: fromInfo } = useTokenInfo(chainId, fromToken);
  const { data: toInfo } = useTokenInfo(chainId, toToken);

  const {
    data: toPriceInfo,
    isFetching: loading,
    error,
  } = usePriceInfo(chainId, toInfo?.address || '', showRates);

  const isLoading = loading;
  const isError = Boolean(error);
  const isDisabled = !fromInfo?.address || !toInfo?.address || isLoading;

  const toUnit = toPriceInfo?.unitPrice ?? 0;
  const toAmount = toUnit > 0 ? usdAmount / toUnit : 0;

  const handleCheckPrice = () => setShowRates(true);

  const handleSwap = () => {
    // swap tokens
    setTokenPair([toToken, fromToken]);
    setShowRates(true);
    setRotated((r) => !r);
  };

  return (
    <div
      className="
        max-w-xl mx-auto p-6
        bg-[#2e303c] border border-[#3d3f4c]
        rounded-2xl
        shadow-[4px_4px_12px_rgba(0,0,0,0.6),-4px_-4px_12px_rgba(255,255,255,0.04)]
        space-y-6
      "
    >
      <h2 className="text-text-main text-2xl font-bold text-center">Token Price Explorer</h2>

      <div className="relative w-full flex flex-col space-y-6">
        {/* You Spend */}
        <SwapCard
          role="from"
          token={fromToken}
          usdAmount={usdAmount}
          tokens={TOKENS as unknown as string[]}
          onSelect={(t) => {
            setTokenPair([t as Token, toToken]);
            setShowRates(false);
          }}
          onUsdChange={(val) => {
            setUsdAmount(val);
            setShowRates(false);
          }}
        />

        {/* swap button */}
        <button
          onClick={handleSwap}
          className="
            absolute top-[48%] left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            bg-[#333447] border border-[#3d3f4c] hover:border-accent
            rounded-full p-2
            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.04)]
          "
        >
          <ArrowRight
            className={`
              w-5 h-5 text-text-main
              transition-transform duration-500 ease-in-out
              ${rotated ? 'rotate-[270deg]' : 'rotate-[90deg]'}
            `}
          />
        </button>

        {/* You Get */}
        <SwapCard
          role="to"
          token={toToken}
          usdAmount={usdAmount}
          tokens={TOKENS as unknown as string[]}
          onSelect={(t) => {
            setTokenPair([fromToken, t as Token]);
            setShowRates(false);
          }}
          amount={showRates ? toAmount : 0}
        />
      </div>

      <button
        onClick={handleCheckPrice}
        disabled={isDisabled}
        className="
          w-full py-3 rounded-xl
          bg-gradient-to-r from-[#1e40af] to-[#047857]
          hover:from-[#1e3a8a] hover:to-[#065f46]
          transition-colors duration-300
          text-[#1e1f29] font-semibold
        "
      >
        {isLoading ? 'Loading rates...' : 'Check Price'}
      </button>

      {isError && <p className="text-red-500 text-center">Error fetching rates.</p>}
    </div>
  );
}
