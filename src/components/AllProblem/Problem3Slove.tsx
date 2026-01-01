import { useMemo } from "react";



type Blockchain =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const useWalletBalances = (): WalletBalance[] => [
  { currency: "ETH", amount: 2.5, blockchain: "Ethereum" },
  { currency: "ATOM", amount: 10, blockchain: "Osmosis" },
  { currency: "ARB", amount: 5, blockchain: "Arbitrum" },
  { currency: "NEO", amount: 0, blockchain: "Neo" }, // filtered out
];

const usePrices = (): Record<string, number> => ({
  ETH: 3500,
  ATOM: 12,
  ARB: 1.8,
  NEO: 8,
});

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
}) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <span className="font-medium">{formattedAmount}</span>
      <span className="text-gray-600">
        ${usdValue.toFixed(2)}
      </span>
    </div>
  );
};



const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};



function Problem3Solve() {
  const balances = useWalletBalances();
  const prices = usePrices();

 
  const sortedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter((b) => b.amount > 0)
      .sort(
        (a, b) =>
          PRIORITY_MAP[b.blockchain] -
          PRIORITY_MAP[a.blockchain]
      )
      .map((b) => ({
        ...b,
        formatted: b.amount.toFixed(2),
      }));
  }, [balances]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Wallet Page (Refactored – Running)
        </h2>

        {sortedBalances.length === 0 ? (
          <p className="text-center text-gray-500">
            No balances available
          </p>
        ) : (
          sortedBalances.map((balance) => (
            <WalletRow
              key={balance.currency}
              amount={balance.amount}
              usdValue={
                prices[balance.currency] *
                balance.amount
              }
              formattedAmount={balance.formatted}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Problem3Solve;
