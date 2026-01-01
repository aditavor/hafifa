const defaultSort = (a, b) => a.name.localeCompare(b.name);

export const BOOK_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    sortData: defaultSort,
  },
  PRICE_ASC: {
    label: "Price 🡓",
    sortData: (a, b) => a.price - b.price,
  },
  PRICE_DESC: {
    label: "Price 🡑",
    sortData: (a, b) => b.price - a.price,
  },
  NAME_ASC: {
    label: "name A-Z",
    sortData: defaultSort,
  },
  NAME_DESC: {
    label: "name Z-A",
    sortData: (a, b) => b.name.localeCompare(a.name),
  },
  AVAILABLE: {
    label: "available",
    sortData: (a, b) => (a.user_id ? 1 : 0) - (b.user_id ? 1 : 0),
  },
  UNAVAILABLE: {
    label: "unavailable",
    sortData: (a, b) => (b.user_id ? 1 : 0) - (a.user_id ? 1 : 0),
  },
};

export const USER_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    sortData: defaultSort,
  },
  USERNAME_ASC: {
    label: "username 🡓",
    sortData: defaultSort,
  },
  USERNAME_DESC: {
    label: "username 🡑",
    sortData: (a, b) => b.name.localeCompare(a.name),
  },
  LATE_FIRST: {
    label: "late users",
    sortData: (a, b) => Number(b.isLate) - Number(a.isLate),
  },
  BALANCE_ASC: {
    label: "balance 🡓",
    sortData: (a, b) => Number(b.balance) - Number(a.balance),
  },
  BALANCE_DESC: {
    label: "balance 🡑",
    sortData: (a, b) => Number(a.balance) - Number(b.balance),
  },
};

export const AUTHOR_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    sortData: defaultSort,
  },
  USERNAME_ASC: {
    label: "name 🡓",
    sortData: defaultSort,
  },
  USERNAME_DESC: {
    label: "name 🡑",
    sortData: (a, b) => b.name.localeCompare(a.name),
  },
  REVENUE_ASC: {
    label: "revenue 🡓",
    sortData: (a, b) => Number(b.revenue) - Number(a.revenue),
  },
  REVENUE_DESC: {
    label: "revenue 🡑",
    sortData: (a, b) => Number(a.revenue) - Number(b.revenue),
  },
};
