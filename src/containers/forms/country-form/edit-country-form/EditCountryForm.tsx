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
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import filterDirtyValues from "@/utils/filter-dirty-values/filterDirtyValues"
import { updateCountry } from "@/api/country/update"
import "@/containers/forms/country-form/styles.scss"

const UpdateCountryForm: FC<EditCountryFormProps> = ({
  country,
  onSuccess,
}) => {
  const [, mutate] = useMutation(updateCountry, {
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
      <h3 className="country-form__title">Edit Country</h3>
      <p className="country-form__subtitle">{country.id}</p>
      <div>
        <Label className="country-form__label-container" label="Country name">
          <Input
            className="country-form__input"
            isError={Boolean(errors.name)}
            {...register("name")}
          />
        </Label>
        <div className="country-form__input-group country-form__label-container">
          <Label label="Iso2Code" className="country-form__input-label">
            <Input
              className="country-form__input"
              isError={Boolean(errors.iso2Code)}
              {...register("iso2Code")}
            />
          </Label>
          <Label label="GeoCode" className="country-form__input-label">
            <Input
              className="country-form__input"
              isError={Boolean(errors.geoCode)}
              {...register("geoCode")}
            />
          </Label>
        </div>
        <Label className="country-form__label-container" label="Search tags">
          <TagInput tags={country.searchTags} onChange={handleTagsChange} />
        </Label>
        <Label className="country-form__label-container" label="Type">
          <SelectController<EditCountryFormValues>
            name="type"
            options={countryTypeOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label className="country-form__label-container" label="Status">
          <SelectController<EditCountryFormValues>
            name="status"
            options={countryStatusOptions}
            size="small"
            control={control}
          />
        </Label>
        <Button
          disabled={!isDirty}
          type="submit"
          className="country-form__save-button"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default UpdateCountryForm
