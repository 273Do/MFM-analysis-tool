import type {
  ArrayType1D,
  ArrayType2D,
} from "node_modules/danfojs/dist/danfojs-base/shared/types";

async function convertToTreeData(groupedData: ArrayType1D | ArrayType2D) {
  // ツリーチャート用のデータ構造を作成
  const treeData: {
    name: string;
    children: {
      name: string;
      children: { name: string; value: number; originalValue: number }[];
      value?: number;
      originalValue?: number;
    }[];
  } = {
    name: "収支合計",
    children: [],
  };

  // 大項目ごとにグループ化
  const categoryMap = new Map<string, any>();

  // データを処理してツリー構造に変換
  for (const item of groupedData) {
    const mainCategory = item[0]; // 大項目
    const subCategory = item[1]; // 中項目
    const amount = item[2]; // 金額

    // 大項目のノードがまだ存在しない場合は作成
    if (!categoryMap.has(mainCategory)) {
      const categoryNode = {
        name: mainCategory,
        children: [],
      };
      categoryMap.set(mainCategory, categoryNode);
      treeData.children.push(categoryNode);
    }

    // 中項目を追加
    const categoryNode = categoryMap.get(mainCategory);
    categoryNode.children.push({
      name: subCategory,
      value: Math.abs(amount),
      originalValue: amount,
    });
  }

  // 各大項目の合計を計算
  for (const categoryNode of treeData.children) {
    let total = 0;
    for (const child of categoryNode.children) {
      total += child.originalValue;
    }
    categoryNode.value = Math.abs(total);
    categoryNode.originalValue = total;
  }

  const formattedJson = JSON.stringify(treeData, null, 2);

  return formattedJson;
}

export default convertToTreeData;
