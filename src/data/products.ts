import { Product } from "../domain/model";

export const products: Product[] = [
	{ id: "1", receipt_id: "1", name: "Answer", price: 42 },
	{ id: "2", receipt_id: "1", name: "Solution", price: 44 },
	{ id: "3", receipt_id: "1", name: "Hehe", price: 69 },

	{ id: "4", receipt_id: "2", name: "Flight", price: 120 },
	{ id: "5", receipt_id: "2", name: "Water", price: 4 },

	{ id: "6", receipt_id: "3", name: "Snack", price: 7 },
	{ id: "7", receipt_id: "3", name: "Meal", price: 16 },

	{ id: "8", receipt_id: "4", name: "Milk", price: 404 },
	{ id: "9", receipt_id: "4", name: "Cigaretes", price: 404 },
];
