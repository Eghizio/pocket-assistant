import { TransactionService } from "../../domain/TransactionService";
import { createValidatedHandler } from "../../utils/validator";
import {
  ReceiptPaginationQuerySchema,
  ReceiptProductsParamsSchema,
  ReceiptSchema,
} from "./validation";

const userId = "1"; // Todo: Get user ID from some session or token

const getAllReceipts = createValidatedHandler({
  query: ReceiptPaginationQuerySchema,
})((req, res) => {
  const { page, limit } = req.query;
  const receipts = TransactionService.getUserReceipts(userId, page, limit);

  return res.status(200).json(receipts);
});

const getProductsByReceipt = createValidatedHandler({
  params: ReceiptProductsParamsSchema,
})((req, res) => {
  const { receipt_id } = req.params;
  const products = TransactionService.getUserProductsByReceipt(receipt_id);

  return res.status(200).json(products);
});

const addReceipt = createValidatedHandler({ body: ReceiptSchema })(
  (req, res) => {
    const { date, products } = req.body;
    const receipt = TransactionService.addReceipt(userId, date, products);

    return res.status(201).json(receipt);
  }
);

export const TransactionController = {
  getAllReceipts,
  getProductsByReceipt,
  addReceipt,
};
