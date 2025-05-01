import format from "@/functions/format";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AnalyzeResult from "../AnalyzeResult/AnalyzeResult";

const CSVImport = () => {
  const [data, setData] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // for (const file of acceptedFiles as File[]) {
    //   const reader = new FileReader();
    //   reader.onabort = () => console.log("ファイル読み取りが中止されました。");
    //   reader.onerror = () => console.log("ファイル読み取りが失敗しました。");
    //   reader.onload = () => {
    //     const binaryStr = reader.result;
    //     // CSVのデータをコンソールに表示する

    //     analyzeData(binaryStr);
    //     setHaveResult(binaryStr);
    //   };

    //   reader.readAsText(file);
    // }

    await format(acceptedFiles[0]);

    // setData(formatted_data);

    // console.log("Formatted Data:", formatted_data);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      {data == null ? (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="aspect-square h-20 bg-slate-500">
            ファイルをドラッグ
          </div>
        </div>
      ) : (
        <AnalyzeResult />
      )}
    </div>
  );
};

export default CSVImport;
