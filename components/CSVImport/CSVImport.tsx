import convertToTreeData from "@/functions/convert2Tree";
import convertToLineChartData from "@/functions/convertToLineChartData";
import mainFormat from "@/functions/mainFormat";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { LineChartComponent } from "../Chart/LineChart";

// CSVインポートとデータ処理を行うコンポーネント
const CSVImport = () => {
  const [data, setData] = useState<string | ArrayBuffer | null>(null);
  const [lineChartData, setLineChartData] = useState<any>(null);

  // ファイルをドロップしたときの処理
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles as File[]) {
      const reader = new FileReader();
      reader.onabort = () => alert("ファイル読み取りが中止されました。");
      reader.onerror = () => alert("ファイル読み取りが失敗しました。");
      reader.onload = async () => {
        if (file.name.includes("収入・支出詳細_") && file.type === "text/csv") {
          try {
            // csvデータを整形する
            const { grouped_values_by_year, grouped_values_by_month } =
              await mainFormat(acceptedFiles[0]);
            // console.log(grouped_values);

            const treeData = await convertToTreeData(grouped_values_by_year);
            const LineChartData = await convertToLineChartData(
              grouped_values_by_month,
            );

            console.log(treeData); //D3.js用のデータ
            console.log(LineChartData); // LineChart用のデータ
            setData(treeData);
            setLineChartData(LineChartData);
          } catch (error) {
            console.error("Error processing file:", error);
            alert("ファイルの処理中にエラーが発生しました。");
          }
        } else {
          alert("ファイルが正しくありません。");
        }
      };

      reader.readAsText(file);
    }

    // setData(formatted_data);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="aspect-square h-20 bg-slate-500">
          ファイルをドラッグ
        </div>
      </div>

      {data && lineChartData && (
        <div className="mt-4">
          <LineChartComponent data={lineChartData} />
          {/* D3のツリーマップを表示したり */}
          {/* <pre>
            {typeof data === "string" ? data : new TextDecoder().decode(data)}
          </pre> */}
        </div>
      )}
    </div>
  );
};

export default CSVImport;
