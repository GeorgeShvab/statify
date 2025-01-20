import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import Input from "@/ui/input/Input"
import Label from "@/ui/label/Label"
import Switch from "@/ui/switch/Switch"
import Textarea from "@/ui/textarea/Textarea"
import { initialValues } from "@/containers/forms/indicator-form/constants"
import {
  CreateIndicatorFormProps,
  CreateIndicatorFormValues,
} from "@/containers/forms/indicator-form/create-indicator-form/types"
import prepareValues from "@/containers/forms/indicator-form/create-indicator-form/utils/prepareValues"
import validationSchema from "@/containers/forms/indicator-form/create-indicator-form/validationSchema"
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import InputGroup from "@/components/input-group/InputGroup"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createIndicator } from "@/api/admin"
import translate from "@/modules/i18n"
import "@/containers/forms/indicator-form/styles.scss"

const CreateIndicatorForm: FC<CreateIndicatorFormProps> = ({ onSuccess }) => {
  const router = useRouter()

  const [data, mutate] = useMutation(createIndicator, {
    successMessage: translate(
      "pages.indicators_dashboard.updated_successfully"
    ),
    errorMessage: translate("errors.unexpected_error"),
    onSuccess: () => {
      onSuccess()
      router.refresh()
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
    setValue,
  } = useForm<CreateIndicatorFormValues>({
    values: initialValues,
    resolver: yupResolver(validationSchema),
  })

  const handleTagsChange = (tags: string[]) => {
    setValue("searchTags", tags, { shouldDirty: true })
  }

  const onSubmit = async (data: CreateIndicatorFormValues) => {
    if (!isDirty) return

    const preparedData = prepareValues(data)

    await mutate(preparedData)
  }

  const errorMsg = Object.values(errors)[0]?.message

  return (
    <form className="indicator-form" onSubmit={handleSubmit(onSubmit)}>
      <DataList className="indicator-form__data-list">
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
            isError={Boolean(errors.label)}
            {...register("label")}
          />
        </Label>
        <Label label={translate("common.description")}>
          <Textarea
            {...register("description")}
            isError={Boolean(errors.description)}
          />
        </Label>
        <DataListDivider />
        <InputGroup>
          <Label label={translate("common.source")}>
            <Input
              className="full-width"
              isError={Boolean(errors.source)}
              {...register("source")}
            />
          </Label>
          <Label label={translate("common.dataset")}>
            <Input
              className="full-width"
              isError={Boolean(errors.dataset)}
              {...register("dataset")}
            />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label label={translate("common.unit")}>
            <Input
              className="full-width"
              isError={Boolean(errors.unit)}
              {...register("unit")}
            />
          </Label>
          <Label label={translate("common.unit_symbol")}>
            <Input
              className="full-width"
              isError={Boolean(errors.unitSymbol)}
              {...register("unitSymbol")}
            />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label label={translate("common.precision")}>
            <Input
              className="full-width"
              isError={Boolean(errors.precision)}
              type="number"
              min={0}
              {...register("precision", { valueAsNumber: true })}
            />
          </Label>
          <Label label={translate("common.rank")}>
            <Input
              className="full-width"
              isError={Boolean(errors.ranking)}
              type="number"
              min={0}
              {...register("ranking", { valueAsNumber: true })}
            />
          </Label>
        </InputGroup>
        <DataListDivider />
        <Label label={translate("common.search_tags")}>
          <TagInput tags={[]} onChange={handleTagsChange} />
        </Label>
        <div className="indicator-form__switchers">
          <Switch {...register("hidden")}>{translate("common.hidden")}</Switch>
          <Switch {...register("showChart")}>
            {translate("pages.indicators_dashboard.show_chart")}
          </Switch>
          <Switch {...register("absolute")}>
            {translate("common.absolute")}
          </Switch>
        </div>
      </DataList>
      <p className="indicator-form__error-msg">
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

export default CreateIndicatorForm
