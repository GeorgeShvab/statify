import { waitFor } from "@testing-library/dom"
import saveToClipboardAsImage from "@/utils/save-to-clipboard-as-image/saveToClipboardAsImage"

/**
 * @group utils
 */

const mockClipboardWrite = jest.fn(() => ({ catch: jest.fn() }))
const mockClipboardItem = jest.fn()
const mockHtmlCanvas = jest
  .fn()
  .mockReturnValue({ toBlob: (fn: (blob: Blob) => void) => fn(new Blob()) })

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: { write: () => mockClipboardWrite() },
})

jest.mock("html2canvas", () => ({
  __esModule: true,
  default: () => mockHtmlCanvas(),
}))

Object.defineProperty(window, "ClipboardItem", {
  value: mockClipboardItem,
})

describe("Test saveToClipboardAsImage", () => {
  test("Should successfully save image in a clipboard", async () => {
    saveToClipboardAsImage(document.createElement("div"))

    expect(mockHtmlCanvas).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockClipboardItem).toHaveBeenCalled()
      expect(mockClipboardWrite).toHaveBeenCalled()
    })
  })
})
