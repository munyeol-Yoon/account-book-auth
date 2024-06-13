export type AccountDataType = {
  accountId: string;
  userId: string;
  date: string;
  item: string;
  amount: number;
  content: string;
  createdAt: string;
};

export type AccountInputType = {
  date: string;
  item: string;
  amount: string;
  content: string;
};

export type AccountJSONDataType = {
  accountId: string;
  userId: string;
  date: string;
  item: string;
  amount: number;
  content: string;
  createdAt: string;
  id: string;
};
