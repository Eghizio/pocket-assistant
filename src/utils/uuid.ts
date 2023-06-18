export const uuid = () =>
  Date.now().toString() +
  Math.round(Math.random() * 1_000_000)
    .toString()
    .padStart(7, "0");
