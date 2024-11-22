import { FC, useState } from "react"
import Tag from "@/ui/tag/Tag"
import TagWithInput from "@/components/tag-input/components/tag-with-input/TagWithInput"
import { TagInputProps } from "@/components/tag-input/types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import "@/components/tag-input/styles.scss"

// TODO: Add input focus when new tag is added

export const TagInput: FC<TagInputProps> = ({ tags, onChange }) => {
  const [tagsArray, setTagsArray] = useState(tags)

  const debouncedHandleChange = useDebounce(onChange, 500, [onChange])

  const handleRemoveTag = (index: number) => {
    const newTags = tagsArray.filter((_, i) => index !== i)

    setTagsArray(newTags)
    debouncedHandleChange(newTags.filter((item) => item.trim()))
  }

  const handleChange = (value: string, index: number) => {
    const newTags = tagsArray.map((item, i) => (index === i ? value : item))

    setTagsArray(newTags)
    debouncedHandleChange(newTags.filter((item) => item.trim()))
  }

  const handleAddTag = () => {
    setTagsArray((prev) => [...prev, ""])
  }

  return (
    <div className="tag-input__container">
      <div className="tag-input">
        {tagsArray.map((item, index) => (
          <TagWithInput
            key={index}
            value={item}
            onRemove={() => handleRemoveTag(index)}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
        <button onClick={handleAddTag} type="button">
          <Tag>
            <span>Add tags &nbsp; +</span>
          </Tag>
        </button>
      </div>
    </div>
  )
}

export default TagInput
