import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../src/components/ui/chart";

// FIXME 誰か代わりに自動で検出するようにして〜
const chartConfig = {
  交際費: {
    label: "交際費",
    color: "hsl(var(--chart-1))",
  },
  教養・教育: {
    label: "教養・教育",
    color: "hsl(var(--chart-2))",
  },
  未分類: {
    label: "未分類",
    color: "hsl(var(--chart-3))",
  },
  現金・カード: {
    label: "現金・カード",
    color: "hsl(var(--chart-4))",
  },
  通信費: {
    label: "通信費",
    color: "hsl(var(--chart-5))",
  },
  食費: {
    label: "食費",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartComponent(data: any) {
  //   console.log(data["data"]);
  const { data: chartData } = data;
  console.log(chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle> 年間支出遷移 </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              domain={[0, "dataMax + 10000"]}
              tickFormatter={(value) => {
                return value.toLocaleString();
              }}
            /> */}
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="交際費"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="教養・教育"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="未分類"
              type="monotone"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="現金・カード"
              type="monotone"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="通信費"
              type="monotone"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="食費"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
