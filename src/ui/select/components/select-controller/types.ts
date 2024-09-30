import { ControllerProps, FieldValues } from "react-hook-form"
import { Option, SelectProps } from "@/ui/select/Select.types"
import { Size } from "@/types/types"

export interface SelectControllerProps<T extends FieldValues>
  extends Omit<ControllerProps<T>, "render"> {
  options: Option[]
  selectProps?: Omit<SelectProps, "options" | "size">
  size?: Size
}
