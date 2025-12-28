import { useState, useEffect } from "react";
import { BalanceContext } from "./BalanceContext";
import { getUsersBalance, updateBalance } from "../../api/api";

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(null);
  const [userId, setUserId] = useState(() => {
    const id = localStorage.getItem("user_id");
    return id ? Number(id) : null;
  });

  useEffect(() => {
    if (!userId) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const { data } = await getUsersBalance(userId);
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [userId]);

  const resetBalance = () => setBalance(null);

  const addToBalance = async (value) => {
    const newBalance = (Number(balance) ?? 0) + Number(value);
    setBalance(newBalance);
    await updateBalance(userId, newBalance);
  };

  return (
    <BalanceContext.Provider
      value={{ balance, setBalance, resetBalance, addToBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
}
