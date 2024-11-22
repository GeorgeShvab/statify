import { FC } from "react"
import { Indicator } from "@prisma/client"
import EditIndicatorForm from "@/containers/forms/indicator-form/edit-indicator-form/EditIndicatorForm"
import { EditIndicatorModalProps } from "@/containers/modals/edit-indicator-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditIndicatorModal: FC<EditIndicatorModalProps> = ({
  indicator,
  onSuccess,
}) => {
  const { closeModal } = useModal()

  const handleSuccess = (data: Partial<Indicator> & Pick<Indicator, "id">) => {
    closeModal()
    if (onSuccess) onSuccess(data)
  }

  return (
    <ModalContainer title="Edit Indicator">
      <EditIndicatorForm indicator={indicator} onSuccess={handleSuccess} />
    </ModalContainer>
  )
}

export default EditIndicatorModal
