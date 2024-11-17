import { FC } from "react"
import { Country } from "@prisma/client"
import EditCountryForm from "@/containers/forms/country-form/edit-country-form/EditCountryForm"
import { EditCountryModalProps } from "@/containers/modals/edit-country-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const EditCountryModal: FC<EditCountryModalProps> = ({
  country,
  onSuccess,
}) => {
  const { closeModal } = useModal()

  const handleSuccess = (data: Partial<Country> & Pick<Country, "id">) => {
    closeModal()
    if (onSuccess) onSuccess(data)
  }

  return (
    <ModalContainer title="Edit Country" size="medium">
      <EditCountryForm country={country} onSuccess={handleSuccess} />
    </ModalContainer>
  )
}

export default EditCountryModal
