import { Budget } from "../domain/model";

// what if there would be multiple budgets per month. do we constrain that?
export const budgets: Budget[] = [
  { id: "1", user_id: "1", date: new Date(2023, 1), limit: 2137 },
  { id: "2", user_id: "1", date: new Date(2023, 2), limit: 1337 },
  { id: "3", user_id: "1", date: new Date(2023, 5), limit: 777 },

  { id: "4", user_id: "2", date: new Date(2023, 1), limit: 6969 },
  { id: "5", user_id: "2", date: new Date(2023, 2), limit: 4200 },
];
