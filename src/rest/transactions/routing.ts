import { Router } from "express";
import { TransactionController } from "./TransactionController";

// /transactions
export const transactions = Router();

transactions.get("/receipts", TransactionController.getAllReceipts);
transactions.post("/receipts", TransactionController.addReceipt);
transactions.get(
  "/receipts/:receipt_id",
  TransactionController.getProductsByReceipt
);
