import { FC } from "react"
import Button from "@/ui/button/Button"
import { ValueModalProps } from "@/containers/modals/value-modal/types"
import DataList from "@/components/data-list/DataList"
import DataListItem from "@/components/data-list/components/data-list-item/DataListItem"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import EditValueModal from "../edit-value-modal/EditValueModal"

const ValueModal: FC<ValueModalProps> = ({ value }) => {
  const { openModal } = useModal()

  const handleEditValue = () => {
    openModal(<EditValueModal value={value} />)
  }

  const createdAtDate = new Date(value.createdAt).toLocaleDateString()
  const updatedAtDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <ModalContainer title="Value Information" size="small">
      <DataList>
        <DataListItem
          label="Value ID"
          data-testid="value-modal-id"
          data={value.id}
        />
        <DataListItem
          label="Indicator ID"
          data-testid="value-modal-indicator-id"
          data={value.indicatorId}
        />
        <DataListItem
          label="Country ID"
          data-testid="value-modal-country-id"
          data={value.countryId}
        />
        <DataListItem
          label="Value"
          data-testid="value-modal-country-value"
          data={value.value}
        />
        <DataListItem
          label="Year"
          data-testid="value-modal-country-year"
          data={value.year}
        />
        <DataListItem
          label="Date of update"
          data-testid="value-modal-updatedAt"
          data={updatedAtDate}
        />
        <DataListItem
          label="Date of creation"
          data-testid="value-modal-createdAt"
          data={createdAtDate}
        />
      </DataList>
      <Button
        color="dark"
        className="full-width"
        data-testid="value-modal-edit-button"
        onClick={handleEditValue}
      >
        Edit
      </Button>
    </ModalContainer>
  )
}

export default ValueModal
