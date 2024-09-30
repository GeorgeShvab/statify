import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/ui/button/Button"
import Input from "@/ui/input/Input"
import Label from "@/ui/label/Label"
import Switch from "@/ui/switch/Switch"
import Textarea from "@/ui/textarea/Textarea"
import {
  EditIndicatorFormProps,
  EditIndicatorFormValues,
} from "@/containers/forms/indicator-form/edit-indicator-form/types"
import filterDirtyValues from "@/containers/forms/indicator-form/edit-indicator-form/utils/filterDirtyValues"
import getInitialValues from "@/containers/forms/indicator-form/edit-indicator-form/utils/getInitialValues"
import validationSchema from "@/containers/forms/indicator-form/edit-indicator-form/validationSchema"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { updateIndicator } from "@/api/indicator/update"
import "@/containers/forms/indicator-form/styles.scss"

const EditIndicatorForm: FC<EditIndicatorFormProps> = ({
  indicator,
  onSuccess,
}) => {
  const [, mutate] = useMutation(updateIndicator, {
    successMessage: "Indicator was updated successffully",
    errorMessage: "Unexpected error occured",
    onSuccess,
  })

  const {
    handleSubmit,
    register,
    formState: { dirtyFields, isDirty, errors },
    setValue,
  } = useForm<EditIndicatorFormValues>({
    values: getInitialValues(indicator),
    resolver: yupResolver(validationSchema),
  })

  const handleTagsChange = (tags: string[]) => {
    setValue("searchTags", tags, { shouldDirty: true })
  }

  const onSubmit = async (data: EditIndicatorFormValues) => {
    if (!isDirty) return

    const filteredValues = filterDirtyValues(data, dirtyFields)

    await mutate({ ...filteredValues, id: indicator.id })
  }

  return (
    <form className="indicator-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="indicator-form__title">Edit Indicator</h3>
      <p className="indicator-form__subtitle">{indicator.id}</p>
      <div>
        <Label
          className="indicator-form__label-container"
          label="Indicator name"
        >
          <Input
            className="indicator-form__input"
            isError={Boolean(errors.label)}
            {...register("label")}
          />
        </Label>
        <Label
          className="indicator-form__label-container"
          label="Indicator description"
        >
          <Textarea
            {...register("description")}
            isError={Boolean(errors.description)}
          />
        </Label>
        <Label className="indicator-form__label-container" label="Search tags">
          <TagInput tags={indicator.searchTags} onChange={handleTagsChange} />
        </Label>
        <div className="indicator-form__input-group indicator-form__label-container">
          <Label label="Source" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.source)}
              {...register("source")}
            />
          </Label>
          <Label label="Dataset" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.dataset)}
              {...register("dataset")}
            />
          </Label>
        </div>
        <div className="indicator-form__input-group indicator-form__label-container">
          <Label label="Unit" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.unit)}
              {...register("unit")}
            />
          </Label>
          <Label label="Unit symbol" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.unitSymbol)}
              {...register("unitSymbol")}
            />
          </Label>
        </div>
        <div className="indicator-form__input-group indicator-form__label-container">
          <Label label="Precision" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.precision)}
              type="number"
              min={0}
              {...register("precision", { valueAsNumber: true })}
            />
          </Label>
          <Label label="Rank" className="indicator-form__input-label">
            <Input
              className="indicator-form__input"
              isError={Boolean(errors.ranking)}
              type="number"
              min={0}
              {...register("ranking", { valueAsNumber: true })}
            />
          </Label>
        </div>
        <div className="indicator-form__input-group indicator-form__switchers">
          <Switch {...register("hidden")}>Hidden</Switch>
          <Switch {...register("showChart")}>Show chart</Switch>
          <Switch {...register("absolute")}>Absolute</Switch>
        </div>
        <Button
          disabled={!isDirty}
          type="submit"
          className="indicator-form__save-button"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default EditIndicatorForm
