import { FC } from "react"
import Button from "@/ui/button/Button"
import EditValueModal from "@/containers/modals/edit-value-modal/EditValueModal"
import { ValueModalProps } from "@/containers/modals/value-modal/types"
import DataList from "@/components/data-list/DataList"
import DataListItem from "@/components/data-list/components/data-list-item/DataListItem"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const ValueModal: FC<ValueModalProps> = ({ value }) => {
  const { openModal } = useModal()

  const handleEditValue = () => {
    openModal(<EditValueModal value={value} />)
  }

  const createdAtDate = new Date(value.createdAt).toLocaleDateString()
  const updatedAtDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <ModalContainer
      title={translate("pages.values_dashboard.value_information")}
      size="small"
    >
      <DataList>
        <DataListItem
          label={translate("common.id")}
          data-testid="value-modal-id"
          data={value.id}
        />
        <DataListItem
          label={translate("pages.values_dashboard.indicator_id")}
          data-testid="value-modal-indicator-id"
          data={value.indicatorId}
        />
        <DataListItem
          label={translate("pages.values_dashboard.country_id")}
          data-testid="value-modal-country-id"
          data={value.countryId}
        />
        <DataListItem
          label={translate("common.value")}
          data-testid="value-modal-country-value"
          data={value.value}
        />
        <DataListItem
          label={translate("common.year")}
          data-testid="value-modal-country-year"
          data={value.year}
        />
        <DataListItem
          label={translate("common.date_of_update")}
          data-testid="value-modal-updatedAt"
          data={updatedAtDate}
        />
        <DataListItem
          label={translate("common.date_of_creation")}
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
        {translate("common.edit")}
      </Button>
    </ModalContainer>
  )
}

export default ValueModal
