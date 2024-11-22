import { FC } from "react"
import CreateIndicatorForm from "@/containers/forms/indicator-form/create-indicator-form/CreateIndicatorForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const CreateIndicatorModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title="New Indicator">
      <CreateIndicatorForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateIndicatorModal
