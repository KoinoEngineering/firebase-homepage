import React from "react";
import { Line, LineChart, LineProps, ResponsiveContainer, XAxis, YAxis } from "recharts";
import utils from "src/utils";
import { ReplaceSortElement } from "./ReplaceSortContents";

interface ReplaceSortChartProps {
    chartObject: ChartObject;
}

export type ReplaceSortChartState = ReplaceSortChartProps;
interface ChartObject {
    data: ChartData[];
    lines: ChartLine[]
}

type Index = number;
export type ChartData = {
    step: number;
    [id: string]: Index;
}

interface ChartLine extends LineProps {
    dataKey: string;
}

const ReplaceSortChart: React.FC<ReplaceSortChartProps> = ({ chartObject: { data, lines } }) => {
    return <ResponsiveContainer width={"100%"} height={lines.length * 10}>
        <LineChart data={data}>
            <XAxis dataKey="step" />
            <YAxis />
            {
                lines.map(line => <Line key={line.dataKey} dot={false} {...line} />)
            }
        </LineChart>
    </ResponsiveContainer>;

};

export default ReplaceSortChart;

export const initialReplaceSortChartState = (contents: ReplaceSortElement[] = []): ReplaceSortChartState => ({
    chartObject: {
        data: [contents2ChartData(contents, 0)],
        lines: contents2Lines(contents),
    }
});

export const contents2ChartData = function <T extends ReplaceSortElement>(contents: T[], step: number): ChartData {
    return contents.reduce((chartData, item, i) => {
        chartData[item.id] = i;
        return chartData;
    }, { step } as ChartData);
};
export const contents2Lines = function <T extends ReplaceSortElement>(contents: T[]): ChartObject["lines"] {

    return contents.map(item => ({ dataKey: item.id, stroke: `hsl(${item.value / utils.max(contents, (c) => c.value) * 360}, 50%, 50%)`, type: "linear", dot: false }));
};
