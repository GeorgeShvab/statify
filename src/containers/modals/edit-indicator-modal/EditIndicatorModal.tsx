import { FC } from "react"
import { EditIndicatorModalProps } from "./types"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import ModalContainer from "@/components/modal-container/ModalContainer"
import EditIndicatorForm from "@/containers/forms/indicator-form/edit-indicator-form/EditIndicatorForm"

const EditIndicatorModal: FC<EditIndicatorModalProps> = ({ indicator }) => {
  const { closeModal } = useModal()

  return (
    <ModalContainer>
      <EditIndicatorForm indicator={indicator} onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default EditIndicatorModal
