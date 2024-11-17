import { FC } from "react"
import CreateValueForm from "@/containers/forms/value-form/create-value-form/CreateValueForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const CreateValueModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title="New Value" size="small">
      <CreateValueForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateValueModal
