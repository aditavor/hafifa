export const BOOK_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    orderBy: "name",
    sortType: "ASC",
  },
  PRICE_ASC: {
    label: "Price 🡓",
    orderBy: "price",
    sortType: "ASC",
  },
  PRICE_DESC: {
    label: "Price 🡑",
    orderBy: "price",
    sortType: "DESC",
  },
  NAME_ASC: {
    label: "name A-Z",
    orderBy: "name",
    sortType: "ASC",
  },
  NAME_DESC: {
    label: "name Z-A",
    orderBy: "name",
    sortType: "DESC",
  },
  AVAILABLE: {
    label: "available",
    orderBy: "user_id",
    sortType: "DESC",
  },
  UNAVAILABLE: {
    label: "unavailable",
    orderBy: "user_id",
    sortType: "ASC",
  },
};

export const USER_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    orderBy: "name",
    sortType: "ASC",
  },
  USERNAME_ASC: {
    label: "username 🡓",
    orderBy: "name",
    sortType: "ASC",
  },
  USERNAME_DESC: {
    label: "username 🡑",
    orderBy: "name",
    sortType: "DESC",
  },
  BALANCE_ASC: {
    label: "balance 🡓",
    orderBy: "balance",
    sortType: "ASC",
  },
  BALANCE_DESC: {
    label: "balance 🡑",
    orderBy: "balance",
    sortType: "DESC",
  },
};

export const AUTHOR_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    orderBy: "name",
    sortType: "ASC",
  },
  USERNAME_ASC: {
    label: "name 🡓",
    orderBy: "name",
    sortType: "ASC",
  },
  USERNAME_DESC: {
    label: "name 🡑",
    orderBy: "name",
    sortType: "DESC",
  },
  REVENUE_ASC: {
    label: "revenue 🡓",
    orderBy: "revenue",
    sortType: "DESC",
  },
  REVENUE_DESC: {
    label: "revenue 🡑",
    orderBy: "revenue",
    sortType: "ASC",
  },
};

export const PERSONAL_SORT_OPTIONS = {
  DEFAULT: {
    label: "Sort by...",
    orderBy: "name",
    sortType: "ASC",
  },
  NAME_ASC: {
    label: "name 🡓",
    orderBy: "name",
    sortType: "ASC",
  },
  NAME_DESC: {
    label: "name 🡑",
    orderBy: "name",
    sortType: "DESC",
  },
  BORROW_DATE_ASC: {
    label: "borrow date 🡓",
    orderBy: "borrow_date",
    sortType: "ASC",
  },
  BORROW_DATE_DESC: {
    label: "borrow date 🡑",
    orderBy: "borrow_date",
    sortType: "DESC",
  },
};
