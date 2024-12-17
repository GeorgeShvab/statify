import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/ui/button/Button"
import Input from "@/ui/input/Input"
import Label from "@/ui/label/Label"
import SelectController from "@/ui/select/components/select-controller/SelectController"
import {
  countryStatusOptions,
  countryTypeOptions,
} from "@/containers/forms/country-form/constants"
import {
  EditCountryFormProps,
  EditCountryFormValues,
} from "@/containers/forms/country-form/edit-country-form/types"
import getInitialValues from "@/containers/forms/country-form/edit-country-form/utils/getInitialValues"
import prepareData from "@/containers/forms/country-form/edit-country-form/utils/prepareData"
import editCountryValidationSchema from "@/containers/forms/country-form/edit-country-form/validationSchema"
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import InputGroup from "@/components/input-group/InputGroup"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import filterDirtyValues from "@/utils/filter-dirty-values/filterDirtyValues"
import { updateCountry } from "@/api/admin"
import "@/containers/forms/country-form/styles.scss"

const EditCountryForm: FC<EditCountryFormProps> = ({ country, onSuccess }) => {
  const [data, mutate] = useMutation(updateCountry, {
    successMessage: "Country was updated successffully",
    errorMessage: "Unexpected error occured",
    onSuccess,
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { dirtyFields, isDirty, errors },
    setValue,
  } = useForm<EditCountryFormValues>({
    values: getInitialValues(country),
    resolver: yupResolver(editCountryValidationSchema),
  })

  const handleTagsChange = (tags: string[]) => {
    setValue("searchTags", tags, { shouldDirty: true })
  }

  const onSubmit = async (data: EditCountryFormValues) => {
    if (!isDirty) return

    const filteredValues = filterDirtyValues<EditCountryFormValues>(
      data,
      dirtyFields
    )

    const preparedData = prepareData(filteredValues)

    await mutate({ ...preparedData, id: country.id })
  }

  return (
    <form className="country-form" onSubmit={handleSubmit(onSubmit)}>
      <DataList className="country-form__data-list">
        <Label label="Country ID">
          <Input className="full-width" value={country.id} readOnly />
        </Label>
        <Label label="Country name">
          <Input
            className="full-width"
            isError={Boolean(errors.name)}
            {...register("name")}
          />
        </Label>
        <DataListDivider />
        <InputGroup>
          <Label label="Iso2Code">
            <Input
              className="full-width"
              isError={Boolean(errors.iso2Code)}
              {...register("iso2Code")}
            />
          </Label>
          <Label label="GeoCode">
            <Input
              className="full-width"
              isError={Boolean(errors.geoCode)}
              {...register("geoCode")}
            />
          </Label>
        </InputGroup>
        <Label label="Type">
          <SelectController<EditCountryFormValues>
            name="type"
            options={countryTypeOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label="Status">
          <SelectController<EditCountryFormValues>
            name="status"
            options={countryStatusOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label="Search tags">
          <TagInput tags={country.searchTags} onChange={handleTagsChange} />
        </Label>
      </DataList>
      <Button
        isLoading={data.isLoading}
        disabled={!isDirty || data.isLoading}
        type="submit"
        className="full-width"
      >
        Save
      </Button>
    </form>
  )
}

export default EditCountryForm
