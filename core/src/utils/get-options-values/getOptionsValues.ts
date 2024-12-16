import { Option } from "@/ui/select/Select.types"

export const getOptionsValues = <T extends readonly Option[]>(
  options: T
): T[number]["value"][] => {
  return options.map((option) => option.value)
}
