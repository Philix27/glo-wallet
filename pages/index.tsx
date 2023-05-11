import Header from "@/components/Header";
import Balance from "@/components/Balance";
import CTA from "@/components/CTA";
import Transactions from "@/components/Transactions";
import { useState } from "react";
import { getTotalYield } from "@/utils";
import Actions from "@/components/Actions";

export default function Home() {
  const [glo, setGlo] = useState<number>(1000.9);

  const totalDays = 365;
  const yearlyInterestRate = 0.027;
  const yearlyYield = getTotalYield(yearlyInterestRate, glo, totalDays);
  const transactions = [
    {
      from: "me",
      to: "glo",
      amount: "1.001",
    },
    {
      from: "me",
      to: "rad",
      amount: "3.52",
    },
  ];

  return (
    <div className="mt-4 px-2.5">
      <Header />
      <div className="flex flex-col space-y-10">
        <Actions />
        <Balance glo={glo} setGlo={setGlo} yearlyYield={yearlyYield} />
        <Transactions transactions={transactions} />
        <CTA />
      </div>
    </div>
  );
}
