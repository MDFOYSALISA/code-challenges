import { useEffect, useState } from "react";

// ✅ Fallback tokens (used if API fails)
const FALLBACK_TOKENS = {
  BTC: 65000,
  ETH: 3500,
  USDT: 1,
  USDC: 1,
};


const FALLBACK_ICON =
  "https://cdn-icons-png.flaticon.com/512/2111/2111370.png";

function FancyForm() {
  const [prices, setPrices] = useState({});
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);


  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        const validPrices = Object.fromEntries(
          Object.entries(data).filter(
            ([_, price]) => Number.isFinite(price)
          )
        );

        if (Object.keys(validPrices).length > 0) {
          setPrices(validPrices);
          const tokens = Object.keys(validPrices);
          setFromToken(tokens[0]);
          setToToken(tokens[1]);
          setUsingFallback(false);
        } else {
   


          setPrices(FALLBACK_TOKENS);
          const tokens = Object.keys(FALLBACK_TOKENS);
          setFromToken(tokens[0]);
          setToToken(tokens[1]);
          setUsingFallback(true);
        }
      })
      .catch(() => {
       
        setPrices(FALLBACK_TOKENS);
        const tokens = Object.keys(FALLBACK_TOKENS);
        setFromToken(tokens[0]);
        setToToken(tokens[1]);
        setUsingFallback(true);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (fromToken === toToken) {
      setError("Please select different tokens");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const converted =
        (amount * prices[fromToken]) / prices[toToken];

      setResult(converted.toFixed(6));
      setLoading(false);
    }, 700);
  };

  const tokenList = Object.keys(prices);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-2">
          Fancy Currency Swap
        </h2>

        {usingFallback && (
          <p className="text-yellow-600 text-sm text-center mb-3">
            Please Use fallback token prices
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="number"
            placeholder="Amount"
            className="w-full border rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

         
          <div className="flex items-center gap-2">
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromToken}.svg`}
              onError={(e) => (e.currentTarget.src = FALLBACK_ICON)}
              className="w-6 h-6"
            />
            <select
              className="w-full border rounded px-2 py-2"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
            >
              {tokenList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

         
          <div className="flex items-center gap-2">
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toToken}.svg`}
              onError={(e) => (e.currentTarget.src = FALLBACK_ICON)}
              className="w-6 h-6"
            />
            <select
              className="w-full border rounded px-2 py-2"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
            >
              {tokenList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Swap"}
          </button>
        </form>

        {result && (
          <p className="mt-4 text-center font-semibold">
            You receive Amount: {result} {toToken}
          </p>
        )}
      </div>
    </div>
  );
}

export default FancyForm;
