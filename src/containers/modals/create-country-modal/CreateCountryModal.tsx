import { FC } from "react"
import CreateCountryForm from "@/containers/forms/country-form/create-country-form/CreateCountryForm"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const CreateCountryModal: FC = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer>
      <CreateCountryForm onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default CreateCountryModal
