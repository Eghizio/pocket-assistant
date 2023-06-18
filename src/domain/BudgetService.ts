import { BudgetRepository } from "../repositories/BudgetRepository";
import { BudgetMapper } from "./BudgetMapper";

const MAX_BUDGET_PAGE_LIMIT = 36;
const getUserBudgets = (userId: string, page = 1, limit = 12) => {
  const cappedLimit = Math.min(MAX_BUDGET_PAGE_LIMIT, limit);
  return BudgetRepository.getUserBudgets(userId, page, cappedLimit);
};

const getUserBudgetsWithinDate = (
  userId: string,
  after: Date,
  before: Date
) => {
  return BudgetRepository.getUserBudgetsWithinDateRange(
    userId,
    after,
    before
  ).map(BudgetMapper.toDto);
};

// figure out if we want budget for current month or do we allow user to provide any date/month
const addBudget = (
  userId: string,
  year: number,
  month: number,
  limit: number
) => {
  // TODO: validate year, month and limit
  const budget = BudgetRepository.addBudget(userId, year, month, limit);
  return BudgetMapper.toDto(budget);
};

export const BudgetService = {
  getUserBudgets,
  getUserBudgetsWithinDate,
  addBudget,
};
