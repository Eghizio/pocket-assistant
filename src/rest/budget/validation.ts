import { z } from "zod";
import { monthAgo } from "../../utils/dates";

export const BudgetPaginationQuerySchema = z.object({
	page: z.coerce.number().positive().default(1),
	limit: z.coerce.number().positive().default(12),
});


export const BudgetDateRangeQuerySchema = z.object({
	// YYYY-MM-DD https://www.iso.org/iso-8601-date-and-time-format.html
	after: z.coerce.date().default(() => monthAgo(new Date())),
	before: z.coerce.date().default(() => new Date()),
});

export const BudgetQuerySchema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
});

export const BudgetBodySchema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
	limit: z.coerce.number().positive(),
});
