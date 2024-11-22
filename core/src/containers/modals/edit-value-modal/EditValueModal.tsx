import { FC } from "react"
import { Value } from "@prisma/client"
import EditValueForm from "@/containers/forms/value-form/edit-value-form/EditValueForm"
import { EditValueModalProps } from "@/containers/modals/edit-value-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditValueModal: FC<EditValueModalProps> = ({ value, onSuccess }) => {
  const { closeModal } = useModal()

  const handleSuccess = (data: Partial<Value> & Pick<Value, "id">) => {
    closeModal()
    if (onSuccess) onSuccess(data)
  }

  return (
    <ModalContainer title="Edit Value" size="small">
      <EditValueForm value={value} onSuccess={handleSuccess} />
    </ModalContainer>
  )
}

export default EditValueModal
