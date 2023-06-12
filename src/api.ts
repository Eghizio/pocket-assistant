import { Router } from "express";
import { budget } from "./rest/budget/routing";
import { transactions } from "./rest/transactions/routing";

export const api = Router();

api.use("/budget", budget);
api.use("/transactions", transactions);
