import { FC } from "react"
import Tag from "@/ui/tag/Tag"
import { TagWithInputProps } from "@/components/tag-input/components/tag-with-input/types"
import calculateTagInputWidth from "@/components/tag-input/utils/calculate-tag-input-width/calculateTagInputWidth"

const TagWithInput: FC<TagWithInputProps> = ({ onRemove, ...props }) => {
  const handleRef = (el: HTMLInputElement) => {
    if (el) {
      const calculatedWidth = calculateTagInputWidth(el)
      const width = `${Math.max(calculatedWidth, 10)}px`

      el.style.width = width
    }
  }

  return (
    <Tag>
      <input
        ref={handleRef}
        className="tag-input__input"
        placeholder="Empty Tag"
        {...props}
      />
      <button
        className="tag-input__remove-button"
        type="button"
        onClick={onRemove}
      >
        &nbsp; &times;
      </button>
    </Tag>
  )
}

export default TagWithInput
