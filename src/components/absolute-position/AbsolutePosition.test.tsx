import { render, screen } from "@testing-library/react"
import AbsolutePosition from "@/components/absolute-position/AbsolutePosition"
import { AbsolutePositionProps } from "@/components/absolute-position/AbsolutePosition.types"

// Would be good to test whether top and left properties are correct

const mockAnchor = document.createElement("div")

const props: AbsolutePositionProps = {
  anchor: { current: mockAnchor },
  children: <span>Content</span>,
  position: "bottom-start",
  dependenciesForRecalculation: [],
  offset: 5,
}

describe("Test AbsolutePosition component", () => {
  beforeEach(() => {
    const { container } = render(
      <AbsolutePosition {...props}></AbsolutePosition>
    )

    container.appendChild(mockAnchor)
  })

  test("Should render passed children", () => {
    const content = screen.getByText("Content")
    expect(content).toBeInTheDocument()
  })

  test("Should apply offset", () => {
    const content = screen.getByText("Content").parentElement
    expect(content).toHaveStyle("top: 5px;")
  })
})
