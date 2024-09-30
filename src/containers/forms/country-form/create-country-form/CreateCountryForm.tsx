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
  initialValues,
} from "@/containers/forms/country-form/constants"
import {
  CreateCountryFormProps,
  CreateCountryFormValues,
} from "@/containers/forms/country-form/create-country-form/types"
import createCountryValidationSchema from "@/containers/forms/country-form/create-country-form/validationSchema"
import { EditableCountryFields } from "@/containers/forms/country-form/edit-country-form/types"
import prepareData from "@/containers/forms/country-form/edit-country-form/utils/prepareData"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createCountry } from "@/api/country/create"
import "@/containers/forms/country-form/styles.scss"

const CreateCountryForm: FC<CreateCountryFormProps> = ({ onSuccess }) => {
  const [, mutate] = useMutation(createCountry, {
    successMessage: "Country was updated successffully",
    errorMessage: "Unexpected error occured",
    onSuccess,
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, errors },
    setValue,
  } = useForm<CreateCountryFormValues>({
    values: initialValues,
    resolver: yupResolver(createCountryValidationSchema),
  })

  const handleTagsChange = (tags: string[]) => {
    setValue("searchTags", tags, { shouldDirty: true })
  }

  const onSubmit = async (data: CreateCountryFormValues) => {
    if (!isDirty) return

    const preparedData = prepareData<
      CreateCountryFormValues,
      EditableCountryFields & { id: string }
    >(data)

    await mutate(preparedData)
  }

  return (
    <form className="country-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="country-form__title">Edit Country</h3>
      <div>
        <Label className="country-form__label-container" label="Country ID">
          <Input
            className="country-form__input"
            isError={Boolean(errors.id)}
            {...register("id")}
          />
        </Label>
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
          <TagInput tags={[]} onChange={handleTagsChange} />
        </Label>
        <Label className="country-form__label-container" label="Type">
          <SelectController<CreateCountryFormValues>
            name="type"
            options={countryTypeOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label className="country-form__label-container" label="Status">
          <SelectController<CreateCountryFormValues>
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

export default CreateCountryForm
