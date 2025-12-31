export const BOOK_SORT_OPTIONS = {
  PRICE_ASC: {
    label: "Price 🡓",
    sortFn: (a, b) => a.price - b.price,
  },
  PRICE_DESC: {
    label: "Price 🡑",
    sortFn: (a, b) => b.price - a.price,
  },
  NAME_ASC: {
    label: "name A-Z",
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  NAME_DESC: {
    label: "name Z-A",
    sortFn: (a, b) => b.name.localeCompare(a.name),
  },
  AVAILABLE: {
    label: "Available",
    sortFn: (a, b) => (a.user_id ? 1 : 0) - (b.user_id ? 1 : 0),
  },
  UNAVAILABLE: {
    label: "Unavailable",
    sortFn: (a, b) => (b.user_id ? 1 : 0) - (a.user_id ? 1 : 0),
  },
};

export const USER_SORT_OPTIONS = {
  USERNAME_ASC: {
    label: "username 🡓",
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  USERNAME_DESC: {
    label: "username 🡑",
    sortFn: (a, b) => b.name.localeCompare(a.name),
  },
  LATE_FIRST: {
    label: "late users",
    sortFn: (a, b) => Number(b.is_late) - Number(a.is_late),
  },
  BALANCE_ASC: {
    label: "balance 🡓",
    sortFn: (a, b) => Number(b.balance) - Number(a.balance),
  },
  BALANCE_DESC: {
    label: "balance 🡑",
    sortFn: (a, b) => Number(a.balance) - Number(b.balance),
  },
};

export const AUTHOR_SORT_OPTIONS = {
  USERNAME_ASC: {
    label: "name 🡓",
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  USERNAME_DESC: {
    label: "name 🡑",
    sortFn: (a, b) => b.name.localeCompare(a.name),
  },
  REVENUE_ASC: {
    label: "revenue 🡓",
    sortFn: (a, b) => Number(b.revenue) - Number(a.revenue),
  },
  REVENUE_DESC: {
    label: "revenue 🡑",
    sortFn: (a, b) => Number(a.revenue) - Number(b.revenue),
  },
};
