import { render } from "@testing-library/react"
import { SliderProps } from "rc-slider"
import RangeSlider from "@/components/chart/components/range-slider/RangeSlider"
import { Range } from "@/components/chart/components/range-slider/types"

const mockSlider = jest.fn()

const testNewRange = [1, 3]

jest.mock("rc-slider", () => ({
  __esModule: true,
  default: (props: SliderProps) => {
    props.onChange!(testNewRange)
    mockSlider(props)
  },
}))

const mockRange = Array.from(
  { length: 21 },
  (_: null, index: number) => 2000 + index
)
const mockSelectedRange: Range = [2010, 2015]

const mockSelectRange = jest.fn()

const expectedProps = {
  range: true,
  min: 0,
  max: 4,
  value: [2, 3],
  step: 1,
  ariaLabelForHandle: "Change years range",
  defaultValue: [0, 4],
  marks: {
    0: 2000,
    1: 2005,
    2: 2010,
    3: 2015,
    4: 2020,
  },
  onChange: expect.any(Function),
}

describe("Test RangeSlider component", () => {
  test("Should render slider with correct props", () => {
    render(
      <RangeSlider
        range={mockRange}
        selectedRange={mockSelectedRange}
        handleSelectRange={mockSelectRange}
      />
    )

    expect(mockSlider).toHaveBeenCalledWith(expectedProps)
  })

  test("Should call passed handleSelectRange callback with righ params", () => {
    render(
      <RangeSlider
        range={mockRange}
        selectedRange={mockSelectedRange}
        handleSelectRange={mockSelectRange}
      />
    )

    expect(mockSelectRange).toHaveBeenCalledWith([2005, 2015])
  })
})
