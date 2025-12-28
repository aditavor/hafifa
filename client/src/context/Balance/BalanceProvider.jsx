import { useState } from "react";
import { BalanceContext } from "./BalanceContext";

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(null);

  const resetBalance = () => setBalance(null);

  return (
    <BalanceContext.Provider value={{ balance, setBalance, resetBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}
