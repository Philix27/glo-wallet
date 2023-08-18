import { useContext } from "react";
import { useAccount } from "wagmi";

import BuyWithCoinbaseModal from "@/components/Modals/BuyWithCoinbaseModal";
import { ModalContext } from "@/lib/context";
import { getTotalYield } from "@/utils";

import Actions from "./Actions";
import ImpactInset from "./ImpactInset";

type Props = {
  gloBalance: { formatted: string; value: number };
  usdcBalance: { formatted: string; value: number };
};

export default function Balance({
  gloBalance = { formatted: "0", value: 0 },
  usdcBalance = { formatted: "0", value: 0 },
}: Props) {
  const { isConnected } = useAccount();
  const { openModal } = useContext(ModalContext);

  // ethers and typescript don't like each other
  const illFormatMyOwnEther = Number(gloBalance.formatted);
  const yearlyYield = getTotalYield(illFormatMyOwnEther);
  const yearlyYieldFormatted =
    yearlyYield > 0 ? `$0 - ${yearlyYield.toFixed(2)}` : "$0";

  const dblFmtBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(gloBalance.formatted);

  const splitFmtBalance = dblFmtBalance.split(".");
  const fmtBalanceDollarPart = splitFmtBalance[0];
  let fmtBalanceCentPart = splitFmtBalance[1];
  if (fmtBalanceCentPart?.length === 1) fmtBalanceCentPart += "0";

  // usdc formatting
  const formattedUSDC = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(usdcBalance.formatted));

  return (
    <div className="bg-white rounded-[20px] pt-4">
      <div className="flex flex-col space-y-2 p-4">
        <div className="self-center text-sm text-pine-700/90 mb-1.5">
          Balance
        </div>
        <div className="flex flex-row font-semibold justify-center">
          <div className="flex flex-row text-[2.625rem] items-baseline">
            <div className="max-w-[226px]">${fmtBalanceDollarPart}</div>
            <div className="text-xl">.{fmtBalanceCentPart || "00"}</div>
          </div>
        </div>
        {usdcBalance.value > 0 && (
          <a
            className="black-link self-center"
            onClick={() => {
              openModal(
                <BuyWithCoinbaseModal buyAmount={fmtBalanceDollarPart} />
              );
            }}
          >
            ({formattedUSDC} USDC swappable for Glo Dollar)
          </a>
        )}
      </div>
      {isConnected && <Actions />}
      <ImpactInset
        openModal={openModal}
        yearlyYield={yearlyYield}
        yearlyYieldFormatted={yearlyYieldFormatted}
      />
    </div>
  );
}
