import { FC } from "react"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import CreateIndicatorForm from "@/containers/forms/indicator-form/create-indicator-form/CreateIndicatorForm"

const CreateIndicatorModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer>
      <CreateIndicatorForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateIndicatorModal
