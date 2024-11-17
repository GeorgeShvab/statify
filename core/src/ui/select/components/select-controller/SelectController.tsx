import { Controller, FieldValues } from "react-hook-form"
import Select from "@/ui/select/Select"
import { Option } from "@/ui/select/Select.types"
import { SelectControllerProps } from "@/ui/select/components/select-controller/types"

const SelectController = <T extends FieldValues>({
  options,
  selectProps,
  size,
  ...props
}: SelectControllerProps<T>) => {
  return (
    <Controller
      {...props}
      render={({ field }) => {
        const onChange = (option: Option) => {
          field.onChange(option.value)
        }

        return (
          <Select
            size={size}
            options={options}
            {...selectProps}
            {...field}
            onChange={onChange}
          />
        )
      }}
    />
  )
}

export default SelectController
