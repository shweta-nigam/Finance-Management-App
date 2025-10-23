

export function calculateTotals(incomes: any[], expenses: any[], budgets: any[]) {

    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const totalBudget = budgets.reduce((sum, b) => sum + Number(b.amount || 0), 0);

    const totalBalance = totalIncome - totalExpenses

    const utilization = totalBudget ? ((totalExpenses / totalBudget) * 100).toFixed(2) : "00"

return { totalIncome, totalExpenses, totalBudget, totalBalance, utilization }

}

export function getChartData(incomes: any[], expenses: any[]) {
  const grouped: Record<string, { income: number; expense: number }> = {};

  incomes.forEach((i) => {
    if (!i.date) return;
    const date = new Date(i.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };
    grouped[date].income += Number(i.amount);
  });

  expenses.forEach((e) => {
    if (!e.date) return;
    const date = new Date(e.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    if (!grouped[date]) grouped[date] = { income: 0, expense: 0 };
    grouped[date].expense += Number(e.amount);
  });

  return Object.entries(grouped).map(([date, { income, expense }]) => ({
    date,
    income,
    expense,
  }));
}