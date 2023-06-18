import { Budget } from "./model";

// move to model
type BudgetDto = Omit<Budget, "user_id">;

interface BudgetWithSpendingsDTO extends BudgetDto {
  spent: number;
}

const toBudgetDto = ({ id, date, limit }: Budget): BudgetDto => ({
  id,
  date,
  limit,
});

const toBudgetWithSpendingsDto = (
  budget: Budget,
  spent: number
): BudgetWithSpendingsDTO => ({
  ...toBudgetDto(budget),
  spent,
});

export const BudgetMapper = {
  toDto: toBudgetDto,
  toSpendingsDto: toBudgetWithSpendingsDto,
};
