import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
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
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createIndicator } from "@/api/indicator/create"
import "@/containers/forms/indicator-form/styles.scss"

const CreateIndicatorForm: FC<CreateIndicatorFormProps> = ({ onSuccess }) => {
  const [, mutate] = useMutation(createIndicator, {
    successMessage: "Indicator was created successffully",
    errorMessage: "Unexpected error occured",
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

    onSuccess()
  }

  return (
    <form className="indicator-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="indicator-form__title create-indicator-form__title">
        New Indicator
      </h3>
      <div>
        <Label className="indicator-form__label-container" label="Indicator ID">
          <Input
            className="indicator-form__input"
            isError={Boolean(errors.id)}
            {...register("id")}
          />
        </Label>
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
          <TagInput tags={[]} onChange={handleTagsChange} />
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

export default CreateIndicatorForm
