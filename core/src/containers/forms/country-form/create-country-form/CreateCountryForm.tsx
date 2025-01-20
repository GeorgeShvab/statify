import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
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
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import InputGroup from "@/components/input-group/InputGroup"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createCountry } from "@/api/admin"
import translate from "@/modules/i18n"
import "@/containers/forms/country-form/styles.scss"

const CreateCountryForm: FC<CreateCountryFormProps> = ({ onSuccess }) => {
  const router = useRouter()

  const [data, mutate] = useMutation(createCountry, {
    successMessage: translate("pages.countries_dashboard.created_successfully"),
    errorMessage: translate("errors.unexpected_error"),
    onSuccess: () => {
      onSuccess()
      router.refresh()
    },
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

  const errorMsg = Object.values(errors)[0]?.message

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
      <DataList className="country-form__data-list">
        <Label label={translate("common.id")}>
          <Input
            className="full-width"
            isError={Boolean(errors.id)}
            {...register("id")}
          />
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
          <SelectController<CreateCountryFormValues>
            name="type"
            options={countryTypeOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label={translate("common.status")}>
          <SelectController<CreateCountryFormValues>
            name="status"
            options={countryStatusOptions}
            size="small"
            control={control}
          />
        </Label>
        <Label label={translate("common.search_tags")}>
          <TagInput tags={[]} onChange={handleTagsChange} />
        </Label>
      </DataList>
      <p className="country-form__error-msg">
        {errorMsg ? errorMsg : <>&nbsp;</>}
      </p>
      <Button
        disabled={!isDirty || data.isLoading}
        isLoading={data.isLoading}
        type="submit"
        className="full-width"
      >
        {translate("common.save")}
      </Button>
    </form>
  )
}

export default CreateCountryForm
