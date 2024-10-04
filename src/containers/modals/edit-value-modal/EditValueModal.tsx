import { FC } from "react"
import EditValueForm from "@/containers/forms/value-form/edit-value-form/EditValueForm"
import { EditValueModalProps } from "@/containers/modals/edit-value-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditValueModal: FC<EditValueModalProps> = ({ value }) => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title="Edit Value" size="small">
      <EditValueForm value={value} onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default EditValueModal
