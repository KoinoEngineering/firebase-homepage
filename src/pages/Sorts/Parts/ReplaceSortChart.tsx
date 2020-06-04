import React from "react";
import { Line, LineChart, LineProps, ResponsiveContainer, XAxis, YAxis } from "recharts";
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

export const initialReplaceSortChartState = (): ReplaceSortChartState => ({
    chartObject: {
        data: [],
        lines: [],
    }
});

export const contents2ChartData = function <T extends ReplaceSortElement>(contents: T[], step: number): ChartData {
    return contents.reduce((chartData, item, i) => {
        chartData[item.id] = i;
        return chartData;
    }, { step } as ChartData);
};
export const contents2Lines = function <T extends ReplaceSortElement>(contents: T[]): ChartObject["lines"] {

    const getMax = (contents: T[], callback: (i: T) => number): T =>
        contents.reduce((maxItem, item) => {
            if (callback(maxItem) < callback(item)) {
                return item;
            } else {
                return maxItem;
            }
        }, contents[0]);

    const max = getMax(contents, (c) => c.value).value;

    return contents.map(item => ({ dataKey: item.id, stroke: `hsl(${item.value / max * 360}, 50%, 50%)`, type: "monotone", dot: false }));
};
