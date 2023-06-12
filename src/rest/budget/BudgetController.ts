import { RequestHandler } from "express";
import { BudgetService } from "../../domain/BudgetService";
import { createValidatedHandler } from "../../utils/validator";
import { BudgetBodySchema, BudgetDateRangeQuerySchema, BudgetPaginationQuerySchema, BudgetQuerySchema } from "./validation";

const userId = "1"; // Get user ID from some session or token

const getAllBudgets = createValidatedHandler({ query: BudgetPaginationQuerySchema })((req, res) => {
  const { page, limit } = req.query;
  const budgets = BudgetService.getUserBudgets(userId, page, limit);

  return res.status(200).json(budgets);
});

const getUserBudgetsWithinDate = createValidatedHandler({ query: BudgetDateRangeQuerySchema })((req, res) => {
  const { after, before } = req.query;
  const budgetsWithinDate = BudgetService.getUserBudgetsWithinDate(userId, after, before);

  return res.status(200).json(budgetsWithinDate);
});

// todo parse/validate
const addBudget: RequestHandler = createValidatedHandler({ body: BudgetBodySchema })((req, res) => {
  const { year, month, limit } = req.body;
  // Todo: Param validation. If invalid then Error and return 4xx

  const budget = BudgetService.addBudget(userId, year, month, limit);

  return res.status(201).json(budget);
});

export const BudgetController = {
  getAllBudgets,
  getUserBudgetsWithinDate,
  addBudget,
};
