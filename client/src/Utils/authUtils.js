export const validateUsernameFormat = (username) => {
  const usernameRegex = /^[A-Za-z0-9]{8,24}$/;
  return usernameRegex.test(username);
};

export const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const saveLoggedUser = (userId, isWorker, balance, setBalance) => {
  localStorage.setItem("user_id", userId);
  localStorage.setItem("is_worker", isWorker);
  setBalance(balance)
};
