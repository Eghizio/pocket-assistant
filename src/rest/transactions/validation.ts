import { z } from "zod";

export const ReceiptPaginationQuerySchema = z.object({
	page: z.coerce.number().positive().default(1),
	limit: z.coerce.number().positive().default(7),
});

export const ReceiptProductsParamsSchema = z.object({
	receipt_id: z.string(),
});

export const ProductSchema = z.object({
	name: z.string(),
	price: z.number().positive(),
});

export type ProductPayload = z.infer<typeof ProductSchema>;

export const ReceiptSchema = z.object({
	date: z.date().default(() => new Date()),
	products: z.array(ProductSchema),
});

export const ReceiptQuerySchema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
});



