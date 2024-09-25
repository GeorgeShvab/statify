import { render, screen } from "@testing-library/react"
import Label from "./Label"

const titleText = "This is label"
const labelContent = "Some text inside of a label"

describe("Test Label component", () => {
  beforeEach(() => {
    render(<Label label={titleText}>{labelContent}</Label>)
  })

  test("Should render passed label", () => {
    const titleEl = screen.getByText(titleText)
    expect(titleEl).toBeInTheDocument()
  })

  test("Should render passed label content", () => {
    const labelContentEl = screen.getByText(labelContent)
    expect(labelContentEl).toBeInTheDocument()
  })
})
