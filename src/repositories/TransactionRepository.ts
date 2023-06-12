import { receipts } from "../data/receipts";
import { products } from "../data/products";
import { ProductPayload } from "../rest/transactions/validation";
import { Receipt } from "../domain/model";
import { uuid } from "../utils/uuid";

const _getReceiptsByUser = (userId: string) => {
  return receipts.filter(({ user_id }) => user_id === userId);
};

const getUserReceipts = (userId: string, page: number, limit: number) => {
  const userReceipts = _getReceiptsByUser(userId);

  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedReceipts = userReceipts.slice(start, end);

  return paginatedReceipts;
};

const getProductsByReceipt = (receiptId: string) => {
  return products.filter(({ receipt_id }) => receipt_id === receiptId);
};

const addReceiptWithProducts = (
  userId: string,
  date: Date,
  productsData: ProductPayload[]
) => {
  // TRANSACTION: Receipt -> Products.

  // ORM will handle id
  const receipt: Receipt = {
    id: uuid(),
    user_id: userId,
    date,
  };
  receipts.push(receipt);
  // if fails then rollback all stuff and cancel future.

  const ormedProducts = productsData.map((product) => ({
    ...product,
    id: uuid(),
    receipt_id: receipt.id,
  }));

  products.push(...ormedProducts);

  return receipt;
};

export const TransactionRepository = {
  getUserReceipts,
  getProductsByReceipt,

  addReceiptWithProducts,
};
