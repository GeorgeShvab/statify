import { FC } from "react"
import CreateValueForm from "@/containers/forms/value-form/create-value-form/CreateValueForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const CreateValueModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer
      title={translate("pages.values_dashboard.new_value")}
      size="small"
    >
      <CreateValueForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateValueModal
