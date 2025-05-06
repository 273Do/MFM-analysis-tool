import * as dfd from "danfojs";
import totalExpendituresByItem from "./totalExpendituresByItem";

export default async function mainFormat(data: string | ArrayBuffer | File) {
  // CSVを読み込む
  const df = await dfd.readCSV(data);

  // 項目ごとの支出の合計(年間、月間)
  const [grouped_values_by_year, grouped_values_by_month] =
    await totalExpendituresByItem(df);

  return { grouped_values_by_year, grouped_values_by_month };
}
