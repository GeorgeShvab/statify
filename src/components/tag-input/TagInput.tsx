import { FC, useState } from "react"
import { TagInputProps } from "./types"
import "./styles.scss"
import Tag from "@/ui/tag/Tag"
import TagWithInput from "./components/tag-with-input/TagWithInput"
import useDebounce from "@/hooks/use-debounce/useDebounce"

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
  )
}

export default TagInput
