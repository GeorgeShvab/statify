import { render, screen } from "@testing-library/react"
import Tag from "./Tag"

const content = "Test Tag"

describe("Test Tag component", () => {
  beforeEach(() => {
    render(<Tag>{content}</Tag>)
  })

  test("Should render passed content", () => {
    const tagEl = screen.getByText(content)
    expect(tagEl).toBeInTheDocument()
  })
})
