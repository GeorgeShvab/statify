import ChartProvider from "@/containers/Chart/ChartProvider/ChartProvider";
import ChartTitle from "@/containers/Chart/ChartTitle/ChartTitle";
import CopyChartButton from "@/containers/Chart/CopyChartButton/CopyChartButton";
import RangeSlider from "@/containers/Chart/RangeSlider/RangeSlider";
import { FC } from "react";
import { ChartProps } from "./Chart.types";
import ManageRegionsButton from "@/containers/ChartManagementModal/ChartManager/ChartManagerButton";
import ChartComponent from "../ChartContainer/ChartContainer";

const Chart: FC<ChartProps> = ({ indicator, data }) => {
  const isMultipleCountries = data.length > 1;

  return (
    <ChartProvider regions={data}>
      <>
        <div className="container mb-2 md:mb-3.5">
          <div
            className="px-3 pr-3 pt-4 pb-4 md:pt-6 md:px-7 md:pb-4 rounded-lg bg-white border relative"
            id="chart"
          >
            <div
              className={`absolute z-10 md:top-6 ${
                isMultipleCountries
                  ? "left-3 md:left-auto md:right-[68px]"
                  : "right-3 md:right-7"
              }`}
            >
              <CopyChartButton />
            </div>
            {isMultipleCountries && (
              <div className="absolute z-10 right-3 md:right-7 md:top-6">
                <ManageRegionsButton />
              </div>
            )}
            <ChartTitle label={indicator.label} unit={indicator.unit} />
            <div className="!min-h-[328px] md:!min-h-[520px] overflow-hidden">
              <ChartComponent />
            </div>
          </div>
        </div>
        <div className="container mb-2 md:mb-3.5 overflow-hidden">
          <div className="px-6 py-4 md:px-9 md:py-6 rounded-lg bg-white border">
            <div className="h-[32px] md:h-[30px]">
              <RangeSlider />
            </div>
          </div>
        </div>
      </>
    </ChartProvider>
  );
};

export default Chart;
