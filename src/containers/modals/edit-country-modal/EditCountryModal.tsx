import { FC } from "react"
import EditCountryForm from "@/containers/forms/country-form/edit-country-form/EditCountryForm"
import { EditCountryModalProps } from "@/containers/modals/edit-country-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditCountryModal: FC<EditCountryModalProps> = ({ country }) => {
  const { closeModal } = useModal()

  return (
    <ModalContainer title="Edit Country" size="medium">
      <EditCountryForm country={country} onSuccess={closeModal} />
    </ModalContainer>
  )
}

export default EditCountryModal
