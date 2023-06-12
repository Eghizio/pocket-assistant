import { Receipt } from "../domain/model";

// partitions per month? timezone? UTC?
export const receipts: Receipt[] = [
  { id: "1", user_id: "1", date: new Date(2023, 0) },
  { id: "2", user_id: "1", date: new Date(2023, 0) },
  { id: "3", user_id: "1", date: new Date(2023, 1) },

  { id: "4", user_id: "2", date: new Date(2023, 0) },
];
