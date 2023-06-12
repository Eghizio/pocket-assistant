import { TransactionRepository } from "../repositories/TransactionRepository";
import { ProductPayload } from "../rest/transactions/validation";
import { TransactionMapper } from "./TransactionMapper";

const MAX_RECEIPTS_PAGE_LIMIT = 35;
const getUserReceipts = (userId: string, page: number = 1, limit: number = 7) => {
  const cappedLimit = Math.min(MAX_RECEIPTS_PAGE_LIMIT, limit);
  return TransactionRepository.getUserReceipts(userId, page, cappedLimit)
    .map(TransactionMapper.toReceiptDto);
};

// ProductPayload should be some input model. Maybe ProductPayload is okay
const addReceipt = (userId: string, date: Date, products: ProductPayload[]) => {
  // perform transaction, create receipt -> add products
  const receipt = TransactionRepository.addReceiptWithProducts(userId, date, products);
  const receiptDto = TransactionMapper.toReceiptDto(receipt);

  // Todo: Handle transaction failure
  // Mapper won't accept null. Or do we default -> if null return null);
  return receiptDto;
};

const getUserProductsByReceipt = (receiptId: string) => {
  return TransactionRepository.getProductsByReceipt(receiptId)
    .map(TransactionMapper.toProductDto);
};

export const TransactionService = {
  getUserReceipts,
  getUserProductsByReceipt,

  addReceipt,

};
