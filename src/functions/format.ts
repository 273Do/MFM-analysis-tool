import * as dfd from "danfojs";

async function format(data: string | ArrayBuffer | File) {
  const df = await dfd.readCSV(data);

  // dfを作成
  const selectedDf = df.loc({ columns: ["金額（円）", "大項目", "中項目"] });

  selectedDf.print();

  // 大項目・中項目ごとに金額を合計
  const grouped = selectedDf
    .groupby(["大項目", "中項目"])
    .col(["金額（円）"])
    .sum();

  // ツリーマップ形式の JSON を構築
  const root = { name: "root", children: [] };

  console.log(grouped.values);

  // return { formatted_data };
}

export default format;
