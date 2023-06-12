import { Router } from "express";
import { TransactionController } from "./TransactionController";

// /transactions
export const transactions = Router();

transactions.get("/receipts", TransactionController.getAllReceipts);
transactions.get(
  "/receipts/:receipt_id",
  TransactionController.getProductsByReceipt
);
transactions.post("/receipts", TransactionController.addReceipt);
