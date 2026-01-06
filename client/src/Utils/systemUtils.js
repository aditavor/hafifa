export const userId = () => localStorage.getItem("user_id");
export const isWorker = () => localStorage.getItem("is_worker") === "true";
export const calcTotalPages = (total, limit) => Math.ceil(total / limit);
