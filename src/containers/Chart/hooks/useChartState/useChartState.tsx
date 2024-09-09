import { ChartItem, CountryWithValues } from "@/types";
import { useMemo, useState } from "react";
import useRegionsParams from "@/containers/Chart/hooks/useRegionsParams/useRegionsParams";
import generateRandomColor from "@/utils/generateRandomColor";
import getInitialChartState from "./utils/getInitialChartState";
import getShortening from "./utils/getShortening";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import getYearsRange from "./utils/getYearsRange";
import { ChartSelectedRange } from "../../ChartProvider/ChartProvider.types";

const MAX_SELECTED_COUNT = 15;

const calculateNextSelectedRange = (
  prevSelectedRange: ChartSelectedRange,
  prevRange: number[],
  newRange: number[]
): ChartSelectedRange => {
  const min = newRange[0];
  const max = newRange[newRange.length - 1];

  let selectedMin = prevSelectedRange[0] >= min ? prevSelectedRange[0] : min;
  let selectedMax = prevSelectedRange[1] <= max ? prevSelectedRange[1] : max;

  if (selectedMin === prevRange[0]) {
    selectedMin = newRange[0];
  }

  if (selectedMax === prevRange[prevRange.length - 1]) {
    selectedMax = newRange[newRange.length - 1];
  }

  return [selectedMin, selectedMax];
};

const useChartState = (regions: CountryWithValues[]) => {
  const { openAlert } = useAlert();

  const initial = useMemo(() => getInitialChartState(regions), []);

  const [data, setData] = useState(initial.regions);
  const [largestValue, setLargestValue] = useState(initial.shortening);
  const [selectedCount, setSelectedCount] = useState(initial.selectedCount);

  const [range, setRange] = useState(() => getYearsRange(data));

  const [selectedRange, setSelectedRange] = useState<ChartSelectedRange>([
    range[0],
    range[range.length - 1],
  ]);

  const setColor = (id: string, color: string) => {
    const newState = data.map((item) =>
      item.id === id ? { ...item, color } : item
    );

    setData(newState);
  };

  const selectRegion = (id: string) => {
    if (selectedCount === MAX_SELECTED_COUNT) {
      openAlert({ text: "You can select up to 15 regions", severity: "info" });
      return;
    }

    let newLargestValue = 0;

    const selectedItemsArray: ChartItem[] = [];

    const newState = data.map((item) => {
      if (item.maxValue.value > newLargestValue) {
        newLargestValue = item.maxValue.value;
      }

      if (item.id === id || item.isSelected) {
        selectedItemsArray.push(item);
      }

      if (item.id !== id) return item;

      return { ...item, isSelected: true, color: generateRandomColor() };
    });

    const newRange = getYearsRange(selectedItemsArray);

    setRange(newRange);
    setData(newState);
    setSelectedCount((prev) => prev + 1);
    setLargestValue(newLargestValue);

    const newSelectedRange = calculateNextSelectedRange(
      selectedRange,
      range,
      newRange
    );
    setSelectedRange(newSelectedRange);
  };

  const unselectRegion = (id: string) => {
    let newLargestValue = 0;

    const selectedItemsArray: ChartItem[] = [];

    const newState = data.map((item) => {
      if (item.maxValue.value > newLargestValue) {
        newLargestValue = item.maxValue.value;
      }

      if (item.id !== id && item.isSelected) {
        selectedItemsArray.push(item);
      }

      if (item.id !== id) return item;

      return { ...item, isSelected: false };
    });

    const newRange = getYearsRange(selectedItemsArray);

    setRange(newRange);
    setData(newState);
    setSelectedCount((prev) => prev - 1);
    setLargestValue(newLargestValue);

    const newSelectedRange = calculateNextSelectedRange(
      selectedRange,
      range,
      newRange
    );
    setSelectedRange(newSelectedRange);
  };

  useRegionsParams(data);

  return {
    data,
    setColor,
    selectRegion,
    unselectRegion,
    setRange,
    setSelectedRange,
    range,
    selectedRange,
    shortening: getShortening(largestValue),
    selectedCount,
  };
};

export default useChartState;
