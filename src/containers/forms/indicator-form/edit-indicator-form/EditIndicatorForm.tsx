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
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import InputGroup from "@/components/input-group/InputGroup"
import TagInput from "@/components/tag-input/TagInput"
import useMutation from "@/hooks/use-mutation/useMutation"
import { updateIndicator } from "@/api/admin"
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
      <DataList className="indicator-form__data-list">
        <Label label="Indicator ID">
          <Input className="full-width" value={indicator.id} readOnly />
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
          <TagInput
            tags={indicator.searchTags || []}
            onChange={handleTagsChange}
          />
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

export default EditIndicatorForm
