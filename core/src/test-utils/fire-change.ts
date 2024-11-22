import { fireEvent } from "@testing-library/dom"

const fireChange = (el: HTMLElement, value: string) => {
  fireEvent.change(el, { target: { value } })
}

export default fireChange
