import { useContext } from "react";
import { BalanceContext } from "./BalanceContext";

export function useBalance() {
  const balance = useContext(BalanceContext);

  if (!balance) {
    throw new Error("Balance context must be used within a BalanceProvider");
  }

  return balance;
}
