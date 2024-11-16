import html2canvas, { Options } from "html2canvas"

const saveToClipboardAsImage = async (
  htmleElement: HTMLElement,
  options?: Partial<Options>
) => {
  if (!htmleElement) throw new Error()

  const canvas = await html2canvas(htmleElement, options)

  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(async function (blob) {
      if (!blob) {
        reject("Error during saving occured")
        return
      }

      const item = new ClipboardItem({ "image/png": blob })

      await navigator.clipboard
        .write([item])
        .catch(() => reject("Error during saving occured"))

      resolve()
    })
  })
}

export default saveToClipboardAsImage
