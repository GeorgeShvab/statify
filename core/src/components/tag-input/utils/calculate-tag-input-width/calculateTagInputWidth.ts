const calculateTagInputWidth = (input: HTMLInputElement) => {
  const span = document.createElement("span")
  span.style.visibility = "hidden"
  span.style.whiteSpace = "pre"
  span.textContent = input.value || input.placeholder

  const styles = window.getComputedStyle(input)
  span.style.font = styles.font

  document.body.appendChild(span)
  const width = span.offsetWidth
  document.body.removeChild(span)

  return width
}

export default calculateTagInputWidth
