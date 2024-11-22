import { EditIndicatorFormValues } from "@/containers/forms/indicator-form/edit-indicator-form/types"

const filterDirtyValues = (
  data: EditIndicatorFormValues,
  dirtyValues: Partial<
    Record<keyof Omit<EditIndicatorFormValues, "searchTags">, boolean> & {
      searchTags: boolean[] | undefined
    }
  >
) => {
  const result = (
    Object.keys(dirtyValues) as (keyof EditIndicatorFormValues)[]
  ).reduce((acc, curr) => ({ ...acc, [curr]: data[curr] }), {})

  return result
}

export default filterDirtyValues
