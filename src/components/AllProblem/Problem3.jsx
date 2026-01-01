import { useNavigate } from "react-router-dom";

function Problem3() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Problem 3 – Messy React
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate("/Problem3Slove")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Run Refactored Code
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3 text-lg">
            Original Code (With Issues)
          </h2>

          <pre className="bg-gray-900 text-red-200 p-4 rounded text-sm overflow-x-auto">
            {`interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100
        case 'Ethereum':
          return 50
        case 'Arbitrum':
          return 30
        case 'Zilliqa':
          return 20
        case 'Neo':
          return 20
        default:
          return -99
      }
    }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false
      }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
    }, [balances, prices]);
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return <div {...rest}>{rows}</div>
  }`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3 text-lg">
            Issues & Refactored Solution
          </h2>

          <pre className="bg-gray-800 text-green-200 p-4 rounded text-sm overflow-x-auto mb-4">
            {`ISSUES & INEFFICIENCIES IDENTIFIED
  
  1. Uses 'any' type for blockchain
     - Loses type safety
  
  2. Undefined variable 'lhsPriority'
     - Runtime error
  
  3. Incorrect filter condition
     - Keeps zero/negative balances
  
  4. Repeated getPriority calls during sorting
     - Performance issue
  
  5. Incorrect useMemo dependency
     - 'prices' unused
  
  6. formattedBalances created but unused
     - Redundant computation
  
  7. Using array index as key
     - React reconciliation issue
  
  8. Type mismatch between WalletBalance and FormattedWalletBalance
  
  9. getPriority recreated on each render
  
  10. Unused props ('children')`}
          </pre>

          <pre className="bg-gray-900 text-blue-200 p-4 rounded text-sm overflow-x-auto">
            {`import { useMemo } from "react";

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
  { currency: "NEO", amount: 0, blockchain: "Neo" },
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
      \${usdValue.toFixed(2)}

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
              usdValue={prices[balance.currency] * balance.amount}
              formattedAmount={balance.formatted}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Problem3Solve;`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Problem3;
