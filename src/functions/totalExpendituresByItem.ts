import type * as dfd from "danfojs";

// 項目ごとの支出を合計する処理
export default async function totalExpendituresByItem(df: dfd.DataFrame) {
  // 年間の支出合計を取得===========================
  const mask = df["金額（円）"].lt(0); // 値がマイナスのもののみを取得
  const selectedDf = df.loc({
    rows: mask,
    columns: ["金額（円）", "大項目", "中項目"],
  });

  // 大項目・中項目ごとに金額を合計
  const grouped = selectedDf
    .groupby(["大項目", "中項目"])
    .col(["金額（円）"])
    .sum();

  const grouped_values_by_year = grouped.values;

  // 月別の合計を取得============================

  const _selectedDf = df.loc({
    rows: mask,
    columns: ["金額（円）", "大項目", "日付"],
  });

  const grouped_values_by_month = _selectedDf.values;

  return [grouped_values_by_year, grouped_values_by_month];
}
