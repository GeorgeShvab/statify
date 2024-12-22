import { FC } from "react"
import Button from "@/ui/button/Button"
import { ValueModalProps } from "@/containers/modals/value-modal/types"
import DataList from "@/components/data-list/DataList"
import DataListItem from "@/components/data-list/components/data-list-item/DataListItem"
import ModalContainer from "@/components/modal-container/ModalContainer"

//import { useModal } from "@/providers/modal-provider/ModalProvider"

const ValueModal: FC<ValueModalProps> = ({ value }) => {
  //const { openModal } = useModal()

  const handleEditValue = () => {
    //openModal(<EditCountryModal country={country} />)
  }

  const createdAtDate = new Date(value.createdAt).toLocaleDateString()
  const updatedAtDate = new Date(value.updatedAt).toLocaleDateString()

  return (
    <ModalContainer title="Value Information" size="small">
      <DataList>
        <DataListItem label="Value ID" data={value.id} />
        <DataListItem label="Indicator ID" data={value.indicatorId} />
        <DataListItem label="Country ID" data={value.countryId} />
        <DataListItem label="Value" data={value.value} />
        <DataListItem label="Year" data={value.year} />
        <DataListItem label="Date of update" data={updatedAtDate} />
        <DataListItem label="Date of creation" data={createdAtDate} />
      </DataList>
      <Button color="dark" className="full-width" onClick={handleEditValue}>
        Edit
      </Button>
    </ModalContainer>
  )
}

export default ValueModal
