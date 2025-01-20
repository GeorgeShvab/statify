import { FC } from "react"
import CreateCountryForm from "@/containers/forms/country-form/create-country-form/CreateCountryForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const CreateCountryModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title={translate("pages.countries_dashboard.new_country")}>
      <CreateCountryForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateCountryModal
