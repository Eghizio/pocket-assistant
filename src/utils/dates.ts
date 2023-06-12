export const monthAgo = (date: Date) => {
  const d = new Date(date);
  const month = d.getMonth();
  
  const previousMonth = month === 0 ? 11 : month - 1;
  d.setMonth(previousMonth);
  
  return d;
};
