import { Product, Receipt } from "./model";

// to model
interface ProductDto {
  id: string;
  name: string;
  price: number; // wielowalutowość? i18n?
}

interface ReceiptDto {
  id: string;
  date: Date;
}

const toReceiptDto = ({ id, date }: Receipt): ReceiptDto => ({ id, date });

const toProductDto = ({ id, name, price }: Product): ProductDto => ({ id, name, price });

export const TransactionMapper = {
  toReceiptDto,
  toProductDto,
};
