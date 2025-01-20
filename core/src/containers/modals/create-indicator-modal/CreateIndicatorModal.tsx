import { FC } from "react"
import CreateIndicatorForm from "@/containers/forms/indicator-form/create-indicator-form/CreateIndicatorForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const CreateIndicatorModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer
      title={translate("pages.indicators_dashboard.new_indicator")}
    >
      <CreateIndicatorForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateIndicatorModal
