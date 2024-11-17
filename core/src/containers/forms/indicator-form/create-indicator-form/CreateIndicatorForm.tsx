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
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import InputGroup from "@/components/input-group/InputGroup"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createIndicator } from "@/api/admin"
import "@/containers/forms/indicator-form/styles.scss"

const CreateIndicatorForm: FC<CreateIndicatorFormProps> = ({ onSuccess }) => {
  const [, mutate] = useMutation(createIndicator, {
    successMessage: "Indicator was created successffully",
    errorMessage: "Unexpected error occured",
    onSuccess,
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

  return (
    <form className="indicator-form" onSubmit={handleSubmit(onSubmit)}>
      <DataList className="indicator-form__data-list">
        <Label label="Indicator ID">
          <Input
            className="full-width"
            isError={Boolean(errors.id)}
            {...register("id")}
          />
        </Label>
        <Label label="Indicator name">
          <Input
            className="full-width"
            isError={Boolean(errors.label)}
            {...register("label")}
          />
        </Label>
        <Label label="Indicator description">
          <Textarea
            {...register("description")}
            isError={Boolean(errors.description)}
          />
        </Label>
        <DataListDivider />
        <InputGroup>
          <Label label="Source">
            <Input
              className="full-width"
              isError={Boolean(errors.source)}
              {...register("source")}
            />
          </Label>
          <Label label="Dataset">
            <Input
              className="full-width"
              isError={Boolean(errors.dataset)}
              {...register("dataset")}
            />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label label="Unit">
            <Input
              className="full-width"
              isError={Boolean(errors.unit)}
              {...register("unit")}
            />
          </Label>
          <Label label="Unit symbol">
            <Input
              className="full-width"
              isError={Boolean(errors.unitSymbol)}
              {...register("unitSymbol")}
            />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label label="Precision">
            <Input
              className="full-width"
              isError={Boolean(errors.precision)}
              type="number"
              min={0}
              {...register("precision", { valueAsNumber: true })}
            />
          </Label>
          <Label label="Rank">
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
        <Label label="Search tags">
          <TagInput tags={[]} onChange={handleTagsChange} />
        </Label>
        <div className="indicator-form__switchers">
          <Switch {...register("hidden")}>Hidden</Switch>
          <Switch {...register("showChart")}>Show chart</Switch>
          <Switch {...register("absolute")}>Absolute</Switch>
        </div>
      </DataList>
      <Button disabled={!isDirty} type="submit" className="full-width">
        Save
      </Button>
    </form>
  )
}

export default CreateIndicatorForm
