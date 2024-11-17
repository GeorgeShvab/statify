import { AxiosResponse } from "axios"
import { SelectWithSearchProps } from "@/ui/select-with-search/SelectWithSearch.types"
import { Option } from "@/ui/select/Select.types"

export interface LoadableSelectWithSearchProps
  extends Omit<SelectWithSearchProps, "options"> {
  apiService: () => Promise<AxiosResponse<Option[]>>
}
