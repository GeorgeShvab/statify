import { fireEvent, render, screen } from "@testing-library/react"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"

const mockOnOutsideClick = jest.fn()

describe("Test DetectOutsideClick component", () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(
      <DetectOutsideClick onOutsideClick={mockOnOutsideClick}>
        <span>Content</span>
      </DetectOutsideClick>
    ).container
  })

  test("Should render passed content", () => {
    const content = screen.getByText("Content")
    expect(content).toBeInTheDocument()
  })

  test("Should call passed onOutsideClick fn when outside click occurs", () => {
    fireEvent.click(container)
    expect(mockOnOutsideClick).toHaveBeenCalled()
  })
})
