import { ComponentProps } from "react"
import { SelectProps } from "@/ui/select/Select.types"

export interface SelectWithSearchProps
  extends Omit<SelectProps, "containerProps">,
    Omit<ComponentProps<"div">, "onChange"> {
  containerProps?: ComponentProps<"div">
}
