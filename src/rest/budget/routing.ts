import { Router } from "express";
import { BudgetController } from "./BudgetController";

// /budget
export const budget = Router();

// Cache for `spent`. month:spent key:value. On month receipt/product insert, clear cache per month.

budget.get("/", BudgetController.getAllBudgets);
budget.post("/", BudgetController.addBudget);
budget.get("/date", BudgetController.getUserBudgetsWithinDate);
