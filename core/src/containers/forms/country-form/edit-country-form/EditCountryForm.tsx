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
import translate from "@/modules/i18n"
import "@/containers/forms/country-form/styles.scss"

const EditCountryForm: FC<EditCountryFormProps> = ({ country, onSuccess }) => {
  const [data, mutate] = useMutation(updateCountry, {
    successMessage: translate("pages.countries_dashboard.updated_successfully"),
    errorMessage: translate("errors.unexpected_error"),
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

  const errorMsg = Object.values(errors)[0]?.message

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
        <Label label={translate("common.id")}>
          <Input className="full-width" value={country.id} readOnly />
        </Label>
        <Label label={translate("common.name")}>
          <Input
            className="full-width"
            isError={Boolean(errors.name)}
            {...register("name")}
          />
        </Label>
        <DataListDivider />
        <InputGroup>
          <Label label={translate("common.iso2code")}>
            <Input
              className="full-width"
              isError={Boolean(errors.iso2Code)}
              {...register("iso2Code")}
            />
          </Label>
          <Label label={translate("common.geocode")}>
            <Input
              className="full-width"
              isError={Boolean(errors.geoCode)}
              {...register("geoCode")}
            />
          </Label>
        </InputGroup>
        <Label label={translate("common.type")}>
          <SelectController<EditCountryFormValues>
            name="type"
            options={countryTypeOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label={translate("common.status")}>
          <SelectController<EditCountryFormValues>
            name="status"
            options={countryStatusOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label={translate("common.search_tags")}>
          <TagInput tags={country.searchTags} onChange={handleTagsChange} />
        </Label>
      </DataList>
      <p className="country-form__error-msg">
        {errorMsg ? errorMsg : <>&nbsp;</>}
      </p>
      <Button
        isLoading={data.isLoading}
        disabled={!isDirty || data.isLoading}
        type="submit"
        className="full-width"
      >
        {translate("common.save")}
      </Button>
    </form>
  )
}

export default EditCountryForm
