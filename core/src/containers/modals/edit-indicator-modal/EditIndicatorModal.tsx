import { FC } from "react"
import EditIndicatorForm from "@/containers/forms/indicator-form/edit-indicator-form/EditIndicatorForm"
import { EditIndicatorModalProps } from "@/containers/modals/edit-indicator-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import { Indicator } from "@/types/indicator.types"
import translate from "@/modules/i18n"

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
    <ModalContainer
      title={translate("pages.indicators_dashboard.edit_indicator")}
    >
      <EditIndicatorForm indicator={indicator} onSuccess={handleSuccess} />
    </ModalContainer>
  )
}

export default EditIndicatorModal
