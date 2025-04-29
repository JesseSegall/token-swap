'use client';

import React from 'react';
import Image from 'next/image';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

const LOGO_MAP: Record<string, string> = {
  USDC: 'USDC_Logo.webp',
  USDT: 'USDT.webp',
  ETH: 'ETH_Logo.webp',
  WBTC: 'WBTC_Logo.png',
};
const LOGO_PATH = (tokenSymbol: string) => `/logos/${LOGO_MAP[tokenSymbol]}`;

export type SwapCardProps = {
  role: 'from' | 'to';
  token: string;
  usdAmount: number;
  tokens: string[];
  onSelect: (selectedToken: string) => void;
  onUsdChange?: (newUsdAmount: number) => void;
  amount?: number;
};

export default function SwapCard({
  role,
  token,
  usdAmount,
  tokens,
  onSelect,
  onUsdChange,
  amount = 0,
}: SwapCardProps) {
  return (
    <div className="w-[460px] h-40 p-4 border  rounded-lg space-y-3 shadow-lg bg-secondary text-text-main flex flex-col mb-2">
      <div className="flex justify-between items-center  shadow-inner">
        <span className="text-sm font-medium">{role === 'from' ? 'You Spend' : 'You Get'}</span>
        <Listbox value={token} onChange={onSelect}>
          <div className="relative">
            <ListboxButton className="flex items-center space-x-2 px-3 py-1 border  rounded bg-primary hover:bg-primary-dark">
              <Image
                src={LOGO_PATH(token)}
                alt={token}
                width={20}
                height={20}
                className="object-contain"
              />
              <span>{token}</span>
              <ChevronDown className="w-4 h-4 text-text-main" />
            </ListboxButton>
            <ListboxOptions className="absolute mt-1 w-full bg-secondary border  rounded-lg py-1 z-10">
              {tokens.map((optionToken) => (
                <ListboxOption
                  key={optionToken}
                  value={optionToken}
                  className={({ focus }) =>
                    `flex items-center px-3 py-1 cursor-pointer ${
                      focus ? 'bg-accent-dark text-white' : 'text-text-main'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <Image
                        src={LOGO_PATH(optionToken)}
                        alt={optionToken}
                        width={20}
                        height={20}
                        className="mr-2 object-contain"
                      />
                      <span className={selected ? 'font-semibold' : 'font-normal'}>
                        {optionToken}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {role === 'from' && onUsdChange && (
        <NumericFormat
          className="w-full px-3 py-2 border rounded-lg bg-primary text-text-main  text-2xl"
          placeholder="$ 0.00"
          value={usdAmount !== 0 ? usdAmount : undefined}
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          prefix="$ "
          allowNegative={false}
          inputMode="decimal"
          onValueChange={(values) => onUsdChange(values.floatValue ?? 0)}
        />
      )}

      {role === 'to' && (
        <div className=" w-full px-3 py-2 border rounded-lg shadow-inner bg-primary text-2xl text-text-main">
          {amount.toFixed(6)} {token}
        </div>
      )}
    </div>
  );
}
