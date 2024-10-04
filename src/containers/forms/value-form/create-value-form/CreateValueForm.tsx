import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/ui/button/Button"
import Input from "@/ui/input/Input"
import Label from "@/ui/label/Label"
import {
  CreateValueFormProps,
  CreateValueFormValues,
} from "@/containers/forms/value-form/create-value-form/types"
import valueFormValidationSchema from "@/containers/forms/value-form/validationSchema"
import DataList from "@/components/data-list/DataList"
import InputGroup from "@/components/input-group/InputGroup"
import useMutation from "@/hooks/use-mutation/useMutation"
import { createValue } from "@/api/admin"
import "@/containers/forms/value-form/styles.scss"

const CreateValueForm: FC<CreateValueFormProps> = ({ onSuccess }) => {
  const [, mutate] = useMutation(createValue, {
    successMessage: "Value was created successffully",
    errorMessage: "Unexpected error occured",
    onSuccess,
  })

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = useForm<CreateValueFormValues>({
    resolver: yupResolver(valueFormValidationSchema),
  })

  const onSubmit = async (data: CreateValueFormValues) => {
    if (!isDirty) return

    await mutate(data)
  }

  return (
    <form className="value-form" onSubmit={handleSubmit(onSubmit)}>
      <DataList className="value-form__data-list">
        <InputGroup>
          <Label label="Indicator ID">
            <Input
              className="full-width"
              isError={Boolean(errors.indicatorId)}
              {...register("indicatorId")}
            />
          </Label>
          <Label label="Country ID">
            <Input
              className="full-width"
              isError={Boolean(errors.countryId)}
              {...register("countryId")}
            />
          </Label>
        </InputGroup>
        <InputGroup>
          <Label label="Value">
            <Input
              className="full-width"
              isError={Boolean(errors.value)}
              {...register("value")}
            />
          </Label>
          <Label label="Year">
            <Input
              className="full-width"
              isError={Boolean(errors.year)}
              {...register("year")}
            />
          </Label>
        </InputGroup>
      </DataList>
      <Button disabled={!isDirty} type="submit" className="full-width">
        Save
      </Button>
    </form>
  )
}

export default CreateValueForm
