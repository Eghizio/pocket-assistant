import { budgets } from "../data/budgets";
import { uuid } from "../utils/uuid";

// Todo: Refactor to classes. Enhance validator into decorator.
// Todo: Private method get users budgets. or smthing. Need some abstraction over that ffs.
const _getBudgetsByUser = (userId: string) => budgets.filter(b => b.user_id === userId);


const getUserBudgets = (userId: string, page: number, limit: number) => {
	const userBudgets = _getBudgetsByUser(userId);

	const start = (page - 1) * limit;
	const end = page * limit;
	const paginatedBudgets = userBudgets.slice(start, end);

	return paginatedBudgets;
};

const getUserBudgetsWithinDateRange = (userId: string, after: Date, before: Date) => {
	return _getBudgetsByUser(userId).filter(({ date }) => {
		const timestamp = date.getTime();
		return timestamp > after.getTime() && timestamp < before.getTime();
	});
};

const getByMonth = (userId: string, year: number, month: number) => {
	const result = _getBudgetsByUser(userId)
		.find(({ date }) => date.getFullYear() === year && (date.getMonth() + 1) === month);
	return result ?? null;
};

const addBudget = (userId: string, year: number, month: number, limit: number) => {
	// ORM will handle that
	const budget = {
		id: uuid(),
		user_id: userId,
		date: new Date(year, month - 1),
		limit,
	};

	budgets.push(budget);

	return budget;
};

export const BudgetRepository = {
	getUserBudgets,
	getUserBudgetsWithinDateRange,

	getByMonth,
	addBudget,
};