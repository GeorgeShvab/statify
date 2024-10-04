import { FC } from "react"
import EditIndicatorForm from "@/containers/forms/indicator-form/edit-indicator-form/EditIndicatorForm"
import { EditIndicatorModalProps } from "@/containers/modals/edit-indicator-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditIndicatorModal: FC<EditIndicatorModalProps> = ({ indicator }) => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title="Edit Indicator">
      <EditIndicatorForm indicator={indicator} onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default EditIndicatorModal
