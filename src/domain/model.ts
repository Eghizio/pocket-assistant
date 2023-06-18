type UUID = string;

// Auth
export interface User {
  id: UUID; // some uuid
  email: string; // unique
  password: string; // hash
  username: string; // nonunique
}

// Budget
export interface Budget {
  id: UUID; // some uuid
  user_id: UUID;
  date: Date;
  limit: number;
  // spent: number;
}

// Transactions
export interface Receipt {
  id: UUID;
  user_id: UUID;
  date: Date; // figure out date
  // total: number; // total price of products?
}

export interface Product {
  id: UUID;
  receipt_id: UUID;
  name: string;
  price: number; // money formating - int?
  // note: string; // some notes and metadata
}
